import express from 'express';
import mysql from 'mysql2/promise';
import path from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import session from 'express-session';
import fs from 'fs/promises';
import crypto from 'crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001; // Separate port as requested

// Helper function to download image
async function downloadImage(url) {
    if (!url || !url.startsWith('http')) return url;

    try {
        // Create uploads directory if it doesn't exist
        const uploadsDir = path.join(__dirname, '../public/uploads');
        try {
            await fs.access(uploadsDir);
        } catch {
            await fs.mkdir(uploadsDir, { recursive: true });
        }

        // Generate unique filename
        const ext = path.extname(url).split('?')[0] || '.jpg';
        const hash = crypto.createHash('md5').update(url).digest('hex');
        const filename = `${hash}${ext}`;
        const filepath = path.join(uploadsDir, filename);
        const publicPath = `/uploads/${filename}`;

        // Check if file already exists
        try {
            await fs.access(filepath);
            return publicPath;
        } catch {
            // File doesn't exist, download it
            const response = await fetch(url);
            if (!response.ok) throw new Error(`Failed to fetch image: ${response.statusText}`);
            
            const buffer = Buffer.from(await response.arrayBuffer());
            await fs.writeFile(filepath, buffer);
            return publicPath;
        }
    } catch (error) {
        console.error('Error downloading image:', error);
        return url; // Return original URL if download fails
    }
}

// Helper function to process content images
async function processContentImages(content) {
    if (!content) return content;
    
    // Find all image src attributes specifically within img tags
    const imgRegex = /<img[^>]+src="(https?:\/\/[^"]+)"/g;
    let match;
    let newContent = content;
    const matches = [];

    // Collect all matches first
    while ((match = imgRegex.exec(content)) !== null) {
        matches.push(match[1]);
    }

    // Process each URL
    for (const url of matches) {
        // Skip if it's already a local path
        if (url.startsWith('/uploads/')) continue;

        const localPath = await downloadImage(url);
        if (localPath !== url) {
            newContent = newContent.replace(url, localPath);
        }
    }

    return newContent;
}

// Middleware

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // Add JSON support
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(session({
    secret: 'admin_secret_key_123',
    resave: false,
    saveUninitialized: true
}));

// Database Connection
const pool = mysql.createPool({
    uri: 'mysql://mysql:f584b401e07b0dcaee8a@vhi09o.easypanel.host:6914/allesschauen',
    waitForConnections: true,
    connectionLimit: 10,
    ssl: { rejectUnauthorized: false },
    multipleStatements: true // Enable multiple statements for init script
});

// Initialize Database Tables
async function initDB() {
    const schema = `
        CREATE TABLE IF NOT EXISTS categories (
            id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            slug VARCHAR(100) NOT NULL UNIQUE,
            type ENUM('blog', 'guide') NOT NULL DEFAULT 'blog',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

        CREATE TABLE IF NOT EXISTS blog_posts (
            id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            slug VARCHAR(255) NOT NULL UNIQUE,
            excerpt TEXT,
            content LONGTEXT NOT NULL,
            featured_image VARCHAR(255),
            meta_title VARCHAR(255),
            meta_description VARCHAR(255),
            status ENUM('draft', 'published') DEFAULT 'draft',
            author VARCHAR(100),
            published_at DATETIME,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

        CREATE TABLE IF NOT EXISTS help_guides (
            id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            category_id INT UNSIGNED,
            title VARCHAR(255) NOT NULL,
            slug VARCHAR(255) NOT NULL UNIQUE,
            content LONGTEXT NOT NULL,
            video_url VARCHAR(255),
            difficulty ENUM('easy', 'medium', 'hard') DEFAULT 'easy',
            meta_title VARCHAR(255),
            meta_description VARCHAR(255),
            views INT UNSIGNED DEFAULT 0,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

        CREATE TABLE IF NOT EXISTS users (
            id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(50) NOT NULL UNIQUE,
            password_hash VARCHAR(255) NOT NULL,
            role ENUM('admin', 'editor') DEFAULT 'admin',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

        CREATE TABLE IF NOT EXISTS pages_seo (
            id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            page_identifier VARCHAR(100) NOT NULL UNIQUE,
            route VARCHAR(255) NOT NULL,
            title VARCHAR(255),
            description VARCHAR(255),
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

        CREATE TABLE IF NOT EXISTS settings (
            id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            setting_key VARCHAR(100) NOT NULL UNIQUE,
            setting_value TEXT,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `;

    try {
        await pool.query(schema);
        
        // Seed default pages if not exist
        const defaultPages = [
            { id: 'home', route: '/', title: 'SchauAlles.com - Premium IPTV Service', description: 'Beste Qualität & Preise' },
            { id: 'blog', route: '/blog', title: 'Blog & News | SchauAlles.com', description: 'Aktuelle Neuigkeiten, Tutorials und Updates' },
            { id: 'help', route: '/hilfe', title: 'Hilfe Center & Anleitungen | SchauAlles.com', description: 'Schritt-für-Schritt Anleitungen und Video-Tutorials' },
            { id: 'contact', route: '/kontakt', title: 'Kontakt & Support | SchauAlles.com', description: 'Wir sind für Sie da' },
            { id: 'reseller', route: '/reseller', title: 'Reseller werden | SchauAlles.com Partnerprogramm', description: 'Werden Sie SchauAlles Partner. Passives Einkommen aufbauen.' }
        ];

        for (const page of defaultPages) {
            await pool.execute(
                'INSERT IGNORE INTO pages_seo (page_identifier, route, title, description) VALUES (?, ?, ?, ?)',
                [page.id, page.route, page.title, page.description]
            );
        }

        // Seed default AI settings
        const defaultSettings = [
            { key: 'ai_api_key', value: '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' },
            { key: 'ai_model', value: 'x-ai/grok-4.1-fast:free' }
        ];

        for (const setting of defaultSettings) {
            await pool.execute(
                'INSERT IGNORE INTO settings (setting_key, setting_value) VALUES (?, ?)',
                [setting.key, setting.value]
            );
        }
        
        console.log('Database initialized successfully');
    } catch (err) {
        console.error('Error initializing database:', err);
    }
}

// Middleware to check auth
const requireAuth = (req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        res.redirect('/login');
    }
};

// Routes

// Login
app.get('/login', (req, res) => {
    res.render('login', { error: null });
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    // Simple hardcoded check for demo (since we haven't seeded DB users yet)
    // In production, query the 'users' table
    if (username === 'admin' && password === 'admin123') {
        req.session.user = { username };
        res.redirect('/');
    } else {
        res.render('login', { error: 'Invalid credentials' });
    }
});

app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/login');
});

// Dashboard
app.get('/', requireAuth, async (req, res) => {
    try {
        // Fetch statistics
        const [blogCount] = await pool.execute('SELECT COUNT(*) as count FROM blog_posts');
        const [guidesCount] = await pool.execute('SELECT COUNT(*) as count FROM help_guides');
        const [totalViews] = await pool.execute('SELECT SUM(views) as total FROM help_guides');
        const [recentPosts] = await pool.execute('SELECT id, title, status, created_at FROM blog_posts ORDER BY created_at DESC LIMIT 5');
        const [recentGuides] = await pool.execute('SELECT id, title, views, created_at FROM help_guides ORDER BY created_at DESC LIMIT 5');
        const [publishedPosts] = await pool.execute('SELECT COUNT(*) as count FROM blog_posts WHERE status = "published"');
        const [draftPosts] = await pool.execute('SELECT COUNT(*) as count FROM blog_posts WHERE status = "draft"');
        
        res.render('dashboard-new', {
            stats: {
                blogTotal: blogCount[0].count,
                guidesTotal: guidesCount[0].count,
                totalViews: totalViews[0].total || 0,
                publishedPosts: publishedPosts[0].count,
                draftPosts: draftPosts[0].count
            },
            recentPosts,
            recentGuides,
            currentPage: 'dashboard'
        });
    } catch (err) {
        console.error('Dashboard error:', err);
        res.status(500).send(err.message);
    }
});

// Blog Routes
app.get('/blog', requireAuth, async (req, res) => {
    try {
        const [posts] = await pool.execute('SELECT * FROM blog_posts ORDER BY created_at DESC');
        res.render('blog/index-new', { posts, currentPage: 'blog' });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.get('/blog/new', requireAuth, (req, res) => {
    res.render('blog/edit', { post: null });
});

app.get('/blog/edit/:id', requireAuth, async (req, res) => {
    try {
        const [rows] = await pool.execute('SELECT * FROM blog_posts WHERE id = ?', [req.params.id]);
        if (rows.length === 0) return res.status(404).send('Post not found');
        res.render('blog/edit', { post: rows[0] });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.post('/blog/save', requireAuth, async (req, res) => {
    const { id, title, slug, excerpt, status, meta_title, meta_description } = req.body;
    let { content, featured_image } = req.body;

    try {
        // Process images
        featured_image = await downloadImage(featured_image);
        content = await processContentImages(content);

        if (id) {
            await pool.execute(
                'UPDATE blog_posts SET title=?, slug=?, content=?, excerpt=?, status=?, meta_title=?, meta_description=?, featured_image=? WHERE id=?',
                [title, slug, content, excerpt, status, meta_title, meta_description, featured_image, id]
            );
        } else {
            await pool.execute(
                'INSERT INTO blog_posts (title, slug, content, excerpt, status, meta_title, meta_description, featured_image) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                [title, slug, content, excerpt, status, meta_title, meta_description, featured_image]
            );
        }
        res.redirect('/blog');
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Guides Routes
app.get('/guides', requireAuth, async (req, res) => {
    try {
        const [guides] = await pool.execute('SELECT * FROM help_guides ORDER BY created_at DESC');
        res.render('guides/index-new', { guides, currentPage: 'guides' });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.get('/guides/new', requireAuth, (req, res) => {
    res.render('guides/edit', { guide: null });
});

app.get('/guides/edit/:id', requireAuth, async (req, res) => {
    try {
        const [rows] = await pool.execute('SELECT * FROM help_guides WHERE id = ?', [req.params.id]);
        if (rows.length === 0) return res.status(404).send('Guide not found');
        res.render('guides/edit', { guide: rows[0] });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.post('/guides/save', requireAuth, async (req, res) => {
    const { id, title, slug, difficulty, video_url, meta_title, meta_description } = req.body;
    let { content } = req.body;

    try {
        // Process images in content
        content = await processContentImages(content);

        if (id) {
            await pool.execute(
                'UPDATE help_guides SET title=?, slug=?, content=?, difficulty=?, video_url=?, meta_title=?, meta_description=? WHERE id=?',
                [title, slug, content, difficulty, video_url, meta_title, meta_description, id]
            );
        } else {
            await pool.execute(
                'INSERT INTO help_guides (title, slug, content, difficulty, video_url, meta_title, meta_description) VALUES (?, ?, ?, ?, ?, ?, ?)',
                [title, slug, content, difficulty, video_url, meta_title, meta_description]
            );
        }
        res.redirect('/guides');
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Pages SEO Routes
app.get('/pages', requireAuth, async (req, res) => {
    try {
        const [pages] = await pool.execute('SELECT * FROM pages_seo ORDER BY page_identifier');
        res.render('pages/index-new', { pages, currentPage: 'pages' });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.get('/pages/edit/:id', requireAuth, async (req, res) => {
    try {
        const [rows] = await pool.execute('SELECT * FROM pages_seo WHERE id = ?', [req.params.id]);
        if (rows.length === 0) return res.status(404).send('Page not found');
        res.render('pages/edit', { page: rows[0] });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.post('/pages/save', requireAuth, async (req, res) => {
    const { id, title, description } = req.body;
    try {
        await pool.execute(
            'UPDATE pages_seo SET title=?, description=? WHERE id=?',
            [title, description, id]
        );
        res.redirect('/pages');
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Settings Routes
app.get('/settings', requireAuth, async (req, res) => {
    try {
        const [rows] = await pool.execute('SELECT * FROM settings');
        const settings = {};
        rows.forEach(row => {
            settings[row.setting_key] = row.setting_value;
        });
        res.render('settings-new', { settings, currentPage: 'settings' });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.post('/settings/save', requireAuth, async (req, res) => {
    const { ai_api_key, ai_model } = req.body;
    try {
        await pool.execute(
            'INSERT INTO settings (setting_key, setting_value) VALUES (?, ?) ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value)',
            ['ai_api_key', ai_api_key]
        );
        await pool.execute(
            'INSERT INTO settings (setting_key, setting_value) VALUES (?, ?) ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value)',
            ['ai_model', ai_model]
        );
        res.redirect('/settings');
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// API Route for AI Generation
app.post('/api/generate-seo', requireAuth, async (req, res) => {
    const { content, type } = req.body; // type can be 'blog' or 'guide'

    if (!content) return res.status(400).json({ error: 'Content is required' });

    try {
        // Fetch settings
        const [rows] = await pool.execute('SELECT * FROM settings WHERE setting_key IN (?, ?)', ['ai_api_key', 'ai_model']);
        const settings = {};
        rows.forEach(row => {
            settings[row.setting_key] = row.setting_value;
        });

        const apiKey = settings.ai_api_key;
        const model = settings.ai_model;

        if (!apiKey) return res.status(500).json({ error: 'API Key not configured in settings' });

        const prompt = `
            Analyze the following ${type} content and generate:
            1. 3 options for the main Post Title (H1).
            2. 3 options for the URL Slug (concise, hyphenated, lowercase).
            3. 3 options for SEO Meta Title (Max 60 chars).
            4. 3 options for SEO Meta Description (Max 160 chars).
            
            Requirements:
            - Language: German.
            - Output Format: Valid JSON object with keys "post_titles", "slugs", "meta_titles", "meta_descriptions". All values are arrays of strings.
            
            Content:
            ${content.substring(0, 3000)}... [truncated]
        `;

        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "model": model,
                "messages": [
                    { "role": "system", "content": "You are an SEO expert assistant. You only output raw JSON." },
                    { "role": "user", "content": prompt }
                ]
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`OpenRouter API Error: ${response.status} - ${errorText}`);
        }

        const data = await response.json();
        let aiContent = data.choices[0].message.content;
        
        // Cleanup JSON string if needed (remove markdown code blocks)
        aiContent = aiContent.replace(/```json/g, '').replace(/```/g, '').trim();
        
        const jsonResponse = JSON.parse(aiContent);
        res.json(jsonResponse);

    } catch (err) {
        console.error('AI Generation Error:', err);
        res.status(500).json({ error: err.message });
    }
});

// API Route for AI Content Enhancement
app.post('/api/enhance-content', requireAuth, async (req, res) => {
    const { content, type } = req.body;

    if (!content) return res.status(400).json({ error: 'Content is required' });

    try {
        const [rows] = await pool.execute('SELECT * FROM settings WHERE setting_key IN (?, ?)', ['ai_api_key', 'ai_model']);
        const settings = {};
        rows.forEach(row => {
            settings[row.setting_key] = row.setting_value;
        });

        const apiKey = settings.ai_api_key;
        const model = settings.ai_model;

        if (!apiKey) return res.status(500).json({ error: 'API Key not configured' });

        const prompt = `
            Enhance and improve the following ${type} content to make it clearer, better structured, and easier to understand.
            
            Requirements:
            - Improve readability and flow.
            - Use clear headings (H2, H3) and bullet points where appropriate.
            - Fix grammar and spelling errors.
            - Maintain the original meaning and key information.
            - CRITICAL: PRESERVE ALL EXISTING <img>, <iframe>, and <video> TAGS EXACTLY AS THEY ARE. Do not remove them. Place them in the appropriate context where they originally appeared or where they make the most sense.
            - Output strictly HTML format compatible with a rich text editor (no markdown code blocks around it).
            - Language: German.

            Content:
            ${content}
        `;

        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "model": model,
                "messages": [
                    { "role": "system", "content": "You are a professional editor. You output only the enhanced HTML content." },
                    { "role": "user", "content": prompt }
                ]
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`OpenRouter API Error: ${response.status} - ${errorText}`);
        }

        const data = await response.json();
        let enhancedContent = data.choices[0].message.content;
        
        // Cleanup Markdown code blocks if present
        enhancedContent = enhancedContent.replace(/^```html\n/, '').replace(/^```\n/, '').replace(/\n```$/, '');

        res.json({ content: enhancedContent });

    } catch (err) {
        console.error('AI Enhancement Error:', err);
        res.status(500).json({ error: err.message });
    }
});

// Start Server
app.listen(PORT, async () => {
    await initDB();
    console.log(`Admin Dashboard running on http://localhost:${PORT}`);
});

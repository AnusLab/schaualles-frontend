import mysql from 'mysql2/promise';

// Database connection
const pool = mysql.createPool({
    uri: 'mysql://mysql:f584b401e07b0dcaee8a@vhi09o.easypanel.host:6914/allesschauen',
    waitForConnections: true,
    connectionLimit: 10,
    ssl: { rejectUnauthorized: false }
});

// Static pages with their priority and change frequency
const staticPages = [
    { url: '/', changefreq: 'daily', priority: 1.0 },
    { url: '/blog', changefreq: 'daily', priority: 0.9 },
    { url: '/hilfe', changefreq: 'weekly', priority: 0.9 },
    { url: '/kontakt', changefreq: 'monthly', priority: 0.7 },
    { url: '/reseller', changefreq: 'monthly', priority: 0.8 },
    { url: '/datenschutz', changefreq: 'yearly', priority: 0.5 },
    { url: '/impressum', changefreq: 'yearly', priority: 0.5 },
    { url: '/agb', changefreq: 'yearly', priority: 0.5 }
];

function escapeXml(unsafe) {
    if (!unsafe) return '';
    return unsafe
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
}

export async function GET({ site }) {
    const baseUrl = site || 'https://schaualles.com';
    
    try {
        // Fetch published blog posts
        const [blogPosts] = await pool.execute(
            'SELECT slug, updated_at, created_at FROM blog_posts WHERE status = "published" ORDER BY updated_at DESC'
        );

        // Fetch help guides
        const [helpGuides] = await pool.execute(
            'SELECT slug, updated_at, created_at FROM help_guides ORDER BY updated_at DESC'
        );

        // Build sitemap XML
        let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
`;

        // Add static pages
        staticPages.forEach(page => {
            const lastmod = new Date().toISOString().split('T')[0];
            sitemap += `  <url>
    <loc>${escapeXml(baseUrl + page.url)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>
`;
        });

        // Add blog posts
        blogPosts.forEach(post => {
            const lastmod = new Date(post.updated_at || post.created_at).toISOString().split('T')[0];
            sitemap += `  <url>
    <loc>${escapeXml(baseUrl + '/blog/' + post.slug)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
`;
        });

        // Add help guides
        helpGuides.forEach(guide => {
            const lastmod = new Date(guide.updated_at || guide.created_at).toISOString().split('T')[0];
            sitemap += `  <url>
    <loc>${escapeXml(baseUrl + '/hilfe/' + guide.slug)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
`;
        });

        sitemap += `</urlset>`;

        return new Response(sitemap, {
            headers: {
                'Content-Type': 'application/xml; charset=utf-8',
                'Cache-Control': 'public, max-age=3600, s-maxage=3600',
                'X-Robots-Tag': 'noindex'
            }
        });

    } catch (error) {
        console.error('Sitemap generation error:', error);
        
        // Fallback to static pages only if database fails
        let fallbackSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;
        staticPages.forEach(page => {
            const lastmod = new Date().toISOString().split('T')[0];
            fallbackSitemap += `  <url>
    <loc>${escapeXml(baseUrl + page.url)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>
`;
        });
        fallbackSitemap += `</urlset>`;

        return new Response(fallbackSitemap, {
            headers: {
                'Content-Type': 'application/xml; charset=utf-8',
                'Cache-Control': 'public, max-age=3600'
            }
        });
    }
}

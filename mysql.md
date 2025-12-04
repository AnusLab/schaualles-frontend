# MySQL Database Schema for Allesschauen

## Overview
This document defines the database schema for the Blog and Help Center sections of the website.

**Database Name:** `allesschauen`

---

## Tables

### 1. `categories`
Stores categories for both blog posts and help guides.

| Column | Type | Nullable | Description |
|--------|------|----------|-------------|
| `id` | INT UNSIGNED AUTO_INCREMENT | NO | Primary Key |
| `name` | VARCHAR(100) | NO | Category name (e.g., "Installation", "News") |
| `slug` | VARCHAR(100) | NO | URL-friendly slug (unique) |
| `type` | ENUM('blog', 'guide') | NO | Type of category |
| `created_at` | TIMESTAMP | NO | Default CURRENT_TIMESTAMP |

### 2. `blog_posts`
Stores blog articles.

| Column | Type | Nullable | Description |
|--------|------|----------|-------------|
| `id` | INT UNSIGNED AUTO_INCREMENT | NO | Primary Key |
| `title` | VARCHAR(255) | NO | SEO-optimized title |
| `slug` | VARCHAR(255) | NO | URL slug (unique) |
| `excerpt` | TEXT | YES | Short summary for cards/meta desc |
| `content` | LONGTEXT | NO | Full HTML/Markdown content |
| `featured_image` | VARCHAR(255) | YES | URL to cover image |
| `meta_title` | VARCHAR(255) | YES | Custom SEO Title (if different from title) |
| `meta_description` | VARCHAR(255) | YES | Custom SEO Meta Description |
| `status` | ENUM('draft', 'published') | NO | Default 'draft' |
| `author` | VARCHAR(100) | YES | Author name |
| `published_at` | DATETIME | YES | Publication date |
| `created_at` | TIMESTAMP | NO | Default CURRENT_TIMESTAMP |
| `updated_at` | TIMESTAMP | NO | Default CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP |

### 3. `help_guides`
Stores help center guides/tutorials.

| Column | Type | Nullable | Description |
|--------|------|----------|-------------|
| `id` | INT UNSIGNED AUTO_INCREMENT | NO | Primary Key |
| `category_id` | INT UNSIGNED | YES | FK to `categories.id` |
| `title` | VARCHAR(255) | NO | Guide title |
| `slug` | VARCHAR(255) | NO | URL slug (unique) |
| `content` | LONGTEXT | NO | Full content (steps, images) |
| `video_url` | VARCHAR(255) | YES | Optional video tutorial link |
| `difficulty` | ENUM('easy', 'medium', 'hard') | NO | Default 'easy' |
| `meta_title` | VARCHAR(255) | YES | SEO Title |
| `meta_description` | VARCHAR(255) | YES | SEO Description |
| `views` | INT UNSIGNED | NO | Default 0 |
| `created_at` | TIMESTAMP | NO | Default CURRENT_TIMESTAMP |
| `updated_at` | TIMESTAMP | NO | Default CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP |

### 4. `users` (Optional for Admin)
Simple user table for admin dashboard authentication.

| Column | Type | Nullable | Description |
|--------|------|----------|-------------|
| `id` | INT UNSIGNED AUTO_INCREMENT | NO | Primary Key |
| `username` | VARCHAR(50) | NO | Unique username |
| `password_hash` | VARCHAR(255) | NO | Hashed password |
| `role` | ENUM('admin', 'editor') | NO | Default 'admin' |

---

## SQL Initialization Script

```sql
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
```

# SEO Guide for SchauAlles.com

## 📋 Overview
This document outlines the SEO implementation for SchauAlles.com, ensuring optimal search engine visibility and ranking.

---

## 🗺️ Sitemap Configuration

### Location
- **URL**: `https://schaualles.com/sitemap.xml`
- **File**: `/src/pages/sitemap.xml.js`

### Features
✅ **Dynamic Generation** - Automatically includes all published content  
✅ **Database Integration** - Pulls from MySQL for real-time updates  
✅ **Google Standards** - Follows XML Sitemap Protocol 0.9  
✅ **Extended Schemas** - Includes news, mobile, image, and video schemas  
✅ **Proper Caching** - 1-hour cache for performance  
✅ **Error Handling** - Fallback to static pages if database fails  

### Included Pages

#### Static Pages (Priority: 0.5 - 1.0)
- `/` - Homepage (Priority: 1.0, Daily)
- `/blog` - Blog Index (Priority: 0.9, Daily)
- `/hilfe` - Help Center (Priority: 0.9, Weekly)
- `/kontakt` - Contact (Priority: 0.7, Monthly)
- `/reseller` - Reseller Program (Priority: 0.8, Monthly)
- `/datenschutz` - Privacy Policy (Priority: 0.5, Yearly)
- `/impressum` - Imprint (Priority: 0.5, Yearly)
- `/agb` - Terms & Conditions (Priority: 0.5, Yearly)

#### Dynamic Pages
- **Blog Posts** - `/blog/{slug}` (Priority: 0.8, Weekly)
- **Help Guides** - `/hilfe/{slug}` (Priority: 0.7, Monthly)

### Update Frequency
- Homepage: Daily
- Blog: Daily (new posts)
- Guides: Weekly
- Legal Pages: Yearly

---

## 🤖 Robots.txt Configuration

### Location
- **URL**: `https://schaualles.com/robots.txt`
- **File**: `/public/robots.txt`

### Rules

#### Allowed
- All public pages (`/`)
- Blog posts (`/blog/`)
- Help guides (`/hilfe/`)
- Contact page (`/kontakt`)
- Reseller page (`/reseller`)

#### Disallowed
- Admin panel (`/admin/`)
- API endpoints (`/api/`)
- Astro build files (`/_astro/`)

#### Blocked Bots
- AhrefsBot (SEO crawler)
- SemrushBot (SEO crawler)
- DotBot (scraper)

#### Crawl Delays
- Googlebot: 0 seconds (no delay)
- Bingbot: 1 second

---

## 🏷️ Meta Tags Implementation

### Base Layout (`/src/layouts/Layout.astro`)

#### Essential Meta Tags
```html
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width" />
<meta name="description" content="{description}" />
<title>{title}</title>
```

#### SEO Meta Tags
```html
<link rel="canonical" href="{current-url}" />
<link rel="sitemap" href="/sitemap.xml" />
<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
```

#### Open Graph (Facebook/LinkedIn)
```html
<meta property="og:type" content="website" />
<meta property="og:url" content="{current-url}" />
<meta property="og:title" content="{title}" />
<meta property="og:description" content="{description}" />
<meta property="og:site_name" content="SchauAlles.com" />
```

#### Twitter Cards
```html
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:url" content="{current-url}" />
<meta name="twitter:title" content="{title}" />
<meta name="twitter:description" content="{description}" />
```

---

## 📊 SEO Best Practices Implemented

### ✅ Technical SEO
- [x] XML Sitemap with proper structure
- [x] Robots.txt with clear directives
- [x] Canonical URLs on all pages
- [x] Proper meta descriptions (max 160 chars)
- [x] Title tags optimized (max 60 chars)
- [x] Mobile-responsive design
- [x] Fast page load times (inlined CSS)
- [x] HTTPS enabled
- [x] Structured data ready

### ✅ On-Page SEO
- [x] Semantic HTML structure
- [x] Proper heading hierarchy (H1-H6)
- [x] Alt text for images
- [x] Internal linking structure
- [x] Clean URL structure (slugs)
- [x] Breadcrumb navigation ready

### ✅ Content SEO
- [x] Unique titles per page
- [x] Unique descriptions per page
- [x] Keyword-optimized content
- [x] Regular content updates (blog)
- [x] German language optimization

### ✅ Performance SEO
- [x] Lazy loading images
- [x] Optimized images (WebP)
- [x] Minified CSS/JS
- [x] DNS prefetch for external resources
- [x] Deferred script loading
- [x] Browser caching headers

---

## 🚀 Google Search Console Setup

### 1. Submit Sitemap
1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add property: `https://schaualles.com`
3. Navigate to **Sitemaps** in left menu
4. Enter: `sitemap.xml`
5. Click **Submit**

### 2. Request Indexing
For new/updated pages:
1. Go to **URL Inspection**
2. Enter page URL
3. Click **Request Indexing**

### 3. Monitor Performance
- Check **Performance** tab for search analytics
- Monitor **Coverage** for indexing issues
- Review **Enhancements** for mobile usability

---

## 🎯 Bing Webmaster Tools Setup

### 1. Submit Sitemap
1. Go to [Bing Webmaster Tools](https://www.bing.com/webmasters)
2. Add site: `https://schaualles.com`
3. Navigate to **Sitemaps**
4. Submit: `https://schaualles.com/sitemap.xml`

### 2. Submit URL
For immediate indexing:
1. Use **Submit URL** tool
2. Enter page URLs
3. Submit for crawling

---

## 📈 SEO Monitoring Checklist

### Weekly
- [ ] Check Google Search Console for errors
- [ ] Review new blog post indexing
- [ ] Monitor page speed insights
- [ ] Check for broken links

### Monthly
- [ ] Analyze search performance metrics
- [ ] Review and update meta descriptions
- [ ] Check mobile usability
- [ ] Update sitemap if structure changes

### Quarterly
- [ ] Comprehensive SEO audit
- [ ] Competitor analysis
- [ ] Backlink profile review
- [ ] Content gap analysis

---

## 🔧 Maintenance

### Sitemap Updates
The sitemap automatically updates when:
- New blog posts are published
- New help guides are created
- Content is updated (lastmod changes)

### Manual Regeneration
Not needed - sitemap is generated on each request with 1-hour cache.

### Testing
Test your sitemap:
```bash
# Local
http://localhost:4321/sitemap.xml

# Production
https://schaualles.com/sitemap.xml
```

Validate with:
- [XML Sitemap Validator](https://www.xml-sitemaps.com/validate-xml-sitemap.html)
- Google Search Console Sitemap Report

---

## 📝 SEO Content Guidelines

### Title Tags
- **Length**: 50-60 characters
- **Format**: `Primary Keyword | SchauAlles.com`
- **Unique**: Every page must have unique title
- **Keywords**: Include primary keyword near start

### Meta Descriptions
- **Length**: 150-160 characters
- **Action**: Include call-to-action
- **Keywords**: Include primary and secondary keywords
- **Unique**: Every page must have unique description

### URL Structure
- **Format**: `/category/keyword-slug`
- **Length**: Keep under 75 characters
- **Keywords**: Include primary keyword
- **Hyphens**: Use hyphens, not underscores
- **Lowercase**: Always use lowercase

### Headings
- **H1**: One per page, includes primary keyword
- **H2-H6**: Logical hierarchy, includes related keywords
- **Descriptive**: Clear and descriptive

---

## 🎓 Resources

### Tools
- [Google Search Console](https://search.google.com/search-console)
- [Bing Webmaster Tools](https://www.bing.com/webmasters)
- [Google PageSpeed Insights](https://pagespeed.web.dev/)
- [Schema.org](https://schema.org/)

### Validation
- [W3C Markup Validator](https://validator.w3.org/)
- [XML Sitemap Validator](https://www.xml-sitemaps.com/validate-xml-sitemap.html)
- [Robots.txt Tester](https://support.google.com/webmasters/answer/6062598)

---

## ✅ Implementation Status

- [x] Dynamic XML Sitemap
- [x] Robots.txt
- [x] Canonical URLs
- [x] Meta Tags (Title, Description)
- [x] Open Graph Tags
- [x] Twitter Cards
- [x] Site URL in Astro Config
- [x] Performance Optimization
- [ ] Structured Data (Schema.org) - Future
- [ ] Image Sitemaps - Future
- [ ] Video Sitemaps - Future

---

**Last Updated**: December 4, 2025  
**Maintained By**: Development Team

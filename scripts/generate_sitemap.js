const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const appJsPath = path.join(rootDir, 'js', 'app.js');
const BASE_URL = 'https://www.phuketvipconcierge.com';
const TODAY = new Date().toISOString().split('T')[0];

function generateSitemap() {
  console.log('🗺️ Generating dynamic sitemap.xml for Phuket VIP Concierge...');

  // 1. Static Core Pages
  const staticPages = [
    { loc: `${BASE_URL}/`, priority: '1.0', changefreq: 'daily' },
    { loc: `${BASE_URL}/properties`, priority: '0.9', changefreq: 'daily' },
    { loc: `${BASE_URL}/excursions-and-yachting`, priority: '0.9', changefreq: 'weekly' },
    { loc: `${BASE_URL}/estimate`, priority: '0.8', changefreq: 'monthly' },
    { loc: `${BASE_URL}/about-us`, priority: '0.7', changefreq: 'monthly' },
    { loc: `${BASE_URL}/legal-notice`, priority: '0.3', changefreq: 'yearly' }
  ];

  // 2. Extract properties from app.js fallbackProperties
  let properties = [];
  try {
    const appJsContent = fs.readFileSync(appJsPath, 'utf8');
    const match = appJsContent.match(/const fallbackProperties = (\[[\s\S]*?\n\]);/);
    if (match) {
      properties = JSON.parse(match[1]);
    }
  } catch (e) {
    console.warn('⚠️ Could not parse fallbackProperties from app.js:', e.message);
  }

  // 3. Property Detail Pages
  const propertyPages = properties.map(p => ({
    loc: `${BASE_URL}/property-detail?id=${encodeURIComponent(p.id)}`,
    priority: '0.8',
    changefreq: 'weekly'
  }));

  const allUrls = [...staticPages, ...propertyPages];

  // 4. Construct valid XML
  const xmlLines = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...allUrls.map(u => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`),
    '</urlset>'
  ];

  const sitemapXml = xmlLines.join('\n');

  // Save to public/sitemap.xml and root sitemap.xml
  fs.writeFileSync(path.join(rootDir, 'public', 'sitemap.xml'), sitemapXml, 'utf8');
  fs.writeFileSync(path.join(rootDir, 'sitemap.xml'), sitemapXml, 'utf8');
  console.log(`✅ sitemap.xml generated with ${allUrls.length} total URLs.`);

  // 5. Generate robots.txt
  const robotsTxt = `# Phuket VIP Concierge robots.txt
User-agent: *
Allow: /
Disallow: /admin
Disallow: /admin-dashboard
Disallow: /admin/

Sitemap: ${BASE_URL}/sitemap.xml
`;

  fs.writeFileSync(path.join(rootDir, 'public', 'robots.txt'), robotsTxt, 'utf8');
  fs.writeFileSync(path.join(rootDir, 'robots.txt'), robotsTxt, 'utf8');
  console.log('✅ robots.txt generated.');
}

module.exports = generateSitemap;

if (require.main === module) {
  generateSitemap();
}

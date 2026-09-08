const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const outDir = path.join(rootDir, 'out');

console.log('🚀 Building Pure Static Application for Cloudflare (Phuket VIP Concierge)...');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

function copyFileIfChanged(src, dest) {
  if (fs.existsSync(dest)) {
    const srcStat = fs.statSync(src);
    const destStat = fs.statSync(dest);
    if (srcStat.mtimeMs <= destStat.mtimeMs && srcStat.size === destStat.size) {
      return; // Up to date
    }
  }
  fs.copyFileSync(src, dest);
}

function copyRecursiveFast(src, dest) {
  if (!fs.existsSync(src)) return;
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
    const items = fs.readdirSync(src);
    for (const item of items) {
      copyRecursiveFast(path.join(src, item), path.join(dest, item));
    }
  } else if (stat.isFile()) {
    copyFileIfChanged(src, dest);
  }
}

// Copy static asset folders
['css', 'js', 'public', 'badges', 'assets'].forEach(folder => {
  const srcPath = path.join(rootDir, folder);
  if (fs.existsSync(srcPath)) {
    copyRecursiveFast(srcPath, path.join(outDir, folder));
  }
});

// Duplicate public/images to out/images
const imagesSrc = path.join(rootDir, 'public', 'images');
if (fs.existsSync(imagesSrc)) {
  copyRecursiveFast(imagesSrc, path.join(outDir, 'images'));
}

// Copy JSON datasets
if (fs.existsSync(path.join(rootDir, 'public', 'properties.json'))) {
  copyFileIfChanged(path.join(rootDir, 'public', 'properties.json'), path.join(outDir, 'properties.json'));
}

// Copy root HTML files to out/
fs.readdirSync(rootDir).forEach(file => {
  if (file.endsWith('.html')) {
    copyFileIfChanged(path.join(rootDir, file), path.join(outDir, file));
  }
});

// Copy _headers file for Cloudflare cache control
const headersFile = path.join(rootDir, 'public', '_headers');
if (fs.existsSync(headersFile)) {
  copyFileIfChanged(headersFile, path.join(outDir, '_headers'));
}

// Generate & copy sitemap.xml and robots.txt
const generateSitemap = require('./generate_sitemap');
generateSitemap();
['sitemap.xml', 'robots.txt'].forEach(f => {
  if (fs.existsSync(path.join(rootDir, 'public', f))) {
    copyFileIfChanged(path.join(rootDir, 'public', f), path.join(outDir, f));
  }
});

// Create pretty URL routes
const routeMaps = [
  { route: 'admin', source: 'admin.html' },
  { route: 'admin-dashboard', source: 'admin-dashboard.html' },
  { route: 'admin/dashboard', source: 'admin-dashboard.html' },
  { route: 'properties', source: 'properties.html' },
  { route: 'estimate', source: 'estimate.html' },
  { route: 'property-detail', source: 'property-detail.html' },
  { route: 'excursions-and-yachting', source: 'excursions-and-yachting.html' },
  { route: 'about-us', source: 'about-us.html' },
  { route: 'legal-notice', source: 'legal-notice.html' }
];

routeMaps.forEach(({ route, source }) => {
  const targetFolder = path.join(outDir, route);
  if (!fs.existsSync(targetFolder)) fs.mkdirSync(targetFolder, { recursive: true });
  copyFileIfChanged(path.join(rootDir, source), path.join(targetFolder, 'index.html'));
});

console.log('✅ Phuket VIP Concierge built successfully into ./out');

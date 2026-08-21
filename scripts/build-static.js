const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const outDir = path.join(rootDir, 'out');

console.log('🚀 Building Pure Static Application for Cloudflare (Phuket VIP Concierge)...');

if (fs.existsSync(outDir)) {
  fs.rmSync(outDir, { recursive: true, force: true });
}
fs.mkdirSync(outDir, { recursive: true });

function copyRecursiveSync(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();

  if (isDirectory) {
    if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
    fs.readdirSync(src).forEach((childItemName) => {
      copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
    });
  } else if (exists && stats.isFile()) {
    fs.copyFileSync(src, dest);
  }
}

// Copy static assets & HTML files
['css', 'js', 'public'].forEach(folder => {
  const srcPath = path.join(rootDir, folder);
  if (fs.existsSync(srcPath)) {
    copyRecursiveSync(srcPath, path.join(outDir, folder));
  }
});

// Duplicate public/images to out/images
const imagesSrc = path.join(rootDir, 'public', 'images');
if (fs.existsSync(imagesSrc)) {
  copyRecursiveSync(imagesSrc, path.join(outDir, 'images'));
}

// Copy JSON datasets
if (fs.existsSync(path.join(rootDir, 'public', 'properties.json'))) {
  fs.copyFileSync(path.join(rootDir, 'public', 'properties.json'), path.join(outDir, 'properties.json'));
}

// Copy root HTML files to out/
fs.readdirSync(rootDir).forEach(file => {
  if (file.endsWith('.html')) {
    fs.copyFileSync(path.join(rootDir, file), path.join(outDir, file));
  }
});

// Copy _headers file for Cloudflare cache control
const headersFile = path.join(rootDir, 'public', '_headers');
if (fs.existsSync(headersFile)) {
  fs.copyFileSync(headersFile, path.join(outDir, '_headers'));
}

// Create pretty URL routes
const routeMaps = [
  { route: 'admin', source: 'admin.html' },
  { route: 'admin-dashboard', source: 'admin-dashboard.html' },
  { route: 'admin/dashboard', source: 'admin-dashboard.html' },
  { route: 'properties', source: 'properties.html' },
  { route: 'estimate', source: 'estimate.html' },
  { route: 'property-detail', source: 'property-detail.html' }
];

routeMaps.forEach(({ route, source }) => {
  const targetFolder = path.join(outDir, route);
  if (!fs.existsSync(targetFolder)) fs.mkdirSync(targetFolder, { recursive: true });
  fs.copyFileSync(path.join(rootDir, source), path.join(targetFolder, 'index.html'));
});

console.log('✅ Phuket VIP Concierge built successfully into ./out');

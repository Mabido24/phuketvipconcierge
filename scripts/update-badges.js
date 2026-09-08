const fs = require('fs');
const path = require('path');

const files = [
  'index.html',
  'about-us.html',
  'estimate.html',
  'excursions-and-yachting.html',
  'legal-notice.html',
  'properties.html',
  'property-detail.html',
  'admin.html'
];

// Ensure local SVG exists
const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="148" height="40" viewBox="0 0 148 40" role="img" aria-label="the recreation group — AI visibility with Mabido">
  <rect width="148" height="40" rx="8" fill="#0f172a"/>
  <rect x="2" y="2" width="144" height="36" rx="6" fill="#f8fafc" stroke="#84cc16" stroke-width="2"/>
  <text x="12" y="26" font-family="system-ui,Segoe UI,sans-serif" font-size="13" font-weight="800" fill="#0f172a">MABIDO</text>
  <text x="78" y="26" font-family="system-ui,Segoe UI,sans-serif" font-size="10" font-weight="600" fill="#64748b">partner</text>
</svg>`;

const svgDirs = [
  path.join(__dirname, '..', 'public', 'images'),
  path.join(__dirname, '..', 'public', 'badges'),
  path.join(__dirname, '..', 'badges'),
  path.join(__dirname, '..', 'assets')
];

svgDirs.forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'mabido-partner.svg'), svgContent, 'utf8');
});

files.forEach(file => {
  const filePath = path.join(__dirname, '..', file);
  if (!fs.existsSync(filePath)) return;

  let content = fs.readFileSync(filePath, 'utf8');

  // Strip Col 1 badge block
  if (file !== 'admin.html') {
    // Look for Col 1 badge block under Recreation Group Ltd.
    const col1Target = `          <div class="space-y-1.5 pt-1 text-xs text-zinc-300">
            <p class="flex items-start gap-2">
              <span class="text-[#DF921B]">📍</span>
              <span>49/62 Moo 7, Rawai Sub-district, Mueang Phuket District, Phuket 83130, Thailand</span>
            </p>
            <p class="flex items-center gap-2 text-zinc-400 text-[11px]">
              <span class="text-[#DF921B]">🏢</span>
              <span>Recreation Group Ltd. · Mathieu Girard & Khammouan</span>
            </p>
          </div>
          <div class="pt-2">
            <a href="https://mabido.com/shop/the-recreation-group-rawai?utm_source=partner-badge&utm_medium=referral&utm_campaign=the-recreation-group-rawai" target="_blank" rel="noopener" class="inline-block transition-transform hover:scale-105">
              <img src="https://mabido.com/badges/mabido-partner.svg" width="148" height="40" alt="the recreation group — AI visibility with Mabido" />
            </a>
          </div>`;

    const col1Replacement = `          <div class="space-y-1.5 pt-1 text-xs text-zinc-300">
            <p class="flex items-start gap-2">
              <span class="text-[#DF921B]">📍</span>
              <span>49/62 Moo 7, Rawai Sub-district, Mueang Phuket District, Phuket 83130, Thailand</span>
            </p>
            <p class="flex items-center gap-2 text-zinc-400 text-[11px]">
              <span class="text-[#DF921B]">🏢</span>
              <span>Recreation Group Ltd. · Mathieu Girard & Khammouan</span>
            </p>
          </div>`;

    if (content.includes(col1Target)) {
      content = content.replace(col1Target, col1Replacement);
    } else {
      // Fallback regex for Col 1
      content = content.replace(
        /(<span>Recreation Group Ltd\. · Mathieu Girard & Khammouan<\/span>\s*<\/p>\s*<\/div>)\s*<div class="pt-2">\s*<a href="https:\/\/mabido\.com[^>]*>[\s\S]*?<\/a>\s*<\/div>/g,
        '$1'
      );
    }
  }

  // Replace image src with local /public/images/mabido-partner.svg
  content = content.replace(
    /src="https:\/\/mabido\.com\/badges\/mabido-partner\.svg"/g,
    'src="/public/images/mabido-partner.svg"'
  );

  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Processed:', file);
});

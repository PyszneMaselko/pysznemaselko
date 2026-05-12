/**
 * Extracts the bundled index.html into a clean HTML/CSS/JS project.
 * Run: node build.mjs
 * Output: dist/
 */
import fs from 'fs';
import path from 'path';
import zlib from 'zlib';
import { promisify } from 'util';

const gunzip = promisify(zlib.gunzip);

// ── 1. Read source ───────────────────────────────────────────────────────────
console.log('Reading index.html...');
const html = fs.readFileSync('index.html', 'utf8');

function extractScript(type) {
  const openTag = `<script type="${type}">`;
  const start = html.indexOf(openTag);
  if (start === -1) return null;
  const contentStart = start + openTag.length;
  return html.slice(contentStart, html.indexOf('</script>', contentStart)).trim();
}

const manifest    = JSON.parse(extractScript('__bundler/manifest'));
const templateRaw = extractScript('__bundler/template');
const extResources = JSON.parse(extractScript('__bundler/ext_resources') || '[]');

// Build UUID → friendly ID map from ext_resources
const uuidToId = {};
for (const r of extResources) uuidToId[r.uuid] = r.id;

// ── 2. Decode assets ─────────────────────────────────────────────────────────
const uuids = Object.keys(manifest);
console.log(`Decoding ${uuids.length} assets...`);
const decoded = {};
for (const uuid of uuids) {
  const entry = manifest[uuid];
  const buf = Buffer.from(entry.data, 'base64');
  decoded[uuid] = {
    mime: entry.mime,
    data: entry.compressed ? await gunzip(buf) : buf,
  };
}

// ── 3. Create output folders ─────────────────────────────────────────────────
['dist', 'dist/css', 'dist/js', 'dist/assets/images', 'dist/assets/fonts'].forEach(d =>
  fs.mkdirSync(d, { recursive: true })
);

// ── 4. Save assets with meaningful names ─────────────────────────────────────
function mimeToExt(mime) {
  return ({
    'image/jpeg':'jpg','image/png':'png','image/webp':'webp','image/svg+xml':'svg',
    'image/gif':'gif','image/avif':'avif',
    'font/woff2':'woff2','font/woff':'woff','font/ttf':'ttf','font/otf':'otf',
    'text/css':'css','text/javascript':'js','application/javascript':'js',
  })[mime] || 'bin';
}

const uuidToFile = {};
const imgCounters = {};
let fontIdx = 1;

for (const uuid of uuids) {
  const { mime, data } = decoded[uuid];
  const ext = mimeToExt(mime);
  const isFont  = mime.startsWith('font/');
  const isImage = mime.startsWith('image/');
  let filename;

  if (isFont) {
    filename = `assets/fonts/font_${String(fontIdx++).padStart(2,'0')}.${ext}`;
  } else if (isImage) {
    // Use ext_resources ID if available, otherwise sequential
    const friendlyId = uuidToId[uuid];
    if (friendlyId) {
      filename = `assets/images/${friendlyId}.${ext}`;
    } else {
      imgCounters[ext] = (imgCounters[ext] || 0) + 1;
      filename = `assets/images/photo_${String(imgCounters[ext]).padStart(2,'0')}.${ext}`;
    }
  } else {
    filename = `assets/${uuid.slice(0,8)}.${ext}`;
  }

  fs.writeFileSync(`dist/${filename}`, data);
  uuidToFile[uuid] = filename;
  console.log(`  ${filename} (${(data.length/1024).toFixed(1)} KB)`);
}

// ── 5. Expand template ───────────────────────────────────────────────────────
console.log('\nExpanding template...');
let template = JSON.parse(templateRaw);
for (const uuid of uuids) template = template.split(uuid).join(uuidToFile[uuid]);

// ── 6. Split HTML into HTML + CSS + JS ───────────────────────────────────────
const styleRegex  = /<style[^>]*>([\s\S]*?)<\/style>/gi;
const scriptRegex = /<script(?![^>]*\bsrc\b)[^>]*>([\s\S]*?)<\/script>/gi;

const cssBlocks = [];
const jsBlocks  = [];
let m;
while ((m = styleRegex.exec(template))  !== null) cssBlocks.push(m[1]);
while ((m = scriptRegex.exec(template)) !== null) { const t = m[1].trim(); if (t) jsBlocks.push(t); }

const cssContent = cssBlocks.join('\n\n/* ─────────────────────────────────────── */\n\n');
const jsContent  = jsBlocks.join('\n\n');
fs.writeFileSync('dist/css/styles.css', cssContent, 'utf8');
fs.writeFileSync('dist/js/main.js',     jsContent,  'utf8');

// Clean HTML
let cleanHtml = template;
cleanHtml = cleanHtml.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '');
cleanHtml = cleanHtml.replace(/<script(?![^>]*\bsrc\b)[^>]*>[\s\S]*?<\/script>/gi, '');
cleanHtml = cleanHtml.replace('</head>', '  <link rel="stylesheet" href="css/styles.css">\n</head>');
cleanHtml = cleanHtml.replace('</body>', '  <script src="js/main.js"></script>\n</body>');
cleanHtml = cleanHtml.replace(/\n{3,}/g, '\n\n');
fs.writeFileSync('dist/index.html', cleanHtml, 'utf8');

// ── 7. Print tree ─────────────────────────────────────────────────────────────
console.log('\n✓ Done! Project structure:\n');
function tree(dir, prefix = '') {
  fs.readdirSync(dir).forEach((item, i, arr) => {
    const last = i === arr.length - 1;
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    const size = stat.isFile() ? `  (${(stat.size/1024).toFixed(1)} KB)` : '';
    console.log(prefix + (last ? '└── ' : '├── ') + item + size);
    if (stat.isDirectory()) tree(fullPath, prefix + (last ? '    ' : '│   '));
  });
}
tree('dist');
console.log(`\ncss/styles.css: ${(cssContent.length/1024).toFixed(1)} KB`);
console.log(`js/main.js:     ${(jsContent.length/1024).toFixed(1)} KB`);
console.log(`index.html:     ${(cleanHtml.length/1024).toFixed(1)} KB`);

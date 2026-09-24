import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const distDir = path.resolve(rootDir, 'dist');
const distHtml = path.resolve(distDir, 'index.source.html');
const targetHtml = path.resolve(rootDir, 'index.html');
const distAssets = path.resolve(distDir, 'assets');
const targetAssets = path.resolve(rootDir, 'assets');

if (fs.existsSync(distHtml)) {
  let content = fs.readFileSync(distHtml, 'utf8');
  const timestamp = Date.now();

  // Add no-cache meta tags to prevent stale asset caching
  const cacheControlMeta = `
  <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
  <meta http-equiv="Pragma" content="no-cache" />
  <meta http-equiv="Expires" content="0" />`;

  if (!content.includes('http-equiv="Cache-Control"')) {
    content = content.replace('<head>', '<head>' + cacheControlMeta);
  }

  // Cache-bust script, style, and icon links with timestamp query strings
  content = content.replace(/src="\.\/assets\/([^"\?]+)"/g, (match, p1) => {
    return `src="./assets/${p1}?v=${timestamp}"`;
  });
  content = content.replace(/href="\.\/assets\/([^"\?]+)"/g, (match, p1) => {
    return `href="./assets/${p1}?v=${timestamp}"`;
  });

  fs.writeFileSync(targetHtml, content, 'utf8');
  fs.writeFileSync(path.resolve(distDir, 'index.html'), content, 'utf8');
  console.log(`✓ Synced dist/index.source.html -> root index.html with no-cache headers & cache-busting query string (?v=${timestamp})`);
} else {
  console.error('dist/index.source.html not found!');
}

const caseStudyHtml = path.resolve(rootDir, 'case-study.html');
const distCaseStudy = path.resolve(distDir, 'case-study.html');
if (fs.existsSync(caseStudyHtml)) {
  fs.copyFileSync(caseStudyHtml, distCaseStudy);
  console.log('✓ Synced case-study.html -> dist/case-study.html');
}

if (fs.existsSync(distAssets)) {
  if (fs.existsSync(targetAssets)) {
    fs.rmSync(targetAssets, { recursive: true, force: true });
  }
  fs.mkdirSync(targetAssets, { recursive: true });
  const files = fs.readdirSync(distAssets);
  for (const file of files) {
    fs.copyFileSync(path.resolve(distAssets, file), path.resolve(targetAssets, file));
  }
  console.log(`✓ Cleaned old assets and synced ${files.length} new assets from dist/assets -> assets/`);
}

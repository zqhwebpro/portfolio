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
  fs.copyFileSync(distHtml, targetHtml);
  fs.copyFileSync(distHtml, path.resolve(distDir, 'index.html'));
  console.log('✓ Synced dist/index.source.html -> index.html and dist/index.html');
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
  if (!fs.existsSync(targetAssets)) {
    fs.mkdirSync(targetAssets, { recursive: true });
  }
  const files = fs.readdirSync(distAssets);
  for (const file of files) {
    fs.copyFileSync(path.resolve(distAssets, file), path.resolve(targetAssets, file));
  }
  console.log(`✓ Synced ${files.length} assets from dist/assets -> assets/`);
}

// Renders every Webelos/**/*.html page to a print-ready PDF next to it.
// Usage (from repo root): node tools/build-pdfs.cjs [path/to/file.html ...]
// Needs Playwright + Chromium (NODE_PATH=$(npm root -g) if installed globally).
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

function findHtml(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) return findHtml(p);
    return e.name.endsWith('.html') ? [p] : [];
  });
}

(async () => {
  const root = path.resolve(__dirname, '..');
  const files = process.argv.length > 2
    ? process.argv.slice(2).map((f) => path.resolve(f))
    : findHtml(path.join(root, 'Webelos'));
  const browser = await chromium.launch();
  const page = await browser.newPage();
  for (const file of files) {
    await page.goto('file://' + file, { waitUntil: 'networkidle' });
    const out = file.replace(/\.html$/, '.pdf');
    await page.pdf({ path: out, format: 'Letter', printBackground: true, preferCSSPageSize: true });
    console.log('wrote', path.relative(root, out));
  }
  await browser.close();
})();

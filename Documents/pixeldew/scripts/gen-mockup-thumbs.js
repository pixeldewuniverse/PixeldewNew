// node scripts/gen-mockup-thumbs.js
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const OUT = path.join(__dirname, '../public/thumbnails');
const CHROME = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
const W = 1200, H = 750;

const MOCKUPS = [
  { slug: 'run-ai',               file: '/tmp/mockups/run-ai.html' },
  { slug: 'zm-web',               file: '/tmp/mockups/zm-web.html' },
  { slug: 'adsdash',              file: '/tmp/mockups/adsdash.html' },
  { slug: 'dnd-advertising-bajo', file: '/tmp/mockups/dnd.html' },
  { slug: 'cashette-ios',         file: '/tmp/mockups/cashette.html' },
];

async function main() {
  const browser = await chromium.launch({
    executablePath: CHROME,
    args: ['--no-sandbox', '--disable-dev-shm-usage', '--disable-gpu'],
  });
  const ctx = await browser.newContext({ viewport: { width: W, height: H }, ignoreHTTPSErrors: true });
  const page = await ctx.newPage();

  for (const { slug, file } of MOCKUPS) {
    try {
      console.log(`  → ${slug}`);
      await page.goto(`file://${file}`, { waitUntil: 'networkidle', timeout: 20000 });
      await page.waitForTimeout(2000);
      const dest = path.join(OUT, `${slug}.png`);
      await page.screenshot({ path: dest, clip: { x: 0, y: 0, width: W, height: H } });
      const kb = Math.round(fs.statSync(dest).size / 1024);
      console.log(`  ✓ ${slug}.png (${kb}kb)`);
    } catch (e) {
      console.log(`  ✗ ${slug}: ${e.message.split('\n')[0]}`);
    }
  }

  await browser.close();

  console.log('\n── All thumbnails ──');
  fs.readdirSync(OUT).sort().forEach(f => {
    const kb = Math.round(fs.statSync(path.join(OUT, f)).size / 1024);
    console.log(`  ${f.padEnd(38)} ${kb}kb`);
  });
}

main().catch(e => { console.error(e.message); process.exit(1); });

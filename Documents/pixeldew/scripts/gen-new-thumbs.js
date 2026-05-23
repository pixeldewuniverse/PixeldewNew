// node scripts/gen-new-thumbs.js
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const OUT = path.join(__dirname, '../public/thumbnails');
const CHROME = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
const W = 1200, H = 750;

const URLS = [
  { slug: 'lp-pixel-live',         url: 'https://lp-pixel.vercel.app/' },
  { slug: 'run-ai',                 url: 'https://run-ai-nu.vercel.app/' },
  { slug: 'zm-web',                 url: 'https://zm-web-steel.vercel.app/' },
  { slug: 'adsdash',                url: 'https://adsdash-ten.vercel.app/' },
  { slug: 'dnd-advertising-bajo',   url: 'https://dndadvertisingbajo.com/' },
];

async function shot(page, url, slug) {
  try {
    console.log(`  → ${slug} (${url})`);
    await page.goto(url, { waitUntil: 'load', timeout: 25000 });
    await page.waitForTimeout(2500);
    const dest = path.join(OUT, `${slug}.png`);
    await page.screenshot({ path: dest, clip: { x: 0, y: 0, width: W, height: H } });
    const kb = Math.round(fs.statSync(dest).size / 1024);
    console.log(`  ✓ ${slug}.png (${kb}kb)`);
  } catch (e) {
    console.log(`  ✗ ${slug}: ${e.message.split('\n')[0]}`);
  }
}

async function main() {
  const browser = await chromium.launch({
    executablePath: CHROME,
    args: ['--no-sandbox', '--disable-dev-shm-usage', '--disable-gpu'],
  });
  const ctx = await browser.newContext({ viewport: { width: W, height: H }, ignoreHTTPSErrors: true });
  const page = await ctx.newPage();

  console.log('\n── Live URL screenshots ──');
  for (const { slug, url } of URLS) await shot(page, url, slug);

  console.log('\n── Cashette iOS app (local HTML) ──');
  try {
    await page.goto(`file:///tmp/onboarding/Cashette.html`, { waitUntil: 'load', timeout: 20000 });
    await page.waitForTimeout(3000);
    await page.screenshot({ path: path.join(OUT, 'cashette-ios.png'), clip: { x: 0, y: 0, width: W, height: H } });
    const kb = Math.round(fs.statSync(path.join(OUT, 'cashette-ios.png')).size / 1024);
    console.log(`  ✓ cashette-ios.png (${kb}kb)`);
  } catch (e) {
    console.log(`  ✗ cashette-ios: ${e.message.split('\n')[0]}`);
  }

  await browser.close();

  console.log('\n── All thumbnails ──');
  fs.readdirSync(OUT).sort().forEach(f => {
    const kb = Math.round(fs.statSync(path.join(OUT, f)).size / 1024);
    console.log(`  ${f.padEnd(36)} ${kb}kb`);
  });
}

main().catch(e => { console.error(e.message); process.exit(1); });

// Run: node scripts/gen-thumbnails.js
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const OUT = path.join(__dirname, '../public/thumbnails');
fs.mkdirSync(OUT, { recursive: true });

const W = 1200, H = 750;

// ── Gripiz Kuta — cinematic dark restaurant ──────────────────────────────────
const GRIPIZ_HTML = `<!DOCTYPE html>
<html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,600&family=Inter:wght@300;400;500&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:#080808;color:#f0ece4;font-family:'Inter',sans-serif;height:750px;overflow:hidden}
nav{display:flex;justify-content:space-between;align-items:center;padding:28px 56px;position:relative;z-index:10}
.logo{font-family:'Cormorant Garamond',serif;font-size:18px;letter-spacing:.3em;text-transform:uppercase}
.nav-links{display:flex;gap:40px;font-size:11px;letter-spacing:.2em;color:rgba(240,236,228,.5)}
.nav-links span{text-transform:uppercase;cursor:pointer}
.nav-links span:hover{color:#f0ece4}
.reserve-btn{border:1px solid rgba(224,44,184,.5);padding:10px 24px;font-size:10px;letter-spacing:.2em;text-transform:uppercase;color:#e02cb8;cursor:pointer}
.hero{position:relative;height:580px;display:flex;align-items:center;justify-content:center;overflow:hidden}
.hero-bg{position:absolute;inset:0;background:radial-gradient(ellipse at 50% 60%, rgba(224,44,184,.08) 0%, transparent 60%)}
.hero-grid{position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.03) 1px,transparent 1px);background-size:60px 60px}
.hero-center{text-align:center;position:relative;z-index:2}
.eyebrow{font-size:10px;letter-spacing:.4em;text-transform:uppercase;color:rgba(224,44,184,.6);margin-bottom:32px;display:block}
.title{font-family:'Cormorant Garamond',serif;font-size:88px;font-weight:300;letter-spacing:.05em;line-height:.9;color:#f0ece4}
.title em{font-style:italic;color:rgba(240,236,228,.5)}
.sub{font-size:13px;letter-spacing:.1em;color:rgba(240,236,228,.35);margin-top:28px;text-transform:uppercase}
.cta-row{display:flex;gap:20px;justify-content:center;margin-top:48px}
.cta-main{background:#e02cb8;color:#080808;padding:14px 36px;font-size:11px;letter-spacing:.2em;text-transform:uppercase;font-weight:500}
.cta-ghost{border:1px solid rgba(240,236,228,.2);color:rgba(240,236,228,.5);padding:14px 36px;font-size:11px;letter-spacing:.2em;text-transform:uppercase}
.tag{position:absolute;top:32px;left:56px;font-size:9px;letter-spacing:.15em;color:rgba(240,236,228,.2);text-transform:uppercase}
.year{position:absolute;bottom:28px;right:56px;font-family:'Cormorant Garamond',serif;font-size:13px;color:rgba(240,236,228,.15)}
.deco{position:absolute;width:300px;height:300px;border:1px solid rgba(224,44,184,.06);border-radius:50%;top:50%;left:50%;transform:translate(-50%,-50%)}
.deco2{position:absolute;width:500px;height:500px;border:1px solid rgba(224,44,184,.04);border-radius:50%;top:50%;left:50%;transform:translate(-50%,-50%)}
</style></head><body>
<div class="tag">Bali · Indonesia</div>
<nav>
  <div class="logo">The Gripiz Kuta</div>
  <div class="nav-links">
    <span>Menu</span><span>Reserve</span><span>Story</span><span>Gallery</span>
  </div>
  <div class="reserve-btn">Reserve</div>
</nav>
<div class="hero">
  <div class="hero-bg"></div>
  <div class="hero-grid"></div>
  <div class="deco"></div>
  <div class="deco2"></div>
  <div class="hero-center">
    <span class="eyebrow">Est. 2024 · Premium Dining</span>
    <div class="title">The<br/><em>Gripiz</em><br/>Kuta</div>
    <div class="sub">Where every plate tells a story</div>
    <div class="cta-row">
      <div class="cta-main">Book a Table →</div>
      <div class="cta-ghost">Explore Menu</div>
    </div>
  </div>
  <div class="year">'24</div>
</div>
</body></html>`;

// ── Maharani Digital Hub — modern agency ────────────────────────────────────
const MAHARANI_HTML = `<!DOCTYPE html>
<html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:#06010f;color:#f0eaff;font-family:'Inter',sans-serif;height:750px;overflow:hidden}
nav{display:flex;justify-content:space-between;align-items:center;padding:24px 64px;border-bottom:1px solid rgba(14,207,223,.08)}
.logo{font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:16px;letter-spacing:-.01em;color:#0ecfdf}
.logo span{color:rgba(240,234,255,.8)}
.nav-links{display:flex;gap:32px;font-size:12px;color:rgba(240,234,255,.4)}
.btn-nav{background:rgba(14,207,223,.1);border:1px solid rgba(14,207,223,.25);color:#0ecfdf;padding:8px 20px;font-size:11px;font-weight:500;letter-spacing:.05em}
.hero{padding:64px 64px 40px;display:flex;gap:80px;align-items:center}
.hero-left{flex:1}
.badge{display:inline-flex;align-items:center;gap:8px;padding:6px 14px;background:rgba(14,207,223,.06);border:1px solid rgba(14,207,223,.15);font-size:10px;letter-spacing:.1em;color:rgba(14,207,223,.7);text-transform:uppercase;margin-bottom:28px}
.badge-dot{width:5px;height:5px;background:#0ecfdf;border-radius:50%;box-shadow:0 0 6px #0ecfdf}
.h1{font-family:'Space Grotesk',sans-serif;font-size:52px;font-weight:700;line-height:1.05;letter-spacing:-.03em;margin-bottom:20px}
.h1 em{font-style:normal;background:linear-gradient(90deg,#0ecfdf,#4a7aff);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.sub{font-size:14px;line-height:1.7;color:rgba(240,234,255,.4);max-width:380px;margin-bottom:32px}
.cta-row{display:flex;gap:12px}
.cta{background:linear-gradient(135deg,#0ecfdf,#4a7aff);color:#06010f;padding:12px 28px;font-size:12px;font-weight:700;letter-spacing:.05em}
.ghost{border:1px solid rgba(240,234,255,.12);color:rgba(240,234,255,.5);padding:12px 28px;font-size:12px}
.hero-right{display:grid;grid-template-columns:1fr 1fr;gap:10px;width:320px}
.card{padding:18px;background:rgba(255,255,255,.02);border:1px solid rgba(255,255,255,.06);border-radius:8px}
.card-icon{width:28px;height:28px;background:rgba(14,207,223,.12);border-radius:6px;display:flex;align-items:center;justify-content:center;margin-bottom:12px;font-size:13px}
.card-title{font-size:12px;font-weight:600;margin-bottom:4px}
.card-sub{font-size:10px;color:rgba(240,234,255,.3);line-height:1.5}
.card:nth-child(1){border-color:rgba(14,207,223,.15)}
.card:nth-child(3){border-color:rgba(74,122,255,.15)}
.stats{display:flex;gap:0;border-top:1px solid rgba(255,255,255,.05);margin:0 64px;padding-top:24px}
.stat{flex:1;padding:0 28px;border-right:1px solid rgba(255,255,255,.05)}
.stat:first-child{padding-left:0}
.stat:last-child{border-right:none}
.stat-n{font-family:'Space Grotesk',sans-serif;font-size:28px;font-weight:700;color:#0ecfdf}
.stat-l{font-size:10px;color:rgba(240,234,255,.3);text-transform:uppercase;letter-spacing:.1em;margin-top:2px}
</style></head><body>
<nav>
  <div class="logo">Maharani<span>.</span></div>
  <div class="nav-links"><span>Work</span><span>Services</span><span>About</span><span>Blog</span></div>
  <div class="btn-nav">Get in Touch</div>
</nav>
<div class="hero">
  <div class="hero-left">
    <div class="badge"><span class="badge-dot"></span>Digital Agency · Bali</div>
    <div class="h1">We build digital<br/>experiences that<br/><em>convert.</em></div>
    <div class="sub">From brand identity to full-stack web — we help ambitious businesses grow through design-led digital strategy.</div>
    <div class="cta-row">
      <div class="cta">Book Consultation →</div>
      <div class="ghost">View Work</div>
    </div>
  </div>
  <div class="hero-right">
    <div class="card"><div class="card-icon">✦</div><div class="card-title">Brand Identity</div><div class="card-sub">Visual language that lasts</div></div>
    <div class="card"><div class="card-icon">◈</div><div class="card-title">Web Design</div><div class="card-sub">Conversion-first interfaces</div></div>
    <div class="card"><div class="card-icon">◎</div><div class="card-title">Strategy</div><div class="card-sub">Data-driven growth plans</div></div>
    <div class="card"><div class="card-icon">⟡</div><div class="card-title">Development</div><div class="card-sub">Next.js, TypeScript, more</div></div>
  </div>
</div>
<div class="stats">
  <div class="stat"><div class="stat-n">48+</div><div class="stat-l">Projects Delivered</div></div>
  <div class="stat"><div class="stat-n">2.5×</div><div class="stat-l">Avg Conversion Lift</div></div>
  <div class="stat"><div class="stat-n">3</div><div class="stat-l">Enterprise Clients</div></div>
  <div class="stat"><div class="stat-n">100%</div><div class="stat-l">On-time Delivery</div></div>
</div>
</body></html>`;

// ── Dewata Home Living — premium property platform ──────────────────────────
const DEWATA_HTML = `<!DOCTYPE html>
<html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:#07091a;color:#f0eaff;font-family:'Inter',sans-serif;height:750px;overflow:hidden}
nav{display:flex;justify-content:space-between;align-items:center;padding:22px 56px;border-bottom:1px solid rgba(74,122,255,.08)}
.logo{font-family:'Plus Jakarta Sans',sans-serif;font-weight:700;font-size:17px;letter-spacing:-.02em}
.logo span{color:#4a7aff}
.nav-links{display:flex;gap:28px;font-size:12px;color:rgba(240,234,255,.4)}
.nav-right{display:flex;gap:12px;align-items:center}
.login{font-size:12px;color:rgba(240,234,255,.5)}
.list-btn{background:#4a7aff;color:white;padding:8px 20px;font-size:11px;font-weight:600}
.search-bar{display:flex;gap:0;margin:28px 56px;background:rgba(255,255,255,.04);border:1px solid rgba(74,122,255,.15);border-radius:8px;overflow:hidden;align-items:center}
.search-field{display:flex;flex:1;align-items:center;gap:12px;padding:14px 20px;border-right:1px solid rgba(255,255,255,.06)}
.search-label{font-size:10px;color:rgba(240,234,255,.3);text-transform:uppercase;letter-spacing:.1em;display:block;margin-bottom:3px}
.search-val{font-size:13px;font-weight:500;color:rgba(240,234,255,.8)}
.search-btn{background:#4a7aff;padding:14px 28px;font-size:12px;font-weight:600;white-space:nowrap;color:white}
.filters{display:flex;gap:8px;padding:0 56px 20px;align-items:center}
.filter-label{font-size:10px;color:rgba(240,234,255,.3);text-transform:uppercase;letter-spacing:.1em;margin-right:8px}
.pill{padding:6px 16px;border-radius:20px;font-size:11px;font-weight:500;cursor:pointer}
.pill.active{background:rgba(74,122,255,.2);border:1px solid rgba(74,122,255,.4);color:#4a7aff}
.pill.inactive{background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);color:rgba(240,234,255,.4)}
.count{font-size:11px;color:rgba(240,234,255,.3);margin-left:auto}
.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;padding:0 56px}
.prop{background:rgba(255,255,255,.025);border:1px solid rgba(74,122,255,.1);border-radius:10px;overflow:hidden}
.prop-img{height:140px;position:relative;overflow:hidden}
.prop-img-bg{position:absolute;inset:0;background:linear-gradient(135deg,rgba(74,122,255,.12) 0%,rgba(14,207,223,.06) 100%)}
.prop-tag{position:absolute;top:10px;left:10px;background:rgba(74,122,255,.85);color:white;font-size:9px;font-weight:600;padding:3px 8px;border-radius:4px;letter-spacing:.05em}
.prop-fav{position:absolute;top:10px;right:10px;width:26px;height:26px;background:rgba(0,0,0,.4);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px}
.prop-grid-el{position:absolute;inset:0;display:grid;grid-template-columns:1fr 1fr;grid-template-rows:1fr 1fr;gap:1px;opacity:.2}
.prop-grid-el div{background:rgba(74,122,255,.3);border-radius:2px}
.prop-body{padding:14px}
.prop-price{font-family:'Plus Jakarta Sans',sans-serif;font-size:18px;font-weight:700;color:#4a7aff;margin-bottom:4px}
.prop-price span{font-size:11px;font-weight:400;color:rgba(240,234,255,.3)}
.prop-name{font-size:12px;font-weight:600;margin-bottom:4px;color:rgba(240,234,255,.85)}
.prop-loc{font-size:10px;color:rgba(240,234,255,.35);margin-bottom:10px}
.prop-specs{display:flex;gap:12px;font-size:10px;color:rgba(240,234,255,.3)}
.spec{display:flex;gap:4px;align-items:center}
</style></head><body>
<nav>
  <div class="logo">Dewata<span>.</span>Home</div>
  <div class="nav-links"><span>Buy</span><span>Rent</span><span>New Projects</span><span>Agents</span></div>
  <div class="nav-right"><span class="login">Sign In</span><div class="list-btn">List Property</div></div>
</nav>
<div class="search-bar">
  <div class="search-field"><span class="search-label">Location</span><span class="search-val">Seminyak, Bali</span></div>
  <div class="search-field"><span class="search-label">Type</span><span class="search-val">Villa</span></div>
  <div class="search-field"><span class="search-label">Budget</span><span class="search-val">Rp 5M – 25M / mo</span></div>
  <div class="search-btn">Search →</div>
</div>
<div class="filters">
  <span class="filter-label">Filter:</span>
  <div class="pill active">All</div>
  <div class="pill inactive">Villa</div>
  <div class="pill inactive">Apartment</div>
  <div class="pill inactive">Land</div>
  <div class="pill inactive">Commercial</div>
  <div class="count">120+ listings</div>
</div>
<div class="grid">
  <div class="prop">
    <div class="prop-img">
      <div class="prop-img-bg"></div>
      <div class="prop-grid-el"><div></div><div></div><div></div><div></div></div>
      <div class="prop-tag">VILLA</div><div class="prop-fav">♡</div>
    </div>
    <div class="prop-body">
      <div class="prop-price">Rp 18.5M <span>/ month</span></div>
      <div class="prop-name">Villa Serenity Seminyak</div>
      <div class="prop-loc">📍 Seminyak, Badung</div>
      <div class="prop-specs"><span class="spec">🛏 4 BR</span><span class="spec">🚿 4 BA</span><span class="spec">📐 480 m²</span></div>
    </div>
  </div>
  <div class="prop" style="border-color:rgba(74,122,255,.2)">
    <div class="prop-img" style="background:rgba(74,122,255,.08)">
      <div class="prop-img-bg" style="background:linear-gradient(135deg,rgba(74,122,255,.2) 0%,rgba(14,207,223,.1) 100%)"></div>
      <div class="prop-grid-el"><div></div><div></div><div></div><div></div></div>
      <div class="prop-tag" style="background:rgba(29,221,120,.85)">FEATURED</div><div class="prop-fav">♥</div>
    </div>
    <div class="prop-body">
      <div class="prop-price" style="color:#1ddd78">Rp 9.8M <span>/ month</span></div>
      <div class="prop-name">Canggu Modern House</div>
      <div class="prop-loc">📍 Canggu, Badung</div>
      <div class="prop-specs"><span class="spec">🛏 3 BR</span><span class="spec">🚿 2 BA</span><span class="spec">📐 280 m²</span></div>
    </div>
  </div>
  <div class="prop">
    <div class="prop-img">
      <div class="prop-img-bg" style="background:linear-gradient(135deg,rgba(14,207,223,.1) 0%,rgba(74,122,255,.08) 100%)"></div>
      <div class="prop-grid-el"><div></div><div></div><div></div><div></div></div>
      <div class="prop-tag" style="background:rgba(224,44,184,.8)">NEW</div><div class="prop-fav">♡</div>
    </div>
    <div class="prop-body">
      <div class="prop-price">Rp 24M <span>/ month</span></div>
      <div class="prop-name">Uluwatu Cliff Villa</div>
      <div class="prop-loc">📍 Uluwatu, Badung</div>
      <div class="prop-specs"><span class="spec">🛏 5 BR</span><span class="spec">🚿 5 BA</span><span class="spec">📐 620 m²</span></div>
    </div>
  </div>
</div>
</body></html>`;

async function main() {
  console.log('Launching browser...');
  const CHROME = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
  const browser = await chromium.launch({
    executablePath: CHROME,
    args: ['--no-sandbox', '--disable-dev-shm-usage', '--disable-gpu'],
  });
  const ctx = await browser.newContext({
    viewport: { width: W, height: H },
    ignoreHTTPSErrors: true,
  });
  const page = await ctx.newPage();

  // 1. Kadobajo.id — live site
  try {
    console.log('Screenshotting kadobajo.id...');
    await page.goto('https://kadobajo.id', { waitUntil: 'load', timeout: 20000 });
    await page.waitForTimeout(2000);
    await page.screenshot({ path: `${OUT}/kadobajo.png`, clip: { x: 0, y: 0, width: W, height: H } });
    console.log('  ✓ kadobajo.png');
  } catch (e) {
    console.log('  ✗ kadobajo skipped:', e.message);
  }

  // helper: write temp HTML, navigate to it, screenshot
  async function renderHtml(html, outFile, label) {
    console.log(`Rendering ${label}...`);
    const tmp = `/tmp/${outFile}.html`;
    fs.writeFileSync(tmp, html);
    await page.goto(`file://${tmp}`, { waitUntil: 'load', timeout: 20000 });
    await page.waitForTimeout(2000);
    await page.screenshot({ path: `${OUT}/${outFile}`, clip: { x: 0, y: 0, width: W, height: H } });
    console.log(`  ✓ ${outFile}`);
  }

  // 2. Gripiz Kuta — mockup
  await renderHtml(GRIPIZ_HTML, 'gripiz-kuta.png', 'Gripiz Kuta');

  // 3. Maharani Digital Hub — mockup
  await renderHtml(MAHARANI_HTML, 'maharani-digital-hub.png', 'Maharani Digital Hub');

  // 4. Dewata Home Living — mockup
  await renderHtml(DEWATA_HTML, 'dewata-home-living.png', 'Dewata Home Living');

  // 5. LP Pixel — Bento Dashboard HTML file
  console.log('Screenshotting LP Pixel Bento Dashboard...');
  try {
    await page.goto(`file:///tmp/tryapp/Bento%20Dashboard.html`, { waitUntil: 'load', timeout: 15000 });
    await page.waitForTimeout(2000);
    await page.screenshot({ path: `${OUT}/lp-pixel.png`, clip: { x: 0, y: 0, width: W, height: H } });
    console.log('  ✓ lp-pixel.png');
  } catch (e) {
    console.log('  ✗ lp-pixel skipped:', e.message);
  }

  await browser.close();
  console.log('\nDone! Files saved to public/thumbnails/');
  const files = fs.readdirSync(OUT);
  files.forEach(f => {
    const size = fs.statSync(`${OUT}/${f}`).size;
    console.log(`  ${f}  (${Math.round(size/1024)}kb)`);
  });
}

main().catch(e => { console.error(e); process.exit(1); });

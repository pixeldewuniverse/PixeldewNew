const {chromium} = require('playwright');
const fs = require('fs');
const path = require('path');

const HTML = `<!DOCTYPE html>
<html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:#07100d;color:#f0faf5;font-family:'Inter',sans-serif;height:750px;overflow:hidden}
.wrap{display:flex;height:100vh}
.sidebar{width:200px;background:rgba(255,255,255,.02);border-right:1px solid rgba(29,221,120,.08);flex-shrink:0;padding:16px 0}
.logo{padding:0 20px 16px;font-weight:700;font-size:15px;letter-spacing:-.02em;border-bottom:1px solid rgba(29,221,120,.08);margin-bottom:16px}
.logo span{color:#1ddd78}
.nav-item{display:flex;align-items:center;gap:10px;padding:9px 20px;font-size:12px;color:rgba(240,250,245,.4)}
.nav-item.active{color:#f0faf5;background:rgba(29,221,120,.07);border-right:2px solid #1ddd78}
.dot{width:7px;height:7px;border-radius:50%;background:rgba(29,221,120,.3)}
.active .dot{background:#1ddd78;box-shadow:0 0 6px #1ddd78}
.main{flex:1;overflow:hidden;display:flex;flex-direction:column}
.topbar{display:flex;align-items:center;justify-content:space-between;padding:14px 28px;border-bottom:1px solid rgba(29,221,120,.08)}
.page-title{font-size:16px;font-weight:600}
.btn-add{background:#1ddd78;color:#07100d;padding:7px 16px;font-size:11px;font-weight:700;border-radius:4px}
.avatar{width:30px;height:30px;border-radius:50%;background:#1ddd78;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;color:#07100d}
.kpi-row{display:flex;gap:12px;padding:20px 28px 16px}
.kpi{flex:1;background:rgba(255,255,255,.025);border:1px solid rgba(29,221,120,.1);border-radius:8px;padding:14px 16px}
.kpi-label{font-size:9px;letter-spacing:.1em;text-transform:uppercase;color:rgba(240,250,245,.3);margin-bottom:8px}
.kpi-val{font-size:22px;font-weight:700;letter-spacing:-.02em;margin-bottom:2px}
.kpi-delta{font-size:10px;color:#1ddd78}
.pl-title{padding:0 28px 10px;font-size:11px;font-weight:600;letter-spacing:.05em;text-transform:uppercase;color:rgba(240,250,245,.4)}
.pipeline{display:flex;gap:10px;padding:0 28px 20px;flex:1;overflow:hidden}
.col{flex:1;background:rgba(255,255,255,.02);border:1px solid rgba(255,255,255,.06);border-radius:8px;padding:10px;display:flex;flex-direction:column;gap:7px}
.col-head{display:flex;justify-content:space-between;align-items:center;margin-bottom:4px}
.col-name{font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:.1em;color:rgba(240,250,245,.4)}
.col-count{font-size:10px;background:rgba(255,255,255,.06);padding:2px 7px;border-radius:10px;color:rgba(240,250,245,.4)}
.card{background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.07);border-radius:6px;padding:10px}
.card.hot{border-color:rgba(29,221,120,.2);background:rgba(29,221,120,.04)}
.card.won{border-color:rgba(29,221,120,.15)}
.card-name{font-size:11px;font-weight:600;margin-bottom:3px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.card-sub{font-size:9px;color:rgba(240,250,245,.35);margin-bottom:7px}
.cv{font-size:11px;font-weight:700;color:#1ddd78}
.tag{display:inline-block;padding:2px 7px;border-radius:3px;font-size:8px;font-weight:600;background:rgba(29,221,120,.12);color:#1ddd78;margin-top:6px}
.warn{background:rgba(245,158,11,.1);color:#f59e0b}
</style></head><body>
<div class="wrap">
  <div class="sidebar">
    <div class="logo">Kado<span>bajo</span></div>
    <div class="nav-item active"><span class="dot"></span>Dashboard</div>
    <div class="nav-item"><span class="dot"></span>Contacts</div>
    <div class="nav-item"><span class="dot"></span>Pipeline</div>
    <div class="nav-item"><span class="dot"></span>Activities</div>
    <div class="nav-item"><span class="dot"></span>Reports</div>
    <div class="nav-item"><span class="dot"></span>Settings</div>
  </div>
  <div class="main">
    <div class="topbar">
      <div class="page-title">Dashboard</div>
      <div style="display:flex;gap:10px;align-items:center"><div class="btn-add">+ New Deal</div><div class="avatar">RA</div></div>
    </div>
    <div class="kpi-row">
      <div class="kpi"><div class="kpi-label">Pipeline Value</div><div class="kpi-val">Rp 2.4M</div><div class="kpi-delta">▲ 23% this month</div></div>
      <div class="kpi"><div class="kpi-label">Active Deals</div><div class="kpi-val" style="color:#0ecfdf">48</div><div class="kpi-delta" style="color:#0ecfdf">▲ 12 new</div></div>
      <div class="kpi"><div class="kpi-label">Win Rate</div><div class="kpi-val" style="color:#e02cb8">84%</div><div class="kpi-delta" style="color:#e02cb8">▲ 6pp</div></div>
      <div class="kpi"><div class="kpi-label">Avg Close Time</div><div class="kpi-val" style="color:#f59e0b">12d</div><div class="kpi-delta" style="color:rgba(240,250,245,.3)">— 3 days faster</div></div>
    </div>
    <div class="pl-title">Sales Pipeline</div>
    <div class="pipeline">
      <div class="col">
        <div class="col-head"><span class="col-name">Lead</span><span class="col-count">8</span></div>
        <div class="card"><div class="card-name">Hanami Coffee</div><div class="card-sub">Brand Redesign</div><div class="cv">Rp 120K</div></div>
        <div class="card"><div class="card-name">Nusa Boutique</div><div class="card-sub">E-commerce</div><div class="cv">Rp 85K</div></div>
        <div class="card"><div class="card-name">Serene Spa</div><div class="card-sub">Web + Booking</div><div class="cv">Rp 65K</div></div>
      </div>
      <div class="col">
        <div class="col-head"><span class="col-name">Qualified</span><span class="col-count">5</span></div>
        <div class="card hot"><div class="card-name">Bali Reef Dive</div><div class="card-sub">Platform MVP</div><div class="cv">Rp 340K</div><div class="tag">Hot</div></div>
        <div class="card"><div class="card-name">Luna Ceramics</div><div class="card-sub">Brand Kit</div><div class="cv">Rp 95K</div></div>
      </div>
      <div class="col">
        <div class="col-head"><span class="col-name">Proposal</span><span class="col-count">4</span></div>
        <div class="card hot"><div class="card-name">Dewata Resort</div><div class="card-sub">Full Digital</div><div class="cv">Rp 780K</div><div class="tag">Follow up</div></div>
        <div class="card"><div class="card-name">Sukha Wellness</div><div class="card-sub">App + Web</div><div class="cv">Rp 220K</div><div class="tag warn">Due today</div></div>
      </div>
      <div class="col">
        <div class="col-head"><span class="col-name">Won</span><span class="col-count">12</span></div>
        <div class="card won"><div class="card-name">Kopi Kenangan</div><div class="card-sub">Branding</div><div class="cv">Rp 155K ✓</div></div>
        <div class="card won"><div class="card-name">Gridly SaaS</div><div class="card-sub">Dashboard</div><div class="cv">Rp 480K ✓</div></div>
      </div>
    </div>
  </div>
</div>
</body></html>`;

(async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--no-sandbox','--disable-dev-shm-usage','--disable-gpu'] });
  const ctx = await b.newContext({ viewport: { width: 1200, height: 750 } });
  const page = await ctx.newPage();
  const tmp = path.join(__dirname, 'kado-tmp.html');
  fs.writeFileSync(tmp, HTML);
  await page.goto('file://' + tmp, { waitUntil: 'load', timeout: 15000 });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: path.join(__dirname, '../public/thumbnails/kadobajo.png'), clip: { x:0,y:0,width:1200,height:750 } });
  await b.close();
  fs.unlinkSync(tmp);
  console.log('done');
})().catch(e => { console.error(e.message); process.exit(1); });

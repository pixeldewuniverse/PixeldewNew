import { chromium } from '/home/user/PixeldewNew/node_modules/playwright/index.mjs';
import fs from 'fs';
import path from 'path';

const OUT_DIR = '/home/user/PixeldewNew/Documents/pixeldew/public/thumbnails';
const CHROME = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';

const projects = [
  {
    slug: 'run-ai',
    html: `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box;}
body{width:1200px;height:750px;background:#08010f;font-family:'Inter',sans-serif;overflow:hidden;color:#fff;}
nav{display:flex;align-items:center;justify-content:space-between;padding:18px 48px;border-bottom:1px solid rgba(139,92,246,0.15);}
.logo{font-size:22px;font-weight:800;color:#8b5cf6;letter-spacing:-0.5px;}
.nav-links{display:flex;gap:28px;}
.nav-links a{color:rgba(255,255,255,0.65);font-size:14px;font-weight:500;text-decoration:none;}
.nav-cta{background:#8b5cf6;color:#fff;padding:8px 20px;border-radius:8px;font-size:14px;font-weight:600;border:none;cursor:pointer;}
.hero{display:flex;align-items:center;justify-content:space-between;padding:52px 48px 0;}
.hero-left{flex:1;max-width:520px;}
.badge{display:inline-flex;align-items:center;gap:6px;background:rgba(139,92,246,0.12);border:1px solid rgba(139,92,246,0.35);color:#c4b5fd;padding:5px 14px;border-radius:100px;font-size:12px;font-weight:600;letter-spacing:0.5px;margin-bottom:22px;}
.badge::before{content:'✦';color:#8b5cf6;}
h1{font-size:56px;font-weight:900;line-height:1.05;color:#fff;margin-bottom:18px;letter-spacing:-2px;}
h1 span{color:#8b5cf6;}
.sub{font-size:16px;color:rgba(255,255,255,0.55);line-height:1.6;margin-bottom:32px;max-width:440px;}
.btns{display:flex;gap:12px;}
.btn-primary{background:#8b5cf6;color:#fff;padding:12px 24px;border-radius:10px;font-size:15px;font-weight:700;border:none;cursor:pointer;}
.btn-ghost{background:transparent;color:rgba(255,255,255,0.7);padding:12px 24px;border-radius:10px;font-size:15px;font-weight:600;border:1px solid rgba(255,255,255,0.2);cursor:pointer;}
.hero-right{flex:0 0 440px;}
.editor-card{background:#130a24;border:1.5px solid rgba(139,92,246,0.5);border-radius:14px;padding:0;overflow:hidden;box-shadow:0 0 40px rgba(139,92,246,0.15);}
.editor-topbar{background:#1a0f30;padding:10px 14px;display:flex;align-items:center;gap:8px;border-bottom:1px solid rgba(139,92,246,0.2);}
.dot{width:10px;height:10px;border-radius:50%;}
.dot-r{background:#ff5f56;}
.dot-y{background:#ffbd2e;}
.dot-g{background:#27c93f;}
.editor-body{display:flex;}
.editor-main{flex:1;padding:16px 18px;font-family:'Courier New',monospace;font-size:12.5px;color:rgba(255,255,255,0.75);line-height:1.7;}
.editor-main .line{margin-bottom:2px;}
.cursor{display:inline-block;width:2px;height:14px;background:#8b5cf6;vertical-align:middle;animation:blink 1s infinite;}
@keyframes blink{0%,100%{opacity:1;}50%{opacity:0;}}
.editor-sidebar{width:120px;background:#0f0720;border-left:1px solid rgba(139,92,246,0.2);padding:12px 10px;display:flex;flex-direction:column;gap:8px;}
.sidebar-btn{background:rgba(139,92,246,0.15);border:1px solid rgba(139,92,246,0.3);color:#c4b5fd;padding:7px 10px;border-radius:7px;font-size:11px;font-weight:600;text-align:center;cursor:pointer;}
.stats{display:flex;align-items:center;justify-content:center;gap:0;background:rgba(139,92,246,0.06);border-top:1px solid rgba(139,92,246,0.15);padding:14px 48px;position:absolute;bottom:0;left:0;right:0;}
.stat-item{flex:1;text-align:center;color:rgba(255,255,255,0.45);font-size:13px;font-weight:500;}
.stat-item strong{color:rgba(255,255,255,0.8);font-weight:700;}
.stat-sep{color:rgba(139,92,246,0.3);font-size:18px;margin:0 4px;}
</style>
</head>
<body>
<nav>
  <div class="logo">RunAI</div>
  <div class="nav-links">
    <a href="#">Features</a>
    <a href="#">Pricing</a>
    <a href="#">Docs</a>
  </div>
  <button class="nav-cta">Start Free</button>
</nav>
<div class="hero">
  <div class="hero-left">
    <div class="badge">AI-Powered Writing</div>
    <h1>Write better.<br><span>10× faster.</span></h1>
    <p class="sub">From blog posts to ad copy — generate, edit, and publish in minutes.</p>
    <div class="btns">
      <button class="btn-primary">Generate Now →</button>
      <button class="btn-ghost">See Examples</button>
    </div>
  </div>
  <div class="hero-right">
    <div class="editor-card">
      <div class="editor-topbar">
        <div class="dot dot-r"></div>
        <div class="dot dot-y"></div>
        <div class="dot dot-g"></div>
        <span style="margin-left:8px;color:rgba(255,255,255,0.35);font-size:11px;">blog-post.ai</span>
      </div>
      <div class="editor-body">
        <div class="editor-main">
          <div class="line"><span style="color:#8b5cf6"># Introduction</span></div>
          <div class="line">&nbsp;</div>
          <div class="line">Artificial intelligence is no longer</div>
          <div class="line">a concept of the future — it's the</div>
          <div class="line">engine powering today's most</div>
          <div class="line">successful content strategies.</div>
          <div class="line">&nbsp;</div>
          <div class="line">Brands that embrace AI writing</div>
          <div class="line">tools are publishing 3× more<span class="cursor"></span></div>
        </div>
        <div class="editor-sidebar">
          <div class="sidebar-btn">Improve ✦</div>
          <div class="sidebar-btn">Shorten</div>
          <div class="sidebar-btn">Translate</div>
          <div style="margin-top:8px;color:rgba(255,255,255,0.25);font-size:10px;text-align:center;">AI Tools</div>
        </div>
      </div>
    </div>
  </div>
</div>
<div class="stats">
  <div class="stat-item"><strong>50K+</strong> users</div>
  <div class="stat-sep">·</div>
  <div class="stat-item"><strong>120+</strong> templates</div>
  <div class="stat-sep">·</div>
  <div class="stat-item"><strong>12</strong> languages</div>
  <div class="stat-sep">·</div>
  <div class="stat-item"><strong>99.9%</strong> uptime</div>
</div>
</body>
</html>`
  },
  {
    slug: 'zm-web',
    html: `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box;}
body{width:1200px;height:750px;background:#060b18;font-family:'Inter',sans-serif;overflow:hidden;color:#fff;}
nav{display:flex;align-items:center;justify-content:space-between;padding:18px 48px;border-bottom:1px solid rgba(59,130,246,0.12);}
.logo{font-size:22px;font-weight:900;color:#3b82f6;letter-spacing:-1px;}
.nav-links{display:flex;gap:28px;}
.nav-links a{color:rgba(255,255,255,0.6);font-size:14px;font-weight:500;text-decoration:none;}
.nav-cta{background:#3b82f6;color:#fff;padding:8px 20px;border-radius:8px;font-size:14px;font-weight:600;border:none;cursor:pointer;}
.hero{padding:44px 48px 0;text-align:center;}
.badge{display:inline-flex;align-items:center;gap:6px;background:rgba(59,130,246,0.1);border:1px solid rgba(59,130,246,0.3);color:#93c5fd;padding:5px 16px;border-radius:100px;font-size:12px;font-weight:600;letter-spacing:0.4px;margin-bottom:18px;}
h1{font-size:48px;font-weight:900;line-height:1.1;color:#fff;margin-bottom:14px;letter-spacing:-1.5px;}
h1 span{color:#3b82f6;}
.sub{font-size:15px;color:rgba(255,255,255,0.5);line-height:1.6;max-width:520px;margin:0 auto 32px;}
.cards{display:flex;gap:20px;padding:0 48px;justify-content:center;}
.card{background:#0d1829;border:1px solid rgba(59,130,246,0.18);border-radius:14px;overflow:hidden;width:300px;flex-shrink:0;}
.card-img{height:160px;display:flex;align-items:center;justify-content:center;font-size:28px;}
.card-img-1{background:linear-gradient(135deg,#1e3a5f,#0f2040);}
.card-img-2{background:linear-gradient(135deg,#1a3a2a,#0d2518);}
.card-img-3{background:linear-gradient(135deg,#3a1e2a,#200d18);}
.card-body{padding:14px 16px;}
.card-name{font-size:14px;font-weight:700;color:#fff;margin-bottom:4px;}
.card-price{font-size:13px;color:#93c5fd;margin-bottom:12px;}
.card-btn{background:#3b82f6;color:#fff;padding:8px 0;border-radius:8px;font-size:13px;font-weight:600;border:none;cursor:pointer;width:100%;}
.metrics{display:flex;gap:0;background:rgba(59,130,246,0.06);border-top:1px solid rgba(59,130,246,0.12);position:absolute;bottom:0;left:0;right:0;}
.metric{flex:1;padding:14px;text-align:center;border-right:1px solid rgba(59,130,246,0.1);}
.metric:last-child{border-right:none;}
.metric-val{font-size:20px;font-weight:800;color:#fff;margin-bottom:2px;}
.metric-val span{color:#3b82f6;}
.metric-label{font-size:11px;color:rgba(255,255,255,0.4);font-weight:500;text-transform:uppercase;letter-spacing:0.5px;}
</style>
</head>
<body>
<nav>
  <div class="logo">ZM</div>
  <div class="nav-links">
    <a href="#">Shop</a>
    <a href="#">Dashboard</a>
    <a href="#">Pricing</a>
  </div>
  <button class="nav-cta">Launch Store</button>
</nav>
<div class="hero">
  <div class="badge">E-commerce + SaaS in one</div>
  <h1>Sell products.<br><span>Build subscriptions.</span></h1>
  <p class="sub">All your commerce tools in one platform — from first sale to recurring revenue.</p>
</div>
<div class="cards">
  <div class="card">
    <div class="card-img card-img-1">👟</div>
    <div class="card-body">
      <div class="card-name">Premium Sneakers</div>
      <div class="card-price">Rp 459.000</div>
      <button class="card-btn">Add to Cart</button>
    </div>
  </div>
  <div class="card">
    <div class="card-img card-img-2">🎒</div>
    <div class="card-body">
      <div class="card-name">Canvas Backpack</div>
      <div class="card-price">Rp 289.000</div>
      <button class="card-btn">Add to Cart</button>
    </div>
  </div>
  <div class="card">
    <div class="card-img card-img-3">⌚</div>
    <div class="card-body">
      <div class="card-name">Smart Watch Pro</div>
      <div class="card-price">Rp 1.299.000</div>
      <button class="card-btn">Add to Cart</button>
    </div>
  </div>
</div>
<div class="metrics">
  <div class="metric"><div class="metric-val">Rp <span>284M</span></div><div class="metric-label">GMV</div></div>
  <div class="metric"><div class="metric-val"><span>1,240</span></div><div class="metric-label">Orders</div></div>
  <div class="metric"><div class="metric-val"><span>340</span></div><div class="metric-label">Subscribers</div></div>
  <div class="metric"><div class="metric-val"><span>2.1%</span></div><div class="metric-label">Churn</div></div>
</div>
</body>
</html>`
  },
  {
    slug: 'adsdash',
    html: `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box;}
body{width:1200px;height:750px;background:#07050e;font-family:'Inter',sans-serif;overflow:hidden;color:#fff;}
nav{display:flex;align-items:center;justify-content:space-between;padding:14px 36px;border-bottom:1px solid rgba(249,115,22,0.12);}
.logo{font-size:20px;font-weight:800;color:#f97316;letter-spacing:-0.5px;}
.nav-center{display:flex;align-items:center;gap:16px;}
.platform-badge{display:flex;align-items:center;justify-content:center;width:28px;height:28px;border-radius:50%;font-size:13px;font-weight:700;}
.fb-badge{background:#1877f2;color:#fff;}
.gg-badge{background:#fff;color:#4285f4;}
.date-picker{background:rgba(249,115,22,0.08);border:1px solid rgba(249,115,22,0.25);color:rgba(255,255,255,0.7);padding:5px 14px;border-radius:8px;font-size:13px;}
.avatar{width:32px;height:32px;border-radius:50%;background:linear-gradient(135deg,#f97316,#ef4444);}
.kpi-row{display:flex;gap:16px;padding:18px 36px;}
.kpi{flex:1;background:#110d1a;border:1px solid rgba(249,115,22,0.15);border-radius:12px;padding:16px 18px;}
.kpi-label{font-size:11px;color:rgba(255,255,255,0.4);font-weight:600;text-transform:uppercase;letter-spacing:0.6px;margin-bottom:6px;}
.kpi-val{font-size:26px;font-weight:800;color:#fff;margin-bottom:4px;}
.kpi-delta{font-size:12px;font-weight:600;}
.up{color:#22c55e;}
.down{color:#f97316;}
.main{display:flex;gap:16px;padding:0 36px;}
.chart-area{flex:1;background:#110d1a;border:1px solid rgba(249,115,22,0.12);border-radius:12px;padding:16px;}
.chart-title{font-size:13px;font-weight:700;color:rgba(255,255,255,0.8);margin-bottom:14px;}
.bars{display:flex;align-items:flex-end;gap:10px;height:100px;padding-bottom:4px;}
.bar-group{display:flex;flex-direction:column;align-items:center;gap:4px;flex:1;}
.bar{width:100%;border-radius:4px 4px 0 0;}
.bar-label{font-size:10px;color:rgba(255,255,255,0.35);}
.table-area{width:340px;background:#110d1a;border:1px solid rgba(249,115,22,0.12);border-radius:12px;padding:16px;}
.table-title{font-size:13px;font-weight:700;color:rgba(255,255,255,0.8);margin-bottom:12px;}
.table-row{display:flex;align-items:center;gap:10px;padding:9px 0;border-bottom:1px solid rgba(255,255,255,0.05);}
.table-row:last-child{border-bottom:none;}
.status-dot{width:8px;height:8px;border-radius:50%;flex-shrink:0;}
.active-dot{background:#22c55e;}
.paused-dot{background:#6b7280;}
.campaign-name{font-size:13px;font-weight:600;color:#fff;flex:1;}
.campaign-meta{font-size:11px;color:rgba(255,255,255,0.4);}
.campaign-roas{font-size:13px;font-weight:700;color:#f97316;}
.plat-icon{font-size:11px;background:rgba(255,255,255,0.07);border-radius:4px;padding:2px 5px;color:rgba(255,255,255,0.4);}
</style>
</head>
<body>
<nav>
  <div class="logo">AdsDash</div>
  <div class="nav-center">
    <div class="platform-badge fb-badge">f</div>
    <div class="platform-badge gg-badge">G</div>
    <div class="date-picker">📅 May 2025</div>
  </div>
  <div class="avatar"></div>
</nav>
<div class="kpi-row">
  <div class="kpi">
    <div class="kpi-label">Total Spend</div>
    <div class="kpi-val">Rp 42M</div>
    <div class="kpi-delta up">▲ 18% vs prev</div>
  </div>
  <div class="kpi">
    <div class="kpi-label">ROAS</div>
    <div class="kpi-val">3.8×</div>
    <div class="kpi-delta up">▲ 0.4 vs prev</div>
  </div>
  <div class="kpi">
    <div class="kpi-label">CTR</div>
    <div class="kpi-val">2.4%</div>
    <div class="kpi-delta up">▲ 0.3pp</div>
  </div>
  <div class="kpi">
    <div class="kpi-label">CPC</div>
    <div class="kpi-val">Rp 1,240</div>
    <div class="kpi-delta down">▼ 12% vs prev</div>
  </div>
</div>
<div class="main">
  <div class="chart-area">
    <div class="chart-title">Weekly Spend & ROAS — W18 to W21</div>
    <div class="bars">
      <div class="bar-group">
        <div class="bar" style="height:55px;background:#f97316;"></div>
        <div class="bar-label">W18</div>
      </div>
      <div class="bar-group">
        <div class="bar" style="height:40px;background:rgba(249,115,22,0.35);"></div>
        <div class="bar-label">W18</div>
      </div>
      <div class="bar-group">
        <div class="bar" style="height:70px;background:#f97316;"></div>
        <div class="bar-label">W19</div>
      </div>
      <div class="bar-group">
        <div class="bar" style="height:52px;background:rgba(249,115,22,0.35);"></div>
        <div class="bar-label">W19</div>
      </div>
      <div class="bar-group">
        <div class="bar" style="height:85px;background:#f97316;"></div>
        <div class="bar-label">W20</div>
      </div>
      <div class="bar-group">
        <div class="bar" style="height:65px;background:rgba(249,115,22,0.35);"></div>
        <div class="bar-label">W20</div>
      </div>
      <div class="bar-group">
        <div class="bar" style="height:100px;background:#f97316;"></div>
        <div class="bar-label">W21</div>
      </div>
      <div class="bar-group">
        <div class="bar" style="height:78px;background:rgba(249,115,22,0.35);"></div>
        <div class="bar-label">W21</div>
      </div>
    </div>
    <div style="display:flex;gap:16px;margin-top:10px;">
      <div style="display:flex;align-items:center;gap:6px;font-size:11px;color:rgba(255,255,255,0.45);">
        <div style="width:10px;height:10px;background:#f97316;border-radius:2px;"></div>Spend
      </div>
      <div style="display:flex;align-items:center;gap:6px;font-size:11px;color:rgba(255,255,255,0.45);">
        <div style="width:10px;height:10px;background:rgba(249,115,22,0.35);border-radius:2px;"></div>ROAS
      </div>
    </div>
  </div>
  <div class="table-area">
    <div class="table-title">Campaigns</div>
    <div class="table-row">
      <div class="status-dot active-dot"></div>
      <div>
        <div class="campaign-name">Ramadan Sale</div>
        <div class="campaign-meta">Reach 142K · <span class="plat-icon">f</span></div>
      </div>
      <div class="campaign-roas">4.2×</div>
    </div>
    <div class="table-row">
      <div class="status-dot active-dot"></div>
      <div>
        <div class="campaign-name">Retargeting</div>
        <div class="campaign-meta">Reach 38K · <span class="plat-icon">G</span></div>
      </div>
      <div class="campaign-roas">5.8×</div>
    </div>
    <div class="table-row">
      <div class="status-dot paused-dot"></div>
      <div>
        <div class="campaign-name">Lookalike</div>
        <div class="campaign-meta">Reach 94K · <span class="plat-icon">f</span></div>
      </div>
      <div class="campaign-roas" style="color:#6b7280;">2.1×</div>
    </div>
  </div>
</div>
</body>
</html>`
  },
  {
    slug: 'dnd-advertising-bajo',
    html: `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Playfair+Display:wght@700;800;900&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box;}
body{width:1200px;height:750px;background:#05100e;font-family:'Inter',sans-serif;overflow:hidden;color:#fff;}
nav{display:flex;align-items:center;justify-content:space-between;padding:18px 48px;border-bottom:1px solid rgba(20,184,166,0.12);}
.logo{font-size:18px;font-weight:800;color:#14b8a6;letter-spacing:-0.3px;}
.nav-links{display:flex;gap:28px;}
.nav-links a{color:rgba(255,255,255,0.6);font-size:14px;font-weight:500;text-decoration:none;}
.nav-cta{background:#14b8a6;color:#05100e;padding:8px 20px;border-radius:8px;font-size:14px;font-weight:700;border:none;cursor:pointer;}
.hero{padding:48px 48px 0;display:flex;flex-direction:column;align-items:flex-start;}
.eyebrow{font-size:12px;font-weight:700;color:#14b8a6;letter-spacing:2px;text-transform:uppercase;margin-bottom:16px;display:flex;align-items:center;gap:8px;}
.eyebrow::before{content:'';display:inline-block;width:24px;height:2px;background:#14b8a6;}
h1{font-family:'Playfair Display',serif;font-size:56px;font-weight:900;line-height:1.05;color:#fff;margin-bottom:18px;max-width:640px;}
h1 span{color:#14b8a6;}
.sub{font-size:15px;color:rgba(255,255,255,0.5);line-height:1.65;max-width:520px;margin-bottom:28px;}
.hero-cta{display:inline-flex;align-items:center;gap:8px;background:#14b8a6;color:#05100e;padding:13px 28px;border-radius:10px;font-size:15px;font-weight:700;border:none;cursor:pointer;}
.services{display:flex;gap:16px;padding:28px 48px 0;}
.service-card{flex:1;background:#09201c;border:1px solid rgba(20,184,166,0.15);border-radius:12px;padding:20px;}
.service-icon{width:36px;height:36px;background:rgba(20,184,166,0.12);border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:18px;margin-bottom:12px;}
.service-title{font-size:14px;font-weight:700;color:#fff;margin-bottom:6px;}
.service-desc{font-size:12px;color:rgba(255,255,255,0.4);line-height:1.5;}
.clients{position:absolute;bottom:0;left:0;right:0;background:rgba(20,184,166,0.06);border-top:1px solid rgba(20,184,166,0.12);padding:14px 48px;display:flex;align-items:center;gap:0;}
.client-type{flex:1;text-align:center;color:rgba(255,255,255,0.4);font-size:13px;font-weight:600;letter-spacing:0.3px;}
.client-sep{color:rgba(20,184,166,0.3);font-size:18px;}
</style>
</head>
<body>
<nav>
  <div class="logo">DND Advertising</div>
  <div class="nav-links">
    <a href="#">Services</a>
    <a href="#">Work</a>
    <a href="#">About</a>
    <a href="#">Contact</a>
  </div>
  <button class="nav-cta">Get Proposal</button>
</nav>
<div class="hero">
  <div class="eyebrow">Digital Marketing · Labuan Bajo</div>
  <h1>Grow your business<br>in <span>paradise.</span></h1>
  <p class="sub">We help hotels, dive operators, and local businesses in Labuan Bajo dominate social media and search.</p>
  <button class="hero-cta">See Our Work →</button>
</div>
<div class="services">
  <div class="service-card">
    <div class="service-icon">📱</div>
    <div class="service-title">Social Media Management</div>
    <div class="service-desc">Content, posting, and community management across all platforms.</div>
  </div>
  <div class="service-card">
    <div class="service-icon">🎯</div>
    <div class="service-title">Google Ads</div>
    <div class="service-desc">Targeted campaigns that bring travelers to your door.</div>
  </div>
  <div class="service-card">
    <div class="service-icon">🎬</div>
    <div class="service-title">Content Creation</div>
    <div class="service-desc">Photography, video, and copy that captures Komodo's magic.</div>
  </div>
  <div class="service-card">
    <div class="service-icon">🔍</div>
    <div class="service-title">SEO & Web</div>
    <div class="service-desc">Rank higher and convert more with a fast, beautiful website.</div>
  </div>
</div>
<div class="clients">
  <div class="client-type">Hotels</div>
  <div class="client-sep">·</div>
  <div class="client-type">Dive Centers</div>
  <div class="client-sep">·</div>
  <div class="client-type">Restaurants</div>
  <div class="client-sep">·</div>
  <div class="client-type">Tour Operators</div>
</div>
</body>
</html>`
  },
  {
    slug: 'cashette',
    html: `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Rubik+Mono+One&family=VT323&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box;}
body{width:1200px;height:750px;background:#d9d3c4;font-family:'DM Mono',monospace;overflow:hidden;display:flex;flex-direction:column;align-items:center;justify-content:center;}
.page-title{font-family:'Rubik Mono One',monospace;font-size:42px;color:#2A1E14;letter-spacing:6px;text-transform:uppercase;margin-bottom:6px;}
.page-sub{font-family:'VT323',monospace;font-size:20px;color:#7a6a56;letter-spacing:3px;text-transform:uppercase;margin-bottom:36px;}
.phones{display:flex;gap:32px;align-items:flex-start;}
.phone{width:220px;height:440px;border:3px solid #2A1E14;border-radius:32px;box-shadow:6px 6px 0 #2A1E14;overflow:hidden;position:relative;flex-shrink:0;}

/* Phone 1 - Splash */
.phone-1{background:#C8553D;}
.phone-1-inner{display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;padding:24px;}
.cassette{width:100px;height:64px;background:#2A1E14;border-radius:8px;display:flex;align-items:center;justify-content:center;gap:10px;margin-bottom:24px;position:relative;}
.cassette::before{content:'';position:absolute;bottom:-6px;left:10px;right:10px;height:6px;background:#1a1008;}
.cassette-reel{width:24px;height:24px;border-radius:50%;border:3px solid #C8553D;background:#3a2010;}
.cassette-tape{width:20px;height:6px;background:#C8553D;border-radius:2px;}
.phone-1-title{font-family:'Rubik Mono One',monospace;font-size:22px;color:#F2E6CE;letter-spacing:3px;text-transform:uppercase;text-align:center;margin-bottom:6px;}
.phone-1-sub{font-family:'VT323',monospace;font-size:16px;color:rgba(242,230,206,0.6);letter-spacing:3px;text-transform:uppercase;}

/* Phone 2 - Dashboard */
.phone-2{background:#F2E6CE;}
.phone-2-inner{padding:20px 16px;}
.phone-2-header{font-family:'VT323',monospace;font-size:22px;color:#2A1E14;letter-spacing:2px;margin-bottom:16px;text-transform:uppercase;}
.balance-card{background:#2A1E14;border-radius:12px;padding:14px;margin-bottom:14px;}
.balance-label{font-family:'DM Mono',monospace;font-size:9px;color:rgba(242,230,206,0.5);letter-spacing:1px;text-transform:uppercase;margin-bottom:4px;}
.balance-val{font-family:'Rubik Mono One',monospace;font-size:18px;color:#F2E6CE;margin-bottom:10px;}
.progress-bar{height:6px;background:rgba(242,230,206,0.15);border-radius:3px;overflow:hidden;}
.progress-fill{height:100%;background:#D4A017;border-radius:3px;width:68%;}
.txn{display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid rgba(42,30,20,0.1);}
.txn:last-child{border-bottom:none;}
.txn-bar{width:4px;height:32px;border-radius:2px;flex-shrink:0;}
.txn-info{flex:1;}
.txn-name{font-family:'DM Mono',monospace;font-size:10px;font-weight:500;color:#2A1E14;}
.txn-date{font-size:9px;color:#7a6a56;margin-top:1px;}
.txn-amount{font-family:'DM Mono',monospace;font-size:10px;font-weight:500;color:#2A1E14;}

/* Phone 3 - Stats */
.phone-3{background:#2A1E14;}
.phone-3-inner{padding:20px 16px;}
.phone-3-title{font-family:'VT323',monospace;font-size:24px;color:#F2E6CE;letter-spacing:3px;margin-bottom:4px;text-transform:uppercase;}
.phone-3-sub{font-size:9px;color:rgba(242,230,206,0.35);letter-spacing:1px;text-transform:uppercase;margin-bottom:16px;}
.cat-row{margin-bottom:12px;}
.cat-header{display:flex;justify-content:space-between;margin-bottom:5px;}
.cat-name{font-family:'VT323',monospace;font-size:15px;letter-spacing:1px;text-transform:uppercase;}
.cat-pct{font-family:'DM Mono',monospace;font-size:10px;color:rgba(242,230,206,0.5);}
.cat-track{height:8px;background:rgba(242,230,206,0.08);border-radius:2px;overflow:hidden;}
.cat-fill{height:100%;border-radius:2px;}
.phone-3-nav{position:absolute;bottom:0;left:0;right:0;background:#1a1008;border-top:1px solid rgba(242,230,206,0.1);padding:10px 0;display:flex;justify-content:space-around;align-items:center;}
.nav-item{display:flex;flex-direction:column;align-items:center;gap:2px;}
.nav-icon{font-size:14px;}
.nav-label{font-family:'VT323',monospace;font-size:10px;color:rgba(242,230,206,0.4);letter-spacing:1px;text-transform:uppercase;}
.nav-label.active{color:#D4A017;}
</style>
</head>
<body>
<div class="page-title">CASHETTE</div>
<div class="page-sub">Daily Finance App</div>
<div class="phones">
  <!-- Phone 1: Splash -->
  <div class="phone phone-1">
    <div class="phone-1-inner">
      <div class="cassette">
        <div class="cassette-reel"></div>
        <div class="cassette-tape"></div>
        <div class="cassette-reel"></div>
      </div>
      <div class="phone-1-title">CASHETTE</div>
      <div class="phone-1-sub">DAILY FINANCE</div>
    </div>
  </div>

  <!-- Phone 2: Dashboard -->
  <div class="phone phone-2">
    <div class="phone-2-inner">
      <div class="phone-2-header">HOWDY, JUNE 👋</div>
      <div class="balance-card">
        <div class="balance-label">Left this month</div>
        <div class="balance-val">$1,284.40</div>
        <div class="progress-bar"><div class="progress-fill"></div></div>
      </div>
      <div class="txn">
        <div class="txn-bar" style="background:#D4A017;"></div>
        <div class="txn-info">
          <div class="txn-name">Grocery Store</div>
          <div class="txn-date">Today, 09:14</div>
        </div>
        <div class="txn-amount">-$42.30</div>
      </div>
      <div class="txn">
        <div class="txn-bar" style="background:#2DD4BF;"></div>
        <div class="txn-info">
          <div class="txn-name">Netflix</div>
          <div class="txn-date">Yesterday</div>
        </div>
        <div class="txn-amount">-$15.99</div>
      </div>
      <div class="txn">
        <div class="txn-bar" style="background:#9B2335;"></div>
        <div class="txn-info">
          <div class="txn-name">Coffee Shop</div>
          <div class="txn-date">May 20</div>
        </div>
        <div class="txn-amount">-$6.50</div>
      </div>
    </div>
  </div>

  <!-- Phone 3: Stats -->
  <div class="phone phone-3">
    <div class="phone-3-inner">
      <div class="phone-3-title">THE MIXTAPE</div>
      <div class="phone-3-sub">May spending</div>
      <div class="cat-row">
        <div class="cat-header">
          <span class="cat-name" style="color:#D4A017;">FOOD</span>
          <span class="cat-pct">38%</span>
        </div>
        <div class="cat-track"><div class="cat-fill" style="width:38%;background:#D4A017;"></div></div>
      </div>
      <div class="cat-row">
        <div class="cat-header">
          <span class="cat-name" style="color:#2DD4BF;">BILLS</span>
          <span class="cat-pct">52%</span>
        </div>
        <div class="cat-track"><div class="cat-fill" style="width:52%;background:#2DD4BF;"></div></div>
      </div>
      <div class="cat-row">
        <div class="cat-header">
          <span class="cat-name" style="color:#9B2335;">FUN</span>
          <span class="cat-pct">14%</span>
        </div>
        <div class="cat-track"><div class="cat-fill" style="width:14%;background:#9B2335;"></div></div>
      </div>
      <div class="cat-row">
        <div class="cat-header">
          <span class="cat-name" style="color:#8B9A4A;">TRANSIT</span>
          <span class="cat-pct">22%</span>
        </div>
        <div class="cat-track"><div class="cat-fill" style="width:22%;background:#8B9A4A;"></div></div>
      </div>
    </div>
    <div class="phone-3-nav">
      <div class="nav-item"><span class="nav-icon">🏠</span><span class="nav-label active">HOME</span></div>
      <div class="nav-item"><span class="nav-icon">📊</span><span class="nav-label">STATS</span></div>
      <div class="nav-item"><span class="nav-icon">➕</span><span class="nav-label">ADD</span></div>
      <div class="nav-item"><span class="nav-icon">⚙️</span><span class="nav-label">SET</span></div>
    </div>
  </div>
</div>
</body>
</html>`
  }
];

async function run() {
  const browser = await chromium.launch({
    executablePath: CHROME,
    args: ['--no-sandbox', '--disable-dev-shm-usage', '--disable-gpu']
  });

  const page = await browser.newPage();
  await page.setViewportSize({ width: 1200, height: 750 });

  for (const project of projects) {
    const tmpFile = `/tmp/thumb-${project.slug}.html`;
    const outFile = `${OUT_DIR}/${project.slug}.png`;

    fs.writeFileSync(tmpFile, project.html, 'utf-8');

    await page.goto(`file://${tmpFile}`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);
    await page.screenshot({ path: outFile, fullPage: false });

    console.log(`✓ ${project.slug}.png`);
  }

  await browser.close();

  console.log('\n--- File sizes ---');
  for (const project of projects) {
    const outFile = `${OUT_DIR}/${project.slug}.png`;
    const stat = fs.statSync(outFile);
    const kb = (stat.size / 1024).toFixed(1);
    console.log(`${project.slug}.png  ${kb} KB`);
  }
}

run().catch(err => { console.error(err); process.exit(1); });

# PixelDew Universe — Landing Page

Futuristic pixel-tech landing page + **Dewbit AI chatbot** — built with Next.js 15, TypeScript, and TailwindCSS.

## Stack

- **Next.js 15** (App Router)
- **TypeScript** — zero TS errors
- **TailwindCSS**
- No database · No Prisma · No ORM

## Quick Start

```bash
# 1. Install
npm install

# 2. Set up env
cp .env.example .env.local
# Edit .env.local → add your Anthropic API key

# 3. Run
npm run dev   # → http://localhost:3000
```

## Environment Variables

| Variable | Description |
|---|---|
| `ANTHROPIC_API_KEY` | Get one at [console.anthropic.com](https://console.anthropic.com) |

> API key is used **server-side only** via `/api/chat` — never exposed to the browser.

## Deploy to Vercel

```bash
npx vercel
```

Or push to GitHub → connect at vercel.com → add `ANTHROPIC_API_KEY` in **Settings → Environment Variables**.

## Project Structure

```
app/
  layout.tsx          # Root layout + Google Fonts
  page.tsx            # Landing page
  globals.css         # Brand styles & animations
  api/chat/route.ts   # 🔒 Secure Anthropic API proxy

components/
  Navbar.tsx          # Fixed top navbar
  AsciiHero.tsx       # ASCII art hero
  FloatingBits.tsx    # Drifting pixel chars
  CodePanel.tsx       # Terminal code panel
  DewbitChat.tsx      # 🌱 AI chatbot widget
  Footer.tsx          # Footer
  PixelLogo.tsx       # SVG logo
  PixelMascot.tsx     # SVG Dewbit mascot
```

## Dewbit Chatbot Features
- Corner widget fixed bottom-right
- Suggestion chips on first open
- Typing indicator, error states, unread badge
- Clear / reset chat
- Playful personality powered by Claude

## Brand Colors

| Token | Hex |
|---|---|
| Background | `#12002B` |
| Neon Mint | `#2CFF8F` |
| Cyan | `#18E6FF` |
| Blue | `#5B8CFF` |
| Magenta | `#FF3BD4` |

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "pd-bg": "#08002",
        "pd-bg2": "#0a0010",
        "pd-surface": "#41226",
        "pd-ink": "#F5F3FA",
        "pd-text-muted": "#A6A2B8",
        "pd-mint": "#1DDD78",
        "pd-cyan": "#0ECFDF",
        "pd-magenta": "#E02CB8",
        "pd-blue": "#4a7aff",
      },
      fontFamily: {
        pixel: ['"Press Start 2P"', "monospace"],
        mono: ["ui-monospace", "monospace"],
      },
      animation: {
        "float-slow": "floatDrift 8s ease-in-out infinite",
        "float-med": "floatDrift 5s ease-in-out infinite",
        blink: "blink 1s step-end infinite",
        "glow-pulse": "glowPulse 3s ease-in-out infinite",
        shimmer: "shimmer 4s linear infinite",
        "scan": "scanline 8s linear infinite",
      },
      keyframes: {
        floatDrift: {
          "0%, 100%": { transform: "translateY(0px) translateX(0px)" },
          "25%": { transform: "translateY(-18px) translateX(10px)" },
          "50%": { transform: "translateY(-8px) translateX(-8px)" },
          "75%": { transform: "translateY(-22px) translateX(5px)" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        glowPulse: {
          "0%, 100%": { textShadow: "0 0 20px #1DDD78, 0 0 40px #1DDD7855" },
          "50%": { textShadow: "0 0 40px #0ECFDF, 0 0 80px #0ECFDF55, 0 0 120px #0ECFDF22" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        scanline: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
      },
      boxShadow: {
        "neon-mint": "0 0 20px #1DDD7844, 0 0 40px #1DDD7822",
        "neon-cyan": "0 0 20px #0ECFDF44, 0 0 40px #0ECFDF22",
        "neon-blue": "0 0 20px #4a7aff44",
        "pixel-border": "inset 0 0 0 2px #1DDD7833",
      },
    },
  },
  plugins: [],
};

export default config;

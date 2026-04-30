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
        "pd-bg": "#12002B",
        "pd-bg2": "#160033",
        "pd-mint": "#2CFF8F",
        "pd-green": "#22D36B",
        "pd-cyan": "#18E6FF",
        "pd-blue": "#5B8CFF",
        "pd-magenta": "#FF3BD4",
        "pd-purple": "#7B2FFF",
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
          "0%, 100%": { textShadow: "0 0 20px #2CFF8F, 0 0 40px #2CFF8F55" },
          "50%": { textShadow: "0 0 40px #18E6FF, 0 0 80px #18E6FF55, 0 0 120px #18E6FF22" },
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
        "neon-mint": "0 0 20px #2CFF8F44, 0 0 40px #2CFF8F22",
        "neon-cyan": "0 0 20px #18E6FF44, 0 0 40px #18E6FF22",
        "neon-blue": "0 0 20px #5B8CFF44",
        "pixel-border": "inset 0 0 0 2px #2CFF8F33",
      },
    },
  },
  plugins: [],
};

export default config;

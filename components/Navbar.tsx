"use client";
import PixelLogo from "./PixelLogo";

export default function Navbar() {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 md:px-10"
      style={{
        background:
          "linear-gradient(to bottom, rgba(18,0,43,0.95) 0%, rgba(18,0,43,0) 100%)",
        backdropFilter: "blur(6px)",
      }}
      aria-label="Main navigation"
    >
      {/* Left: Logo + Brand */}
      <a
        href="/"
        className="flex items-center gap-3 group"
        aria-label="PixelDew Universe Home"
      >
        <PixelLogo size={28} />
        <span
          className="font-pixel text-xs tracking-wider"
          style={{ color: "#2CFF8F" }}
        >
          PixelDew
        </span>
      </a>

      {/* Right: Nav buttons */}
      <div className="flex items-center gap-3">
        <a
          href="#plans"
          className="btn-outline font-pixel text-xs px-4 py-2 rounded-none border tracking-wide"
          style={{
            borderColor: "rgba(24,230,255,0.4)",
            color: "#18E6FF",
            fontSize: "9px",
          }}
          aria-label="View Plans"
        >
          Plans
        </a>
        <a
          href="#try"
          className="btn-primary font-pixel text-xs px-4 py-2 rounded-none tracking-wide"
          style={{
            background: "linear-gradient(135deg, #2CFF8F 0%, #18E6FF 100%)",
            color: "#0a001a",
            fontSize: "9px",
            fontWeight: "bold",
          }}
          aria-label="Try PixelDew"
        >
          Try PixelDew
        </a>
      </div>
    </nav>
  );
}

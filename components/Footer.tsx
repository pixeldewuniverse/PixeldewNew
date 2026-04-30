import PixelLogo from "./PixelLogo";

export default function Footer() {
  return (
    <footer
      className="relative px-6 md:px-10 py-12 border-t"
      style={{ borderColor: "rgba(44,255,143,0.12)" }}
    >
      {/* Mobile callout (no fixed positioning) */}
      <div
        className="md:hidden mb-8 p-4 pixel-border"
        style={{ background: "rgba(22,0,51,0.8)" }}
      >
        <div className="flex items-start gap-3">
          <div
            className="w-10 h-10 flex-shrink-0 flex items-center justify-center border text-lg"
            style={{ borderColor: "rgba(44,255,143,0.4)", background: "rgba(44,255,143,0.08)" }}
          >
            🌱
          </div>
          <p
            className="font-pixel leading-relaxed"
            style={{ fontSize: "8px", color: "rgba(232,224,255,0.9)", lineHeight: "1.8" }}
          >
            PixelDew builds the{" "}
            <span style={{ color: "#2CFF8F", textDecoration: "underline", textUnderlineOffset: "3px" }}>
              bits
            </span>{" "}
            you don&apos;t want to{" "}
            <span style={{ color: "#18E6FF", textDecoration: "underline", textUnderlineOffset: "3px" }}>
              build.
            </span>
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <PixelLogo size={22} />
          <span className="font-pixel" style={{ fontSize: "9px", color: "rgba(44,255,143,0.7)" }}>
            PixelDew Universe
          </span>
        </div>

        {/* Links */}
        <nav className="flex items-center gap-6" aria-label="Footer navigation">
          {[
            { label: "Docs", href: "#" },
            { label: "GitHub", href: "https://github.com/pixeldewuniverse/pixelDew" },
            { label: "Privacy", href: "#" },
            { label: "Plans", href: "#plans" },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="font-pixel hover:opacity-100 transition-opacity"
              style={{
                fontSize: "8px",
                color: "rgba(255,255,255,0.35)",
                textDecoration: "none",
              }}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Copyright */}
        <p
          className="font-pixel"
          style={{ fontSize: "7px", color: "rgba(255,255,255,0.2)" }}
        >
          © 2025 PixelDew Universe
        </p>
      </div>

      {/* Bottom glow line */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 h-px w-1/2"
        style={{
          background: "linear-gradient(to right, transparent, rgba(44,255,143,0.3), transparent)",
        }}
        aria-hidden="true"
      />
    </footer>
  );
}

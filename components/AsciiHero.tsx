"use client";

// Big block ASCII art for PIXELDEW
// Generated using block characters for a compact pixel-style look
const ASCII_PIXELDEW = `██████╗ ██╗██╗  ██╗███████╗██╗     ██████╗ ███████╗██╗    ██╗
██╔══██╗██║╚██╗██╔╝██╔════╝██║     ██╔══██╗██╔════╝██║    ██║
██████╔╝██║ ╚███╔╝ █████╗  ██║     ██║  ██║█████╗  ██║ █╗ ██║
██╔═══╝ ██║ ██╔██╗ ██╔══╝  ██║     ██║  ██║██╔══╝  ██║███╗██║
██║     ██║██╔╝ ██╗███████╗███████╗██████╔╝███████╗╚███╔███╔╝
╚═╝     ╚═╝╚═╝  ╚═╝╚══════╝╚══════╝╚═════╝ ╚══════╝ ╚══╝╚══╝ `;

const ASCII_SMALL = `PXL DEW`;

export default function AsciiHero() {
  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center bg-glow-hero pt-20 pb-10"
      id="hero"
    >
      {/* Radial glow behind text */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 45%, rgba(91,140,255,0.15) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Desktop: full ASCII */}
      <div className="hidden lg:block w-full overflow-x-auto px-4">
        <pre
          className="ascii-art shimmer-text mx-auto text-center"
          style={{ fontSize: "clamp(6px, 0.7vw, 11px)", lineHeight: "1.2" }}
          aria-label="PIXELDEW"
        >
          {ASCII_PIXELDEW}
        </pre>
      </div>

      {/* Tablet: medium */}
      <div className="hidden md:block lg:hidden w-full overflow-x-auto px-4">
        <pre
          className="ascii-art shimmer-text mx-auto text-center"
          style={{ fontSize: "5px", lineHeight: "1.2" }}
          aria-label="PIXELDEW"
        >
          {ASCII_PIXELDEW}
        </pre>
      </div>

      {/* Mobile: simple pixel heading */}
      <div className="block md:hidden text-center px-4">
        <h1
          className="font-pixel glow-mint"
          style={{
            fontSize: "clamp(18px, 7vw, 32px)",
            color: "#2CFF8F",
            letterSpacing: "0.15em",
            lineHeight: "1.5",
          }}
        >
          PIXEL
          <br />
          DEW
        </h1>
      </div>

      {/* Subtext */}
      <div className="mt-8 text-center px-4 z-10">
        <p
          className="font-pixel text-center"
          style={{
            fontSize: "clamp(7px, 1.2vw, 11px)",
            color: "rgba(24, 230, 255, 0.8)",
            letterSpacing: "0.2em",
            textShadow: "0 0 20px rgba(24,230,255,0.4)",
          }}
        >
          A pixel-born studio for big ideas.
        </p>

        {/* Cursor blink */}
        <span
          className="inline-block mt-1 cursor-blink font-pixel"
          style={{ color: "#2CFF8F", fontSize: "10px" }}
          aria-hidden="true"
        >
          _
        </span>
      </div>

      {/* CTA buttons */}
      <div className="mt-12 flex flex-col sm:flex-row gap-4 items-center z-10" id="try">
        <a
          href="#"
          className="btn-primary font-pixel px-8 py-4 rounded-none"
          style={{
            background: "linear-gradient(135deg, #2CFF8F 0%, #18E6FF 100%)",
            color: "#080018",
            fontSize: "10px",
            letterSpacing: "0.1em",
          }}
          aria-label="Try PixelDew now"
        >
          Try PixelDew →
        </a>
        <a
          href="#code-panel"
          className="btn-outline font-pixel px-8 py-4 rounded-none border"
          style={{
            borderColor: "rgba(91,140,255,0.5)",
            color: "#5B8CFF",
            fontSize: "10px",
            letterSpacing: "0.1em",
          }}
          aria-label="See how it works"
        >
          See How It Works
        </a>
      </div>

      {/* Scroll hint */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <span
          className="font-pixel"
          style={{ fontSize: "7px", color: "rgba(255,255,255,0.3)" }}
        >
          scroll
        </span>
        <div
          className="w-px h-8"
          style={{
            background:
              "linear-gradient(to bottom, rgba(44,255,143,0.5), transparent)",
          }}
        />
      </div>
    </section>
  );
}

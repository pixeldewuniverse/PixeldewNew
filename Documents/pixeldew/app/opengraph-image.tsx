import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "PixelDew — Web Creator";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#080012",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Dot grid background */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(circle, rgba(29,221,120,0.08) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        {/* Glow blobs */}
        <div style={{ position: "absolute", top: -120, left: -120, width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(29,221,120,0.08) 0%, transparent 70%)" }} />
        <div style={{ position: "absolute", bottom: -80, right: -80, width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(14,207,223,0.06) 0%, transparent 70%)" }} />

        {/* Pixel art cube — right side */}
        <div style={{ position: "absolute", right: 80, top: "50%", transform: "translateY(-50%) rotate(12deg)", display: "flex", flexDirection: "column", gap: 0 }}>
          {[
            [1,1,1,1,1],
            [1,0,0,0,1],
            [1,0,1,0,1],
            [1,0,0,0,1],
            [1,1,1,1,1],
          ].map((row, ri) => (
            <div key={ri} style={{ display: "flex" }}>
              {row.map((cell, ci) => (
                <div key={ci} style={{ width: 32, height: 32, background: cell ? "rgba(29,221,120,0.7)" : "transparent", border: cell ? "1px solid rgba(29,221,120,0.3)" : "none", boxShadow: cell ? "0 0 8px rgba(29,221,120,0.3)" : "none" }} />
              ))}
            </div>
          ))}
        </div>

        {/* Content */}
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "80px", flex: 1, zIndex: 1, maxWidth: 720 }}>
          {/* Badge */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 32 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#1ddd78", boxShadow: "0 0 8px #1ddd78" }} />
            <span style={{ fontFamily: "monospace", fontSize: 12, color: "rgba(29,221,120,0.6)", letterSpacing: "0.3em", textTransform: "uppercase" }}>
              Portfolio 2025
            </span>
          </div>

          {/* Title */}
          <div style={{ fontSize: 88, fontWeight: 800, color: "#1ddd78", lineHeight: 0.9, marginBottom: 24, letterSpacing: "-0.03em" }}>
            PixelDew
          </div>

          {/* Divider */}
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 28 }}>
            <div style={{ width: 48, height: 2, background: "#0ecfdf" }} />
            <span style={{ fontSize: 16, color: "#0ecfdf", letterSpacing: "0.1em", fontFamily: "monospace" }}>WEB CREATOR</span>
          </div>

          {/* Tagline */}
          <p style={{ fontSize: 22, color: "rgba(255,255,255,0.4)", lineHeight: 1.5, margin: 0, maxWidth: 500 }}>
            Membangun pengalaman digital yang terasa hidup.
          </p>

          {/* URL */}
          <div style={{ marginTop: 48, fontSize: 14, color: "rgba(255,255,255,0.2)", fontFamily: "monospace", letterSpacing: "0.05em" }}>
            pixeldew.xyz
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}

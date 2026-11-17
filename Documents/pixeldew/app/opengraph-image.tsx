import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "PixelDew — Web Creator";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const MARK_SRC =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="2 5 120 120"><path d="M24 14 H68 A32 32 0 0 1 68 78 H46 V94 H24 Z M66 26 C66 26 74.4 36.4 77.6 44.4 A12 12 0 1 1 54.4 44.4 C57.6 36.4 66 26 66 26 Z" fill="#1ddd78" fill-rule="evenodd"/><rect x="28" y="100" width="14" height="14" fill="#1ddd78"/></svg>'
  );

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

        {/* PixelDew mark — right side */}
        <img
          src={MARK_SRC}
          width={300}
          height={300}
          alt=""
          style={{ position: "absolute", right: 90, top: 165 }}
        />

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
          <div style={{ fontSize: 88, fontWeight: 800, color: "#f5f3fa", lineHeight: 0.9, marginBottom: 24, letterSpacing: "-0.03em" }}>
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

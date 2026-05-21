export default function Footer() {
  return (
    <footer
      style={{
        padding: "32px clamp(24px, 8vw, 160px)",
        borderTop: "1px solid rgba(240,234,255,0.06)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "12px",
      }}
    >
      <span
        style={{
          fontFamily: '"Press Start 2P", monospace',
          fontSize: "10px",
          color: "var(--mint)",
          textShadow: "0 0 10px rgba(29,221,120,0.4)",
        }}
      >
        PixelDew
      </span>
      <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>
        © {new Date().getFullYear()} · built pixel by pixel
      </span>
    </footer>
  );
}

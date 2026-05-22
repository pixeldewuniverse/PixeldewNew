import PixelDewLogo from "./PixelDewLogo";

export default function Footer() {
  return (
    <footer
      style={{
        padding: "32px clamp(24px, 8vw, 96px)",
        borderTop: "1px solid var(--border)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "12px",
      }}
    >
      <PixelDewLogo size={28} showText />
      <span className="t-small" style={{ color: "var(--text-muted)" }}>
        © {new Date().getFullYear()} · built pixel by pixel
      </span>
    </footer>
  );
}

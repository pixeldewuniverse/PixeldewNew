import Navbar from “@/components/Navbar”;
import AsciiHero from “@/components/AsciiHero”;
import FloatingBits from “@/components/FloatingBits”;
import CodePanel from “@/components/CodePanel”;
import PortfolioSection from “@/components/PortfolioSection”;
import ParticleField from “@/components/ParticleField”;
import DewbitChat from “@/components/DewbitChat”;
import Footer from “@/components/Footer”;

export default function Home() {
return (
<main className=“min-h-screen relative” style={{ background: “#12002B” }}>
<ParticleField />
<Navbar />

```
  {/* Hero section with floating bits overlay */}
  <div className="relative">
    <FloatingBits />
    <AsciiHero />
  </div>

  {/* Divider with glow */}
  <div
    className="w-full h-px"
    style={{
      background:
        "linear-gradient(to right, transparent 0%, rgba(44,255,143,0.2) 20%, rgba(24,230,255,0.3) 50%, rgba(44,255,143,0.2) 80%, transparent 100%)",
    }}
    aria-hidden="true"
  />

  <CodePanel />

  <PortfolioSection />

  {/* Stats / social proof strip */}
  <section className="px-4 md:px-10 pb-20">
    <div className="max-w-5xl mx-auto">
      <div
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {[
          { value: "∞", label: "Ideas Possible", color: "#2CFF8F" },
          { value: "01", label: "Studio Per Dev", color: "#18E6FF" },
          { value: "px", label: "Pixel Precision", color: "#5B8CFF" },
          { value: "∆v", label: "Ship Velocity", color: "#FF3BD4" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="pixel-border p-6 text-center flex flex-col items-center gap-2"
            style={{ background: "rgba(255,255,255,0.02)" }}
          >
            <span
              className="font-pixel"
              style={{
                fontSize: "clamp(20px, 3vw, 30px)",
                color: stat.color,
                textShadow: `0 0 20px ${stat.color}88`,
              }}
            >
              {stat.value}
            </span>
            <span
              className="font-pixel opacity-50"
              style={{ fontSize: "8px", color: "rgba(232,224,255,0.6)" }}
            >
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  </section>

  {/* Final CTA banner */}
  <section
    className="px-4 md:px-10 pb-24"
    id="plans"
  >
    <div className="max-w-3xl mx-auto text-center">
      <div
        className="pixel-border-cyan p-10 md:p-16 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0e001e 0%, #160033 100%)" }}
      >
        {/* Corner decorations */}
        {["top-0 left-0", "top-0 right-0", "bottom-0 left-0", "bottom-0 right-0"].map((pos, i) => (
          <div
            key={i}
            className={`absolute ${pos} w-4 h-4`}
            style={{ borderColor: "#18E6FF", opacity: 0.5 }}
            aria-hidden="true"
          />
        ))}

        <p
          className="font-pixel mb-4"
          style={{ fontSize: "9px", color: "rgba(24,230,255,0.6)", letterSpacing: "0.3em" }}
        >
          READY TO BUILD?
        </p>
        <h2
          className="font-pixel mb-6 glow-mint"
          style={{
            fontSize: "clamp(14px, 2.5vw, 22px)",
            color: "#2CFF8F",
            lineHeight: "1.8",
          }}
        >
          Your next big idea,<br />pixel by pixel.
        </h2>
        <p
          className="mb-10 opacity-60"
          style={{ fontSize: "13px", color: "rgba(232,224,255,0.8)", maxWidth: "400px", margin: "0 auto 2.5rem" }}
        >
          PixelDew handles the boring bits so you can focus on the creative ones.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <a
            href="#"
            className="btn-primary font-pixel px-10 py-4"
            style={{
              background: "linear-gradient(135deg, #2CFF8F 0%, #18E6FF 100%)",
              color: "#080018",
              fontSize: "10px",
              letterSpacing: "0.1em",
            }}
            aria-label="Try PixelDew for free"
          >
            Try PixelDew — Free
          </a>
          <a
            href="#"
            className="btn-outline font-pixel px-10 py-4 border"
            style={{
              borderColor: "rgba(255,59,212,0.4)",
              color: "#FF3BD4",
              fontSize: "10px",
            }}
            aria-label="View pricing plans"
          >
            View Plans
          </a>
        </div>
      </div>
    </div>
  </section>

  <Footer />
  <DewbitChat />
</main>
```

);
}

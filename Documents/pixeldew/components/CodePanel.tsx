"use client";
import PixelMascot from "./PixelMascot";

const CODE_LINES = [
  { tokens: [{ t: "comment", v: "// Objective: Generate a PixelDew landing experience" }] },
  { tokens: [] },
  { tokens: [{ t: "keyword", v: "import" }, { t: "default", v: " { " }, { t: "fn", v: "createStudio" }, { t: "default", v: " } " }, { t: "keyword", v: "from" }, { t: "string", v: ' "pixeldew-core"' }] },
  { tokens: [{ t: "keyword", v: "import" }, { t: "default", v: " { " }, { t: "fn", v: "DewAgent" }, { t: "default", v: ", " }, { t: "fn", v: "PixelRenderer" }, { t: "default", v: " } " }, { t: "keyword", v: "from" }, { t: "string", v: ' "@pixeldew/universe"' }] },
  { tokens: [] },
  { tokens: [{ t: "comment", v: "// Initialize PixelDew Build Studio" }] },
  { tokens: [{ t: "keyword", v: "const" }, { t: "default", v: " " }, { t: "var", v: "studio" }, { t: "default", v: " = " }, { t: "fn", v: "createStudio" }, { t: "default", v: "({" }] },
  { tokens: [{ t: "default", v: "  " }, { t: "var", v: "name" }, { t: "default", v: ": " }, { t: "string", v: '"PixelDew Universe"' }, { t: "default", v: "," }] },
  { tokens: [{ t: "default", v: "  " }, { t: "var", v: "mode" }, { t: "default", v: ": " }, { t: "string", v: '"autonomous"' }, { t: "default", v: "," }] },
  { tokens: [{ t: "default", v: "  " }, { t: "var", v: "palette" }, { t: "default", v: ": [" }, { t: "string", v: '"#2CFF8F"' }, { t: "default", v: ", " }, { t: "string", v: '"#18E6FF"' }, { t: "default", v: ", " }, { t: "string", v: '"#FF3BD4"' }, { t: "default", v: "]," }] },
  { tokens: [{ t: "default", v: "});" }] },
  { tokens: [] },
  { tokens: [{ t: "comment", v: "// Boot the Dewbit agent 🌱" }] },
  { tokens: [{ t: "keyword", v: "const" }, { t: "default", v: " " }, { t: "var", v: "dewbit" }, { t: "default", v: " = " }, { t: "keyword", v: "new" }, { t: "default", v: " " }, { t: "type", v: "DewAgent" }, { t: "default", v: "({" }] },
  { tokens: [{ t: "default", v: "  " }, { t: "var", v: "task" }, { t: "default", v: ": " }, { t: "string", v: '"design + build + ship"' }, { t: "default", v: "," }] },
  { tokens: [{ t: "default", v: "  " }, { t: "var", v: "studio" }, { t: "default", v: "," }] },
  { tokens: [{ t: "default", v: "});" }] },
  { tokens: [] },
  { tokens: [{ t: "keyword", v: "await" }, { t: "default", v: " " }, { t: "var", v: "dewbit" }, { t: "default", v: "." }, { t: "fn", v: "run" }, { t: "default", v: "();" }] },
  { tokens: [{ t: "comment", v: '// → "Landing page generated. Vibes: ✓"' }] },
];

function renderLine(line: typeof CODE_LINES[0], i: number) {
  if (line.tokens.length === 0) {
    return <div key={i} className="h-5" />;
  }
  return (
    <div key={i} className="flex flex-wrap leading-6">
      <span className="select-none mr-4 text-right w-6 opacity-30 flex-shrink-0" style={{ color: "#5a5f80", fontSize: "11px" }}>
        {i + 1}
      </span>
      <span className="flex flex-wrap gap-0">
        {line.tokens.map((tok, j) => (
          <span
            key={j}
            className={
              tok.t === "comment" ? "token-comment" :
              tok.t === "keyword" ? "token-keyword" :
              tok.t === "string" ? "token-string" :
              tok.t === "fn" ? "token-fn" :
              tok.t === "var" ? "token-var" :
              tok.t === "type" ? "token-type" :
              "opacity-70"
            }
            style={{ fontSize: "12px", fontFamily: "ui-monospace, monospace" }}
          >
            {tok.v}
          </span>
        ))}
      </span>
    </div>
  );
}

export default function CodePanel() {
  return (
    <section className="relative px-4 md:px-10 pb-24 pt-8" id="code-panel">
      <div className="max-w-5xl mx-auto">
        {/* Section label */}
        <div className="mb-6 flex items-center gap-3">
          <div className="h-px flex-1" style={{ background: "linear-gradient(to right, transparent, rgba(44,255,143,0.3))" }} />
          <span className="font-pixel text-center" style={{ fontSize: "9px", color: "rgba(44,255,143,0.6)", letterSpacing: "0.3em" }}>
            HOW IT WORKS
          </span>
          <div className="h-px flex-1" style={{ background: "linear-gradient(to left, transparent, rgba(44,255,143,0.3))" }} />
        </div>

        {/* Main panel */}
        <div className="relative pixel-border code-panel rounded-none overflow-hidden">
          {/* Terminal titlebar */}
          <div
            className="flex items-center gap-3 px-4 py-3 border-b"
            style={{ borderColor: "rgba(44,255,143,0.2)", background: "rgba(44,255,143,0.04)" }}
          >
            {/* Traffic lights */}
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full" style={{ background: "#FF3BD4" }} />
              <div className="w-3 h-3 rounded-full" style={{ background: "#FFD166" }} />
              <div className="w-3 h-3 rounded-full" style={{ background: "#2CFF8F" }} />
            </div>
            <span className="font-pixel opacity-40" style={{ fontSize: "8px", color: "#18E6FF" }}>
              dewbit.agent.ts
            </span>
            <div className="ml-auto flex items-center gap-2 opacity-40">
              <div className="w-2 h-2" style={{ background: "#2CFF8F" }} />
              <span className="font-pixel" style={{ fontSize: "7px", color: "#2CFF8F" }}>RUNNING</span>
            </div>
          </div>

          {/* Code body */}
          <div className="relative flex">
            {/* Mascot peeking from left */}
            <div
              className="hidden md:flex flex-col justify-end pb-6 pl-4 flex-shrink-0"
              style={{ width: "90px" }}
              aria-hidden="true"
            >
              <div className="float-3" style={{ animationDelay: "1s" }}>
                <PixelMascot size={72} />
              </div>
            </div>

            {/* Code content */}
            <div className="flex-1 p-4 md:pl-2 overflow-x-auto">
              <div className="min-w-0">
                {CODE_LINES.map((line, i) => renderLine(line, i))}
                {/* Blinking cursor at end */}
                <div className="flex mt-1">
                  <span className="select-none mr-4 text-right w-6 opacity-30" style={{ color: "#5a5f80", fontSize: "11px" }}>
                    {CODE_LINES.length + 1}
                  </span>
                  <span className="cursor-blink" style={{ color: "#2CFF8F", fontSize: "12px" }}>█</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom status bar */}
          <div
            className="flex items-center gap-4 px-4 py-2 border-t overflow-x-auto"
            style={{ borderColor: "rgba(44,255,143,0.15)", background: "rgba(0,0,0,0.3)" }}
          >
            {[
              { label: "TypeScript", color: "#5B8CFF" },
              { label: "Next.js 15", color: "#18E6FF" },
              { label: "TailwindCSS", color: "#2CFF8F" },
              { label: "Framer Motion", color: "#FF3BD4" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-1.5 flex-shrink-0">
                <div className="w-2 h-2 rounded-sm" style={{ background: item.color }} />
                <span className="font-pixel opacity-60" style={{ fontSize: "7px", color: item.color }}>
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Feature pills below panel */}
        <div className="mt-8 flex flex-wrap gap-3 justify-center">
          {[
            "⚡ Autonomous Builds",
            "🎨 Pixel-Perfect UI",
            "🚀 Deploy in Seconds",
            "🌱 Grows With You",
          ].map((feat) => (
            <div
              key={feat}
              className="font-pixel px-4 py-2 border"
              style={{
                fontSize: "8px",
                borderColor: "rgba(91,140,255,0.3)",
                color: "rgba(91,140,255,0.8)",
                background: "rgba(91,140,255,0.05)",
              }}
            >
              {feat}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

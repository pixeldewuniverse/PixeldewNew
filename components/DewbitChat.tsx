"use client";
import { useState, useRef, useEffect, useCallback } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const WELCOME: Message = {
  role: "assistant",
  content:
    "Heyyy! 🌱 I'm Dewbit — PixelDew's pixel-born assistant!\n\nAsk me anything. Coding, creative stuff, life crises, pixel philosophy... I got bits for days. ⚡",
};

/* ── Tiny mascot SVG ── */
function MascotIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 22 22" fill="none" aria-hidden="true">
      <rect x="4" y="6" width="14" height="12" fill="#160033" stroke="#2CFF8F" strokeWidth="1.5" />
      <rect x="6" y="3" width="10" height="8"  fill="#160033" stroke="#2CFF8F" strokeWidth="1.5" />
      <rect x="7"   y="5" width="3" height="3" fill="#18E6FF" />
      <rect x="12"  y="5" width="3" height="3" fill="#18E6FF" />
      <rect x="8.5" y="5.5" width="1.5" height="1.5" fill="white" opacity=".75" />
      <rect x="13.5" y="5.5" width="1.5" height="1.5" fill="white" opacity=".75" />
      <rect x="8"  y="9"   width="6" height="1.5" fill="#2CFF8F" />
      <rect x="6"  y="1"   width="2" height="3"   fill="#5B8CFF" />
      <rect x="14" y="1"   width="2" height="3"   fill="#5B8CFF" />
      <rect x="6.5"  y="1.5" width="1" height="2" fill="#18E6FF" opacity=".7" />
      <rect x="14.5" y="1.5" width="1" height="2" fill="#18E6FF" opacity=".7" />
    </svg>
  );
}

/* ── Typing indicator ── */
function TypingDots() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "4px", padding: "9px 13px" }}>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            width: "6px",
            height: "6px",
            background: "#2CFF8F",
            animation: `dewDot 1.2s ease-in-out ${i * 0.2}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

/* ── Single message bubble ── */
function Bubble({ msg, isNew }: { msg: Message; isNew: boolean }) {
  const isUser = msg.role === "user";
  return (
    <div
      style={{
        display: "flex",
        justifyContent: isUser ? "flex-end" : "flex-start",
        marginBottom: "12px",
        animation: isNew ? "bubblePop .18s ease-out" : "none",
      }}
    >
      {!isUser && (
        <div style={{ flexShrink: 0, marginRight: "8px", marginTop: "3px" }}>
          <MascotIcon size={22} />
        </div>
      )}
      <div
        style={{
          maxWidth: "80%",
          padding: "9px 12px",
          fontSize: "11px",
          lineHeight: "1.75",
          fontFamily: "ui-monospace, monospace",
          background: isUser
            ? "linear-gradient(135deg,rgba(44,255,143,.13),rgba(24,230,255,.08))"
            : "rgba(255,255,255,.05)",
          border: `1.5px solid ${isUser ? "rgba(44,255,143,.4)" : "rgba(91,140,255,.22)"}`,
          color: "rgba(232,224,255,.92)",
          whiteSpace: "pre-wrap",
          wordBreak: "break-word",
        }}
      >
        {msg.content}
      </div>
    </div>
  );
}

/* ── Suggestion chips ── */
const SUGGESTIONS = [
  "What is PixelDew? 🌱",
  "Write me a pixel haiku",
  "Help me debug my code",
  "Tell me a nerdy joke",
];

/* ── Main widget ── */
export default function DewbitChat() {
  const [open,    setOpen]    = useState(false);
  const [msgs,    setMsgs]    = useState<Message[]>([WELCOME]);
  const [input,   setInput]   = useState("");
  const [loading, setLoading] = useState(false);
  const [unread,  setUnread]  = useState(1);
  const [newIdx,  setNewIdx]  = useState<number | null>(0); // index of last new msg
  const [error,   setError]   = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef  = useRef<HTMLInputElement>(null);

  /* auto-scroll */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs, loading]);

  /* focus & clear unread on open */
  useEffect(() => {
    if (open) {
      setUnread(0);
      setTimeout(() => inputRef.current?.focus(), 120);
    }
  }, [open]);

  const send = useCallback(async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    setError("");
    const next: Message[] = [...msgs, { role: "user", content: trimmed }];
    setMsgs(next);
    setNewIdx(next.length - 1);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        const detail = errData?.detail?.error?.message || errData?.detail?.raw || "";
        throw new Error(`HTTP ${res.status}${detail ? ": " + detail : ""}`);
      }

      const data = await res.json();
      const reply: Message = {
        role: "assistant",
        content: data.text ?? "🌱 ...bits scattered. Try again?",
      };

      setMsgs((prev) => {
        const updated = [...prev, reply];
        setNewIdx(updated.length - 1);
        return updated;
      });
      if (!open) setUnread((n) => n + 1);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "unknown";
      setError(`💾 Connection failed [${msg}] — check your ANTHROPIC_API_KEY env var.`);
    } finally {
      setLoading(false);
    }
  }, [msgs, loading, open]);

  function handleKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(input); }
  }

  function clearChat() {
    setMsgs([{
      role: "assistant",
      content: "🌱 Memory wiped! New game+ activated.\nWhat are we building today? 🎮",
    }]);
    setNewIdx(0);
    setError("");
  }

  const canSend = !loading && input.trim().length > 0;

  return (
    <>
      {/* ── Keyframes (injected once) ── */}
      <style>{`
        @keyframes dewDot   { 0%,80%,100%{transform:translateY(0);opacity:.35} 40%{transform:translateY(-6px);opacity:1} }
        @keyframes bubblePop{ 0%{transform:translateY(7px);opacity:0} 100%{transform:translateY(0);opacity:1} }
        @keyframes widgetPop{ 0%{transform:scale(.88) translateY(16px);opacity:0} 100%{transform:scale(1) translateY(0);opacity:1} }
        @keyframes dewFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }
        @keyframes fabGlow  { 0%,100%{box-shadow:0 0 18px rgba(44,255,143,.55),0 6px 22px rgba(0,0,0,.5)} 50%{box-shadow:0 0 34px rgba(44,255,143,.9),0 6px 30px rgba(0,0,0,.5)} }
        @keyframes badgePop { 0%{transform:scale(0)} 70%{transform:scale(1.2)} 100%{transform:scale(1)} }
        .dw-input::placeholder{color:rgba(255,255,255,.25)}
        .dw-input:focus{outline:none;border-color:rgba(44,255,143,.65)!important;box-shadow:0 0 0 2px rgba(44,255,143,.08)}
        .dw-scroll::-webkit-scrollbar{width:3px}
        .dw-scroll::-webkit-scrollbar-track{background:transparent}
        .dw-scroll::-webkit-scrollbar-thumb{background:rgba(44,255,143,.2)}
        .dw-chip{background:rgba(44,255,143,.06);border:1px solid rgba(44,255,143,.22);color:rgba(232,224,255,.7);font-family:ui-monospace,monospace;font-size:9.5px;padding:4px 10px;cursor:pointer;transition:.15s;white-space:nowrap}
        .dw-chip:hover{background:rgba(44,255,143,.14);border-color:rgba(44,255,143,.45);color:#e8e0ff}
        .dw-send{transition:all .18s}
        .dw-send:hover:not(:disabled){filter:brightness(1.12);transform:scale(1.05)}
        .dw-close:hover{color:rgba(255,59,212,.9)!important}
        .dw-clear:hover{color:rgba(255,255,255,.6)!important}
      `}</style>

      {/* ════════════════════════════════
          CHAT PANEL
      ════════════════════════════════ */}
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Dewbit Chat"
          style={{
            position: "fixed",
            bottom: "88px",
            right: "20px",
            width: "min(348px, calc(100vw - 28px))",
            height: "500px",
            zIndex: 9000,
            display: "flex",
            flexDirection: "column",
            background: "linear-gradient(160deg,#110026 0%,#0d001e 100%)",
            border: "2px dotted rgba(44,255,143,.3)",
            boxShadow: "0 0 50px rgba(44,255,143,.1),0 28px 60px rgba(0,0,0,.8),inset 0 0 60px rgba(44,255,143,.02)",
            animation: "widgetPop .22s ease-out",
          }}
        >
          {/* ── Header ── */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "11px 14px",
            borderBottom: "1.5px solid rgba(44,255,143,.14)",
            background: "rgba(44,255,143,.03)",
            flexShrink: 0,
          }}>
            <div style={{ animation: "dewFloat 3.5s ease-in-out infinite", flexShrink: 0 }}>
              <MascotIcon size={28} />
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: "'Press Start 2P',monospace", fontSize: "9px", color: "#2CFF8F", letterSpacing: ".08em" }}>
                Dewbit
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "5px", marginTop: "3px" }}>
                <span style={{ display: "inline-block", width: "6px", height: "6px", background: "#2CFF8F", borderRadius: "50%", boxShadow: "0 0 7px #2CFF8F" }} />
                <span style={{ fontFamily: "ui-monospace,monospace", fontSize: "9px", color: "rgba(44,255,143,.5)" }}>
                  online · pixel-powered
                </span>
              </div>
            </div>

            {/* Clear */}
            <button onClick={clearChat} title="Clear chat" className="dw-clear"
              style={{ background: "none", border: "none", color: "rgba(255,255,255,.22)", cursor: "pointer", fontSize: "15px", padding: "3px 7px", lineHeight: 1 }}>
              ↺
            </button>
            {/* Close */}
            <button onClick={() => setOpen(false)} aria-label="Close Dewbit" className="dw-close"
              style={{ background: "none", border: "none", color: "rgba(255,59,212,.5)", cursor: "pointer", fontFamily: "'Press Start 2P',monospace", fontSize: "8px", padding: "3px 5px" }}>
              ✕
            </button>
          </div>

          {/* ── Messages ── */}
          <div className="dw-scroll" style={{ flex: 1, overflowY: "auto", padding: "14px 12px 6px" }}>

            {msgs.map((m, i) => (
              <Bubble key={i} msg={m} isNew={i === newIdx} />
            ))}

            {/* Typing indicator */}
            {loading && (
              <div style={{ display: "flex", justifyContent: "flex-start", marginBottom: "10px" }}>
                <div style={{ border: "1.5px solid rgba(91,140,255,.2)", background: "rgba(255,255,255,.04)" }}>
                  <TypingDots />
                </div>
              </div>
            )}

            {/* Error banner */}
            {error && (
              <div style={{
                margin: "4px 0 10px",
                padding: "8px 12px",
                border: "1.5px solid rgba(255,59,212,.35)",
                background: "rgba(255,59,212,.07)",
                fontFamily: "ui-monospace,monospace",
                fontSize: "10px",
                color: "rgba(255,59,212,.85)",
                lineHeight: "1.6",
              }}>
                {error}
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* ── Suggestion chips (show only on welcome) ── */}
          {msgs.length === 1 && !loading && (
            <div style={{
              display: "flex",
              gap: "6px",
              overflowX: "auto",
              padding: "6px 12px 2px",
              flexShrink: 0,
            }}
              className="dw-scroll"
            >
              {SUGGESTIONS.map((s) => (
                <button key={s} className="dw-chip" onClick={() => send(s)}>
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* ── Input row ── */}
          <div style={{
            padding: "10px 12px",
            borderTop: "1.5px solid rgba(44,255,143,.11)",
            display: "flex",
            gap: "8px",
            background: "rgba(0,0,0,.28)",
            flexShrink: 0,
          }}>
            <input
              ref={inputRef}
              className="dw-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Ask Dewbit anything..."
              disabled={loading}
              aria-label="Message"
              style={{
                flex: 1,
                background: "rgba(255,255,255,.05)",
                border: "1.5px solid rgba(44,255,143,.2)",
                color: "#e8e0ff",
                padding: "8px 10px",
                fontFamily: "ui-monospace,monospace",
                fontSize: "11px",
                transition: "border-color .2s",
              }}
            />
            <button
              onClick={() => send(input)}
              disabled={!canSend}
              className="dw-send"
              aria-label="Send"
              style={{
                background: canSend
                  ? "linear-gradient(135deg,#2CFF8F,#18E6FF)"
                  : "rgba(44,255,143,.12)",
                border: "none",
                color: canSend ? "#080018" : "rgba(44,255,143,.3)",
                width: "38px",
                height: "38px",
                cursor: canSend ? "pointer" : "not-allowed",
                fontFamily: "'Press Start 2P',monospace",
                fontSize: "11px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              {loading ? "…" : "→"}
            </button>
          </div>

          {/* ── Footer tag ── */}
          <div style={{
            padding: "5px 12px 7px",
            fontFamily: "ui-monospace,monospace",
            fontSize: "8px",
            color: "rgba(255,255,255,.16)",
            textAlign: "center",
            background: "rgba(0,0,0,.22)",
            flexShrink: 0,
          }}>
            ↵ to send · claude-powered · pixeldew.xyz
          </div>
        </div>
      )}

      {/* ════════════════════════════════
          FAB BUTTON
      ════════════════════════════════ */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close Dewbit" : "Chat with Dewbit"}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          width: "56px",
          height: "56px",
          zIndex: 9001,
          background: open
            ? "linear-gradient(135deg,#FF3BD4,#7B2FFF)"
            : "linear-gradient(135deg,#2CFF8F,#18E6FF)",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          animation: open ? "none" : "fabGlow 2.8s ease-in-out infinite",
          transition: "background .3s",
        }}
      >
        {open ? (
          <span style={{ fontFamily: "'Press Start 2P',monospace", fontSize: "12px", color: "white" }}>✕</span>
        ) : (
          /* Dewbit face on button */
          <svg width="30" height="30" viewBox="0 0 22 22" fill="none" aria-hidden="true">
            <rect x="4"  y="6"  width="14" height="12" fill="#080018" />
            <rect x="6"  y="3"  width="10" height="8"  fill="#080018" />
            <rect x="7.5"  y="5.5" width="2.5" height="2.5" fill="#18E6FF" />
            <rect x="12.5" y="5.5" width="2.5" height="2.5" fill="#18E6FF" />
            <rect x="8.5"  y="6"   width="1"   height="1"   fill="white" opacity=".8" />
            <rect x="13.5" y="6"   width="1"   height="1"   fill="white" opacity=".8" />
            <rect x="8"    y="9"   width="6"   height="1.5" fill="#2CFF8F" />
            <rect x="6.5"  y="1.5" width="1.5" height="2.5" fill="#5B8CFF" />
            <rect x="14"   y="1.5" width="1.5" height="2.5" fill="#5B8CFF" />
          </svg>
        )}

        {/* Unread badge */}
        {!open && unread > 0 && (
          <div
            aria-label={`${unread} unread`}
            style={{
              position: "absolute",
              top: "-5px",
              right: "-5px",
              width: "19px",
              height: "19px",
              background: "#FF3BD4",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "'Press Start 2P',monospace",
              fontSize: "7px",
              color: "white",
              boxShadow: "0 0 12px rgba(255,59,212,.7)",
              animation: "badgePop .3s ease-out",
            }}
          >
            {unread > 9 ? "9+" : unread}
          </div>
        )}
      </button>
    </>
  );
}

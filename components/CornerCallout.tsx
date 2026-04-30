"use client";
import { useState } from "react";

export default function CornerCallout() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <>
      {/* Desktop: fixed corner */}
      <div
        className="hidden md:block fixed bottom-6 right-6 z-40 max-w-xs callout-card p-4 rounded-none"
        role="complementary"
        aria-label="PixelDew tagline"
      >
        <button
          onClick={() => setDismissed(true)}
          className="absolute top-2 right-3 opacity-30 hover:opacity-70 transition-opacity font-pixel"
          style={{ fontSize: "8px", color: "#2CFF8F" }}
          aria-label="Dismiss"
        >
          ✕
        </button>

        {/* Pixel face icon */}
        <div className="flex items-start gap-3">
          <div
            className="w-10 h-10 flex-shrink-0 flex items-center justify-center border"
            style={{
              borderColor: "rgba(44,255,143,0.4)",
              background: "rgba(44,255,143,0.08)",
              fontSize: "18px",
            }}
            aria-hidden="true"
          >
            🌱
          </div>
          <div>
            <p
              className="font-pixel leading-relaxed"
              style={{ fontSize: "8px", color: "rgba(232,224,255,0.9)", lineHeight: "1.8" }}
            >
              PixelDew builds the{" "}
              <span className="underline-mint" style={{ color: "#2CFF8F" }}>
                bits
              </span>{" "}
              you don&apos;t want to{" "}
              <span className="underline-mint" style={{ color: "#18E6FF" }}>
                build.
              </span>
            </p>
            <a
              href="#try"
              className="mt-3 inline-block font-pixel"
              style={{
                fontSize: "7px",
                color: "#2CFF8F",
                textDecoration: "underline",
                textUnderlineOffset: "3px",
              }}
            >
              Start for free →
            </a>
          </div>
        </div>
      </div>

      {/* Mobile: inline at bottom of page (rendered in Footer area) */}
    </>
  );
}

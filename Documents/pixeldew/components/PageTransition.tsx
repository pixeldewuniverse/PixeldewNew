"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

export default function PageTransition() {
  const pathname = usePathname();
  const [phase, setPhase] = useState<"idle" | "enter" | "exit">("enter");
  const prevPathname = useRef(pathname);
  const timerA = useRef<ReturnType<typeof setTimeout> | null>(null);
  const timerB = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Initial curtain reveal on mount
  useEffect(() => {
    timerA.current = setTimeout(() => setPhase("exit"), 50);
    timerB.current = setTimeout(() => setPhase("idle"), 500);
    return () => {
      if (timerA.current) clearTimeout(timerA.current);
      if (timerB.current) clearTimeout(timerB.current);
    };
  }, []);

  // Route change transition
  useEffect(() => {
    if (pathname === prevPathname.current) return;
    prevPathname.current = pathname;

    setPhase("enter");
    timerA.current = setTimeout(() => setPhase("exit"), 400);
    timerB.current = setTimeout(() => setPhase("idle"), 850);

    return () => {
      if (timerA.current) clearTimeout(timerA.current);
      if (timerB.current) clearTimeout(timerB.current);
    };
  }, [pathname]);

  if (phase === "idle") return null;

  const transform =
    phase === "enter" ? "translateY(0%)" : "translateY(-100%)";

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99990,
        background: "linear-gradient(135deg, #1ddd78 0%, #0ecfdf 50%, #080012 100%)",
        transform,
        pointerEvents: "none",
        transition: "transform 400ms cubic-bezier(0.215, 0.61, 0.355, 1)",
      }}
    />
  );
}

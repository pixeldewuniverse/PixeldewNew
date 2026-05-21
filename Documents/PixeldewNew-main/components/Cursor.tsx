"use client";
import { useEffect } from "react";

export default function Cursor() {
  useEffect(() => {
    const dot  = document.getElementById("cursor-dot") as HTMLElement | null;
    const ring = document.getElementById("cursor-ring") as HTMLElement | null;
    if (!dot || !ring) return;

    const d = dot!;
    const r = ring!;

    let rx = -100, ry = -100;
    let mx = -100, my = -100;
    let raf: number;

    function lerp(a: number, b: number, t: number) {
      return a + (b - a) * t;
    }

    function loop() {
      rx = lerp(rx, mx, 0.1);
      ry = lerp(ry, my, 0.1);
      r.style.left = rx + "px";
      r.style.top  = ry + "px";
      raf = requestAnimationFrame(loop);
    }

    function onMove(e: MouseEvent) {
      mx = e.clientX;
      my = e.clientY;
      d.style.left = mx + "px";
      d.style.top  = my + "px";
    }

    function onEnter() { document.body.classList.add("hovering"); }
    function onLeave() { document.body.classList.remove("hovering"); }

    const targets = document.querySelectorAll("a, button, [data-hover]");
    targets.forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      targets.forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
    };
  }, []);

  return null;
}

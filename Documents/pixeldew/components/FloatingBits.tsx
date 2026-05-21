"use client";

const BITS = [
  { char: "P", x: "8%", y: "15%", color: "#2CFF8F", cls: "float-1", size: "11px", delay: "0s" },
  { char: "D", x: "88%", y: "12%", color: "#18E6FF", cls: "float-2", size: "13px", delay: "1s" },
  { char: "W", x: "5%", y: "55%", color: "#5B8CFF", cls: "float-3", size: "10px", delay: "2s" },
  { char: "X", x: "92%", y: "45%", color: "#FF3BD4", cls: "float-4", size: "12px", delay: "0.5s" },
  { char: "M", x: "15%", y: "78%", color: "#2CFF8F", cls: "float-5", size: "9px", delay: "3s" },
  { char: "N", x: "80%", y: "72%", color: "#18E6FF", cls: "float-1", size: "11px", delay: "1.5s" },
  { char: "0", x: "50%", y: "8%", color: "#5B8CFF", cls: "float-2", size: "10px", delay: "2.5s" },
  { char: "1", x: "72%", y: "88%", color: "#2CFF8F", cls: "float-3", size: "8px", delay: "0.8s" },
  { char: "*", x: "25%", y: "90%", color: "#FF3BD4", cls: "float-4", size: "14px", delay: "4s" },
  { char: "#", x: "60%", y: "5%", color: "#18E6FF", cls: "float-5", size: "10px", delay: "1.2s" },
  { char: "U", x: "3%", y: "30%", color: "#FF3BD4", cls: "float-2", size: "9px", delay: "3.5s" },
  { char: "V", x: "95%", y: "65%", color: "#2CFF8F", cls: "float-4", size: "11px", delay: "0.3s" },
  { char: "Ξ", x: "40%", y: "92%", color: "#5B8CFF", cls: "float-1", size: "12px", delay: "2.8s" },
  { char: "◆", x: "18%", y: "10%", color: "#18E6FF", cls: "float-3", size: "8px", delay: "1.8s" },
  { char: "⬡", x: "78%", y: "25%", color: "#FF3BD4", cls: "float-5", size: "10px", delay: "4.5s" },
];

export default function FloatingBits() {
  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      {BITS.map((bit, i) => (
        <span
          key={i}
          className={`absolute font-pixel select-none ${bit.cls}`}
          style={{
            left: bit.x,
            top: bit.y,
            color: bit.color,
            fontSize: bit.size,
            animationDelay: bit.delay,
            opacity: 0.45,
            filter: `drop-shadow(0 0 6px ${bit.color}88)`,
          }}
        >
          {bit.char}
        </span>
      ))}
    </div>
  );
}

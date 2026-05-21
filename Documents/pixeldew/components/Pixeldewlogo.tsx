interface Props {
  size?: number;
  showText?: boolean;
  className?: string;
}

export default function PixelDewLogo({ size = 40, showText = true, className = "" }: Props) {
  return (
    <svg
      width={showText ? size * 4.2 : size}
      height={size}
      viewBox={showText ? "0 0 420 100" : "0 0 100 100"}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="PixelDew"
    >
      {/* Drop / icon mark */}
      <g transform="translate(50 50) scale(0.44) translate(-100 -100)">
        {/* Main drop shape */}
        <path
          d="M100 18 C 100 18, 142 70, 158 110 A 60 60 0 1 1 42 110 C 58 70, 100 18, 100 18 Z"
          fill="#1ddd78"
        />
        {/* Pixel bite — dark square cutout */}
        <rect x="118" y="42" width="28" height="28" fill="#080012" />
        {/* Pixel accent dot */}
        <rect x="148" y="20" width="14" height="14" fill="#1ddd78" />
      </g>

      {showText && (
        <>
          {/* Wordmark */}
          <text
            x="106"
            y="62"
            fontFamily='"Press Start 2P", monospace'
            fontSize="26"
            fill="#1ddd78"
            letterSpacing="2"
            style={{ textShadow: "0 0 16px rgba(29,221,120,0.5)" }}
          >
            PixelDew
          </text>
          {/* Tagline dot */}
          <circle cx="96" cy="56" r="3" fill="#0ecfdf" opacity="0.7" />
        </>
      )}
    </svg>
  );
}

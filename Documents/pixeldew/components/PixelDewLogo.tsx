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
      {/* Monogram P — per Brand Guideline O3 */}
      <g transform="translate(50 50) scale(0.44) translate(-100 -100)">
        {/* Main P shape (22u wide, 64u tall) */}
        <g>
          {/* P stem */}
          <rect x="60" y="18" width="14" height="92" fill="#1DDD78" />
          {/* P bowl — drop shape */}
          <path
            d="M74 28 Q 100 28, 100 60 Q 100 92, 74 92 L74 28 Z"
            fill="#1DDD78"
          />
          {/* Drop cutout inside bowl */}
          <path
            d="M82 40 C 82 40, 105 72, 115 105 A 42 42 0 1 1 50 105 C 60 72, 82 40, 82 40 Z"
            fill="#08002"
          />
        </g>

        {/* Pixel jatuh — 6u square, 14u below P */}
        <rect x="60" y="118" width="14" height="14" fill="#1DDD78" />
      </g>

      {showText && (
        <>
          {/* Wordmark */}
          <text
            x="106"
            y="62"
            fontFamily='"League Spartan", sans-serif'
            fontSize="32"
            fontWeight="700"
            fill="#F5F3FA"
            letterSpacing="2"
          >
            PixelDew
          </text>
          {/* Tagline accent */}
          <circle cx="96" cy="56" r="3" fill="#0ECFDF" opacity="0.8" />
        </>
      )}
    </svg>
  );
}

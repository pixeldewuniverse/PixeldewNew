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
      {/* Monogram P with drop — precise design */}
      <g>
        {showText ? (
          /* With text: smaller P on left */
          <>
            {/* P Mark */}
            <g transform="translate(0, 10) scale(0.8)">
              {/* P stem */}
              <rect x="10" y="10" width="14" height="75" fill="#1DDD78" rx="2" />

              {/* P bowl */}
              <path
                d="M 24 20 Q 48 20 48 45 Q 48 70 24 70 L 24 20 Z"
                fill="#1DDD78"
              />

              {/* Drop cutout inside bowl */}
              <path
                d="M 28 32 C 28 32, 42 50, 48 65 C 48 65, 42 70, 28 70 C 28 70, 28 50, 28 32 Z"
                fill="#08002"
              />

              {/* Drop shape (white) inside cutout */}
              <path
                d="M 32 40 C 32 40, 38 53, 42 62 C 42 62, 38 66, 32 66 C 32 66, 32 53, 32 40 Z"
                fill="#F5F3FA"
              />

              {/* Pixel jatuh */}
              <rect x="10" y="78" width="10" height="10" fill="#1DDD78" rx="1" />
            </g>

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
        ) : (
          /* Mark only: full size */
          <>
            {/* P stem */}
            <rect x="12" y="8" width="16" height="84" fill="#1DDD78" rx="2.5" />

            {/* P bowl */}
            <path
              d="M 28 18 Q 56 18 56 50 Q 56 82 28 82 L 28 18 Z"
              fill="#1DDD78"
            />

            {/* Drop cutout inside bowl */}
            <path
              d="M 32 30 C 32 30, 50 55, 56 75 C 56 75, 50 82, 32 82 C 32 82, 32 55, 32 30 Z"
              fill="#08002"
            />

            {/* Drop shape (white) inside cutout */}
            <path
              d="M 36 38 C 36 38, 46 58, 52 70 C 52 70, 46 78, 36 78 C 36 78, 36 58, 36 38 Z"
              fill="#F5F3FA"
            />

            {/* Pixel jatuh */}
            <rect x="12" y="86" width="12" height="12" fill="#1DDD78" rx="1.5" />
          </>
        )}
      </g>
    </svg>
  );
}

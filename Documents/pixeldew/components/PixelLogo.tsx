export default function PixelLogo({ size = 28 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="PixelDew Logo"
    >
      {/* Pixel grid logo — stylized "PD" in blocky pixels */}
      <rect x="2" y="2" width="4" height="4" fill="#1DDD78" />
      <rect x="6" y="2" width="4" height="4" fill="#1DDD78" />
      <rect x="10" y="2" width="4" height="4" fill="#1DDD78" />
      <rect x="2" y="6" width="4" height="4" fill="#1DDD78" />
      <rect x="10" y="6" width="4" height="4" fill="#0ECFDF" />
      <rect x="2" y="10" width="4" height="4" fill="#1DDD78" />
      <rect x="6" y="10" width="4" height="4" fill="#1DDD78" />
      <rect x="10" y="10" width="4" height="4" fill="#1DDD78" />
      {/* right column — D shape */}
      <rect x="16" y="2" width="4" height="4" fill="#4a7aff" />
      <rect x="20" y="2" width="4" height="4" fill="#4a7aff" />
      <rect x="16" y="6" width="4" height="4" fill="#4a7aff" />
      <rect x="24" y="6" width="4" height="4" fill="#0ECFDF" />
      <rect x="16" y="10" width="4" height="4" fill="#4a7aff" />
      <rect x="20" y="10" width="4" height="4" fill="#4a7aff" />
      {/* bottom row accent */}
      <rect x="2" y="22" width="4" height="4" fill="#E02CB8" opacity="0.7" />
      <rect x="8" y="22" width="4" height="4" fill="#1DDD78" opacity="0.5" />
      <rect x="14" y="22" width="4" height="4" fill="#0ECFDF" opacity="0.5" />
      <rect x="20" y="22" width="4" height="4" fill="#4a7aff" opacity="0.7" />
    </svg>
  );
}

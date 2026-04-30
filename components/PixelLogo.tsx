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
      <rect x="2" y="2" width="4" height="4" fill="#2CFF8F" />
      <rect x="6" y="2" width="4" height="4" fill="#2CFF8F" />
      <rect x="10" y="2" width="4" height="4" fill="#2CFF8F" />
      <rect x="2" y="6" width="4" height="4" fill="#2CFF8F" />
      <rect x="10" y="6" width="4" height="4" fill="#18E6FF" />
      <rect x="2" y="10" width="4" height="4" fill="#2CFF8F" />
      <rect x="6" y="10" width="4" height="4" fill="#2CFF8F" />
      <rect x="10" y="10" width="4" height="4" fill="#2CFF8F" />
      {/* right column — D shape */}
      <rect x="16" y="2" width="4" height="4" fill="#5B8CFF" />
      <rect x="20" y="2" width="4" height="4" fill="#5B8CFF" />
      <rect x="16" y="6" width="4" height="4" fill="#5B8CFF" />
      <rect x="24" y="6" width="4" height="4" fill="#18E6FF" />
      <rect x="16" y="10" width="4" height="4" fill="#5B8CFF" />
      <rect x="20" y="10" width="4" height="4" fill="#5B8CFF" />
      {/* bottom row accent */}
      <rect x="2" y="22" width="4" height="4" fill="#FF3BD4" opacity="0.7" />
      <rect x="8" y="22" width="4" height="4" fill="#2CFF8F" opacity="0.5" />
      <rect x="14" y="22" width="4" height="4" fill="#18E6FF" opacity="0.5" />
      <rect x="20" y="22" width="4" height="4" fill="#5B8CFF" opacity="0.7" />
    </svg>
  );
}

export default function PixelMascot({ size = 80 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="PixelDew mascot - Dewbit"
    >
      {/* Body */}
      <rect x="16" y="20" width="32" height="28" fill="#160033" stroke="#2CFF8F" strokeWidth="2" />
      {/* Head */}
      <rect x="20" y="8" width="24" height="20" fill="#160033" stroke="#2CFF8F" strokeWidth="2" />
      {/* Eyes */}
      <rect x="24" y="14" width="6" height="6" fill="#18E6FF" />
      <rect x="34" y="14" width="6" height="6" fill="#18E6FF" />
      {/* Eye glow */}
      <rect x="25" y="15" width="2" height="2" fill="white" opacity="0.8" />
      <rect x="35" y="15" width="2" height="2" fill="white" opacity="0.8" />
      {/* Mouth */}
      <rect x="26" y="22" width="12" height="2" fill="#2CFF8F" />
      <rect x="24" y="24" width="2" height="2" fill="#2CFF8F" />
      <rect x="38" y="24" width="2" height="2" fill="#2CFF8F" />
      {/* Ears / antennas */}
      <rect x="22" y="4" width="4" height="6" fill="#5B8CFF" />
      <rect x="38" y="4" width="4" height="6" fill="#5B8CFF" />
      <rect x="23" y="2" width="2" height="2" fill="#2CFF8F" />
      <rect x="39" y="2" width="2" height="2" fill="#2CFF8F" />
      {/* Body details */}
      <rect x="20" y="30" width="8" height="6" fill="#2CFF8F" opacity="0.3" />
      <rect x="36" y="30" width="8" height="6" fill="#18E6FF" opacity="0.3" />
      <rect x="28" y="32" width="8" height="4" fill="#5B8CFF" opacity="0.4" />
      {/* Feet */}
      <rect x="18" y="48" width="10" height="6" fill="#2CFF8F" opacity="0.7" />
      <rect x="36" y="48" width="10" height="6" fill="#2CFF8F" opacity="0.7" />
      {/* Arms */}
      <rect x="8" y="24" width="8" height="4" fill="#160033" stroke="#5B8CFF" strokeWidth="1.5" />
      <rect x="48" y="24" width="8" height="4" fill="#160033" stroke="#5B8CFF" strokeWidth="1.5" />
    </svg>
  );
}

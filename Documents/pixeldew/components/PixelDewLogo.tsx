// Official PixelDew Monogram P (brand guideline v1.1).
// Geometry is copied from the brand SVGs; do not redraw by hand.
interface PixelDewLogoProps {
  size?: number;
  showText?: boolean;
  markColor?: string;
  textColor?: string;
  className?: string;
}

const MARK_PATH =
  "M24 14 H68 A32 32 0 0 1 68 78 H46 V94 H24 Z M66 26 C66 26 74.4 36.4 77.6 44.4 A12 12 0 1 1 54.4 44.4 C57.6 36.4 66 26 66 26 Z";

// League Spartan Bold "PixelDew", outlined so it never depends on the web font.
const WORDMARK: { t: string; d: string }[] = [
  { t: "translate(120.00 78) scale(0.03864 -0.03864)", d: "M85 1320H565Q692 1320 794.5 1275.0Q897 1230 957.0 1140.0Q1017 1050 1017 914Q1017 779 957.0 684.5Q897 590 794.5 540.5Q692 491 565 491H384V0H85ZM384 727H482Q573 727 635.5 768.0Q698 809 698 907Q698 1005 635.5 1044.5Q573 1084 482 1084H384Z" },
  { t: "translate(162.73 78) scale(0.03864 -0.03864)", d: "M250 990Q178 990 128.0 1040.5Q78 1091 78 1161Q78 1231 128.5 1282.5Q179 1334 250 1334Q320 1334 371.5 1283.0Q423 1232 423 1161Q423 1091 372.0 1040.5Q321 990 250 990ZM94 0V821H398V0Z" },
  { t: "translate(182.98 78) scale(0.03864 -0.03864)", d: "M703 441 1052 0H715L521 253L327 0H13L361 417L48 821H388L540 610L699 821H1007Z" },
  { t: "translate(224.97 78) scale(0.03864 -0.03864)", d: "M326 347Q330 279 383.0 237.0Q436 195 529 195Q615 195 677.0 220.0Q739 245 768 274L886 86Q847 45 762.5 10.5Q678 -24 509 -24Q372 -24 266.0 27.0Q160 78 100.0 177.0Q40 276 40 420Q40 539 92.5 635.5Q145 732 244.5 788.5Q344 845 485 845Q686 845 804.5 735.0Q923 625 923 411Q923 402 922.0 378.0Q921 354 920 347ZM637 505Q635 553 600.0 597.5Q565 642 490 642Q414 642 375.0 600.0Q336 558 333 505Z" },
  { t: "translate(263.46 78) scale(0.03864 -0.03864)", d: "M388 0H83V1376H388Z" },
  { t: "translate(282.77 78) scale(0.03864 -0.03864)", d: "M86 1320H483Q693 1320 832.0 1235.5Q971 1151 1040.0 1002.0Q1109 853 1109 661Q1109 468 1040.5 319.0Q972 170 833.0 85.0Q694 0 483 0H86ZM384 1055V265H456Q568 265 642.5 316.5Q717 368 754.5 457.0Q792 546 792 659Q792 772 755.0 861.5Q718 951 643.5 1003.0Q569 1055 456 1055Z" },
  { t: "translate(329.18 78) scale(0.03864 -0.03864)", d: "M326 347Q330 279 383.0 237.0Q436 195 529 195Q615 195 677.0 220.0Q739 245 768 274L886 86Q847 45 762.5 10.5Q678 -24 509 -24Q372 -24 266.0 27.0Q160 78 100.0 177.0Q40 276 40 420Q40 539 92.5 635.5Q145 732 244.5 788.5Q344 845 485 845Q686 845 804.5 735.0Q923 625 923 411Q923 402 922.0 378.0Q921 354 920 347ZM637 505Q635 553 600.0 597.5Q565 642 490 642Q414 642 375.0 600.0Q336 558 333 505Z" },
  { t: "translate(367.66 78) scale(0.03864 -0.03864)", d: "M716 476 525 0H246L-26 821H297L428 325L617 805H817L1003 325L1135 821H1458L1187 0H909Z" },
];

export default function PixelDewLogo({
  size = 40,
  showText = true,
  markColor = "#1DDD78",
  textColor = "#F5F3FA",
  className = "",
}: PixelDewLogoProps) {
  const viewBox = showText ? "10 0 428 128" : "2 5 120 120";
  const width = showText ? (size * 428) / 128 : size;

  return (
    <svg
      width={width}
      height={size}
      viewBox={viewBox}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="PixelDew"
    >
      <path d={MARK_PATH} fill={markColor} fillRule="evenodd" />
      <rect x="28" y="100" width="14" height="14" fill={markColor} />
      {showText && (
        <g fill={textColor}>
          {WORDMARK.map((g, i) => (
            <path key={i} transform={g.t} d={g.d} />
          ))}
        </g>
      )}
    </svg>
  );
}

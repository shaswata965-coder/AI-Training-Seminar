/**
 * Compact Aura head used for the brand mark and small buttons (solid fills, no ids). Both builds are drawn and
 * CSS shows the one chosen in Site settings (globals.css); colours follow Site settings → Site-wide → Aura too.
 */
export function AuraHead({ size = 36, className, eye }: { size?: number; className?: string; eye?: string }) {
  const eyeFill = eye ?? "var(--aura-eye, #5fe3ff)";
  const shell = "var(--aura-body-1, #f5f8fc)";
  const edge = "var(--aura-edge, #7d8ba1)";
  const visor = "var(--aura-visor-1, #16223b)";
  return (
    <svg viewBox="0 0 64 48" width={size} height={(size * 48) / 64} className={className} aria-hidden focusable="false">
      <g className="aura-b-strong">
        <rect x="1.5" y="15" width="7" height="17" rx="3" fill="var(--aura-trim-2, #1c2a4d)" />
        <rect x="55.5" y="15" width="7" height="17" rx="3" fill="var(--aura-trim-2, #1c2a4d)" />
        <path d="M16 2.5 H48 C54.5 2.5 57.5 6.5 57.5 13 V30 C57.5 37 54 41.5 47.5 43.5 L42 45.5 H22 L16.5 43.5 C10 41.5 6.5 37 6.5 30 V13 C6.5 6.5 9.5 2.5 16 2.5 Z" fill={shell} stroke={edge} strokeWidth="1.2" />
        <path d="M11 11 C13 7 16.5 5.2 21 5" fill="none" stroke="#ffffff" strokeOpacity="var(--aura-shine, 0.85)" strokeWidth="2" strokeLinecap="round" />
        <path d="M15 12.5 L30 15 Q32 15.4 34 15 L49 12.5 C51 12.2 52.5 13.5 52.5 15.5 V29 C52.5 32.6 50 35 46.5 35 H17.5 C14 35 11.5 32.6 11.5 29 V15.5 C11.5 13.5 13 12.2 15 12.5 Z" fill={visor} />
        <rect className="aura-head-eye" x="18.5" y="21.5" width="10.5" height="6" rx="2.6" fill={eyeFill} transform="rotate(5 23.75 24.5)" />
        <rect className="aura-head-eye" x="35" y="21.5" width="10.5" height="6" rx="2.6" fill={eyeFill} transform="rotate(-5 40.25 24.5)" />
        <rect x="26.5" y="38" width="11" height="3.2" rx="1.4" fill={visor} opacity="0.75" />
      </g>
      <g className="aura-b-classic">
        <path d="M32 2 C51 2 62 12 62 25 C62 38 49 46 32 46 C15 46 2 38 2 25 C2 12 13 2 32 2 Z" fill={shell} stroke={edge} strokeWidth="1.2" />
        <path d="M14 10 C18 6 23 4.5 28 4.2" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
        <path d="M32 9 C46 9 54 16 54 25 C54 34 45 39 32 39 C19 39 10 34 10 25 C10 16 18 9 32 9 Z" fill={visor} />
        <ellipse className="aura-head-eye" cx="23.5" cy="25" rx="4.2" ry="5.6" fill={eyeFill} />
        <ellipse className="aura-head-eye" cx="40.5" cy="25" rx="4.2" ry="5.6" fill={eyeFill} />
        <circle cx="22" cy="22.6" r="1.2" fill="#fff" opacity=".9" />
        <circle cx="39" cy="22.6" r="1.2" fill="#fff" opacity=".9" />
      </g>
    </svg>
  );
}

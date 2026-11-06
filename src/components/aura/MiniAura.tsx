import { cn } from "@/lib/cn";

/**
 * A tiny Aura drawn in the surrounding tone (--accent / --accent-ink), used beside section header
 * labels. He floats, blinks, glances toward the label and now and then waves (see .mini-aura in
 * app/tags.css). Both builds are drawn and CSS shows the one chosen in Site settings (globals.css).
 * Pure SVG and CSS, so it works in server components; decorative.
 * `flip` mirrors him so he faces left (for the trace after a centred label).
 */
export function MiniAura({ className, flip }: { className?: string; flip?: boolean }) {
  return (
    <svg viewBox="0 0 40 46" aria-hidden focusable="false" className={cn("mini-aura", flip && "-scale-x-100", className)}>
      <ellipse cx="20" cy="44" rx="7" ry="1.6" className="mini-aura-shadow" />
      <g className="mini-aura-bot">
        <g className="aura-b-strong">
          <rect x="6" y="28" width="5" height="9" rx="2.5" className="mini-aura-shell" />
          <circle cx="8.5" cy="38.2" r="2.7" className="mini-aura-visor" />
        </g>
        <g className="aura-b-classic">
          <ellipse cx="9.5" cy="31" rx="2.6" ry="4.4" className="mini-aura-shell" />
        </g>
        <g className="mini-aura-wave">
          <g className="aura-b-strong">
            <rect x="29" y="28" width="5" height="9" rx="2.5" className="mini-aura-shell" />
            <circle cx="31.5" cy="38.2" r="2.7" className="mini-aura-visor" />
          </g>
          <g className="aura-b-classic">
            <ellipse cx="30.5" cy="31" rx="2.6" ry="4.4" className="mini-aura-shell" />
          </g>
        </g>
        <path className="mini-aura-shell aura-b-strong" d="M13.5 25.5 H26.5 C31.5 25.5 34 27.8 34 31 C34 35.5 29 40.5 23 41 H17 C11 40.5 6 35.5 6 31 C6 27.8 8.5 25.5 13.5 25.5 Z" />
        <ellipse cx="20" cy="31.5" rx="9.5" ry="8.5" className="mini-aura-shell aura-b-classic" />
        <circle cx="20" cy="31" r="2.2" className="mini-aura-core" />
        <g className="aura-b-strong">
          <rect x="2" y="9" width="3.4" height="9" rx="1.5" className="mini-aura-visor" />
          <rect x="34.6" y="9" width="3.4" height="9" rx="1.5" className="mini-aura-visor" />
          <path d="M11 2.5 H29 C33 2.5 35.5 5 35.5 9 V17 C35.5 21 33 23.5 29.5 24.5 H10.5 C7 23.5 4.5 21 4.5 17 V9 C4.5 5 7 2.5 11 2.5 Z" className="mini-aura-shell" />
          <path d="M9.5 7.6 L18.5 9.2 Q20 9.5 21.5 9.2 L30.5 7.6 C31.8 7.4 32.6 8.2 32.6 9.4 V16.3 C32.6 18.4 31.2 19.8 29.1 19.8 H10.9 C8.8 19.8 7.4 18.4 7.4 16.3 V9.4 C7.4 8.2 8.2 7.4 9.5 7.6 Z" className="mini-aura-visor" />
        </g>
        <g className="aura-b-classic">
          <path d="M20 2.5 C31 2.5 36.5 8 36.5 14.5 C36.5 21 30 25 20 25 C10 25 3.5 21 3.5 14.5 C3.5 8 9 2.5 20 2.5 Z" className="mini-aura-shell" />
          <path d="M20 7 C28 7 31.5 10.5 31.5 14.5 C31.5 18.5 27 21 20 21 C13 21 8.5 18.5 8.5 14.5 C8.5 10.5 12 7 20 7 Z" className="mini-aura-visor" />
        </g>
        <g className="mini-aura-eyes">
          <g className="aura-b-strong">
            <rect x="12.6" y="12.6" width="6" height="3.6" rx="1.5" />
            <rect x="21.4" y="12.6" width="6" height="3.6" rx="1.5" />
          </g>
          <g className="aura-b-classic">
            <ellipse cx="15.5" cy="14.5" rx="2.1" ry="2.8" />
            <ellipse cx="24.5" cy="14.5" rx="2.1" ry="2.8" />
          </g>
        </g>
      </g>
    </svg>
  );
}

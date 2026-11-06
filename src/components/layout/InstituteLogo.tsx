/* eslint-disable @next/next/no-img-element -- see Avatar.tsx */
import { cn } from "@/lib/cn";
import { withBase } from "@/lib/paths";

/** The bundled logos (public/logos), from the Department of CSE's own documents. */
const LOGOS = {
  /** The Daffodil International University wordmark with its shield, on white. */
  university: { src: "/logos/diu.png", alt: "Daffodil International University", width: 437, height: 115 },
  /** The Department of Computer Science and Engineering seal, round, on transparent. */
  department: { src: "/logos/diu-cse.png", alt: "Department of Computer Science and Engineering, Daffodil International University", width: 256, height: 256 },
  /** The DIU shield alone, on transparent. */
  shield: { src: "/logos/diu-shield.png", alt: "Daffodil International University", width: 256, height: 256 },
};

/** The DIU shield (on transparent), also pinned on Aura as his badge (AuraArt). */
export const DIU_SHIELD = LOGOS.shield.src;

/**
 * The university's and the department's logos. The DIU wordmark has a white background of its own, so it sits on a
 * white tile in both themes. A logo uploaded in Admin → Site settings → Site-wide → Logos & images is shown as
 * uploaded. `decorative` drops the alt text when the name is written next to the logo.
 */
export function InstituteLogo({ kind, upload, decorative = false, className }: { kind: keyof typeof LOGOS; upload?: string; decorative?: boolean; className?: string }) {
  const logo = LOGOS[kind];
  return (
    <span className={cn("flex shrink-0", className)}>
      <img src={withBase(upload || logo.src)} alt={decorative ? "" : logo.alt} width={logo.width} height={logo.height} decoding="async" className="h-full w-auto max-w-none" />
    </span>
  );
}

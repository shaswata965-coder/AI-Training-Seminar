/*
 * Aura's look, chosen in Admin → Site settings → Site-wide → Aura: his build (the shape he is drawn in), his
 * colours and his eye colour. Shared by the drawing (AuraArt, AuraHead, MiniAura), the root layout (which sets
 * them for the whole site, see `auraLookStyle`) and the admin form. Plain data, safe on server and client.
 */

/** "strong": square-jawed and broad-shouldered, with fists (the default); "classic": the original rounded robot. */
export const AURA_BUILDS = ["strong", "classic"] as const;
export type AuraBuild = (typeof AURA_BUILDS)[number];
/** What AuraArt draws: one build, or ("auto") both, with CSS showing the one set on <html data-aura-build>. */
export type AuraBuildChoice = AuraBuild | "auto";

export const AURA_BUILD_OPTIONS: { value: AuraBuild; label: string }[] = [
  { value: "strong", label: "Strong: square jaw, broad shoulders, fists" },
  { value: "classic", label: "Classic: the original rounded robot" },
];

export interface AuraColours {
  body1: string;
  body2: string;
  body3: string;
  visor1: string;
  visor2: string;
  line: string;
  edge: string;
  /** Shoulder pads, ear modules and fists. */
  trim1: string;
  trim2: string;
  /** How strongly the white highlights show on the body (lower on dark colours). */
  shine: string;
}

export const AURA_COLOR_KEYS = ["steel", "navy", "graphite", "white"] as const;
export type AuraColorKey = (typeof AURA_COLOR_KEYS)[number];

export const AURA_COLORS: Record<AuraColorKey, { label: string; colours: AuraColours }> = {
  steel: {
    label: "Steel: brushed silver with navy armour",
    colours: { body1: "#f5f8fc", body2: "#c8d2df", body3: "#8695ab", visor1: "#16223b", visor2: "#04080f", line: "#4d5c75", edge: "#7d8ba1", trim1: "#3e5486", trim2: "#1c2a4d", shine: "0.85" },
  },
  navy: {
    label: "DIU blue: deep blue with gold armour",
    colours: { body1: "#7da2e4", body2: "#2f5bb0", body3: "#15306c", visor1: "#0b1324", visor2: "#02050b", line: "#0e1f45", edge: "#14295a", trim1: "#ffd36b", trim2: "#d99a14", shine: "0.45" },
  },
  graphite: {
    label: "Graphite: dark grey with orange armour",
    colours: { body1: "#9aa1ad", body2: "#545b67", body3: "#272c34", visor1: "#0a0d12", visor2: "#020304", line: "#171b21", edge: "#1d2229", trim1: "#ff9a4d", trim2: "#e0601b", shine: "0.4" },
  },
  white: {
    label: "Classic white: glossy white with blue armour",
    colours: { body1: "#ffffff", body2: "#f1f5fb", body3: "#d3ddec", visor1: "#1d2946", visor2: "#060a14", line: "#93a4be", edge: "#c9d4e5", trim1: "#6f8de8", trim2: "#3b5bdb", shine: "0.9" },
  },
};

/** "auto": each section's own eye colour (aqua by default); otherwise one colour everywhere. */
export const AURA_EYE_KEYS = ["auto", "aqua", "blue", "green", "amber", "red"] as const;
export type AuraEyeKey = (typeof AURA_EYE_KEYS)[number];

export const AURA_EYE_CHOICES: Record<AuraEyeKey, { label: string; colour: string | null }> = {
  auto: { label: "A colour for each section", colour: null },
  aqua: { label: "Aqua everywhere", colour: "#5fe3ff" },
  blue: { label: "Blue everywhere", colour: "#5aa9ff" },
  green: { label: "Green everywhere", colour: "#4cf0a0" },
  amber: { label: "Amber everywhere", colour: "#ffc23d" },
  red: { label: "Red everywhere", colour: "#ff5a52" },
};

const pick = <K extends string>(keys: readonly K[], value: unknown, fallback: K): K => ((keys as readonly unknown[]).includes(value) ? (value as K) : fallback);

/** The look stored in Site settings, with anything unknown read as the default. */
export function auraLookSettings(s: { auraBuild?: unknown; auraColor?: unknown; auraEyes?: unknown }) {
  return {
    build: pick(AURA_BUILDS, s.auraBuild, "strong"),
    color: pick(AURA_COLOR_KEYS, s.auraColor, "steel"),
    eyes: pick(AURA_EYE_KEYS, s.auraEyes, "auto"),
  };
}

/** CSS custom properties for Aura's colours (and a fixed eye colour), as `name:value` pairs. */
export function auraColourVars(color: AuraColorKey, eyes: AuraEyeKey): string[] {
  const c = AURA_COLORS[color].colours;
  const vars = [
    `--aura-body-1:${c.body1}`,
    `--aura-body-2:${c.body2}`,
    `--aura-body-3:${c.body3}`,
    `--aura-visor-1:${c.visor1}`,
    `--aura-visor-2:${c.visor2}`,
    `--aura-line:${c.line}`,
    `--aura-edge:${c.edge}`,
    `--aura-trim-1:${c.trim1}`,
    `--aura-trim-2:${c.trim2}`,
    `--aura-shine:${c.shine}`,
  ];
  const eye = AURA_EYE_CHOICES[eyes].colour;
  if (eye) vars.push(`--aura-eye:${eye}`);
  return vars;
}

/**
 * The <style> rule that gives every Aura on the site the chosen colours, or null for the built-in ones (steel,
 * each section's eyes: globals.css). `html:root` wins over globals.css in both themes.
 */
export function auraLookStyle(s: { auraColor?: unknown; auraEyes?: unknown }): string | null {
  const { color, eyes } = auraLookSettings(s);
  if (color === "steel" && eyes === "auto") return null;
  return `html:root{${auraColourVars(color, eyes).join(";")}}`;
}

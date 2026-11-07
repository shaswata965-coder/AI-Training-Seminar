import type { SiteSettings } from "@/lib/content/types";
import { venueLine } from "@/lib/training";
import type { CopyKey, PageCopy } from "@/lib/schema/page-copy";

/*
 * Section texts from Site settings (src/lib/schema/page-copy.ts), with their
 * placeholders filled in: {programme}, {short}, {venue}, {venueName},
 * {tagline}, {organiser}, {replyBy}, plus any a section passes itself (e.g. {count}).
 * The site shows no dates: an earlier text's {dates} is left out.
 */

export type Vars = Record<string, string | number>;

/** Replace known {placeholders}; unknown ones are left as typed. */
export function fill(text: string, vars: Vars): string {
  return text.replace(/\{(\w+)\}/g, (m, k: string) => (k in vars ? String(vars[k]) : m));
}

export function siteVars(s: SiteSettings): Vars {
  return {
    programme: s.programmeName,
    short: s.shortName,
    dates: "",
    venue: venueLine(s),
    venueName: s.venueName,
    tagline: s.tagline,
    organiser: s.organisedBy,
    replyBy: replyBy(s),
  };
}

/** How the organisers reply to a training request: by e-mail (the site shows no dates). */
export function replyBy(s: SiteSettings) {
  void s;
  return "by e-mail";
}

/** One section's texts and colours, placeholders filled in. */
export function copy<K extends CopyKey>(s: SiteSettings, key: K, extra: Vars = {}): PageCopy[K] {
  const vars = { ...siteVars(s), ...extra };
  return Object.fromEntries(Object.entries(s[key]).map(([k, v]) => [k, typeof v === "string" ? fill(v, vars) : v])) as PageCopy[K];
}

/** "1 day" / "2 days". */
export const plural = (n: number, word: string) => `${n} ${word}${n === 1 ? "" : "s"}`;

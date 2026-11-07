import type { Trainer } from "@/lib/content/types";

/** What a trainer's pop-up profile shows: everything but the fields only the admin uses. Shared by client and server code. */
export type TrainerProfileData = Pick<
  Trainer,
  "id" | "slug" | "name" | "designation" | "affiliation" | "category" | "theme" | "lead" | "photo" | "bio" | "expertise" | "teaching" | "website" | "linkedin" | "x" | "scholar" | "github" | "cv"
>;

/** A trainer as the browser needs it for the pop-up, so nothing else of the record is sent. */
export function profileData(t: Trainer): TrainerProfileData {
  const { id, slug, name, designation, affiliation, category, theme, lead, photo, bio, expertise, teaching, website, linkedin, x, scholar, github, cv } = t;
  return { id, slug, name, designation, affiliation, category, theme, lead, photo, bio, expertise, teaching, website, linkedin, x, scholar, github, cv };
}

export interface ProfileSection {
  title: string;
  items: string[];
}

const HEADING = /^(?:\*\*([^*]+?)\*\*:?|#{1,3}\s+(.+?))\s*$/;
const BULLET = /^(?:[-*•]|\d+[.)])\s+/;

/**
 * A profile as the pop-up shows it: headings, each with its bullet points. Written in the admin as a line
 * "**Heading**" (or "## Heading") followed by lines starting with "- ". Any other line becomes a bullet too,
 * under the heading before it (or `fallback` at the top), so the pop-up never shows a paragraph.
 */
export function profileSections(text: string, fallback = "Profile"): ProfileSection[] {
  const out: ProfileSection[] = [];
  for (const raw of text.replace(/\r\n/g, "\n").split("\n")) {
    const line = raw.trim();
    if (!line) continue;
    const h = HEADING.exec(line);
    if (h) {
      out.push({ title: (h[1] ?? h[2]).trim(), items: [] });
      continue;
    }
    if (!out.length) out.push({ title: fallback, items: [] });
    out[out.length - 1].items.push(line.replace(BULLET, ""));
  }
  return out.filter((s) => s.items.length);
}

/** "Machine learning, data science" → ["Machine learning", "data science"], for the expertise tags. */
export const expertiseTags = (expertise: string) =>
  expertise
    .split(/[,;\n]/)
    .map((t) => t.trim())
    .filter(Boolean);

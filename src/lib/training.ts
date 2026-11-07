import type { Session, SiteSettings } from "./content/types";

/*
 * The training is custom: every one is planned with the organisation that asks for it, so the site shows no
 * dates. The schedule is a sample plan, its days numbered (Day 1, Day 2…) by the sessions themselves.
 */

/** The days of the sample plan, 1 to the last day a session is on (at most 7); two days while there are none. */
export function planDays(sessions: Pick<Session, "day">[]): number[] {
  const last = Math.max(0, ...sessions.map((x) => Math.round(Number(x.day)) || 0));
  return Array.from({ length: Math.min(last || 2, 7) }, (_, i) => i + 1);
}

/** "Day 2". */
export const dayLabel = (day: number | string) => `Day ${day}`;

/** "DIU AI Training Seminars 2026" → { title: "DIU AI Training Seminars", year: "2026" }. Names without a trailing year keep it empty. */
export function splitProgrammeName(name: string): { title: string; year: string } {
  const m = name.trim().match(/^(.+?)\s+(20\d\d)$/);
  return m ? { title: m[1], year: m[2] } : { title: name.trim(), year: "" };
}

/** The programme's name for the logo, and a year only if the name ends with one. */
export function brandName(s: SiteSettings): { title: string; year: string } {
  return splitProgrammeName(s.programmeName);
}

export function venueLine(s: SiteSettings) {
  return [s.venueHall, s.venueName].filter(Boolean).join(", ");
}

/** Where "Contact us" leads: the training request form, or an external form set in Site settings. */
export function registrationHref(s: SiteSettings) {
  return s.registrationUrl || "/contact";
}

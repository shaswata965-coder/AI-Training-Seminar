import type { ThemeKey } from "@/lib/content/constants";
import type { Participant } from "@/lib/content/types";

/** Participants grouped by their batch, newest first (by the date it was completed, then by name). Shared by client and server code. */
export function batchesOf(participants: Participant[]) {
  const groups = new Map<string, { batch: string; completed: string; people: Participant[] }>();
  for (const p of participants) {
    const key = p.batch.trim() || "Other";
    const g = groups.get(key) ?? { batch: key, completed: "", people: [] };
    g.people.push(p);
    if (p.completed > g.completed) g.completed = p.completed;
    groups.set(key, g);
  }
  return [...groups.values()].sort((a, b) => b.completed.localeCompare(a.completed) || a.batch.localeCompare(b.batch, undefined, { numeric: true }));
}

/** Whether someone took part in a programme: its own participants, and those who completed both ("general"). */
export const tookPart = (p: Pick<Participant, "theme">, programme: Exclude<ThemeKey, "general"> | "all") => programme === "all" || p.theme === programme || p.theme === "general";

/** The numbers at the top of the Past participants page. */
export function participantStats(participants: Participant[]) {
  return {
    participants: participants.length,
    batches: batchesOf(participants).length,
    organisations: new Set(participants.map((p) => p.organisation.trim().toLowerCase()).filter(Boolean)).size,
    programmes: new Set(participants.flatMap((p) => (p.theme === "general" ? ["professionals", "workspace"] : [p.theme]))).size,
  };
}

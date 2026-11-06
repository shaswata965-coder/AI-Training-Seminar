import type { NextRequest } from "next/server";
import { stripMarkdown } from "@/components/ui/RichText";
import { buildIcs } from "@/lib/calendar";
import { getSavedSettings, getSessions, getTrainers } from "@/lib/content/queries";
import { venueLine } from "@/lib/event";
import { eventDayDate, localDateTime } from "@/lib/format";
import { absoluteUrl } from "@/lib/paths";
import { trainingIcs } from "@/lib/server/emails";

function ics(body: string, filename: string) {
  return new Response(body, {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "public, max-age=300",
    },
  });
}

/** /api/calendar → every day of the batch; /api/calendar?session=<id> → one session. */
export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("session");
  const s = await getSavedSettings();
  if (!id) return ics(trainingIcs(s), "diu-ai-training.ics");

  const [sessions, trainers] = await Promise.all([getSessions(), getTrainers()]);
  const x = s.programmeStatus === "tba" ? undefined : sessions.find((v) => v.id === id);
  if (!x) return new Response("Session not found", { status: 404 });
  const date = eventDayDate(s.startDate, x.day);
  const start = localDateTime(date, x.start);
  const end = localDateTime(date, x.end || x.start);
  if (!start || !end) return new Response("Session has no time yet", { status: 404 });
  const names = [...x.trainers, ...x.panelists].map((sid) => trainers.find((sp) => sp.id === sid)?.name).filter(Boolean);
  const body = buildIcs(
    [
      {
        uid: `diuai-session-${x.id}@${new URL(absoluteUrl("/")).hostname}`,
        title: x.title,
        start,
        end: end.getTime() > start.getTime() ? end : new Date(start.getTime() + 30 * 60_000),
        description: [names.length ? `Trainers: ${names.join(", ")}` : "", stripMarkdown(x.description), absoluteUrl(`/programme?day=${x.day}#session-${x.id}`)].filter(Boolean).join("\n\n"),
        location: [x.room, venueLine(s)].filter(Boolean).join(", "),
        url: absoluteUrl("/programme"),
      },
    ],
    s.eventName,
  );
  return ics(body, `session-${x.id}.ics`);
}

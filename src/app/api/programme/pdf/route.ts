import { getSchedulePdf } from "@/lib/server/pdf";

/** Downloadable programme (auto-generated from the schedule in the admin panel). */
export async function GET() {
  const bytes = await getSchedulePdf();
  return new Response(new Blob([bytes as BlobPart], { type: "application/pdf" }), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="diu-ai-training-schedule.pdf"',
      "Cache-Control": "public, max-age=300",
    },
  });
}

import type { NextRequest } from "next/server";
import { getSavedSettings } from "@/lib/content/queries";
import { ENQUIRY_FORMS, FORM_SETTINGS, FORMS, isBuiltIn, storedText, type FormField } from "@/lib/forms";
import { Enquiry, Registration } from "@/lib/models";
import { recordActivity } from "@/lib/server/activity";
import { requireAdmin } from "@/lib/server/admin-auth";
import { toCsv } from "@/lib/server/csv";
import { error } from "@/lib/server/http";

type Row = Record<string, unknown> & { answers?: Record<string, unknown> };

const BUILT_IN_LABELS: Record<string, string> = { name: "Name", email: "E-mail", organisation: "Organisation", phone: "Phone", subject: "Subject", message: "Message" };

/** A column for each field of a form now, then for questions deleted since that someone answered. */
function columns(fields: FormField[], rows: Row[]): { key: string; label: string }[] {
  return withEarlier(fields.map((f) => ({ key: f.key, label: f.label })), rows);
}

/** `cols` and a column for each answer to a question not among them (deleted from the form since). */
function withEarlier(cols: { key: string; label: string }[], rows: Row[]) {
  const known = new Set(cols.map((c) => c.key));
  for (const r of rows)
    for (const k of Object.keys(r.answers ?? {})) {
      if (known.has(k)) continue;
      known.add(k);
      cols.push({ key: k, label: `Earlier question (${k})` });
    }
  return cols;
}

const TITLES: Record<string, string> = { registrations: "Registrations (CSV)", enquiries: "Enquiries (CSV)" };

/** CSV downloads: /api/admin/export/registrations | enquiries */
export async function GET(req: NextRequest, ctx: RouteContext<"/api/admin/export/[kind]">) {
  const { kind } = await ctx.params;
  const area = kind === "enquiries" ? "enquiries" : "registrations";
  const user = await requireAdmin(req, { permission: area });
  if (user instanceof Response) return user;
  const s = await getSavedSettings();
  let csv: string;
  if (kind === "registrations") {
    const rows = (await Registration.find({}).sort({ createdAt: 1 }).lean()) as unknown as Row[];
    const cols = columns(s.registerFields, rows);
    csv = toCsv(
      ["Registration ID", "Registered at (BST)", "Status", ...cols.map((c) => c.label), "Notes"],
      rows.map((r) => [r.regId, r.createdAt, r.status, ...cols.map((c) => storedText(r, c.key)), r.notes]),
    );
  } else if (kind === "enquiries") {
    const rows = (await Enquiry.find({}).sort({ createdAt: 1 }).lean()) as unknown as Row[];
    // The enquiry forms share their built-in fields; each one's added questions get columns of their own.
    const cols = withEarlier(
      [
        ...["name", "email", "organisation", "phone", "subject", "message"].map((key) => ({ key, label: BUILT_IN_LABELS[key] })),
        ...(["contact", "sponsor"] as const).flatMap((t) =>
          s[FORM_SETTINGS[ENQUIRY_FORMS[t]]].filter((f) => !isBuiltIn(ENQUIRY_FORMS[t], f.key)).map((f) => ({ key: f.key, label: `${f.label} (${FORMS[ENQUIRY_FORMS[t]].title})` })),
        ),
      ],
      rows,
    );
    csv = toCsv(["Received at (BST)", "Type", "Status", ...cols.map((c) => c.label), "Notes"], rows.map((r) => [r.createdAt, r.type, r.status, ...cols.map((c) => storedText(r, c.key)), r.notes]));
  } else {
    return error(404, "Unknown export.");
  }
  await recordActivity(user, { action: "downloaded", area, target: TITLES[kind] });
  const stamp = new Date().toISOString().slice(0, 10);
  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="diu-ai-training-${kind}-${stamp}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}

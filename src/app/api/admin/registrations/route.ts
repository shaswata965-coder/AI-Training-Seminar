import type { NextRequest } from "next/server";
import { toPlain } from "@/lib/content/normalize";
import { Registration } from "@/lib/models";
import { requireAdmin } from "@/lib/server/admin-auth";
import { json } from "@/lib/server/http";

export async function GET(req: NextRequest) {
  const user = await requireAdmin(req, { permission: "registrations" });
  if (user instanceof Response) return user;
  const docs = await Registration.find({}).sort({ createdAt: -1 }).limit(10000).lean();
  return json({ data: docs.map((d) => toPlain(d)) });
}

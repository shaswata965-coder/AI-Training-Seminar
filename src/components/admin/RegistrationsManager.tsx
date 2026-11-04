"use client";

import { Download, Search, Trash } from "lucide-react";
import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { useToast } from "@/components/ui/Toast";
import { cn } from "@/lib/cn";
import { FORM_DEFAULTS, FORM_SETTINGS, responseRows, storedText, type FormField, type FormKey } from "@/lib/forms";
import { formatDateTime } from "@/lib/format";
import { withBase } from "@/lib/paths";
import { PageTitle, useMe } from "./AdminShell";
import { api, useApi } from "./api";

interface Registration {
  id: string;
  regId: string;
  name: string;
  email: string;
  phone: string;
  organisation: string;
  designation: string;
  category: string;
  city: string;
  country: string;
  interests: string[];
  tutorials: boolean;
  experience: string;
  dietary: string;
  accessibility: string;
  heardFrom: string;
  message: string;
  status: string;
  notes: string;
  emailSent: boolean;
  createdAt: string;
}
const STATUS = ["registered", "confirmed", "waitlisted", "cancelled"] as const;
const DEFAULT_FORMS = Object.fromEntries((Object.keys(FORM_SETTINGS) as FormKey[]).map((k) => [k, FORM_DEFAULTS[FORM_SETTINGS[k]]])) as Record<FormKey, FormField[]>;

const TONE: Record<string, "azure" | "mint" | "butter" | "blush" | "lilac"> = { registered: "azure", confirmed: "mint", waitlisted: "butter", cancelled: "blush" };

export function RegistrationsManager() {
  const me = useMe();
  const toast = useToast();
  const { data, loading, reload, setData } = useApi<Registration[]>("/registrations");
  // The forms' questions, to show each answer by; the built-in ones until they have loaded.
  const forms = useApi<Record<FormKey, FormField[]>>("/forms").data ?? DEFAULT_FORMS;
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("all");
  const [open, setOpen] = useState<Registration | null>(null);
  const [notes, setNotes] = useState("");

  const rows = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return (data ?? []).filter((r) => (status === "all" || r.status === status) && (!needle || JSON.stringify(r).toLowerCase().includes(needle)));
  }, [data, q, status]);

  async function update(r: Registration, patch: { status?: string; notes?: string }) {
    try {
      await api(`/registrations/${r.id}`, { method: "PATCH", json: patch });
      setData((list) => (list ?? []).map((x) => (x.id === r.id ? { ...x, ...patch } : x)));
      if (open?.id === r.id) setOpen({ ...open, ...patch } as Registration);
      toast("Updated", "success");
    } catch (e) {
      toast(e instanceof Error ? e.message : "Failed", "error");
    }
  }

  async function remove(r: Registration) {
    if (!window.confirm("Delete this registration permanently?")) return;
    try {
      await api(`/registrations/${r.id}`, { method: "DELETE" });
      setOpen(null);
      reload();
      toast("Deleted", "success");
    } catch (e) {
      toast(e instanceof Error ? e.message : "Failed", "error");
    }
  }

  return (
    <div>
      <PageTitle
        title="Registrations"
        description="Everyone who registered through the website. Update statuses, add notes and download spreadsheets."
        actions={
          <a href={withBase("/api/admin/export/workshop")} data-ripple="" className="btn-shine inline-flex h-11 items-center gap-2 rounded-full bg-brand px-4 text-sm font-semibold text-brand-fg hover:-translate-y-0.5 hover:bg-brand-strong">
            <Download size={16} aria-hidden /> Download CSV
          </a>
        }
      />
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <label className="relative min-w-[14rem] flex-1">
          <span className="sr-only">Search</span>
          <Search size={17} aria-hidden className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-subtle" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search name, e-mail, organisation, ID…" className="h-11 w-full rounded-full border border-border bg-surface pr-4 pl-10 text-sm focus:border-brand focus:outline-none" />
        </label>
        <select value={status} onChange={(e) => setStatus(e.target.value)} className="h-11 rounded-full border border-border bg-surface px-4 text-sm font-semibold" aria-label="Filter by status">
          <option value="all">All statuses</option>
          {STATUS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <span className="text-sm text-subtle">{data ? `${rows.length} of ${data.length}` : ""}</span>
      </div>

      {loading ? <div className="card p-10 text-center text-muted">Loading…</div> : null}
      {data && !data.length ? <div className="card p-10 text-center text-muted">No registrations yet.</div> : null}
      {rows.length ? (
        <div className="card overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="border-b border-border bg-surface-2 text-xs tracking-[0.08em] text-subtle uppercase">
              <tr>
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Organisation</th>
                <th className="px-4 py-3">Programme</th>
                <th className="px-4 py-3">Registered</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className="cursor-pointer border-b border-border last:border-0 hover:bg-surface-2/60" onClick={() => { setOpen(r); setNotes(r.notes ?? ""); }}>
                  <td className="px-4 py-3 font-semibold text-fg tabular">{r.regId}</td>
                  <td className="px-4 py-3">
                    <button type="button" className="text-left font-semibold text-fg hover:text-brand" onClick={(e) => { e.stopPropagation(); setOpen(r); setNotes(r.notes ?? ""); }}>
                      {r.name}
                    </button>
                    <span className="block text-xs text-subtle">{r.email}</span>
                  </td>
                  <td className="px-4 py-3 text-muted">
                    {r.organisation}
                    <span className="block text-xs text-subtle">{storedText(r as unknown as Record<string, unknown>, "category")}</span>
                  </td>
                  <td className="px-4 py-3 text-muted">{storedText(r as unknown as Record<string, unknown>, "interests")}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-muted">{formatDateTime(r.createdAt)}</td>
                  <td className="px-4 py-3">
                    <Badge tone={TONE[r.status] ?? "azure"} size="xs" dot>
                      {r.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}

      <Modal open={open !== null} onClose={() => setOpen(null)} labelledBy="reg-title" size="lg">
        {open ? (
          <div className="p-6 sm:p-8">
            <p className="text-xs font-bold tracking-[0.12em] text-subtle uppercase">{open.regId}</p>
            <h2 id="reg-title" className="mt-1 font-display text-2xl font-bold text-fg">
              {open.name}
            </h2>
            {/* Every answer, by the question it answered on the form (Site settings), long ones across the width. */}
            <dl className="mt-5 grid gap-3 text-sm sm:grid-cols-2">
              {[
                ...responseRows(open as unknown as Record<string, unknown>, forms.register).filter((r) => r.key !== "name"),
                { key: "emailSent", label: "Confirmation e-mail", text: open.emailSent ? "Sent" : "Not sent" },
              ].map((r) => (
                <div key={r.key} className={cn(r.text.length > 60 && "sm:col-span-2")}>
                  <dt className="text-xs font-bold tracking-[0.1em] text-subtle uppercase">{r.label}</dt>
                  <dd className="mt-0.5 break-words whitespace-pre-wrap text-fg">{r.text || "-"}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-6 grid gap-3">
              <label className="text-sm font-semibold text-fg" htmlFor="reg-status">
                Status
              </label>
              <select id="reg-status" value={open.status} onChange={(e) => update(open, { status: e.target.value })} className="h-11 rounded-xl border border-border bg-surface px-3 text-sm">
                {STATUS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              <label className="text-sm font-semibold text-fg" htmlFor="reg-notes">
                Internal notes
              </label>
              <textarea id="reg-notes" rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} className="rounded-xl border border-border bg-surface p-3 text-sm" />
              <div className="flex flex-wrap justify-between gap-2">
                {me?.role === "admin" ? (
                  <Button variant="ghost" className="text-blush-ink" onClick={() => remove(open)} icon={<Trash size={16} aria-hidden />}>
                    Delete
                  </Button>
                ) : (
                  <span />
                )}
                <Button onClick={() => update(open, { notes })}>Save notes</Button>
              </div>
            </div>
          </div>
        ) : null}
      </Modal>
    </div>
  );
}

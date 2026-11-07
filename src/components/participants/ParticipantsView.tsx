"use client";

import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { PersonCard } from "@/components/ui/PersonCard";
import { SlidingPill, useSlidingPill } from "@/components/ui/SlidingPill";
import { cn } from "@/lib/cn";
import { THEME_META } from "@/lib/content/constants";
import type { Participant } from "@/lib/content/types";
import { batchesOf, tookPart } from "@/lib/participants";
import type { PageCopy } from "@/lib/schema/page-copy";

type Programme = "all" | "professionals" | "workspace";

/**
 * Every past participant, training by training (their `batch` field), with filters by focus area and training and a search by name or
 * organisation. Each card links to the profile they agreed to share, if any.
 */
export function ParticipantsView({ participants, text }: { participants: Participant[]; text: PageCopy["participantsList"] }) {
  const [programme, setProgramme] = useState<Programme>("all");
  const [batch, setBatch] = useState("all");
  const [q, setQ] = useState("");
  const { listRef, pillRef } = useSlidingPill(programme, '[aria-selected="true"]');
  const batches = useMemo(() => batchesOf(participants), [participants]);
  const needle = q.trim().toLowerCase();
  const shown = batches
    .filter((b) => batch === "all" || b.batch === batch)
    .map((b) => ({ ...b, people: b.people.filter((p) => tookPart(p, programme) && (!needle || `${p.name} ${p.organisation} ${p.designation}`.toLowerCase().includes(needle))) }))
    .filter((b) => b.people.length);
  const count = shown.reduce((n, b) => n + b.people.length, 0);
  const tabs: { id: Programme; label: string }[] = [
    { id: "all", label: text.all || "All" },
    { id: "professionals", label: THEME_META.professionals.short },
    { id: "workspace", label: THEME_META.workspace.short },
  ];
  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <div ref={listRef} role="tablist" aria-label="Filter by focus area" className="group/seg relative isolate inline-flex flex-wrap gap-1 rounded-[1rem] border border-border bg-surface p-1 shadow-card">
          <SlidingPill pillRef={pillRef} shape="rounded-[0.7rem]" className="bg-accent-soft ring-1 ring-[color-mix(in_oklab,var(--accent)_45%,transparent)] ring-inset" />
          {tabs.map((t) => (
            <button
              key={t.id}
              role="tab"
              type="button"
              aria-selected={programme === t.id}
              onClick={() => setProgramme(t.id)}
              data-ripple=""
              className={cn(
                "rounded-[0.7rem] px-4 py-2 text-sm font-semibold transition",
                programme === t.id
                  ? "bg-accent-soft text-accent-ink ring-1 ring-[color-mix(in_oklab,var(--accent)_45%,transparent)] group-data-[pill=on]/seg:bg-transparent group-data-[pill=on]/seg:ring-0"
                  : "text-muted hover:bg-surface-2 hover:text-fg",
              )}
            >
              {t.label}
            </button>
          ))}
        </div>
        {batches.length > 1 ? (
          <select value={batch} onChange={(e) => setBatch(e.target.value)} aria-label="Filter by training" className="h-11 rounded-xl border border-border bg-surface px-3 text-sm font-semibold">
            <option value="all">{text.allBatches || "All trainings"}</option>
            {batches.map((b) => (
              <option key={b.batch} value={b.batch}>
                {b.batch}
              </option>
            ))}
          </select>
        ) : null}
        <label className="relative ml-auto w-full max-w-xs">
          <span className="sr-only">{text.search}</span>
          <Search size={18} aria-hidden className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-subtle" />
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={text.search}
            className="h-11 w-full rounded-xl border border-border bg-surface pr-4 pl-10 text-[15px] focus:border-brand focus:ring-4 focus:ring-[color-mix(in_oklab,var(--brand)_18%,transparent)] focus:outline-none"
          />
        </label>
      </div>
      <p className="sr-only" role="status">
        {count === 1 ? "1 participant shown" : `${count} participants shown`}
      </p>

      {shown.map((b) => (
        <section key={b.batch} aria-label={b.batch} className="mt-10">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-border pb-3">
            <h3 className="font-display text-2xl font-bold text-fg">{b.batch}</h3>
            <Badge tone="neutral" size="xs">
              {b.people.length === 1 ? "1 participant" : `${b.people.length} participants`}
            </Badge>
          </div>
          <ul className="mt-6 grid grid-cols-1 gap-5 min-[480px]:grid-cols-2 lg:grid-cols-4">
            {b.people.map((p) => {
              const meta = THEME_META[p.theme] ?? THEME_META.general;
              return (
                <li key={p.id}>
                  <PersonCard
                    name={p.name}
                    photo={p.photo}
                    title={p.designation}
                    subtitle={p.organisation}
                    label={meta.short}
                    labelTone={meta.tone}
                    href={p.profileUrl || undefined}
                    linkLabel="Profile"
                    className={`tone-${meta.tone}`}
                    footer={p.quote ? <p className="line-clamp-3 text-left text-sm text-muted italic">“{p.quote}”</p> : null}
                  />
                </li>
              );
            })}
          </ul>
        </section>
      ))}
      {!shown.length ? <p className="mt-8 rounded-2xl border border-dashed border-border-strong p-8 text-center text-muted">{text.none}</p> : null}
    </div>
  );
}

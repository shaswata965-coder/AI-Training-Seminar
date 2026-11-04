"use client";

import { ArrowLeft, ArrowRight, CalendarDays, Globe, GraduationCap, MapPin, Mic2, Search, Star, Users } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { MoreTrainersCard } from "@/components/home/TrainersPreview";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { GitHubIcon, LinkedInIcon, XIcon } from "@/components/ui/BrandIcons";
import { Modal } from "@/components/ui/Modal";
import { PersonCard } from "@/components/ui/PersonCard";
import { RichText } from "@/components/ui/RichText";
import { SlidingPill, useSlidingPill } from "@/components/ui/SlidingPill";
import { cn } from "@/lib/cn";
import { replaceQuery, useUrlParam } from "@/lib/client-hooks";
import { TRAINER_CATEGORIES, TRAINER_CATEGORY_META, THEME_META } from "@/lib/content/constants";
import type { Session, Trainer } from "@/lib/content/types";
import { timeRange } from "@/lib/format";
import { OPEN_TRAINER_EVENT } from "./OpenProfile";

export interface TrainerSession extends Pick<Session, "id" | "title" | "type" | "theme" | "day" | "start" | "end" | "room" | "trainers" | "panelists" | "moderator"> {
  dayLabel: string;
}

/** Filters: every trainer, each programme's (General trainers teach both), and each label when there is more than one. */
type Filter = "all" | "professionals" | "workspace" | (typeof TRAINER_CATEGORIES)[number];
const PROGRAMME_FILTERS = [
  { id: "professionals", label: THEME_META.professionals.short },
  { id: "workspace", label: THEME_META.workspace.short },
] as const;

function Links({ sp }: { sp: Trainer }) {
  const items = [
    { href: sp.website, label: "Website", Icon: Globe },
    { href: sp.linkedin, label: "LinkedIn", Icon: LinkedInIcon },
    { href: sp.x, label: "X", Icon: XIcon },
    { href: sp.scholar, label: "Google Scholar", Icon: GraduationCap },
    { href: sp.github, label: "GitHub", Icon: GitHubIcon },
  ].filter((i) => i.href);
  if (!items.length) return null;
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map(({ href, label, Icon }) => (
        <li key={label}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            data-ripple=""
            className="inline-flex items-center gap-1.5 rounded-md border border-border bg-surface px-3 py-1.5 text-sm font-semibold text-muted transition hover:-translate-y-0.5 hover:border-brand hover:text-brand"
          >
            <span className="btn-ico-l">
              <Icon size={15} aria-hidden />
            </span>{" "}
            {label}
          </a>
        </li>
      ))}
    </ul>
  );
}

export function TrainersView({
  trainers,
  sessions,
  showMore,
  more,
}: {
  trainers: Trainer[];
  sessions: TrainerSession[];
  showMore: boolean;
  /** The “More trainers to be announced” card, from Site settings → Home → Trainers. */
  more: { title: string; text: string };
}) {
  const [filter, setFilter] = useState<Filter>("all");
  const labels = TRAINER_CATEGORIES.filter((k) => trainers.some((t) => t.category === k));
  const FILTERS: { id: Filter; label: string }[] = [
    { id: "all", label: "All" },
    ...PROGRAMME_FILTERS,
    ...(labels.length > 1 ? labels.map((k) => ({ id: k, label: TRAINER_CATEGORY_META[k].label })) : []),
  ];
  const { listRef, pillRef } = useSlidingPill(filter, '[aria-selected="true"]');
  const [q, setQ] = useState("");
  const urlSlug = useUrlParam("trainer");
  const [slugChoice, setOpenSlug] = useState<string | null | undefined>(undefined);

  const bySlug = useMemo(() => Object.fromEntries(trainers.map((s) => [s.slug, s])), [trainers]);
  const byId = useMemo(() => Object.fromEntries(trainers.map((s) => [s.id, s])), [trainers]);
  const panels = sessions.filter((s) => s.type === "panel");

  // Discussions with someone on them; the others are listed in the schedule only.
  const staffed = panels.filter((p) => p.moderator || p.panelists.length);

  const shown = trainers.filter((sp) => {
    if (filter === "professionals" || filter === "workspace") {
      if (sp.theme !== filter && sp.theme !== "general" && sp.theme) return false;
    } else if (filter !== "all" && sp.category !== filter) return false;
    const needle = q.trim().toLowerCase();
    return !needle || `${sp.name} ${sp.affiliation} ${sp.designation} ${sp.expertise}`.toLowerCase().includes(needle);
  });

  const open = useCallback((slug: string | null) => {
    setOpenSlug(slug);
    replaceQuery((p) => (slug ? p.set("trainer", slug) : p.delete("trainer")));
  }, []);

  // The lead trainer's spotlight above the grid opens profiles here (OpenProfileButton).
  useEffect(() => {
    const onOpen = (e: Event) => {
      const slug = (e as CustomEvent<string>).detail;
      if (typeof slug === "string" && bySlug[slug]) open(slug);
    };
    window.addEventListener(OPEN_TRAINER_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_TRAINER_EVENT, onOpen);
  }, [bySlug, open]);

  // Deep link: /trainers?trainer=slug opens that profile.
  const openSlug = slugChoice === undefined ? (urlSlug && bySlug[urlSlug] ? urlSlug : null) : slugChoice;

  const current = openSlug ? bySlug[openSlug] : undefined;
  const idx = current ? shown.findIndex((s) => s.slug === current.slug) : -1;
  const list = idx >= 0 ? shown : trainers;
  const pos = current ? list.findIndex((s) => s.slug === current.slug) : -1;
  const go = (d: number) => {
    if (pos < 0 || list.length < 2) return;
    open(list[(pos + d + list.length) % list.length].slug);
  };

  useEffect(() => {
    if (!current) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const appearances = current ? sessions.filter((s) => s.trainers.includes(current.id) || s.panelists.includes(current.id) || s.moderator === current.id) : [];

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <div ref={listRef} role="tablist" aria-label="Filter trainers" className="group/seg relative isolate inline-flex flex-wrap gap-1 rounded-[1rem] border border-border bg-surface p-1 shadow-card">
          <SlidingPill pillRef={pillRef} shape="rounded-[0.7rem]" className="bg-accent-soft ring-1 ring-[color-mix(in_oklab,var(--accent)_45%,transparent)] ring-inset" />
          {FILTERS.map((f) => (
            <button
              key={f.id}
              role="tab"
              type="button"
              aria-selected={filter === f.id}
              onClick={() => setFilter(f.id)}
              data-ripple=""
              className={cn(
                "rounded-[0.7rem] px-4 py-2 text-sm font-semibold transition",
                filter === f.id
                  ? "bg-accent-soft text-accent-ink ring-1 ring-[color-mix(in_oklab,var(--accent)_45%,transparent)] group-data-[pill=on]/seg:bg-transparent group-data-[pill=on]/seg:ring-0"
                  : "text-muted hover:bg-surface-2 hover:text-fg",
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
        <label className="relative ml-auto w-full max-w-xs">
          <span className="sr-only">Search trainers</span>
          <Search size={18} aria-hidden className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-subtle" />
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by name or expertise"
            className="h-11 w-full rounded-xl border border-border bg-surface pr-4 pl-10 text-[15px] focus:border-brand focus:ring-4 focus:ring-[color-mix(in_oklab,var(--brand)_18%,transparent)] focus:outline-none"
          />
        </label>
      </div>

      <p className="sr-only" role="status">
        {shown.length === 1 ? "1 trainer shown" : `${shown.length} trainers shown`}
      </p>
      <ul className="mt-8 grid grid-cols-1 gap-5 min-[480px]:grid-cols-2 lg:grid-cols-4">
        {shown.map((sp) => {
          const cat = TRAINER_CATEGORY_META[sp.category] ?? TRAINER_CATEGORY_META.faculty;
          return (
            <li key={sp.id}>
              <PersonCard
                action={{ onClick: () => open(sp.slug), hasPopup: "dialog", srHint: ", open profile" }}
                name={sp.name}
                photo={sp.photo}
                title={sp.designation}
                subtitle={sp.affiliation}
                label={sp.lead ? "Lead trainer" : cat.label}
                labelTone={sp.lead ? "butter" : cat.tone}
                className={`tone-${cat.tone}`}
                highlight={
                  sp.lead ? (
                    <span className="grid h-8 w-8 place-items-center rounded-full bg-butter text-[#5b3d00] shadow-card ring-2 ring-surface">
                      <Star size={15} aria-hidden fill="currentColor" />
                    </span>
                  ) : null
                }
                footer={sp.expertise ? <p className="line-clamp-2 text-sm font-medium text-accent-ink">{sp.expertise}</p> : <p className="text-sm font-semibold text-accent-ink">View profile</p>}
              />
            </li>
          );
        })}
        {showMore && filter === "all" && !q ? (
          <li>
            <MoreTrainersCard title={more.title} text={more.text} />
          </li>
        ) : null}
      </ul>
      {!shown.length && (filter !== "all" || q) ? <p className="mt-6 rounded-2xl border border-dashed border-border-strong p-8 text-center text-muted">No trainers match your filters yet.</p> : null}

      {/* Discussions with their moderators and panelists, once they are named. */}
      {staffed.length ? (
      <section id="panels" aria-labelledby="panels-title" className="mt-20 scroll-mt-28">
        <h2 id="panels-title" className="font-display text-3xl font-bold text-fg">
          Discussions
        </h2>
          <ul className="mt-6 grid gap-4 lg:grid-cols-2">
            {staffed.map((p) => {
              const theme = THEME_META[p.theme] ?? THEME_META.general;
              const moderator = p.moderator ? byId[p.moderator] : undefined;
              return (
                <li key={p.id} data-glow="" className={`tone-${theme.tone} card p-6`}>
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge tone="peach" size="xs" dot>
                      Discussion
                    </Badge>
                    <Badge tone={theme.tone} size="xs">
                      {theme.short}
                    </Badge>
                  </div>
                  <h3 className="mt-3 font-display text-xl font-semibold text-fg">{p.title}</h3>
                  <p className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted">
                    <span className="inline-flex items-center gap-1.5">
                      <CalendarDays size={15} aria-hidden /> {p.dayLabel} · {timeRange(p.start, p.end)}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin size={15} aria-hidden /> {p.room || "Room TBA"}
                    </span>
                  </p>
                  <div className="mt-4 grid gap-2">
                    {moderator ? (
                      <p className="flex flex-wrap items-center gap-2 text-sm">
                        <span className="inline-flex items-center gap-1 font-semibold text-subtle">
                          <Mic2 size={15} aria-hidden /> Moderator
                        </span>
                        <button type="button" onClick={() => open(moderator.slug)} data-ripple="" className="group/chip key key-sm key-line inline-flex items-center gap-2 rounded-[0.7rem] border border-border bg-surface py-1 pr-3 pl-1 font-semibold text-fg hover:bg-accent-soft">
                          <Avatar name={moderator.name} src={moderator.photo} size={26} className="transition-[scale,rotate] duration-300 group-hover/chip:scale-110 group-hover/chip:-rotate-6" />
                          {moderator.name}
                        </button>
                      </p>
                    ) : null}
                    <div className="flex flex-wrap items-center gap-2 text-sm">
                      <span className="inline-flex items-center gap-1 font-semibold text-subtle">
                        <Users size={15} aria-hidden /> Panelists
                      </span>
                      {p.panelists.length ? (
                        p.panelists
                          .map((id) => byId[id])
                          .filter(Boolean)
                          .map((sp) => (
                            <button key={sp.id} type="button" onClick={() => open(sp.slug)} data-ripple="" className="group/chip key key-sm key-line inline-flex items-center gap-2 rounded-[0.7rem] border border-border bg-surface py-1 pr-3 pl-1 font-semibold text-fg hover:bg-accent-soft">
                              <Avatar name={sp.name} src={sp.photo} size={26} className="transition-[scale,rotate] duration-300 group-hover/chip:scale-110 group-hover/chip:-rotate-6" />
                              {sp.name}
                            </button>
                          ))
                      ) : (
                        <span className="text-muted">To be announced</span>
                      )}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
      </section>
      ) : null}

      <Modal open={Boolean(current)} onClose={() => open(null)} labelledBy="trainer-modal-title" size="xl">
        {current ? (
          <div>
            <div className={`tone-${(TRAINER_CATEGORY_META[current.category] ?? TRAINER_CATEGORY_META.faculty).tone} relative overflow-hidden rounded-t-[1.75rem] bg-accent-soft px-6 pt-8 pb-6 sm:px-10`}>
              <div aria-hidden className="bg-dots absolute inset-0 opacity-60" />
              <div className="relative flex flex-col items-start gap-5 sm:flex-row sm:items-center">
                <Avatar name={current.name} src={current.photo} size={120} className="ring-4 ring-surface" />
                <div>
                  <div className="flex flex-wrap gap-2">
                    {current.lead ? (
                      <Badge tone="butter" size="xs">
                        Lead trainer
                      </Badge>
                    ) : null}
                    <Badge tone={(TRAINER_CATEGORY_META[current.category] ?? TRAINER_CATEGORY_META.faculty).tone} size="xs">
                      {(TRAINER_CATEGORY_META[current.category] ?? TRAINER_CATEGORY_META.faculty).label}
                    </Badge>
                    {current.theme && current.theme !== "general" ? (
                      <Badge tone="neutral" size="xs">
                        {THEME_META[current.theme].short}
                      </Badge>
                    ) : null}
                  </div>
                  <h2 id="trainer-modal-title" className="mt-2 font-display text-3xl font-bold text-fg">
                    {current.name}
                  </h2>
                  <p className="text-muted">{[current.designation, current.affiliation].filter(Boolean).join(", ")}</p>
                </div>
              </div>
            </div>
            <div className="grid gap-6 px-6 py-6 sm:px-10 sm:py-8">
              <Links sp={current} />
              {current.expertise || current.teaching ? (
                <div className="rounded-2xl border border-border bg-surface-2 p-5">
                  <p className="text-xs font-bold tracking-[0.14em] text-subtle uppercase">{current.expertise ? "Expertise" : "Teaches"}</p>
                  {current.expertise ? <p className="mt-1 font-display text-xl font-semibold text-fg">{current.expertise}</p> : null}
                  <RichText text={current.teaching} className="mt-2 text-[15px] leading-relaxed text-muted" />
                </div>
              ) : null}
              {current.bio ? (
                <div>
                  <p className="text-xs font-bold tracking-[0.14em] text-subtle uppercase">Profile</p>
                  <RichText text={current.bio} className="mt-2 text-[15px] leading-relaxed text-muted" />
                </div>
              ) : null}
              {appearances.length ? (
                <div>
                  <p className="text-xs font-bold tracking-[0.14em] text-subtle uppercase">In the schedule</p>
                  <ul className="mt-2 grid gap-2">
                    {appearances.map((a) => (
                      <li key={a.id}>
                        <Link href={`/programme?day=${a.day}#session-${a.id}`} className="flex items-center justify-between gap-3 rounded-2xl border border-border p-3 hover:-translate-y-0.5 hover:border-brand hover:shadow-card">
                          <span>
                            <span className="block font-semibold text-fg">{a.title}</span>
                            <span className="text-sm text-muted">
                              {a.dayLabel} · {timeRange(a.start, a.end)} · {a.room || "Room TBA"}
                            </span>
                          </span>
                          <span className="btn-ico-r text-subtle">
                            <ArrowRight size={17} aria-hidden />
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
              {list.length > 1 ? (
                <div className="flex items-center justify-between border-t border-border pt-5">
                  <button type="button" onClick={() => go(-1)} className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted hover:text-fg">
                    <span className="btn-ico-back">
                      <ArrowLeft size={16} aria-hidden />
                    </span>{" "}
                    Previous
                  </button>
                  <span className="text-xs text-subtle">Use ← → keys</span>
                  <button type="button" onClick={() => go(1)} className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted hover:text-fg">
                    Next{" "}
                    <span className="btn-ico-r">
                      <ArrowRight size={16} aria-hidden />
                    </span>
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        ) : null}
      </Modal>
    </div>
  );
}

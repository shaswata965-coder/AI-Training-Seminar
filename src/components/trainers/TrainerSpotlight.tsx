import { CalendarDays, Star, UserRound } from "lucide-react";
import type { CSSProperties } from "react";
import { Aura } from "@/components/aura/Aura";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { InlineText } from "@/components/ui/RichText";
import { expertiseTags, profileSections } from "@/lib/trainer-profile";
import { Eyebrow, Section } from "@/components/ui/Section";
import { THEME_META } from "@/lib/content/constants";
import type { SiteSettings, Trainer } from "@/lib/content/types";
import { copy, plural } from "@/lib/copy";
import { OpenProfileButton } from "./OpenProfile";

/** The trainer shown in the spotlight: the first one marked “Lead trainer”, if any. */
export const leadTrainer = (trainers: Trainer[]) => trainers.find((t) => t.lead);

/**
 * The Trainers page's hero profile: the lead trainer large, with their designation, profile, expertise and
 * programmes, the faces of the team they lead, and buttons to the full profile (the grid's pop-up) and the
 * schedule.
 */
export function TrainerSpotlight({ s, lead, trainers, teaches }: { s: SiteSettings; lead: Trainer; trainers: Trainer[]; teaches: boolean }) {
  const team = trainers.filter((t) => t.id !== lead.id);
  const c = copy(s, "trainersSpotlight", { count: plural(team.length, "trainer") });
  const expertise = expertiseTags(lead.expertise);
  // The first few points of their profile; the pop-up shows them all.
  const points = profileSections(lead.bio).flatMap((s) => s.items).slice(0, 4);
  const programmes = lead.theme && lead.theme !== "general" ? [THEME_META[lead.theme]] : [THEME_META.professionals, THEME_META.workspace];
  return (
    <Section edit="trainers.spotlight" tone={c.tone} bg={c.background} labelledBy="lead-trainer-title" tags="ribbon">
      <div className="grid items-center gap-10 lg:grid-cols-[auto_1fr] lg:gap-16">
        {/* The portrait: the photo (or initials) in a ring in the site's colours, with the lead trainer's star. */}
        <div className="relative mx-auto w-fit">
          <span aria-hidden className="absolute -inset-3 rounded-full bg-[conic-gradient(from_120deg,var(--accent),var(--lilac),var(--mint),var(--butter),var(--accent))] opacity-70 blur-[3px]" />
          <span aria-hidden className="absolute -inset-8 rounded-full border border-dashed border-border-strong opacity-60 animate-spin-slow" />
          <Avatar name={lead.name} src={lead.photo} size={232} className="relative ring-8 ring-surface" />
          <span className="absolute right-2 bottom-4 grid h-14 w-14 place-items-center rounded-full bg-butter text-[#5b3d00] shadow-card-lg ring-4 ring-surface">
            <Star size={24} aria-hidden fill="currentColor" />
          </span>
          <div className="absolute -bottom-6 -left-16 hidden sm:block">
            <Aura variant="trainers" size={120} lite />
          </div>
        </div>

        <div className="min-w-0">
          {c.eyebrow ? <Eyebrow>{c.eyebrow}</Eyebrow> : null}
          <h2 id="lead-trainer-title" className="mt-4 font-display text-3xl leading-tight font-bold text-fg sm:text-4xl lg:text-5xl">
            {lead.name}
          </h2>
          <p className="mt-3 text-lg text-muted">{[lead.designation, lead.affiliation].filter(Boolean).join(", ")}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {c.badge ? (
              <Badge tone="butter" dot>
                {c.badge}
              </Badge>
            ) : null}
            {programmes.map((p) => (
              <Badge key={p.label} tone={p.tone}>
                {p.label}
              </Badge>
            ))}
          </div>
          {points.length ? (
            <ul className="mt-6 grid max-w-3xl gap-2.5">
              {points.map((x, i) => (
                <li key={i} className="flex gap-3 text-[16px] leading-snug text-fg [&_a]:font-semibold [&_a]:text-brand [&_a]:underline">
                  <span aria-hidden className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[var(--accent)]" />
                  <span>
                    <InlineText text={x} />
                  </span>
                </li>
              ))}
            </ul>
          ) : null}
          {expertise.length ? (
            <ul className="mt-5 flex flex-wrap gap-2" aria-label="Areas of expertise">
              {expertise.map((x) => (
                <li key={x} className="rounded-lg bg-surface px-3 py-1.5 text-sm font-semibold text-accent-ink ring-1 ring-border">
                  {x}
                </li>
              ))}
            </ul>
          ) : null}
          <div className="mt-7 flex flex-wrap items-center gap-3">
            {c.profile ? (
              <OpenProfileButton slug={lead.slug} icon={<UserRound size={18} aria-hidden />}>
                {c.profile}
              </OpenProfileButton>
            ) : null}
            {c.sessions && teaches ? (
              <ButtonLink href="/programme" variant="outline" icon={<CalendarDays size={18} aria-hidden />}>
                {c.sessions}
              </ButtonLink>
            ) : null}
          </div>
          {team.length && c.team ? (
            <div className="mt-8 flex flex-wrap items-center gap-4 border-t border-border pt-6">
              <span className="flex -space-x-3">
                {team.slice(0, 8).map((t, i) => (
                  <span key={t.id} className="portal-face inline-block rounded-full ring-2 ring-surface" style={{ "--i": i } as CSSProperties} title={t.name}>
                    <Avatar name={t.name} src={t.photo} size={40} />
                  </span>
                ))}
              </span>
              <span className="text-sm font-semibold text-muted">{c.team}</span>
            </div>
          ) : null}
        </div>
      </div>
    </Section>
  );
}

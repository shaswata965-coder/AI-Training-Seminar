"use client";

import { ArrowLeft, ArrowRight, Download, Globe, GraduationCap } from "lucide-react";
import type { ReactNode } from "react";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { GitHubIcon, LinkedInIcon, XIcon } from "@/components/ui/BrandIcons";
import { ButtonLink } from "@/components/ui/Button";
import { InlineText } from "@/components/ui/RichText";
import { TRAINER_CATEGORY_META, THEME_META } from "@/lib/content/constants";
import { expertiseTags, profileSections, type TrainerProfileData } from "@/lib/trainer-profile";

export type { TrainerProfileData };

/** The file name a downloaded CV is saved under: "shaswata-bhattacharya-cv.pdf". */
const cvFileName = (t: TrainerProfileData) => `${t.slug || "trainer"}-cv${/\.(pdf|docx?)$/i.exec(t.cv.split("?")[0])?.[0].toLowerCase() ?? ".pdf"}`;

function Links({ sp }: { sp: TrainerProfileData }) {
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

/**
 * A trainer's full profile, inside a Modal: the photo, name, designation and expertise tags, a button to download
 * the CV the admin uploaded (Trainers → CV) and their links, then their highlights: the profile's headings, each
 * with its bullet points, as cards in two columns (one on phones), and what they teach. No paragraphs. Then
 * anything the page adds (`children`, e.g. their sessions) and Previous / Next when `onStep` is given. The title
 * has the id `trainer-modal-title`, for the Modal's labelledBy.
 */
export function TrainerProfile({ trainer: t, onStep, children }: { trainer: TrainerProfileData; onStep?: (d: 1 | -1) => void; children?: ReactNode }) {
  const cat = TRAINER_CATEGORY_META[t.category] ?? TRAINER_CATEGORY_META.faculty;
  const sections = [...profileSections(t.bio), ...profileSections(t.teaching, "Teaches")];
  const tags = expertiseTags(t.expertise);
  return (
    <div>
      <div className={`tone-${cat.tone} relative overflow-hidden rounded-t-[1.75rem] bg-accent-soft px-6 pt-8 pb-6 sm:px-10`}>
        <div aria-hidden className="bg-dots absolute inset-0 opacity-60" />
        <div className="relative flex flex-col items-start gap-5 sm:flex-row sm:items-center">
          <Avatar name={t.name} src={t.photo} size={136} square className="shadow-card ring-4 ring-surface" />
          <div className="min-w-0 pr-10">
            <div className="flex flex-wrap gap-2">
              {t.lead ? (
                <Badge tone="butter" size="xs">
                  Lead trainer
                </Badge>
              ) : null}
              <Badge tone={cat.tone} size="xs">
                {cat.label}
              </Badge>
              {t.theme && t.theme !== "general" ? (
                <Badge tone="neutral" size="xs">
                  {THEME_META[t.theme].short}
                </Badge>
              ) : null}
            </div>
            <h2 id="trainer-modal-title" className="mt-2 font-display text-3xl font-bold text-fg">
              {t.name}
            </h2>
            <p className="text-muted">{[t.designation, t.affiliation].filter(Boolean).join(", ")}</p>
            {tags.length ? (
              <ul aria-label="Expertise" className="mt-3 flex flex-wrap gap-1.5">
                {tags.map((tag) => (
                  <li key={tag} className="rounded-lg bg-surface/80 px-2.5 py-1 text-xs font-semibold text-accent-ink ring-1 ring-[color-mix(in_oklab,var(--accent)_45%,transparent)] ring-inset">
                    {tag}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>
      </div>
      <div className="grid gap-6 px-6 py-6 sm:px-10 sm:py-8">
        {t.cv || [t.website, t.linkedin, t.x, t.scholar, t.github].some(Boolean) ? (
          <div className="flex flex-wrap items-center gap-3">
            {t.cv ? (
              <ButtonLink href={t.cv} download={cvFileName(t)} icon={<Download size={17} aria-hidden />}>
                Download CV
              </ButtonLink>
            ) : null}
            <Links sp={t} />
          </div>
        ) : null}
        {sections.length ? (
          // Cards flow down two columns, each kept whole, so a long one doesn't leave a gap beside a short one.
          <div className={`tone-${cat.tone} gap-4 sm:columns-2`}>
            {sections.map((s, i) => (
              <section key={`${s.title}-${i}`} aria-label={s.title} className="mb-4 break-inside-avoid rounded-2xl border border-border bg-surface-2/70 p-5">
                <h3 className="flex items-center gap-2 font-display text-[15px] font-bold tracking-wide text-fg uppercase">
                  <span aria-hidden className="h-4 w-1 rounded-full bg-[var(--accent)]" />
                  {s.title}
                </h3>
                <ul className="mt-3 grid gap-2">
                  {s.items.map((item, j) => (
                    <li key={j} className="flex gap-2.5 text-[14.5px] leading-snug text-muted [&_a]:font-semibold [&_a]:text-brand [&_a]:underline [&_a]:underline-offset-2 [&_strong]:text-fg">
                      <span aria-hidden className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent-ink)]" />
                      <span>
                        <InlineText text={item} />
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        ) : null}
        {children}
        {onStep ? (
          <div className="flex items-center justify-between border-t border-border pt-5">
            <button type="button" onClick={() => onStep(-1)} className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted hover:text-fg">
              <span className="btn-ico-back">
                <ArrowLeft size={16} aria-hidden />
              </span>{" "}
              Previous
            </button>
            <span className="text-xs text-subtle">Use ← → keys</span>
            <button type="button" onClick={() => onStep(1)} className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted hover:text-fg">
              Next{" "}
              <span className="btn-ico-r">
                <ArrowRight size={16} aria-hidden />
              </span>
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

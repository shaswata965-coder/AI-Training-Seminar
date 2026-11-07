"use client";

import { ArrowLeft, ArrowRight, Download, Globe, GraduationCap } from "lucide-react";
import type { ReactNode } from "react";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { GitHubIcon, LinkedInIcon, XIcon } from "@/components/ui/BrandIcons";
import { ButtonLink } from "@/components/ui/Button";
import { RichText } from "@/components/ui/RichText";
import { TRAINER_CATEGORY_META, THEME_META } from "@/lib/content/constants";
import type { TrainerProfileData } from "@/lib/trainer-profile";

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
 * A trainer's full profile, inside a Modal: the photo, name and designation, a button to download the CV the
 * admin uploaded (Trainers → CV), their links, profile, expertise and what they teach, then anything the page
 * adds (`children`, e.g. their sessions) and Previous / Next when `onStep` is given. The title has the id
 * `trainer-modal-title`, for the Modal's labelledBy.
 */
export function TrainerProfile({ trainer: t, onStep, children }: { trainer: TrainerProfileData; onStep?: (d: 1 | -1) => void; children?: ReactNode }) {
  const cat = TRAINER_CATEGORY_META[t.category] ?? TRAINER_CATEGORY_META.faculty;
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
        {t.bio ? (
          <div>
            <p className="text-xs font-bold tracking-[0.14em] text-subtle uppercase">Profile</p>
            <RichText text={t.bio} className="mt-2 text-[15px] leading-relaxed text-muted" />
          </div>
        ) : null}
        {t.expertise || t.teaching ? (
          <div className="rounded-2xl border border-border bg-surface-2 p-5">
            <p className="text-xs font-bold tracking-[0.14em] text-subtle uppercase">{t.expertise ? "Expertise" : "Teaches"}</p>
            {t.expertise ? <p className="mt-1 font-display text-xl font-semibold text-fg">{t.expertise}</p> : null}
            {t.expertise && t.teaching ? <p className="mt-4 text-xs font-bold tracking-[0.14em] text-subtle uppercase">Teaches</p> : null}
            <RichText text={t.teaching} className="mt-2 text-[15px] leading-relaxed text-muted" />
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

import { ArrowRight, Factory, Gauge, Laptop, Mail, MapPin, Sparkles } from "lucide-react";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { Poster } from "@/components/ui/Poster";
import { Section, SectionHeading } from "@/components/ui/Section";
import type { SiteSettings } from "@/lib/content/types";
import { copy } from "@/lib/copy";
import { registrationHref, venueLine } from "@/lib/training";
import { isShown } from "@/lib/schema/section-order";

/** The poster's built-in picture (DIU's Knowledge Tower at Daffodil Smart City), shown until another is uploaded in Site settings → Home → Custom training. */
const POSTER_PHOTO = "/posters/campus.webp";

/**
 * Custom training: every training is designed for the organisation that asks for it. The heading runs across the
 * section; under it, the Contact us box and the two cards (built around the industry, the efficiency gains) beside
 * the poster. Side by side, the column and the poster share one row, so their tops and bottoms line up: the two
 * cards stretch to the poster's height (their contents centred), or the poster to theirs.
 */
export function Invite({ s }: { s: SiteSettings }) {
  const c = copy(s, "homeInvite");
  const programmes = isShown(s, "home", "themes");
  return (
    <Section id="join" edit="home.invite" tone={c.tone} bg={c.background} labelledBy="invite-title" tags="stamp">
      <SectionHeading id="invite-title" eyebrow={c.eyebrow} title={c.title} description={c.description} className="mb-8 sm:mb-10" />
      <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
        <div className="flex flex-col gap-5">
          {c.free || c.button ? (
            <div className="flex flex-col items-start gap-4 rounded-3xl bg-accent-soft p-5 ring-1 ring-[color-mix(in_oklab,var(--accent)_40%,transparent)] ring-inset sm:flex-row sm:items-center sm:justify-between sm:p-6">
              {c.free ? <p className="text-base font-semibold text-fg sm:text-lg">{c.free}</p> : null}
              {c.button ? (
                <ButtonLink href={registrationHref(s)} size="lg" icon={<Mail size={18} aria-hidden />} className="shrink-0">
                  {c.button}
                </ButtonLink>
              ) : null}
            </div>
          ) : null}
          {c.expectTitle || c.expectText ? (
            <div className="card flex items-start gap-4 p-5 sm:p-6 lg:flex-1 lg:items-center">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-accent-soft text-accent-ink">
                <Factory size={20} aria-hidden />
              </span>
              <div>
                {c.expectTitle ? <h3 className="font-display text-lg font-bold text-fg">{c.expectTitle}</h3> : null}
                {c.expectText ? <p className="mt-1 text-[15px] leading-relaxed text-muted">{c.expectText}</p> : null}
              </div>
            </div>
          ) : null}
          {c.researchTitle || c.researchText ? (
            <div className="card flex items-start gap-4 p-5 sm:p-6 lg:flex-1 lg:items-center">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-accent-soft text-accent-ink">
                <Gauge size={20} aria-hidden />
              </span>
              <div>
                {c.researchTitle ? <h3 className="font-display text-lg font-bold text-fg">{c.researchTitle}</h3> : null}
                {c.researchText ? <p className="mt-1 text-[15px] leading-relaxed text-muted">{c.researchText}</p> : null}
                {c.researchTheme ? (
                  <p className="mt-3 flex items-start gap-2 rounded-xl bg-accent-soft px-3 py-2 text-[15px] font-semibold text-accent-ink">
                    <Laptop size={17} aria-hidden className="mt-0.5 shrink-0" />
                    {c.researchTheme}
                  </p>
                ) : null}
                {c.posterLink && programmes ? (
                  <Link href="/#themes" className="group/link mt-3 inline-flex items-center gap-1 font-semibold text-accent-ink">
                    <span className="mi-underline">{c.posterLink}</span>
                    <ArrowRight size={15} aria-hidden className="transition-transform group-hover/link:translate-x-1" />
                  </Link>
                ) : null}
              </div>
            </div>
          ) : null}
        </div>
        <Poster
          tone={c.tone}
          photo={s.invitePhoto || POSTER_PHOTO}
          kicker={c.posterKicker}
          badge={c.posterBadge}
          title={c.posterTitle}
          text={c.posterText}
          facts={[
            ...(c.formatText ? [{ icon: <Sparkles size={17} aria-hidden />, label: c.format, value: c.formatText }] : []),
            { icon: <MapPin size={17} aria-hidden />, label: c.where, value: venueLine(s) },
          ]}
          footnote={s.organisedBy}
          className="mx-auto w-full max-w-xl lg:max-w-none"
        />
      </div>
    </Section>
  );
}

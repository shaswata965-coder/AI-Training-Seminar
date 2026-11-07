import { ArrowRight, Download, GraduationCap, Mail, MapPin, Mic, Printer } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { InOrder } from "@/components/layout/InOrder";
import { PageHero } from "@/components/layout/PageHero";
import { ProgrammeOverview } from "@/components/programme/ProgrammeOverview";
import { ProgrammeView, type MiniTrainer } from "@/components/programme/ProgrammeView";
import { ScheduleTba } from "@/components/programme/ScheduleTba";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Section, SectionHeading } from "@/components/ui/Section";
import { TagScope } from "@/components/ui/Tag";
import { getSessions, getSettings, getTrainers } from "@/lib/content/queries";
import type { SiteSettings } from "@/lib/content/types";
import { copy } from "@/lib/copy";
import { planDays, registrationHref } from "@/lib/training";
import { absoluteUrl } from "@/lib/paths";
import { shownSections } from "@/lib/schema/section-order";

export async function generateMetadata(): Promise<Metadata> {
  const s = await getSettings();
  return {
    title: "Sample plan",
    description: `What a custom training from ${s.programmeName} can include, day by day: lectures, hands-on labs and live demos on AI for professional work and AI for office work, adapted to your team.`,
    alternates: { canonical: absoluteUrl("/programme") },
  };
}

function registrationText(s: SiteSettings) {
  const c = copy(s, "programmePlan");
  return s.registrationStatus === "open" ? c.registrationOpen : c.registrationClosed;
}

export default async function ProgrammePage() {
  const [s, sessions, trainers] = await Promise.all([getSettings(), getSessions(), getTrainers()]);
  const days = planDays(sessions).map((day) => ({ day }));
  const tba = s.programmeStatus === "tba" || sessions.length === 0;
  const mini: Record<string, MiniTrainer> = Object.fromEntries(trainers.map((sp) => [sp.id, { id: sp.id, name: sp.name, slug: sp.slug, affiliation: sp.affiliation }]));
  const pdfHref = s.schedulePdf || "/api/programme/pdf";
  const hero = copy(s, "programmeHero");
  const sc = copy(s, "programmeSchedule");
  const pl = copy(s, "programmePlan");
  // The bar under the hero jumps to each section, named by its label, in the order the sections come.
  const jumpTo = {
    overview: { href: "#overview", label: s.programmeOverview.eyebrow },
    schedule: { href: "#schedule", label: sc.eyebrow },
    plan: { href: "#plan", label: pl.eyebrow },
  };
  const jumps = shownSections(s, "programme")
    .map((key) => jumpTo[key])
    .filter((j) => j.label);
  const plan: { href: string; title: string; text: string; icon: ReactNode; tone: string }[] = [
    { href: "/venue", title: pl.venueTitle, text: pl.venueText, icon: <MapPin size={21} aria-hidden />, tone: "tone-mint" },
    { href: registrationHref(s), title: pl.registrationTitle, text: registrationText(s), icon: <Mail size={21} aria-hidden />, tone: "tone-butter" },
    { href: "/tutorials", title: pl.tutorialsTitle, text: pl.tutorialsText, icon: <GraduationCap size={21} aria-hidden />, tone: "tone-lilac" },
    { href: "/trainers", title: pl.trainersTitle, text: pl.trainersText, icon: <Mic size={21} aria-hidden />, tone: "tone-peach" },
  ];

  return (
    <TagScope style="bracket">
      <PageHero edit="programme.hero" home={s.siteNav.home} tone={hero.tone} crumb={hero.crumb} eyebrow={hero.eyebrow} title={hero.title} aura="programme" description={hero.description}>
        {!tba ? (
          <ButtonLink href={pdfHref} download icon={<Download size={18} aria-hidden />}>
            {hero.pdf}
          </ButtonLink>
        ) : null}
      </PageHero>

      <nav aria-label="On this page" className="border-b border-border bg-bg-soft">
        <ol className="container-site flex gap-1 overflow-x-auto py-2 [scrollbar-width:none]">
          {jumps.map((j, i) => (
            <li key={j.href} className="shrink-0">
              <a href={j.href} className="group flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-muted transition-colors hover:bg-surface hover:text-fg">
                <span className="font-mono text-[11px] text-subtle transition-colors group-hover:text-brand">{String(i + 1).padStart(2, "0")}</span>
                {j.label}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <InOrder
        s={s}
        page="programme"
        sections={{
          overview: <ProgrammeOverview s={s} sessions={sessions} tba={tba} />,
          schedule: (
            <Section id="schedule" edit="programme.schedule" tone={sc.tone} bg={sc.background} labelledBy="schedule-title">
              <SectionHeading id="schedule-title" eyebrow={sc.eyebrow} title={sc.title} className="mb-6 sm:mb-8" />
              {tba ? (
                <ScheduleTba s={s} />
              ) : (
                <>
                  <div className="mb-6 flex flex-wrap items-center gap-3">
                    {s.programmeStatus === "draft" ? (
                      <Badge tone="butter" dot>
                        {sc.draft}
                      </Badge>
                    ) : (
                      <Badge tone="mint" dot>
                        {sc.final}
                      </Badge>
                    )}
                    {s.programmeNote ? <p className="text-sm text-muted">{s.programmeNote}</p> : null}
                    {sc.printTip ? (
                      <span className="ml-auto hidden items-center gap-1.5 text-xs text-subtle sm:inline-flex">
                        <Printer size={14} aria-hidden /> {sc.printTip}
                      </span>
                    ) : null}
                  </div>
                  {sc.filterHint ? <p className="mb-6 max-w-2xl text-sm text-muted">{sc.filterHint}</p> : null}
                  <ProgrammeView sessions={sessions} trainers={mini} days={days} />
                </>
              )}
            </Section>
          ),
          plan: (
            <Section id="plan" edit="programme.plan" tone={pl.tone} bg={pl.background} labelledBy="plan-title">
              <SectionHeading id="plan-title" eyebrow={pl.eyebrow} title={pl.title} className="mb-8 sm:mb-10" />
              <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {plan.map((p, i) => (
                  <li key={p.title} data-reveal style={{ "--reveal-delay": `${i * 70}ms` } as CSSProperties}>
                    <Link href={p.href} data-glow="" className={`${p.tone} card group flex h-full flex-col p-6 transition-[translate,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-card-lg`}>
                      <span className="grid h-11 w-11 place-items-center rounded-2xl bg-accent-soft text-accent-ink transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:scale-110 group-hover:rotate-6">{p.icon}</span>
                      <span className="mt-4 flex items-center gap-1.5 font-display text-lg font-semibold text-fg">
                        {p.title}
                        <ArrowRight size={16} aria-hidden className="opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100" />
                      </span>
                      <span className="mt-1.5 text-sm text-muted">{p.text}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </Section>
          ),
        }}
      />
    </TagScope>
  );
}

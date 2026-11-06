import { Award, Building2, Layers, Ticket, Users } from "lucide-react";
import type { Metadata } from "next";
import type { CSSProperties, ReactNode } from "react";
import { Aura } from "@/components/aura/Aura";
import { StatValue } from "@/components/home/StatValue";
import { InOrder } from "@/components/layout/InOrder";
import { PageHero } from "@/components/layout/PageHero";
import { ParticipantsView } from "@/components/participants/ParticipantsView";
import { featuredQuotes, QuoteCard } from "@/components/participants/QuoteCard";
import { ButtonLink } from "@/components/ui/Button";
import { Section, SectionHeading } from "@/components/ui/Section";
import { TagScope } from "@/components/ui/Tag";
import { cn } from "@/lib/cn";
import { getParticipants, getSettings } from "@/lib/content/queries";
import { copy } from "@/lib/copy";
import { registrationHref } from "@/lib/training";
import { participantStats } from "@/lib/participants";
import { absoluteUrl } from "@/lib/paths";

export async function generateMetadata(): Promise<Metadata> {
  const s = await getSettings();
  return {
    title: "Past participants",
    description: `The people who have completed a batch of the ${s.programmeName} at Daffodil International University: AI for Professionals and AI for Workspace.`,
    alternates: { canonical: absoluteUrl("/past-participants") },
  };
}

export default async function PastParticipantsPage() {
  const [s, participants] = await Promise.all([getSettings(), getParticipants()]);
  const hero = copy(s, "participantsHero");
  const st = copy(s, "participantsStats");
  const te = copy(s, "participantsTestimonials");
  const li = copy(s, "participantsList");
  const cta = copy(s, "participantsCta");
  const quotes = featuredQuotes(participants);
  const n = participantStats(participants);
  const stats: { label: string; value: number; icon: ReactNode; tone: string }[] = [
    { label: st.participants, value: n.participants, icon: <Users size={20} aria-hidden />, tone: "tone-butter" },
    { label: st.batches, value: n.batches, icon: <Layers size={20} aria-hidden />, tone: "tone-lilac" },
    { label: st.organisations, value: n.organisations, icon: <Building2 size={20} aria-hidden />, tone: "tone-mint" },
    { label: st.programmes, value: n.programmes, icon: <Award size={20} aria-hidden />, tone: "tone-peach" },
  ].filter((x) => x.label);
  const register = registrationHref(s);
  return (
    <TagScope style="corner">
      <PageHero edit="participants.hero" home={s.siteNav.home} tone={hero.tone} crumb={hero.crumb} eyebrow={hero.eyebrow} title={hero.title} aura="participants" description={hero.description}>
        {hero.register ? (
          <ButtonLink href={register} icon={<Ticket size={18} aria-hidden />}>
            {hero.register}
          </ButtonLink>
        ) : null}
      </PageHero>
      <InOrder
        s={s}
        page="participants"
        sections={{
          // The numbers, once there is someone to count.
          stats:
            participants.length && stats.length ? (
              <section data-edit="participants.stats" aria-label="Past participants in numbers" className={cn(`tone-${st.tone}`, "py-10 sm:py-12", st.background === "band" && "bg-[color-mix(in_oklab,var(--accent-soft)_70%,var(--bg))]")}>
                <ul className="container-site grid grid-cols-2 gap-4 lg:grid-cols-4">
                  {stats.map((x, i) => (
                    <li key={x.label} data-reveal style={{ "--reveal-delay": `${i * 70}ms` } as CSSProperties} className={`${x.tone} card flex items-center gap-4 p-5`}>
                      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-accent-soft text-accent-ink">{x.icon}</span>
                      <span className="min-w-0">
                        <span className="block font-display text-3xl font-extrabold text-fg tabular">
                          <StatValue value={String(x.value)} />
                        </span>
                        <span className="block text-sm font-semibold text-muted">{x.label}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null,
          testimonials: quotes.length ? (
            <Section edit="participants.testimonials" tone={te.tone} bg={te.background} labelledBy="testimonials-title">
              <SectionHeading id="testimonials-title" eyebrow={te.eyebrow} title={te.title} align="center" />
              <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {quotes.map((p) => (
                  <li key={p.id}>
                    <QuoteCard p={p} />
                  </li>
                ))}
              </ul>
            </Section>
          ) : null,
          list: (
            <Section edit="participants.list" tone={li.tone} bg={li.background} labelledBy="participants-title">
              <SectionHeading id="participants-title" eyebrow={li.eyebrow} title={li.title} className="mb-6 sm:mb-8" />
              {participants.length ? (
                <ParticipantsView participants={participants} text={li} />
              ) : (
                <div className="card relative flex flex-col items-center gap-6 overflow-hidden p-8 text-center sm:flex-row sm:p-10 sm:text-left">
                  <div aria-hidden className="wash pointer-events-none absolute inset-0" />
                  <div className="relative">
                    <Aura variant="participants" size={180} interactive />
                  </div>
                  <div className="relative">
                    {li.emptyBadge ? <p className="tag tag-eyebrow">{li.emptyBadge}</p> : null}
                    <h3 className="mt-3 font-display text-2xl font-bold text-fg sm:text-3xl">{li.emptyTitle}</h3>
                    {li.emptyText ? <p className="mt-2 max-w-lg text-muted">{li.emptyText}</p> : null}
                    {li.emptyButton ? (
                      <div className="mt-5">
                        <ButtonLink href={register} icon={<Ticket size={18} aria-hidden />}>
                          {li.emptyButton}
                        </ButtonLink>
                      </div>
                    ) : null}
                  </div>
                </div>
              )}
            </Section>
          ),
          cta: participants.length ? (
            <Section edit="participants.cta" tone={cta.tone} bg={cta.background} labelledBy="participants-cta-title">
              <div className="card mx-auto flex max-w-4xl flex-col items-center gap-6 p-8 text-center sm:flex-row sm:p-10 sm:text-left">
                <Aura variant="registration" size={150} interactive />
                <div>
                  <h2 id="participants-cta-title" className="font-display text-3xl font-bold text-fg">
                    {cta.title}
                  </h2>
                  {cta.text ? <p className="mt-2 max-w-xl text-muted">{cta.text}</p> : null}
                  {cta.button ? (
                    <div className="mt-5">
                      <ButtonLink href={register} size="lg" icon={<Ticket size={18} aria-hidden />}>
                        {cta.button}
                      </ButtonLink>
                    </div>
                  ) : null}
                </div>
              </div>
            </Section>
          ) : null,
        }}
      />
    </TagScope>
  );
}

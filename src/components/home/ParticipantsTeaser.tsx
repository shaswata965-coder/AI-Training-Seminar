import { Aura } from "@/components/aura/Aura";
import { featuredQuotes, QuoteCard } from "@/components/participants/QuoteCard";
import { FacesArt } from "@/components/portals/PortalArt";
import { ButtonLink } from "@/components/ui/Button";
import { Portal } from "@/components/ui/Portal";
import { Section, SectionHeading } from "@/components/ui/Section";
import type { Participant, SiteSettings } from "@/lib/content/types";
import { copy, plural } from "@/lib/copy";
import { registrationHref } from "@/lib/event";

/** Home: up to three past participants' quotes, and the link to the Past participants page. */
export function ParticipantsTeaser({ s, participants }: { s: SiteSettings; participants: Participant[] }) {
  const c = copy(s, "homeParticipants", { count: plural(participants.length, "participant") });
  const quotes = featuredQuotes(participants).slice(0, 3);
  return (
    <Section edit="home.participants" tone={c.tone} bg={c.background} labelledBy="participants-teaser-title" tags="corner">
      <SectionHeading id="participants-teaser-title" eyebrow={c.eyebrow} title={c.title} description={c.description} align="center" />
      {quotes.length ? (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {quotes.map((p) => (
            <QuoteCard key={p.id} p={p} />
          ))}
        </div>
      ) : !participants.length ? (
        <div className="card mx-auto flex max-w-3xl flex-col items-center gap-6 p-8 text-center sm:flex-row sm:text-left">
          <Aura variant="participants" size={160} interactive />
          <div>
            <p className="font-display text-2xl font-bold text-fg">{c.emptyTitle}</p>
            {c.emptyText ? <p className="mt-2 text-muted">{c.emptyText}</p> : null}
            {c.emptyButton ? (
              <div className="mt-5">
                <ButtonLink href={registrationHref(s)}>{c.emptyButton}</ButtonLink>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
      {participants.length ? (
        <div className="mt-10 flex justify-center sm:mt-12">
          <Portal
            href="/past-participants"
            tone={c.tone}
            kicker={c.portalKicker}
            title={c.portalTitle}
            text={c.portalText}
            art={<FacesArt people={participants.slice(0, 3)} total={participants.length} unit={["participant", "participants"]} />}
            className="w-full max-w-xl lg:max-w-2xl"
          />
        </div>
      ) : null}
    </Section>
  );
}

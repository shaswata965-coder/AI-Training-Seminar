import type { Metadata } from "next";
import { Aura } from "@/components/aura/Aura";
import { PageHero } from "@/components/layout/PageHero";
import { ScheduleArt } from "@/components/portals/PortalArt";
import { leadTrainer, TrainerSpotlight } from "@/components/trainers/TrainerSpotlight";
import { TrainersView, type TrainerSession } from "@/components/trainers/TrainersView";
import { ButtonLink } from "@/components/ui/Button";
import { Portal } from "@/components/ui/Portal";
import { Eyebrow } from "@/components/ui/Section";
import { TagScope } from "@/components/ui/Tag";
import { getSessions, getSettings, getTrainers } from "@/lib/content/queries";
import { copy } from "@/lib/copy";
import { eventDayLabel } from "@/lib/format";
import { absoluteUrl } from "@/lib/paths";
import { isShown } from "@/lib/schema/section-order";

export async function generateMetadata(): Promise<Metadata> {
  const s = await getSettings();
  return {
    title: "Trainers",
    description: `The trainers of the ${s.eventName}: faculty of the Department of Computer Science and Engineering, Daffodil International University.`,
    alternates: { canonical: absoluteUrl("/trainers") },
  };
}

export default async function TrainersPage() {
  const [s, trainers, sessions] = await Promise.all([getSettings(), getTrainers(), getSessions()]);
  const showSessions = s.programmeStatus !== "tba";
  const slim: TrainerSession[] = (showSessions ? sessions : []).map((x) => ({
    id: x.id,
    title: x.title,
    type: x.type,
    theme: x.theme,
    day: x.day,
    start: x.start,
    end: x.end,
    room: x.room,
    trainers: x.trainers,
    panelists: x.panelists,
    moderator: x.moderator,
    dayLabel: eventDayLabel(s.startDate, x.day),
  }));
  const hero = copy(s, "trainersHero");
  const list = copy(s, "trainersList");
  const lead = leadTrainer(trainers);
  return (
    <TagScope style="ribbon">
      <PageHero edit="trainers.hero" home={s.siteNav.home} tone={hero.tone} crumb={hero.crumb} eyebrow={hero.eyebrow} title={hero.title} aura="trainers" description={hero.description}>
        <Portal href="/programme" tone="azure" compact kicker={hero.portalKicker} title={hero.portalTitle} text={hero.portalText} art={<ScheduleArt />} className="w-full max-w-md" />
      </PageHero>
      {lead && isShown(s, "trainers", "spotlight") ? (
        <TrainerSpotlight s={s} lead={lead} trainers={trainers} teaches={slim.some((x) => x.trainers.includes(lead.id) || x.panelists.includes(lead.id) || x.moderator === lead.id)} />
      ) : null}
      {isShown(s, "trainers", "list") ? (
        <section data-edit="trainers.list" aria-labelledby={trainers.length && list.title ? "trainers-list-title" : undefined} className={`tone-${list.tone} py-12 sm:py-16`}>
          <div className="container-site">
            {trainers.length && list.title ? (
              <div className="mb-8">
                {list.eyebrow ? <Eyebrow>{list.eyebrow}</Eyebrow> : null}
                <h2 id="trainers-list-title" className="mt-3 font-display text-3xl font-bold text-fg sm:text-4xl">
                  {list.title}
                </h2>
              </div>
            ) : null}
            {trainers.length ? (
              <TrainersView trainers={trainers} sessions={slim} showMore={s.showMoreTrainers} more={{ title: s.homeTrainers.moreTitle, text: s.homeTrainers.moreText }} />
            ) : (
              <div className="card flex flex-col items-center gap-6 p-10 text-center sm:flex-row sm:text-left">
                <Aura variant="trainers" size={190} interactive />
                <div>
                  <h2 className="font-display text-3xl font-bold text-fg">{list.emptyTitle}</h2>
                  {list.emptyText ? <p className="mt-3 max-w-xl text-muted">{list.emptyText}</p> : null}
                  {list.emptyButton && isShown(s, "home", "news") ? (
                    <div className="mt-5">
                      <ButtonLink href="/#news" variant="soft">
                        {list.emptyButton}
                      </ButtonLink>
                    </div>
                  ) : null}
                </div>
              </div>
            )}
          </div>
        </section>
      ) : null}
    </TagScope>
  );
}

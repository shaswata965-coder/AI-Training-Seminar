import { Aura } from "@/components/aura/Aura";
import { FacesArt } from "@/components/portals/PortalArt";
import { ButtonLink } from "@/components/ui/Button";
import { Portal } from "@/components/ui/Portal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { TRAINER_CATEGORY_META, THEME_META } from "@/lib/content/constants";
import type { SiteSettings, Trainer } from "@/lib/content/types";
import { profileData } from "@/lib/trainer-profile";
import { copy, plural } from "@/lib/copy";
import { TrainerCarousel, type TrainerSlide } from "./TrainerCarousel";

export function MoreTrainersCard({ className, title, text }: { className?: string; title: string; text: string }) {
  return (
    <div className={`tone-lilac flex h-full min-h-[18rem] flex-col items-center justify-center rounded-3xl border-2 border-dashed border-[color-mix(in_oklab,var(--accent)_60%,transparent)] bg-accent-soft/60 p-6 text-center ${className ?? ""}`}>
      <Aura variant="trainers" size={120} lite />
      <p className="mt-3 font-display text-lg font-semibold text-fg">{title}</p>
      {text ? <p className="mt-1 text-sm text-muted">{text}</p> : null}
    </div>
  );
}

export function TrainersPreview({ s, trainers }: { s: SiteSettings; trainers: Trainer[] }) {
  const limit = Math.max(0, s.featuredTrainers || 8);
  const featured = trainers.filter((sp) => sp.featured);
  const list = (featured.length ? featured : trainers).slice(0, limit);
  const c = copy(s, "homeTrainers", { count: plural(trainers.length, "trainer") });
  // Only what the cards and the pop-up profiles show goes to the browser.
  const slides: TrainerSlide[] = list.map((sp) => {
    const cat = TRAINER_CATEGORY_META[sp.category] ?? TRAINER_CATEGORY_META.faculty;
    const theme = sp.theme && sp.theme !== "general" ? THEME_META[sp.theme] : undefined;
    return {
      id: sp.id,
      href: `/trainers?trainer=${encodeURIComponent(sp.slug)}`,
      name: sp.name,
      photo: sp.photo,
      designation: sp.designation,
      affiliation: sp.affiliation,
      lead: sp.lead,
      label: sp.lead ? "Lead trainer" : cat.label,
      labelTone: sp.lead ? "butter" : cat.tone,
      tone: cat.tone,
      theme: theme ? { label: theme.short, tone: theme.tone } : undefined,
      expertise: sp.expertise,
      profile: profileData(sp),
    };
  });
  return (
    <Section edit="home.trainers" tone={c.tone} bg={c.background} labelledBy="trainers-preview-title" tags="ribbon">
      <SectionHeading id="trainers-preview-title" eyebrow={c.eyebrow} title={c.title} description={c.description} align="center" className="sm:mb-8" />
      {slides.length ? (
        <TrainerCarousel
          trainers={slides}
          label={c.eyebrow || "Trainers"}
          link={c.profile}
          more={
            s.showMoreTrainers ? (
              // Opaque, so the cards it passes in front of don't show through.
              <div className="h-full overflow-hidden rounded-[1.75rem] bg-surface">
                <MoreTrainersCard title={c.moreTitle} text={c.moreText} />
              </div>
            ) : undefined
          }
        />
      ) : (
        <div className="card flex flex-col items-center gap-6 p-8 text-center sm:flex-row sm:text-left">
          <Aura variant="trainers" size={170} interactive />
          <div>
            <p className="font-display text-2xl font-bold text-fg">{c.emptyTitle}</p>
            {c.emptyText ? <p className="mt-2 max-w-2xl text-muted">{c.emptyText}</p> : null}
            {c.emptyButton ? (
              <div className="mt-5">
                <ButtonLink href="/#news" variant="soft">
                  {c.emptyButton}
                </ButtonLink>
              </div>
            ) : null}
          </div>
        </div>
      )}
      <div className="mt-10 flex justify-center sm:mt-12">
        <Portal
          href="/trainers"
          tone={c.tone}
          kicker={c.portalKicker}
          title={trainers.length ? c.portalTitle : c.portalEmptyTitle}
          text={trainers.length ? c.portalText : c.portalEmptyText}
          art={<FacesArt people={trainers.slice(0, 3)} total={trainers.length} />}
          className="w-full max-w-xl lg:max-w-2xl"
        />
      </div>
    </Section>
  );
}

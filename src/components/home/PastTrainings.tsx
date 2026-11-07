import { Section, SectionHeading } from "@/components/ui/Section";
import type { Tone } from "@/lib/content/constants";
import type { PastTraining, SiteSettings } from "@/lib/content/types";
import { copy } from "@/lib/copy";
import { TrainingShowcase, type ShowcaseTraining } from "./TrainingShowcase";

/** Each training's colour, in turn: the site's blues and greens. */
const TONES: Tone[] = ["azure", "mint", "aqua", "lilac"];

/** What the browser needs of a training (no admin fields). */
const showcase = ({ id, slug, name, programme, label, summary, highlights, trainerNames, link, photos, emptySpots }: PastTraining): ShowcaseTraining => ({
  id,
  slug,
  name,
  programme,
  label,
  summary,
  highlights,
  trainerNames,
  link,
  photos,
  emptySpots,
});

/**
 * Home page: “Past training sessions”, the trainings delivered for organisations (Admin → Past training sessions),
 * one after another, the photos alternating sides. Nothing shows until there is one.
 */
export function PastTrainings({ s, trainings }: { s: SiteSettings; trainings: PastTraining[] }) {
  if (!trainings.length) return null;
  const c = copy(s, "homeTrainings");
  return (
    <Section id="trainings" edit="home.trainings" tone={c.tone} bg={c.background} labelledBy="trainings-title" tags="corner">
      <SectionHeading id="trainings-title" eyebrow={c.eyebrow} title={c.title} description={c.description} align="center" />
      <div className="grid gap-16 sm:gap-20 lg:gap-24">
        {trainings.map((t, i) => (
          <TrainingShowcase key={t.id} t={showcase(t)} tone={TONES[i % TONES.length]} reverse={i % 2 === 1} text={c} />
        ))}
      </div>
    </Section>
  );
}

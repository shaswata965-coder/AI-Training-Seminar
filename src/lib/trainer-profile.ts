import type { Trainer } from "@/lib/content/types";

/** What a trainer's pop-up profile shows: everything but the fields only the admin uses. Shared by client and server code. */
export type TrainerProfileData = Pick<
  Trainer,
  "id" | "slug" | "name" | "designation" | "affiliation" | "category" | "theme" | "lead" | "photo" | "bio" | "expertise" | "teaching" | "website" | "linkedin" | "x" | "scholar" | "github" | "cv"
>;

/** A trainer as the browser needs it for the pop-up, so nothing else of the record is sent. */
export function profileData(t: Trainer): TrainerProfileData {
  const { id, slug, name, designation, affiliation, category, theme, lead, photo, bio, expertise, teaching, website, linkedin, x, scholar, github, cv } = t;
  return { id, slug, name, designation, affiliation, category, theme, lead, photo, bio, expertise, teaching, website, linkedin, x, scholar, github, cv };
}

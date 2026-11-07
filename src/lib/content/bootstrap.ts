import { isDuplicateKeyError } from "@/lib/db";
import { getCollectionModel, Singleton } from "@/lib/models";
import { objectSchema } from "@/lib/schema/field-validation";
import { COLLECTION_MAP } from "@/lib/schema/resources";
import { DEFAULT_FAQS, DEFAULT_PEOPLE, DEFAULT_SESSIONS, DEFAULT_SETTINGS, DEFAULT_TRAINERS } from "./defaults";
import { BATCH_ERA_FAQS, BATCH_ERA_SESSIONS } from "./retired-batches";

/*
 * Default content (programme facts, trainers, FAQs). Stored automatically the first time the site
 * connects to an empty database, and by `npm run seed`. Never overwrites content that already exists.
 * Free of Next.js imports so the CLI scripts in /scripts can use it.
 */

/** Marks that the tentative schedule was offered to this site, so it is added at most once. */
const PROGRAMME_PLAN_KEY = "programme-plan";
/** Marks that the batch-era FAQs and sample session were brought up to date, so it happens at most once. */
const CUSTOM_TRAINING_KEY = "custom-training-content";

async function insertSingleton(key: "settings" | typeof PROGRAMME_PLAN_KEY | typeof CUSTOM_TRAINING_KEY, data: object): Promise<boolean> {
  try {
    const res = await Singleton.updateOne({ key }, { $setOnInsert: { key, data } }, { upsert: true });
    return res.upsertedCount > 0;
  } catch (err) {
    if (isDuplicateKeyError(err)) return false; // created at the same moment by another process
    throw err;
  }
}

/** Store a list of default items in an empty collection; returns whether it did. */
async function fillCollection(key: "people" | "faqs" | "trainers", items: object[]): Promise<boolean> {
  const Model = getCollectionModel(key);
  if ((await Model.countDocuments()) > 0) return false;
  const def = COLLECTION_MAP[key];
  await Model.insertMany(items.map((x) => objectSchema(def.fields).parse({ ...def.defaults, ...x })));
  return true;
}

/**
 * A site set up while the training ran in batches stores that version's default FAQs and sample session, which
 * speak of batches, two programmes and registration. Each one still exactly as it was stored is given today's
 * text; anything an organiser has edited or added is left as it is. Returns how many were updated.
 */
async function refreshBatchEraContent(): Promise<number> {
  const Faqs = getCollectionModel("faqs");
  const Sessions = getCollectionModel("sessions");
  let n = 0;
  for (const { from, to } of BATCH_ERA_FAQS) n += (await Faqs.updateMany(from, { $set: to })).modifiedCount;
  for (const { from, to } of BATCH_ERA_SESSIONS) n += (await Sessions.updateMany(from, { $set: to })).modifiedCount;
  return n;
}

/** Returns a description of everything that was created. */
export async function ensureDefaultContent({ fillEmpty = false }: { fillEmpty?: boolean } = {}): Promise<string[]> {
  const created: string[] = [];
  const freshSite = await insertSingleton("settings", DEFAULT_SETTINGS);
  if (freshSite) created.push("site settings");

  // Once per database: the batch-era FAQs and session still unedited get today's texts.
  if (await insertSingleton(CUSTOM_TRAINING_KEY, { at: new Date().toISOString() })) {
    const updated = await refreshBatchEraContent();
    if (updated) created.push(`today's texts for ${updated} unedited FAQs and sessions`);
  }

  // The tentative schedule goes to a site without sessions: once, or whenever asked for. Deleting it in the
  // admin doesn't bring it back after a restart.
  const planOffered = await insertSingleton(PROGRAMME_PLAN_KEY, { at: new Date().toISOString() });
  if (planOffered || fillEmpty) {
    const Sessions = getCollectionModel("sessions");
    if ((await Sessions.countDocuments()) === 0) {
      const def = COLLECTION_MAP.sessions;
      await Sessions.insertMany(DEFAULT_SESSIONS.map((s) => objectSchema(def.fields).parse({ ...def.defaults, ...s })));
      // The plan is shown as a draft ("subject to change") instead of being hidden.
      await Singleton.updateOne({ key: "settings", "data.programmeStatus": "tba" }, { $set: { "data.programmeStatus": "draft" } });
      created.push(`the tentative schedule (${DEFAULT_SESSIONS.length} sessions)`);
    }
  }

  // Trainers, organisers and FAQs are only added to a brand-new site (or when asked for),
  // so deleting them in the admin doesn't bring them back after a restart.
  if (freshSite || fillEmpty) {
    if (await fillCollection("trainers", DEFAULT_TRAINERS)) created.push(`${DEFAULT_TRAINERS.length} trainers`);
    if (DEFAULT_PEOPLE.length && (await fillCollection("people", DEFAULT_PEOPLE))) created.push(`${DEFAULT_PEOPLE.length} organisers`);
    if (await fillCollection("faqs", DEFAULT_FAQS)) created.push(`${DEFAULT_FAQS.length} FAQs`);
  }
  return created;
}

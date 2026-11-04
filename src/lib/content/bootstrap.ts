import { isDuplicateKeyError } from "@/lib/db";
import { getCollectionModel, Singleton } from "@/lib/models";
import { objectSchema } from "@/lib/schema/field-validation";
import { COLLECTION_MAP } from "@/lib/schema/resources";
import { DEFAULT_FAQS, DEFAULT_PEOPLE, DEFAULT_SESSIONS, DEFAULT_SETTINGS, DEFAULT_TRAINERS } from "./defaults";

/*
 * Default content (programme facts, trainers, FAQs). Stored automatically the first time the site
 * connects to an empty database, and by `npm run seed`. Never overwrites content that already exists.
 * Free of Next.js imports so the CLI scripts in /scripts can use it.
 */

/** Marks that the tentative schedule was offered to this site, so it is added at most once. */
const PROGRAMME_PLAN_KEY = "programme-plan";

async function insertSingleton(key: "settings" | typeof PROGRAMME_PLAN_KEY, data: object): Promise<boolean> {
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

/** Returns a description of everything that was created. */
export async function ensureDefaultContent({ fillEmpty = false }: { fillEmpty?: boolean } = {}): Promise<string[]> {
  const created: string[] = [];
  const freshSite = await insertSingleton("settings", DEFAULT_SETTINGS);
  if (freshSite) created.push("site settings");

  // The tentative schedule goes to a site without sessions: once, or whenever asked for. Deleting it in the
  // admin doesn't bring it back after a restart.
  const planOffered = await insertSingleton(PROGRAMME_PLAN_KEY, { at: new Date().toISOString() });
  if (planOffered || fillEmpty) {
    const Sessions = getCollectionModel("sessions");
    if ((await Sessions.countDocuments()) === 0) {
      const def = COLLECTION_MAP.sessions;
      await Sessions.insertMany(DEFAULT_SESSIONS.map((s) => objectSchema(def.fields).parse({ ...def.defaults, ...s })));
      // The plan is shown as a draft ("subject to change") instead of "to be announced".
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

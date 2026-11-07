/**
 * Load clearly-labelled SAMPLE content (past participants with quotes,
 * hands-on labs, demos, partners, volunteers, announcements) to preview the
 * design before the real content is ready. The trainers and the tentative
 * schedule are the site's own defaults, not samples. Every sample is
 * tracked, so it can be removed again in one step.
 *
 *   npm run seed:demo              add the samples
 *   npm run seed:demo -- --remove  remove every sample (your own content is kept)
 *   npm run seed:demo -- --reset   remove, then add them again
 *
 * Never leave sample content on the live site: the admin dashboard shows a
 * warning while it is loaded.
 */
import mongoose from "mongoose";
import { ensureDefaultContent } from "@/lib/content/bootstrap";
import { DEMO_DOC_ID, demoCollection, type DemoRecord } from "@/lib/demo-content";
import { slugify } from "@/lib/format";
import { getCollectionModel, Singleton } from "@/lib/models";
import { objectSchema } from "@/lib/schema/field-validation";
import { COLLECTION_MAP } from "@/lib/schema/resources";
import { cliArgs, connect, RESTART_HINT, run } from "./lib/cli";

const NOTE = "Sample content to preview the layout. Edit or delete it in the admin panel, or run `npm run seed:demo -- --remove`.";
// For plain-text fields (no formatting).
const NOTE_PLAIN = "Sample content to preview the layout. Edit or delete it in the admin panel.";

/* ---------------------------------------------------------------- Data -- */

/** Sample past participants, two trainings, both focus areas; a few with quotes for “What participants say”. */
const PARTICIPANTS = [
  { name: "Ayesha Sample", designation: "Assistant Manager, HR (sample)", organisation: "Example Bank PLC", theme: "professionals", batch: "Office productivity training · Sample", completed: "2026-06-14", featured: true, quote: "Sample quote: I now draft job descriptions and summarise interview notes in minutes, and I know what to check before I use them." },
  { name: "Rahim Placeholder", designation: "Lecturer (sample)", organisation: "Sample College", theme: "workspace", batch: "Office productivity training · Sample", completed: "2026-06-14", featured: true, quote: "Sample quote: the spreadsheet lab alone saved me hours of marking every week." },
  { name: "Nusrat Example", designation: "Software Engineer (sample)", organisation: "Placeholder Tech Ltd", theme: "general", batch: "Office productivity training · Sample", completed: "2026-06-14", featured: false, quote: "" },
  { name: "Tanvir Demo", designation: "Entrepreneur (sample)", organisation: "Demo Foods", theme: "professionals", batch: "Office productivity training · Sample", completed: "2026-06-14", featured: false, quote: "" },
  { name: "Farhana Sample", designation: "Executive Officer (sample)", organisation: "Example NGO", theme: "workspace", batch: "AI for professional work · Sample", completed: "2026-09-20", featured: true, quote: "Sample quote: meeting notes, reports and e-mails used to take my whole afternoon. Not any more." },
  { name: "Imran Placeholder", designation: "Student, BSc in CSE (sample)", organisation: "Daffodil International University", theme: "general", batch: "AI for professional work · Sample", completed: "2026-09-20", featured: false, quote: "" },
  { name: "Sadia Mock", designation: "Data Analyst (sample)", organisation: "Sample Telecom", theme: "professionals", batch: "AI for professional work · Sample", completed: "2026-09-20", featured: false, quote: "" },
  { name: "Karim Example", designation: "Office Administrator (sample)", organisation: "Placeholder Garments Ltd", theme: "workspace", batch: "AI for professional work · Sample", completed: "2026-09-20", featured: false, quote: "" },
];

const TUTORIALS = [
  {
    title: "Prompting for professional work",
    schedule: "Day 1 · 11:15–12:30 · Computer lab 3",
    level: "beginner",
    duration: "75 minutes",
    theme: "professionals",
    instructors: [{ name: "DIU CSE trainer", affiliation: "Department of CSE, DIU", url: "" }],
    description: `Write clear instructions for an AI assistant, give it the right context and check what comes back, on tasks from your own work.\n\n${NOTE}`,
    prerequisites: ["Laptop with a modern web browser", "A free account with an AI assistant (details sent before the training)"],
    materials: [{ label: "Sample materials (placeholder link)", url: "https://example.com/materials" }],
    capacity: "40 seats (sample)",
  },
  {
    title: "Spreadsheets and data with AI",
    schedule: "Day 2 · 11:15–12:30 · Computer lab 3",
    level: "beginner",
    duration: "75 minutes",
    theme: "workspace",
    instructors: [{ name: "DIU CSE trainer", affiliation: "Department of CSE, DIU", url: "" }],
    description: `Clean a messy sheet, write formulas from a plain-language request and turn the numbers into a short summary and a chart.\n\n${NOTE}`,
    prerequisites: ["Laptop with a spreadsheet app (Excel or Google Sheets)"],
    materials: [{ label: "Sample spreadsheet (placeholder link)", url: "https://example.com/sheet" }],
    capacity: "40 seats (sample)",
  },
  {
    title: "Bring your own task",
    schedule: "Day 2 · 15:30–16:30 · Computer lab 3",
    level: "all",
    duration: "60 minutes",
    theme: "general",
    instructors: [{ name: "DIU CSE trainers", affiliation: "Department of CSE, DIU", url: "" }],
    description: `Work on a real task from your job or studies with a trainer beside you, using what you learnt in the training.\n\n${NOTE}`,
    prerequisites: ["Laptop", "A task you'd like to speed up"],
    materials: [],
    capacity: "All participants (sample)",
  },
];

const DEMOS = [
  { title: "From meeting recording to minutes", team: "Sample demo", theme: "workspace", description: `An AI assistant turns a meeting recording into minutes, action points and a follow-up e-mail, checked by a person before it goes out.\n\n${NOTE_PLAIN}` },
  { title: "A research brief in ten minutes", team: "Sample demo", theme: "professionals", description: `An AI assistant gathers sources on a question, compares them and drafts a one-page brief with its references.\n\n${NOTE_PLAIN}` },
];

const SPONSORS = [
  { name: "Example Corp", tier: "gold", website: "https://example.com", blurb: "Sample partner. Replace with a real partner." },
  { name: "Placeholder Cloud", tier: "partner", website: "https://example.com", blurb: "Sample partner. Replace with a real partner." },
  { name: "Demo Developers Community", tier: "community", website: "https://example.com", blurb: "Sample community partner." },
];

const PEOPLE = [
  { name: "Ananya Sample", group: "volunteer", role: "Volunteer (sample)", department: "BSc in CSE", affiliation: "Daffodil International University", bio: "Sample volunteer profile." },
  { name: "Kabir Demo", group: "volunteer", role: "Volunteer (sample)", department: "BSc in Software Engineering", affiliation: "Daffodil International University", bio: "Sample volunteer profile." },
];

const ANNOUNCEMENTS = [
  { title: "Sample announcement: a new focus area for office teams", body: "This is sample content added by the demo seed to preview the announcements box.", tone: "info", linkUrl: "/contact", linkLabel: "Contact us", pinned: true },
];

/* ------------------------------------------------------------- Helpers -- */

const record = () => demoCollection();

/** Validate like the admin panel does, so samples can be edited without errors. */
function clean(key: string, item: Record<string, unknown>, order: number) {
  const def = COLLECTION_MAP[key];
  const data = objectSchema(def.fields).parse({ ...def.defaults, order, published: true, ...item }) as Record<string, unknown>;
  if (def.slugFrom && !data.slug) data.slug = `sample-${slugify(String(data[def.slugFrom] ?? ""))}`;
  return data;
}

async function insert(key: string, items: Record<string, unknown>[], tracked: DemoRecord["items"]) {
  const docs = await getCollectionModel(key).insertMany(items.map((it, i) => clean(key, it, 900 + i)));
  for (const d of docs) tracked.push({ collection: key, id: d._id as mongoose.Types.ObjectId });
  return docs.map((d) => String(d._id));
}

async function programmeStatus(): Promise<string> {
  const doc = await Singleton.findOne({ key: "settings" }).lean();
  return String((doc?.data as { programmeStatus?: string } | undefined)?.programmeStatus ?? "tba");
}

async function add() {
  await ensureDefaultContent();
  const tracked: DemoRecord["items"] = [];

  await insert("participants", PARTICIPANTS, tracked);
  await insert("tutorials", TUTORIALS, tracked);
  await insert("demos", DEMOS, tracked);
  await insert("sponsors", SPONSORS, tracked);
  await insert("people", PEOPLE, tracked);
  const now = Date.now();
  await insert("announcements", ANNOUNCEMENTS.map((a, i) => ({ ...a, date: new Date(now - i * 86_400_000).toISOString() })), tracked);

  await record().insertOne({ _id: DEMO_DOC_ID, items: tracked, previousProgrammeStatus: await programmeStatus(), createdAt: new Date() });
  console.log(`✔ Added ${tracked.length} sample items (past participants, hands-on labs, demos, partners, volunteers, announcements).`);
}

async function remove(doc: DemoRecord) {
  const byCollection = new Map<string, mongoose.Types.ObjectId[]>();
  for (const it of doc.items) byCollection.set(it.collection, [...(byCollection.get(it.collection) ?? []), it.id]);
  let removed = 0;
  for (const [key, ids] of byCollection) {
    removed += (await getCollectionModel(key).deleteMany({ _id: { $in: ids } })).deletedCount;
  }
  // Drop links from your own sessions to sample trainers that no longer exist.
  const trainerIds = byCollection.get("trainers") ?? [];
  if (trainerIds.length) {
    const Sessions = getCollectionModel("sessions");
    await Sessions.updateMany({}, { $pull: { trainers: { $in: trainerIds }, panelists: { $in: trainerIds } } });
    await Sessions.updateMany({ moderator: { $in: trainerIds } }, { $set: { moderator: null } });
  }
  await record().deleteOne({ _id: DEMO_DOC_ID });
  console.log(`✔ Removed ${removed} sample items. Your own content was not touched.`);
}

/* ---------------------------------------------------------------- Main -- */

run(async () => {
  const args = cliArgs({ remove: { type: "boolean" }, reset: { type: "boolean" } });
  if (args.help) {
    console.log("Usage: npm run seed:demo [-- --remove | --reset]\n\nAdds clearly-labelled sample content to preview the site; --remove deletes it again.");
    return;
  }
  await connect();
  const existing = await record().findOne({ _id: DEMO_DOC_ID });

  if (args.remove) {
    if (existing) await remove(existing);
    else console.log("No sample content is loaded, nothing to remove.");
  } else if (existing && !args.reset) {
    console.log(`Sample content is already loaded (${existing.items.length} items). Use --reset to replace it or --remove to delete it.`);
    return;
  } else {
    if (existing) await remove(existing);
    await add();
  }
  console.log(RESTART_HINT);
});

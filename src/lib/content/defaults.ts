import { FORM_DEFAULTS, FORM_SETTINGS, formFields, type FormKey } from "@/lib/forms";
import { REGISTRATION_STATUSES } from "./constants";
import { PAGE_COPY_DEFAULTS } from "@/lib/schema/page-copy";
import { HIDDEN_SECTIONS_DEFAULTS, SECTION_ORDER_DEFAULTS } from "@/lib/schema/section-order";
import type { Faq, Person, Session, SiteSettings, Trainer } from "./types";

/*
 * Default content. Used when the database is not configured/reachable and to
 * bootstrap a fresh database on first run. Everything here can be edited in
 * the admin panel. The training runs continuously, in batches: the dates are
 * the next batch's, and its schedule is the plan every batch follows.
 */

export const DEFAULT_SETTINGS: SiteSettings = {
  ...PAGE_COPY_DEFAULTS,
  ...SECTION_ORDER_DEFAULTS,
  ...HIDDEN_SECTIONS_DEFAULTS,
  ...FORM_DEFAULTS,
  eventName: "DIU AI Training Seminars",
  shortName: "DIU AI Training",
  tagline: "Practical, hands-on AI training for professionals and the modern workspace.",
  description:
    "Continuous AI training at Daffodil International University: AI for Professionals and AI for Workspace, hands-on batches led by faculty of the Department of Computer Science and Engineering, all year round.",
  organisedBy: "Department of Computer Science and Engineering, Daffodil International University",
  startDate: "2026-12-11T09:30:00+06:00",
  endDate: "2026-12-12T17:00:00+06:00",
  venueName: "Daffodil Smart City, Savar, Dhaka",
  venueHall: "",
  venueAddress: "Daffodil International University, Daffodil Smart City, Birulia, Savar, Dhaka 1216, Bangladesh",

  workshopStatus: "open",
  workshopDeadline: "",
  workshopReplyBy: "",
  workshopUrl: "",
  fees: [{ category: "Everyone", amount: "On request", note: "Places in each batch are limited" }],
  feeNote: "Ask the organisers for the current fee. Places in each batch are limited, so registrations are reviewed and confirmed by the organising team.",
  confirmationNote: "",

  showLoader: true,
  showHeroPhoto: true,
  heroPhoto: "",
  invitePhoto: "",
  highlights: [
    { label: "Programmes", value: "2", icon: "sparkles" },
    { label: "Trainers", value: "9", icon: "users" },
    { label: "Days per batch", value: "2", icon: "calendar" },
    { label: "Hands-on labs", value: "6", icon: "laptop" },
    { label: "New batches", value: "All year", icon: "clock" },
  ],
  featuredTrainers: 9,

  motivation:
    "AI tools have moved out of research labs and into everyday work. They draft documents, summarise reports, analyse data and answer questions in seconds, and people who know how to use them well get more done, with better results.\n\nThe AI Training Seminars at Daffodil International University help professionals, teachers, students and entrepreneurs make that shift with confidence. In two programmes, **AI for Professionals** and **AI for Workspace**, trainers from DIU's Department of Computer Science and Engineering show you how to use AI tools on real tasks, safely and responsibly.",
  agenticAI:
    "How today's AI assistants work and where they fall short; how to write clear instructions (prompts) and check the answers; how to use AI for **writing**, **research**, **data analysis**, **presentations** and **meetings**; and how to protect **privacy** and keep **your own judgement** in charge. Every session is hands-on, so you leave with skills you can use the next day.",
  aboutPoints: [
    { title: "Why now", icon: "rocket", description: "AI tools now draft, summarise and analyse in seconds. Using them well is fast becoming a core skill at work." },
    { title: "Two programmes", icon: "sparkles", description: "AI for Professionals and AI for Workspace: pick the one that fits how you work, or take both." },
    { title: "Hands-on", icon: "code", description: "Every session is practical: you use real AI tools on real tasks from the first hour." },
    { title: "Our trainers", icon: "landmark", description: "Faculty of the Department of Computer Science and Engineering at Daffodil International University." },
    { title: "Who it is for", icon: "users", description: "Working professionals, teachers, students, entrepreneurs and office teams. No programming needed." },
    { title: "All year round", icon: "calendar", description: "New batches start regularly: short lectures, hands-on labs and live demos at {venue}. The next one is {dates}." },
    { title: "Responsible use", icon: "heart", description: "Privacy, accuracy and judgement: using AI safely is part of every session." },
    { title: "Past batches", icon: "award", description: "Meet the people who have trained with us on the Past participants page." },
  ],
  audience: [
    { title: "Working professionals", icon: "briefcase", description: "Managers, analysts, engineers, bankers, lawyers, doctors and more who want AI to take on routine work." },
    { title: "Teachers & faculty", icon: "graduation", description: "Prepare lessons, assessments and feedback faster, and guide students in using AI well." },
    { title: "Students", icon: "sparkles", description: "Build the AI skills employers now look for, and use them in your studies." },
    { title: "Office & admin teams", icon: "monitor", description: "Write, plan, organise and report faster with AI in the tools you use every day." },
    { title: "Entrepreneurs", icon: "rocket", description: "Use AI for marketing, customer service and planning in a growing business." },
  ],
  activities: [
    { title: "Short lectures", icon: "mic", description: "The ideas behind each tool, and when to use it." },
    { title: "Hands-on labs", icon: "laptop", description: "Guided practice on real tasks, with trainers on hand." },
    { title: "Live demos", icon: "monitor", description: "AI tools at work, from the first prompt to a finished result." },
    { title: "Bring your own task", icon: "briefcase", description: "Work on something from your own job or studies." },
    { title: "Discussions", icon: "users", description: "Using AI responsibly: privacy, accuracy and judgement." },
  ],
  themes: [
    {
      key: "professionals",
      title: "AI for Professionals",
      description:
        "For working professionals in any field: use AI to research, analyse, write reports and make better decisions, with privacy and accuracy in mind.",
    },
    {
      key: "workspace",
      title: "AI for Workspace",
      description:
        "For everyday office work: write e-mails and documents, build spreadsheets and slides, and take meeting notes faster with AI assistants.",
    },
  ],

  programmeStatus: "draft",
  programmeNote: "The plan every batch follows. Rooms and trainers for your batch are confirmed by e-mail before it starts, and times may change a little.",
  schedulePdf: "",

  mapQuery: "Daffodil International University, Daffodil Smart City, Birulia, Savar, Dhaka",
  // DIU's main buildings at Daffodil Smart City, so the map never depends on how a search is read.
  mapPin: "23.8770, 90.3200",
  mapEmbedUrl: "",
  directions: [
    {
      mode: "air",
      title: "From the airport",
      details:
        "Hazrat Shahjalal International Airport (DAC) is roughly 20 km from Daffodil Smart City, about 45–90 minutes by car depending on traffic, by way of Abdullahpur and the Ashulia road. App-based cars and taxis are available at the airport.",
    },
    {
      mode: "rail",
      title: "From the railway stations",
      details:
        "Dhaka Airport railway station is roughly 20 km from campus, and Kamalapur station roughly 30 km. From either, take an app-based car, or the metro rail towards Uttara or Mirpur and continue by road.",
    },
    {
      mode: "metro",
      title: "By metro rail",
      details:
        "Dhaka Metro Rail (MRT Line 6) runs between Uttara North and Motijheel. Get off at Uttara North and continue by road through Abdullahpur and Ashulia, or at Mirpur 10 and continue by road through Mirpur 1 and Birulia.",
    },
    {
      mode: "road",
      title: "By road",
      details:
        "Daffodil Smart City is at Birulia, Savar, on the north-western edge of Dhaka. DIU's transport buses link the campus with the city; ask the organisers which routes run on training days. App-based cars and CNG auto-rickshaws reach campus too; allow extra time at peak hours.",
    },
  ],
  campusEntry:
    "Daffodil Smart City is a secured campus. Please carry a valid photo ID and your registration ID (sent to you by e-mail). The building, room and entry gate for your batch will be shared here and by e-mail before it begins.",
  accommodation: [
    { name: "Uttara", kind: "area", distance: "~15 km", url: "", note: "Hotels and guest houses near the airport and the metro rail." },
    { name: "Mirpur", kind: "area", distance: "~12 km", url: "", note: "Hotels and restaurants along the metro rail line." },
    { name: "Savar & Ashulia", kind: "area", distance: "5–10 km", url: "", note: "The hotels closest to campus." },
    { name: "Ask the organisers", kind: "campus", distance: "On campus", url: "", note: "Travelling from outside Dhaka? Ask the organisers whether rooms on campus are available for participants." },
  ],
  localInfo: [
    "December and January are cool and dry in Dhaka, with foggy mornings. A light jacket helps.",
    "Dhaka's traffic is hard to predict: set out early, especially on weekday mornings.",
    "App-based cars and the metro rail are the easiest ways to get around the city.",
    "Bring a charged laptop and its charger to every session.",
  ],

  sponsorshipIntro:
    "Partner with the AI Training Seminars at Daffodil International University to bring AI skills to professionals, teachers and students. Partnership packages can be tailored to your goals.",
  sponsorTiers: [
    {
      name: "Programme partner",
      price: "On request",
      perks: ["Your name with the programme on the website and banners", "A dedicated batch for your staff", "A speaking slot at the opening session"],
    },
    {
      name: "Batch sponsor",
      price: "On request",
      perks: ["Logo on the website and banners of the batch", "Seats for your staff or community", "Meet motivated participants"],
    },
    { name: "Community & media partners", price: "On request", perks: ["Logo on the website", "Outreach to your community"] },
  ],
  sponsorBrochure: "",

  contactEmail: "",
  contactPhone: "",
  notifyEmail: "",
  website: "https://daffodilvarsity.edu.bd",
  linkedin: "",
  x: "",
  instagram: "",
  youtube: "",

  logoUniversity: "",
  logoDepartment: "",
  eventLogo: "",
  brandColor: "",
  palette: { azure: "", lilac: "", mint: "", peach: "", blush: "", butter: "", aqua: "" },
  ogImage: "",

  showMoreTrainers: false,
  showAssistant: true,
  auraBuild: "strong",
  auraColor: "steel",
  auraEyes: "auto",
  showGallery: false,
  showTalks: false,
  bannerText: "",
  bannerLink: "",

  gaId: "",
  keywords: [
    "AI training",
    "AI for Professionals",
    "AI for Workspace",
    "Daffodil International University",
    "DIU",
    "Department of CSE",
    "AI course Dhaka",
    "Bangladesh",
  ],
};

type NewDoc<T> = Omit<T, "id">;

/*
 * The trainers: the members of the Department of CSE's list, in its order, the convener first as the lead
 * trainer. Their designations, photos and profiles are edited under Trainers in the admin panel.
 */
const CSE = "Department of Computer Science and Engineering";
const trainer = (name: string, slug: string, extra: Partial<NewDoc<Trainer>> = {}): NewDoc<Trainer> => ({
  name,
  slug,
  designation: `Faculty member, ${CSE}`,
  affiliation: "Daffodil International University",
  category: "faculty",
  theme: "general",
  lead: false,
  photo: "",
  bio: `${name} is a faculty member of the ${CSE} at Daffodil International University and a trainer on the DIU AI Training Seminars.`,
  expertise: "",
  teaching: "",
  website: "",
  linkedin: "",
  x: "",
  scholar: "",
  github: "",
  featured: true,
  published: true,
  ...extra,
});

export const DEFAULT_TRAINERS: NewDoc<Trainer>[] = [
  trainer("Professor Dr. Sheak Rashed Haider Noori", "sheak-rashed-haider-noori", {
    designation: `Professor, ${CSE}`,
    lead: true,
    bio: `Professor Dr. Sheak Rashed Haider Noori is a Professor in the ${CSE} at Daffodil International University and leads the trainers of the DIU AI Training Seminars.`,
  }),
  trainer("Dr. S. M. Aminul Haque", "s-m-aminul-haque"),
  trainer("Dr. Arif Mahmud", "arif-mahmud"),
  trainer("Dr. Abdus Sattar", "abdus-sattar"),
  trainer("Dr. Masud Rana Rashel", "masud-rana-rashel"),
  trainer("Mr. Shahdat Hossain", "shahdat-hossain"),
  trainer("Mr. Saiful Islam", "saiful-islam"),
  trainer("Mr. Mohammad Jahangir Alam", "mohammad-jahangir-alam"),
  trainer("Kridita Ray", "kridita-ray"),
].map((t, i) => ({ ...t, order: i + 1 }));

/** Faculty coordinators, student organisers and volunteers: none until the organisers add them. */
export const DEFAULT_PEOPLE: NewDoc<Person>[] = [];

export const DEFAULT_FAQS: NewDoc<Faq>[] = [
  {
    category: "general",
    question: "Who can join the training?",
    answer: "Anyone who wants to use AI in their work or studies: working professionals, teachers, students, entrepreneurs and office teams. No programming or technical background is needed.",
  },
  {
    category: "general",
    question: "What is the difference between the two programmes?",
    answer:
      "**AI for Professionals** is for people who want AI to help with the core of their work: research, analysis, reports and decisions. **AI for Workspace** focuses on everyday office tasks: e-mail, documents, spreadsheets, slides and meetings. You can join one or both.",
  },
  {
    category: "registration",
    question: "How do I register?",
    answer: "Use the registration form on this site and pick the programme you'd like to join. Places are limited, so the organising team reviews every registration and lets you know whether we can offer you a place.",
  },
  {
    category: "registration",
    question: "When does the next batch start?",
    answer: "New batches start throughout the year, and you can register at any time. The next batch's dates are on the home page; we place you in the next batch with free seats and confirm it by e-mail.",
  },
  { category: "registration", question: "Is there a fee?", answer: "See the Registration page for the current fee, or ask the organisers." },
  { category: "programme", question: "What should I bring?", answer: "A charged laptop and its charger. Tell us in the registration form if you will need a computer in the lab instead." },
  { category: "programme", question: "Do I need to know programming?", answer: "No. Both programmes are designed for non-programmers: if you can use a web browser and an office suite, you can follow every session." },
  {
    category: "programme",
    question: "Which AI tools will we use?",
    answer: "Widely available AI assistants and the AI features of everyday office tools. The trainers share the list, and any accounts you need, before the batch starts.",
  },
  { category: "programme", question: "Will the sessions be recorded?", answer: "Selected slides and recordings may be shared on this website after a batch." },
  {
    category: "travel",
    question: "How do I reach Daffodil Smart City?",
    answer: "See the Venue & travel page for directions from the airport, the railway stations, the metro rail and by road, and the route map on the home page.",
  },
  {
    category: "sponsorship",
    question: "Can you run a batch for our organisation?",
    answer: "Yes. Use the “Become a partner” form on the Partners page, or e-mail the organisers, and we will get back to you with the options.",
  },
].map((f, i) => ({ ...f, order: i + 1, published: true }));

/*
 * The plan every batch follows: Day 1 for AI for Professionals, Day 2 for AI for Workspace, with the rooms and
 * each batch's trainers e-mailed to its participants. Added once to a site without sessions (bootstrap.ts),
 * shown as a draft ("subject to change"); every session is then edited under Schedule in the admin panel.
 */
type Slot = { type: Session["type"]; title: string; theme?: Session["theme"]; description?: string };
const slot = (day: "1" | "2", start: string, end: string, session: Slot) => ({ day, start, end, ...session });
const TRAINERS = "DIU CSE trainers";

export const DEFAULT_SESSIONS: NewDoc<Session>[] = [
  slot("1", "09:30", "10:00", { type: "keynote", title: "Registration and welcome", description: "Meet the trainers and the rest of the batch, and see what you'll be able to do by the end." }),
  slot("1", "10:00", "11:00", { type: "talk", theme: "professionals", title: "AI in your profession: what today's tools can and can't do" }),
  slot("1", "11:00", "11:15", { type: "break", title: "Tea break" }),
  slot("1", "11:15", "12:30", { type: "tutorial", theme: "professionals", title: "Prompting for professional work: clear instructions, better answers" }),
  slot("1", "12:30", "14:30", { type: "break", title: "Lunch and prayer break" }),
  slot("1", "14:30", "15:45", { type: "tutorial", theme: "professionals", title: "Research, analysis and reports with AI" }),
  slot("1", "15:45", "16:30", { type: "panel", title: "Using AI responsibly: privacy, accuracy and judgement" }),
  slot("1", "16:30", "17:00", { type: "other", title: "Wrap-up and questions" }),
  slot("2", "09:30", "10:00", { type: "talk", theme: "workspace", title: "AI across your workspace: an overview" }),
  slot("2", "10:00", "11:00", { type: "tutorial", theme: "workspace", title: "Writing with AI: e-mails, letters and documents" }),
  slot("2", "11:00", "11:15", { type: "break", title: "Tea break" }),
  slot("2", "11:15", "12:30", { type: "tutorial", theme: "workspace", title: "Spreadsheets and data with AI" }),
  slot("2", "12:30", "13:30", { type: "break", title: "Lunch and prayer break" }),
  slot("2", "13:30", "14:30", { type: "tutorial", theme: "workspace", title: "Slides and meeting notes with AI" }),
  slot("2", "14:30", "15:30", { type: "demo", theme: "workspace", title: "Live demo: automating a routine office task" }),
  slot("2", "15:30", "16:30", { type: "tutorial", title: "Bring your own task: guided practice" }),
  slot("2", "16:30", "17:00", { type: "other", title: "Closing session and feedback" }),
].map((x, i) => ({
  description: "",
  theme: "general" as const,
  ...x,
  trainerNote: x.type === "break" ? "" : TRAINERS,
  room: "",
  trainers: [],
  moderator: "",
  panelists: [],
  order: i + 1,
  published: true,
}));

/*
 * Earlier defaults. A site stores the defaults of its day when it is set up, so when a default changes, list the
 * old value here: as they are read, a stored value that is still one of these, never edited, becomes the current
 * default; anything an organiser has changed is kept. The database itself is not changed.
 */
interface Retired {
  /** By field, or "section.text" for a section's texts: earlier defaults, each replaced by the current default there. */
  values: Record<string, unknown[]>;
  /** By list: earlier default texts inside its items (or the list's own strings), each with the text that replaces it. */
  texts: Record<string, Record<string, string>>;
}

const RETIRED: Retired = {
  values: {
    // Wording of the site's first version (a single upcoming batch, "coming soon" placeholders), before
    // the training was presented as running continuously, batch after batch.
    "aboutActivities.title": ["What happens in a batch"],
    // Aura was "she", rounded with a floating head, before his strong build.
    "auraHero.description": ["Aura is the training programme's AI guide: a rounded, hovering robot with a floating head and glowing eyes. Like a good assistant, she adapts to her task, so you'll find her in a different role in every section of the site. Click her for tips."],
    "aboutPoints": [[{"title": "Why now", "icon": "rocket", "description": "AI tools now draft, summarise and analyse in seconds. Using them well is fast becoming a core skill at work."}, {"title": "Two programmes", "icon": "sparkles", "description": "AI for Professionals and AI for Workspace: pick the one that fits how you work, or take both."}, {"title": "Hands-on", "icon": "code", "description": "Every session is practical: you use real AI tools on real tasks from the first hour."}, {"title": "Our trainers", "icon": "landmark", "description": "Faculty of the Department of Computer Science and Engineering at Daffodil International University."}, {"title": "Who it is for", "icon": "users", "description": "Working professionals, teachers, students, entrepreneurs and office teams. No programming needed."}, {"title": "Each batch", "icon": "calendar", "description": "{dates}: short lectures, hands-on labs and live demos at {venue}."}, {"title": "Responsible use", "icon": "heart", "description": "Privacy, accuracy and judgement: using AI safely is part of every session."}, {"title": "Past batches", "icon": "award", "description": "Meet the people who have trained with us on the Past participants page."}]],
    "description": ["AI training seminars at Daffodil International University: AI for Professionals and AI for Workspace, hands-on sessions led by faculty of the Department of Computer Science and Engineering."],
    "feeNote": ["Fees for each batch will be announced here. Places are limited, so registrations are reviewed and confirmed by the organising team."],
    "fees": [[{"category": "Everyone", "amount": "To be announced", "note": "Places are limited"}]],
    "galleryHero.description": ["Moments from the {event}."],
    "galleryHero.empty": ["Photos are on their way!"],
    "highlights": [[{"label": "Programmes", "value": "2", "icon": "sparkles"}, {"label": "Trainers", "value": "9", "icon": "users"}, {"label": "Days per batch", "value": "2", "icon": "calendar"}, {"label": "Hands-on labs", "value": "6", "icon": "laptop"}, {"label": "Seats per batch", "value": "TBA", "icon": "graduation"}]],
    "homeFaq.noEmail": ["Official e-mail address coming soon. Use the form below."],
    "homeInvite.description": ["Places are limited, so registrations are reviewed and confirmed by the organising team. Register below: you'll hear from us {replyBy} on whether we can offer you a place."],
    "homeInvite.eyebrow": ["Registration"],
    "homeInvite.posterBadge": ["Hands-on · places limited"],
    "homeInvite.posterKicker": ["Registration open"],
    "homeInvite.posterText": ["AI for Professionals and AI for Workspace: practical, hands-on AI training at Daffodil International University."],
    "homeInvite.title": ["Registration for the next batch is open"],
    "homeInvite.when": ["When"],
    "homeNews.emptyText": ["Check back soon: registration and batch news will be posted here."],
    "homeParticipants.emptyText": ["Participants are listed here once their batch is completed. Want to be in the first one?"],
    "homeParticipants.emptyTitle": ["Our first batch is on its way"],
    "homePlacard.closed": ["closed"],
    "homePlacard.open": ["now open!"],
    "homeRegister.closed": ["Closed"],
    "homeRegister.description": ["Register once and pick AI for Professionals, AI for Workspace, or both. Places are confirmed by the organising team {replyBy}."],
    "homeRegister.open": ["Open"],
    "homeTrainers.emptyText": ["We are finalising the trainers for each programme. Follow the announcements for updates."],
    "homeTrainers.emptyTitle": ["Trainers will be announced soon"],
    "homeTrainers.moreText": ["New trainers join as the programmes grow. Stay tuned!"],
    "homeTrainers.moreTitle": ["More trainers to be announced"],
    "homeVenue.hallTba": ["Room to be announced"],
    "organisersVolunteers.emptyBadge": ["Coming soon"],
    "organisersVolunteers.emptyText": ["Names and photos of our volunteers will appear here soon. Want to help out at a session?"],
    "organisersVolunteers.emptyTitle": ["The volunteer list is on its way"],
    "participantsList.emptyBadge": ["Coming soon"],
    "participantsList.emptyText": ["Participants are listed here once their batch is completed. Want to be in the first one?"],
    "participantsList.emptyTitle": ["Our first batch is on its way"],
    "partnersList.emptyTitle": ["Partners will be announced soon"],
    "programmeNote": ["A tentative schedule for the next batch: trainers and rooms will be confirmed, and times may still change."],
    "programmeOverview.noSessions": ["Sessions to be announced"],
    "programmePlan.registrationClosed": ["Registration has closed."],
    "programmePlan.registrationOpen": ["Registration is open. Save your seat."],
    "programmeSchedule.tbaBadge": ["Coming soon"],
    "programmeSchedule.tbaCalendar": ["Add the dates to your calendar"],
    "programmeSchedule.tbaRegister": ["Register to get updates"],
    "programmeSchedule.tbaText": ["Session times, rooms and trainers will appear here, with filters by programme and format, a personal agenda and calendar links."],
    "programmeSchedule.tbaTitle": ["Schedule to be announced"],
    "registerDeadlines.title": ["Deadlines"],
    "registerDeadlines.workshop": ["Registration closes"],
    "registerDeadlines.workshopTba": ["Registration deadline: to be announced."],
    "registerFees.tba": ["TBA"],
    "registerForm.closedText": ["Thank you for your interest! Registration for this batch has closed. Follow the announcements for the next one."],
    "registerForm.closedTitle": ["Registration is closed"],
    "registerHero.closed": ["Registration closed"],
    "registerHero.description": ["{dates} · {venue}. Places are limited, so registrations are reviewed and confirmed by the organising team. Register below: you'll hear from us {replyBy} on whether we can offer you a place. Registering takes about two minutes."],
    "registerHero.open": ["Registration open"],
    "siteFooter.copyright": ["© 2026 {organiser}. All rights reserved."],
    "talksHero.empty": ["Recordings will be published soon."],
    "trainersList.emptyButton": ["Follow the announcements"],
    "trainersList.emptyText": ["We're finalising the trainers for each programme. Their profiles will appear here as they are confirmed."],
    "trainersList.emptyTitle": ["More trainers to be announced"],
    "venuePlace.hallTba": ["to be announced"],
  },
  texts: {
    highlights: { "Seats per batch": "New batches", TBA: "All year" },
    fees: { "To be announced": "On request", "Places are limited": "Places in each batch are limited" },
    aboutPoints: {
      "Each batch": "All year round",
      "{dates}: short lectures, hands-on labs and live demos at {venue}.": "New batches start regularly: short lectures, hands-on labs and live demos at {venue}. The next one is {dates}.",
    },
  },
};

const same = (a: unknown, b: unknown) => JSON.stringify(a) === JSON.stringify(b);

function withoutRetired<T extends object>(data: T, defaults: T, { values, texts }: Retired): T {
  const out = { ...data } as Record<string, unknown>;
  const def = defaults as Record<string, unknown>;
  for (const [path, was] of Object.entries(values)) {
    const [key, name] = path.split(".");
    const group = out[key] as Record<string, unknown> | undefined;
    if (name === undefined) {
      if (was.some((w) => same(w, out[key]))) out[key] = def[key];
    } else if (group && typeof group === "object" && was.some((w) => same(w, group[name]))) {
      out[key] = { ...group, [name]: (def[key] as Record<string, unknown>)[name] };
    }
  }
  for (const [key, swaps] of Object.entries(texts)) {
    const swap = (v: unknown): unknown =>
      typeof v === "string"
        ? (Object.hasOwn(swaps, v) ? swaps[v] : v)
        : Array.isArray(v)
          ? v.map(swap)
          : v && typeof v === "object"
            ? Object.fromEntries(Object.entries(v).map(([k, x]) => [k, swap(x)]))
            : v;
    if (Array.isArray(out[key])) out[key] = swap(out[key]);
  }
  return out as T;
}

/** Each form's fields made whole (src/lib/forms.ts), as they are read. */
function withWholeForms<T extends object>(settings: T): T {
  const out = { ...settings } as Record<string, unknown>;
  for (const form of Object.keys(FORM_SETTINGS) as FormKey[]) out[FORM_SETTINGS[form]] = formFields(form, out[FORM_SETTINGS[form]]);
  return out as T;
}

/**
 * Registration is either open (enrolling for the next batch) or paused. A status from before (such as "soon",
 * when the site waited for one batch to open) reads as open: the training enrols continuously.
 */
function withCurrentStatus<T extends object>(settings: T): T {
  const out = settings as Record<string, unknown>;
  return (REGISTRATION_STATUSES as readonly unknown[]).includes(out.workshopStatus) ? settings : ({ ...out, workshopStatus: "open" } as T);
}

/**
 * Stored settings (merged over the defaults) with any earlier, unedited default replaced by the current one,
 * the registration status brought up to date and the forms' fields made whole.
 */
export function withCurrentDefaults<T extends object>(key: "settings", data: T): T {
  void key;
  return withWholeForms(withCurrentStatus(withoutRetired(data, DEFAULT_SETTINGS as T, RETIRED)));
}

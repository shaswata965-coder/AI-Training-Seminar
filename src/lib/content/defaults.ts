import { FORM_DEFAULTS, FORM_SETTINGS, formFields, type FormKey } from "@/lib/forms";
import { REGISTRATION_STATUSES } from "./constants";
import { PAGE_COPY_DEFAULTS } from "@/lib/schema/page-copy";
import { HIDDEN_SECTIONS_DEFAULTS, SECTION_ORDER_DEFAULTS } from "@/lib/schema/section-order";
import { BATCH_ERA_DEFAULTS } from "./retired-batches";
import type { Faq, Person, Session, SiteSettings, Trainer } from "./types";

/*
 * Default content. Used when the database is not configured/reachable and to
 * bootstrap a fresh database on first run. Everything here can be edited in
 * the admin panel. The training is custom: each one is designed with the
 * organisation that asks for it, so the site shows no dates, and its schedule is
 * a sample plan.
 */

export const DEFAULT_SETTINGS: SiteSettings = {
  ...PAGE_COPY_DEFAULTS,
  ...SECTION_ORDER_DEFAULTS,
  ...HIDDEN_SECTIONS_DEFAULTS,
  ...FORM_DEFAULTS,
  programmeName: "DIU AI Training Seminars",
  shortName: "DIU AI Training",
  tagline: "Custom, hands-on AI training for organisations and professionals: faster office work, smarter professional practice.",
  description:
    "Custom AI training from the Department of Computer Science and Engineering at Daffodil International University: hands-on sessions designed around your industry, your office work and your team's tasks, for real efficiency gains.",
  organisedBy: "Department of Computer Science and Engineering, Daffodil International University",
  startDate: "2026-12-11T09:30:00+06:00",
  endDate: "2026-12-12T17:00:00+06:00",
  venueName: "Daffodil Smart City, Savar, Dhaka",
  venueHall: "",
  venueAddress: "Daffodil International University, Daffodil Smart City, Birulia, Savar, Dhaka 1216, Bangladesh",

  registrationStatus: "open",
  registrationDeadline: "",
  registrationReplyBy: "",
  registrationUrl: "",
  fees: [{ category: "Custom training", amount: "On request", note: "Quoted for your team's needs" }],
  feeNote: "Every training is quoted for its focus, length and group size. Tell us what you need and we'll send you a proposal.",
  confirmationNote: "",

  showLoader: true,
  showHeroPhoto: true,
  heroPhoto: "",
  invitePhoto: "",
  highlights: [
    { label: "Training", value: "Custom", icon: "sparkles" },
    { label: "Trainers", value: "9", icon: "users" },
    { label: "Focus", value: "Industry", icon: "briefcase" },
    { label: "Hands-on labs", value: "6", icon: "laptop" },
    { label: "Office work", value: "Faster", icon: "clock" },
  ],
  featuredTrainers: 9,

  motivation:
    "AI tools have moved out of research labs and into everyday work. They draft documents, summarise reports, analyse data and answer questions in seconds, and teams that know how to use them well get more done, with better results.\n\nDIU AI Training helps organisations and professionals make that shift with confidence. Trainers from DIU's Department of Computer Science and Engineering design every training around the people taking it: their **industry**, their **office work** and their **professional tasks**, so the time AI saves shows up in their work the next day, safely and responsibly.",
  learningText:
    "How today's AI assistants work and where they fall short; how to write clear instructions (prompts) and check the answers; how to use AI for **writing**, **research**, **data analysis**, **presentations** and **meetings**; and how to protect **privacy** and keep **your own judgement** in charge; and how to find the routines where AI saves your team the most time. We choose the mix for each training, and every session is hands-on.",
  aboutPoints: [
    { title: "Why now", icon: "rocket", description: "AI tools now draft, summarise and analyse in seconds. Using them well is fast becoming a core skill at work." },
    { title: "Custom content", icon: "sparkles", description: "Every training is designed for its audience: your industry, your tools and the tasks your team does every day." },
    { title: "Hands-on", icon: "code", description: "Every session is practical: you use real AI tools on real tasks from the first hour." },
    { title: "Our trainers", icon: "landmark", description: "Faculty of the Department of Computer Science and Engineering at Daffodil International University." },
    { title: "Who it is for", icon: "users", description: "Organisations, office teams, working professionals, teachers and entrepreneurs. No programming needed." },
    { title: "Efficiency gains", icon: "clock", description: "We start from the routines that take your team the most time and show how AI gets them done faster." },
    { title: "Responsible use", icon: "heart", description: "Privacy, accuracy and judgement: using AI safely is part of every session." },
    { title: "Past participants", icon: "award", description: "Meet the people and teams who have trained with us on the Past participants page." },
  ],
  audience: [
    { title: "Organisations & teams", icon: "landmark", description: "Companies, banks, NGOs and public offices that want their staff to work faster and better with AI." },
    { title: "Working professionals", icon: "briefcase", description: "Managers, analysts, engineers, bankers, lawyers, doctors and more who want AI to take on routine work." },
    { title: "Office & admin teams", icon: "monitor", description: "Write, plan, organise and report faster with AI in the tools you use every day." },
    { title: "Teachers & faculty", icon: "graduation", description: "Prepare lessons, assessments and feedback faster, and guide students in using AI well." },
    { title: "Entrepreneurs", icon: "rocket", description: "Use AI for marketing, customer service and planning in a growing business." },
  ],
  activities: [
    { title: "Your needs first", icon: "users", description: "We talk with you about your industry, your team and the work to speed up." },
    { title: "Designed for you", icon: "briefcase", description: "Sessions, examples and pace chosen for your people and their tools." },
    { title: "Hands-on labs", icon: "laptop", description: "Guided practice on real tasks, with trainers on hand." },
    { title: "Live demos", icon: "monitor", description: "AI tools at work, from the first prompt to a finished result." },
    { title: "Responsible use", icon: "heart", description: "Privacy, accuracy and judgement in every session." },
  ],
  themes: [
    {
      key: "professionals",
      title: "AI for Professional Work",
      description:
        "For professionals in any industry: use AI to research, analyse, write reports and make better decisions, with privacy and accuracy in mind, using the tasks and documents of your own field.",
    },
    {
      key: "workspace",
      title: "AI for Office Work",
      description:
        "For everyday office work: write e-mails and documents, build spreadsheets and slides and take meeting notes faster with AI, in the tools your team already uses.",
    },
  ],

  programmeStatus: "draft",
  programmeNote: "An example only: every training is planned with you, so its sessions, times and trainers follow your team's needs.",
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
    "Daffodil Smart City is a secured campus. Please carry a valid photo ID and your reference number (sent to you by e-mail). The building, room and entry gate for your training are confirmed by e-mail before it begins.",
  accommodation: [
    { name: "Uttara", kind: "area", distance: "~15 km", url: "", note: "Hotels and guest houses near the airport and the metro rail." },
    { name: "Mirpur", kind: "area", distance: "~12 km", url: "", note: "Hotels and restaurants along the metro rail line." },
    { name: "Savar & Ashulia", kind: "area", distance: "5–10 km", url: "", note: "The hotels closest to campus." },
    { name: "Ask the organisers", kind: "campus", distance: "On campus", url: "", note: "Travelling from outside Dhaka? Ask the organisers whether rooms on campus are available for participants." },
  ],
  localInfo: [
    "Dhaka is warm and humid for much of the year: light clothes help, with a light jacket in the cooler months.",
    "Dhaka's traffic is hard to predict: set out early, especially on weekday mornings.",
    "App-based cars and the metro rail are the easiest ways to get around the city.",
    "Bring a charged laptop and its charger to every session.",
  ],

  sponsorshipIntro:
    "Partner with DIU AI Training to bring practical AI skills to professionals and office teams. Partnership packages can be tailored to your goals.",
  sponsorTiers: [
    {
      name: "Training partner",
      price: "On request",
      perks: ["Your name with our training on the website and banners", "A training designed for your staff", "A speaking slot at an opening session"],
    },
    {
      name: "Training sponsor",
      price: "On request",
      perks: ["Logo on the website and banners of a training you support", "Seats for your staff or community", "Meet motivated professionals"],
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
  programmeLogo: "",
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
    "custom AI training",
    "corporate AI training",
    "AI for office work",
    "AI for professionals",
    "Daffodil International University",
    "DIU",
    "Department of CSE",
    "AI training Dhaka",
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
  bio: `${name} is a faculty member of the ${CSE} at Daffodil International University and a trainer with DIU AI Training.`,
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
    bio: `Professor Dr. Sheak Rashed Haider Noori is a Professor in the ${CSE} at Daffodil International University and leads the trainers of DIU AI Training.`,
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
    question: "Who is the training for?",
    answer: "Organisations, teams and individual professionals who want to use AI in their work: office and admin staff, managers, analysts, teachers, entrepreneurs and more. No programming or technical background is needed.",
  },
  {
    category: "general",
    question: "Is there a fixed course?",
    answer:
      "No. Every training is designed for the people taking it. We start from your industry and your daily tasks, and focus on **AI for professional work** (research, analysis, reports and decisions), **AI for office work** (e-mail, documents, spreadsheets, slides and meetings), or a mix of both, always aimed at real efficiency gains.",
  },
  {
    category: "registration",
    question: "How do we get started?",
    answer: "Use the Contact us page to tell us about your organisation, your team and what you'd like AI to help with. The organising team reads every request and replies by e-mail to plan the training with you.",
  },
  {
    category: "registration",
    question: "How long is a training, and when does it take place?",
    answer: "That depends on what your team needs: we agree the focus, length, timing and format with you when we plan the training together.",
  },
  { category: "registration", question: "How much does it cost?", answer: "Every training is quoted for its focus, length and group size. Contact us and we'll send you a proposal." },
  { category: "programme", question: "What should we bring?", answer: "A charged laptop and its charger for everyone taking part. Tell us when you contact us if your team will need computers in the lab instead." },
  { category: "programme", question: "Do we need to know programming?", answer: "No. Every training is designed for non-programmers: if you can use a web browser and an office suite, you can follow every session." },
  {
    category: "programme",
    question: "Which AI tools will we use?",
    answer: "Widely available AI assistants and the AI features of the office tools your team already uses. We agree the list with you, and share any accounts needed, before the training.",
  },
  {
    category: "programme",
    question: "Can the training use examples from our industry?",
    answer: "Yes, that is how we work. We use tasks and documents from your field (without confidential data), so what your team learns applies to their work the next day.",
  },
  {
    category: "travel",
    question: "How do I reach Daffodil Smart City?",
    answer: "See the Venue & travel page for directions from the airport, the railway stations, the metro rail and by road, and the route map on the home page.",
  },
  {
    category: "sponsorship",
    question: "Can you train several teams in our organisation?",
    answer: "Yes. Each team can have a training designed for its own work. Contact us, or use the “Become a partner” form on the Partners page for a longer partnership, and we will get back to you with the options.",
  },
].map((f, i) => ({ ...f, order: i + 1, published: true }));

/*
 * A sample plan of what a training can include: a day of AI for professional work and a day of AI for office
 * work. Each real training is planned with the organisation that asks for it. Added once to a site without
 * sessions (bootstrap.ts), shown as a sample; every session is then edited under Schedule in the admin panel.
 */
type Slot = { type: Session["type"]; title: string; theme?: Session["theme"]; description?: string };
const slot = (day: "1" | "2", start: string, end: string, session: Slot) => ({ day, start, end, ...session });
const TRAINERS = "DIU CSE trainers";

export const DEFAULT_SESSIONS: NewDoc<Session>[] = [
  slot("1", "09:30", "10:00", { type: "opening", title: "Welcome and your team's goals", description: "Meet the trainers, share what your team wants AI to help with and see what you'll be able to do by the end." }),
  slot("1", "10:00", "11:00", { type: "lecture", theme: "professionals", title: "AI in your profession: what today's tools can and can't do" }),
  slot("1", "11:00", "11:15", { type: "break", title: "Tea break" }),
  slot("1", "11:15", "12:30", { type: "tutorial", theme: "professionals", title: "Prompting for professional work: clear instructions, better answers" }),
  slot("1", "12:30", "14:30", { type: "break", title: "Lunch and prayer break" }),
  slot("1", "14:30", "15:45", { type: "tutorial", theme: "professionals", title: "Research, analysis and reports with AI" }),
  slot("1", "15:45", "16:30", { type: "discussion", title: "Using AI responsibly: privacy, accuracy and judgement" }),
  slot("1", "16:30", "17:00", { type: "other", title: "Wrap-up and questions" }),
  slot("2", "09:30", "10:00", { type: "lecture", theme: "workspace", title: "AI across your workspace: an overview" }),
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
    "galleryHero.description": ["Moments from the {programme}."],
    "galleryHero.empty": ["Photos are on their way!"],
    "highlights": [[{"label": "Programmes", "value": "2", "icon": "sparkles"}, {"label": "Trainers", "value": "9", "icon": "users"}, {"label": "Days per batch", "value": "2", "icon": "calendar"}, {"label": "Hands-on labs", "value": "6", "icon": "laptop"}, {"label": "Seats per batch", "value": "TBA", "icon": "graduation"}]],
    "homeFaq.noEmail": ["Official e-mail address coming soon. Use the form below."],
    "homeInvite.description": ["Places are limited, so registrations are reviewed and confirmed by the organising team. Register below: you'll hear from us {replyBy} on whether we can offer you a place."],
    "homeInvite.eyebrow": ["Registration"],
    "homeInvite.posterBadge": ["Hands-on · places limited"],
    "homeInvite.posterKicker": ["Registration open"],
    "homeInvite.posterText": ["AI for Professionals and AI for Workspace: practical, hands-on AI training at Daffodil International University."],
    "homeInvite.title": ["Registration for the next batch is open"],
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
    "programmeSchedule.tbaRegister": ["Register to get updates"],
    "programmeSchedule.tbaText": ["Session times, rooms and trainers will appear here, with filters by programme and format, a personal agenda and calendar links."],
    "programmeSchedule.tbaTitle": ["Schedule to be announced"],
    "registerDeadlines.title": ["Deadlines"],
    "registerDeadlines.rolling": ["Registration deadline: to be announced."],
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
    highlights: {
      "Seats per batch": "Office work",
      "TBA": "Faster",
      "New batches": "Office work",
      "All year": "Faster",
    },
    fees: {
      "To be announced": "On request",
      "Places are limited": "Quoted for your team's needs",
      "Places in each batch are limited": "Quoted for your team's needs",
      "Everyone": "Custom training",
    },
    aboutPoints: {
      "Two programmes": "Custom content",
      "AI for Professionals and AI for Workspace: pick the one that fits how you work, or take both.": "Every training is designed for its audience: your industry, your tools and the tasks your team does every day.",
      "Working professionals, teachers, students, entrepreneurs and office teams. No programming needed.": "Organisations, office teams, working professionals, teachers and entrepreneurs. No programming needed.",
      "All year round": "Efficiency gains",
      "New batches start regularly: short lectures, hands-on labs and live demos at {venue}. The next one is {dates}.": "We start from the routines that take your team the most time and show how AI gets them done faster.",
      "Past batches": "Past participants",
      "Meet the people who have trained with us on the Past participants page.": "Meet the people and teams who have trained with us on the Past participants page.",
      "Each batch": "Efficiency gains",
      "{dates}: short lectures, hands-on labs and live demos at {venue}.": "We start from the routines that take your team the most time and show how AI gets them done faster.",
    },
    themes: {
      "AI for Professionals": "AI for Professional Work",
      "For working professionals in any field: use AI to research, analyse, write reports and make better decisions, with privacy and accuracy in mind.": "For professionals in any industry: use AI to research, analyse, write reports and make better decisions, with privacy and accuracy in mind, using the tasks and documents of your own field.",
      "AI for Workspace": "AI for Office Work",
      "For everyday office work: write e-mails and documents, build spreadsheets and slides, and take meeting notes faster with AI assistants.": "For everyday office work: write e-mails and documents, build spreadsheets and slides and take meeting notes faster with AI, in the tools your team already uses.",
    },
    sponsorTiers: {
      "Programme partner": "Training partner",
      "Your name with the programme on the website and banners": "Your name with our training on the website and banners",
      "A dedicated batch for your staff": "A training designed for your staff",
      "A speaking slot at the opening session": "A speaking slot at an opening session",
      "Batch sponsor": "Training sponsor",
      "Logo on the website and banners of the batch": "Logo on the website and banners of a training you support",
      "Meet motivated participants": "Meet motivated professionals",
    },
    localInfo: {
      "December and January are cool and dry in Dhaka, with foggy mornings. A light jacket helps.": "Dhaka is warm and humid for much of the year: light clothes help, with a light jacket in the cooler months.",
    },
  },
};

// Then the defaults of the batch-era version (two programmes, dates, registration), before custom training.
for (const [path, was] of Object.entries(BATCH_ERA_DEFAULTS)) RETIRED.values[path] = [...(RETIRED.values[path] ?? []), ...was];

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

/*
 * Settings stored by the site's first version under names it no longer uses, read under their current ones (the
 * current name wins where both are stored), and the {programme} placeholder in place of its earlier spelling.
 * Applied to stored settings before they are merged over the defaults; the database itself is not changed, and
 * the next save stores the current names.
 */
const RENAMED_FIELDS: Record<string, string> = {
  eventName: "programmeName",
  eventLogo: "programmeLogo",
  workshopStatus: "registrationStatus",
  workshopDeadline: "registrationDeadline",
  workshopReplyBy: "registrationReplyBy",
  workshopUrl: "registrationUrl",
  agenticAI: "learningText",
};
const RENAMED_TEXTS: Record<string, Record<string, string>> = {
  siteAccount: { whoWorkshop: "whoParticipants" },
  registerDeadlines: { workshop: "closes", workshopTba: "rolling" },
  aboutMotivation: { agenticTone: "learnTone", agenticTitle: "learnTitle" },
  programmeOverview: { keynote: "opening", talk: "lecture", panel: "discussion" },
};
const OLD_PLACEHOLDER = /\{event\}/g;

const isRecord = (v: unknown): v is Record<string, unknown> => typeof v === "object" && v !== null && !Array.isArray(v);

function renamed(obj: Record<string, unknown>, names: Record<string, string>): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(obj)) {
    const name = names[k] ?? k;
    if (name !== k && Object.hasOwn(obj, name)) continue;
    out[name] = v;
  }
  return out;
}

function withCurrentPlaceholder(v: unknown): unknown {
  if (typeof v === "string") return v.replace(OLD_PLACEHOLDER, "{programme}");
  if (Array.isArray(v)) return v.map(withCurrentPlaceholder);
  if (isRecord(v)) return Object.fromEntries(Object.entries(v).map(([k, x]) => [k, withCurrentPlaceholder(x)]));
  return v;
}

/** Stored settings with the names they are read under today (see above); anything else is returned as it is. */
export function withCurrentNames(stored: unknown): unknown {
  if (!isRecord(stored)) return stored;
  const top = renamed(stored, RENAMED_FIELDS);
  for (const [section, names] of Object.entries(RENAMED_TEXTS)) {
    const texts = top[section];
    if (isRecord(texts)) top[section] = renamed(texts, names);
  }
  return withCurrentPlaceholder(top);
}

/** Each form's fields made whole (src/lib/forms.ts), as they are read. */
function withWholeForms<T extends object>(settings: T): T {
  const out = { ...settings } as Record<string, unknown>;
  for (const form of Object.keys(FORM_SETTINGS) as FormKey[]) out[FORM_SETTINGS[form]] = formFields(form, out[FORM_SETTINGS[form]]);
  return out as T;
}

/**
 * Training requests (Contact us) are either open or paused. A status from before (such as "soon", when the
 * site waited for one batch to open) reads as open.
 */
function withCurrentStatus<T extends object>(settings: T): T {
  const out = settings as Record<string, unknown>;
  return (REGISTRATION_STATUSES as readonly unknown[]).includes(out.registrationStatus) ? settings : ({ ...out, registrationStatus: "open" } as T);
}

/**
 * Stored settings (merged over the defaults) with any earlier, unedited default replaced by the current one,
 * the registration status brought up to date and the forms' fields made whole.
 */
export function withCurrentDefaults<T extends object>(key: "settings", data: T): T {
  void key;
  return withWholeForms(withCurrentStatus(withoutRetired(data, DEFAULT_SETTINGS as T, RETIRED)));
}

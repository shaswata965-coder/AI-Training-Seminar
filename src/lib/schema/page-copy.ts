import type { Tone } from "@/lib/content/constants";
import type { FieldDef } from "./fields";

/*
 * The words and colours of every section of the site, editable in
 * Admin → Site settings, page by page. Each entry is one section: its colour,
 * background, headings, button labels and empty-state texts. Defaults are the
 * site's original text. Shared by client and server code.
 *
 * Texts may contain placeholders such as {event} or {dates}; see src/lib/copy.ts.
 */

export type Background = "plain" | "band" | "wash";

/** How a text is used, which sets its input and its recommended length. */
type Kind = "tone" | "background" | "label" | "short" | "note" | "title" | "text" | "long";

export interface CopyField {
  kind: Kind;
  label: string;
  default: string;
  help?: string;
}

/** Recommended length (characters) per kind, and the hard limit. */
export const LENGTHS: Record<Exclude<Kind, "tone" | "background">, { min: number; max: number; cap: number }> = {
  label: { min: 1, max: 30, cap: 80 },
  short: { min: 2, max: 40, cap: 100 },
  note: { min: 8, max: 60, cap: 120 },
  title: { min: 3, max: 75, cap: 160 },
  text: { min: 12, max: 240, cap: 700 },
  long: { min: 40, max: 480, cap: 1500 },
};

const PLACEHOLDERS = "You can write {event}, {dates} or {venue}; they are filled in from Programme details.";
const STATUS = "{status} is replaced by that registration's status, in the words below.";
const REPLY_BY = "{replyBy} becomes “by” and the date in Site-wide → Registration → Places confirmed by, or “by e-mail” while it is blank.";

const tone = (d: Tone, label = "Colour"): CopyField => ({ kind: "tone", label, default: d });
const bg = (d: Background): CopyField => ({ kind: "background", label: "Background", default: d });
const eyebrow = (d: string): CopyField => ({ kind: "short", label: "Label above the title", default: d });
const crumb = (d: string): CopyField => ({ kind: "label", label: "Breadcrumb", default: d });
const title = (d: string, label = "Title", help?: string): CopyField => ({ kind: "title", label, default: d, help });
const intro = (d: string, label = "Introduction", help?: string): CopyField => ({ kind: "text", label, default: d, help });
const label = (l: string, d: string, help?: string): CopyField => ({ kind: "label", label: l, default: d, help });
const short = (l: string, d: string, help?: string): CopyField => ({ kind: "short", label: l, default: d, help });
const heading = (l: string, d: string, help?: string): CopyField => ({ kind: "title", label: l, default: d, help });
const note = (l: string, d: string): CopyField => ({ kind: "note", label: l, default: d });
const text = (l: string, d: string, help?: string): CopyField => ({ kind: "text", label: l, default: d, help });
const long = (l: string, d: string, help?: string): CopyField => ({ kind: "long", label: l, default: d, help });

const EMAIL_HELP = "{email} is the address they typed.";
/** The texts of an enquiry form (its fields are edited beside them). */
const enquiryText = (button: string) => ({
  button: label("Send button", button),
  sending: label("Send button while sending", "Sending…"),
  note: note("Line beside the button", "We only use your details to respond to this enquiry."),
  optional: label("Word beside optional fields", "optional"),
  sentTitle: heading("Once sent: title", "Message sent!"),
  sentText: text("Once sent: text", "Thanks for reaching out. The organisers will reply to {email}.", EMAIL_HELP),
  another: label("Once sent: button to write again", "Send another"),
  close: label("Once sent: button to close (in a pop-up)", "Close"),
  toast: short("Once sent: short notice", "Message sent. Thank you!"),
});

export const PAGE_COPY = {
  /* ------------------------------------------------------- Site-wide -- */
  siteNav: {
    home: label("Home", "Home"),
    about: label("About", "About"),
    aboutText: note("About: description", "Why AI training, who it is for and how it works"),
    programme: label("Schedule", "Schedule"),
    trainers: label("Trainers", "Trainers"),
    participants: label("Past participants", "Past participants"),
    registration: label("Registration", "Registration"),
    tutorials: label("Hands-on labs", "Hands-on labs"),
    tutorialsText: note("Hands-on labs: description", "Practical sessions and live demos of AI tools"),
    venue: label("Venue & travel", "Venue & travel"),
    venueText: note("Venue & travel: description", "Getting to campus, campus entry, stays and tips"),
    partners: label("Partners", "Partners"),
    partnersText: note("Partners: description", "Organisations we work with, and how to join them"),
    organisers: label("Organisers", "Organisers"),
    organisersText: note("Organisers: description", "Coordinators, student organisers and volunteers"),
    themes: label("Home: Programmes", "Programmes"),
    themesText: note("Programmes: description", "AI for Professionals and AI for Workspace"),
    routeMap: label("Home: Route map", "Route map"),
    routeMapText: note("Route map: description", "Follow the route to campus on the map"),
    faq: label("Home: FAQ", "FAQ"),
    faqText: note("FAQ: description", "Registration, the programmes, travel and more"),
    contact: label("Home: Contact", "Contact"),
    contactText: note("Contact: description", "E-mail, social links and the contact form"),
    gallery: label("Photo gallery", "Photo gallery"),
    galleryText: note("Photo gallery: description", "Moments from earlier batches"),
    talks: label("Slides & recordings", "Slides & recordings"),
    talksText: note("Slides & recordings: description", "Catch up on the sessions"),
    meetAura: label("Meet Aura", "Meet Aura"),
  },
  siteHeader: {
    explore: label("Explore menu", "Explore"),
    pagesHeading: label("Explore menu: pages heading", "Pages"),
    sectionsHeading: label("Explore menu: home sections heading", "On the home page"),
    register: label("Register button", "Register"),
    registerNow: label("Register button (phone menu)", "Register now"),
  },
  siteAccount: {
    signIn: label("Sign-in button (navigation bar)", "Sign in"),
    signOut: label("Account menu: sign out", "Sign out"),
    myAgenda: label("Account menu: link to the agenda", "My agenda"),
    title: heading("Sign-in window: title", "Sign in to keep your agenda"),
    intro: text("Sign-in window: introduction", "Star sessions to build your own agenda. It is saved with your account, so it follows you to every device."),
    email: label("E-mail field", "E-mail"),
    code: label("Second field", "Password, registration ID or sign-in code"),
    whoTitle: short("Who can sign in: title", "Who can sign in"),
    whoWorkshop: text("Who can sign in: participants", "Registered participants: your registration e-mail and registration ID (in your confirmation)."),
    whoTeam: text("Who can sign in: volunteers", "Volunteers and organisers: your admin panel e-mail and password."),
    whoPeople: text("Who can sign in: coordinators", "Coordinators listed on the site: the e-mail and sign-in code the organisers sent you."),
    submit: label("Sign-in window: button", "Sign in"),
    signingIn: label("Sign-in window: button while signing in", "Signing in…"),
    register: label("Sign-in window: link to register", "Not registered yet? Register for the training"),
    needSignIn: short("Notice: starring while signed out", "Sign in to add sessions to your agenda"),
    signedIn: short("Notice once signed in", "Signed in. Your agenda is saved to your account."),
    signedOut: short("Notice once signed out", "Signed out"),
  },
  siteFooter: {
    pagesHeading: label("Pages column heading", "Pages"),
    exploreHeading: label("Explore column heading", "Explore"),
    involveHeading: label("Get involved column heading", "Get involved"),
    register: label("Link: register", "Register for the training"),
    participants: label("Link: past participants", "Meet our past participants"),
    partner: label("Link: partner", "Become a partner"),
    contact: label("Link: contact", "Contact the organisers"),
    copyright: text("Copyright line", "© 2026 {organiser}. All rights reserved.", "{organiser} is the organiser's name."),
    meetAura: label("Link: Meet Aura", "Meet Aura, our mascot"),
    login: label("Link: organiser login", "Organiser login"),
  },
  siteBanner: { tone: tone("lilac") },

  /* ------------------------------------------------------------ Home -- */
  homeLoader: {
    page: short("Status: loading the page", "Loading the page"),
    pages: short("Status: loading pages", "Loading pages ({done} of {total})", "{done} and {total} count the pages as they arrive."),
    files: short("Status: caching files", "Caching files ({done} of {total})", "{done} and {total} count the images and scripts."),
    ready: label("Status: all loaded", "Lift-off!"),
    status: note("Status for screen readers", "Loading the {event} website"),
  },
  homeHero: {
    organisedBy: label("Above the university's name", "Organised by"),
    institute: short("The university's name", "Daffodil International University"),
    school: note("Under the university's name", "Department of Computer Science and Engineering"),
    when: label("Fact: when", "Next batch"),
    where: label("Fact: where", "Where"),
  },
  homePlacard: {
    text: short("Placard 1: AI for Professionals", "AI for Professionals: {status}", `What the first sign Aura holds up says; about 35 characters fit. ${STATUS}`),
    workspace: short("Placard 2: AI for Workspace", "AI for Workspace: {status}", `What the second sign says. Clear both and she waves hello instead. ${STATUS}`),
    open: label("{status} while registration is open", "now open!"),
    soon: label("{status} before it opens", "opening soon"),
    closed: label("{status} once it has closed", "closed"),
    professionalsTab: label("Switch under Aura: placard 1", "Professionals"),
    workspaceTab: label("Switch under Aura: placard 2", "Workspace"),
  },
  homeRegister: {
    professionalsTone: tone("peach", "AI for Professionals card colour"),
    workspaceTone: tone("mint", "AI for Workspace card colour"),
    title: title("Two programmes, one registration"),
    description: intro("Register once and pick AI for Professionals, AI for Workspace, or both. Places are confirmed by the organising team {replyBy}.", "Introduction", REPLY_BY),
    professionalsKicker: short("Card 1: label", "For professionals"),
    professionalsTitle: heading("Card 1: title", "AI for Professionals"),
    workspaceKicker: short("Card 2: label", "For office work"),
    workspaceTitle: heading("Card 2: title", "AI for Workspace"),
    open: label("Status: open", "Open"),
    until: label("Word before the deadline", "until"),
    soon: label("Status: opening soon", "Opening soon"),
    closed: label("Status: closed", "Closed"),
  },
  homeHighlights: { stub: label("Label on the ticket stub", "At a glance") },
  homeInvite: {
    tone: tone("butter"),
    background: bg("band"),
    eyebrow: eyebrow("Registration"),
    title: title("Registration for the next batch is open"),
    description: intro(
      "Places are limited, so registrations are reviewed and confirmed by the organising team. Register below: you'll hear from us {replyBy} on whether we can offer you a place.",
      "Introduction",
      `${PLACEHOLDERS} ${REPLY_BY}`,
    ),
    free: note("Line above the button", "Registering takes about two minutes."),
    button: label("Button: register", "Register now"),
    expectTitle: short("What to expect: title", "What to expect"),
    expectText: text("What to expect: text", "Hands-on sessions with DIU's trainers: you use real AI tools on real tasks from the first hour."),
    researchTitle: short("Bring a task: title", "Bring a real task"),
    researchText: text(
      "Bring a task: text",
      "Bring something from your own work or studies, such as a report to write, data to make sense of or a routine to speed up, and work on it with AI during the labs.",
    ),
    researchTheme: text("Bring a task: the note (highlighted)", "Bring a laptop: every session is hands-on."),
    posterLink: label("Bring a task: link to the programmes", "Compare the programmes"),
    posterKicker: short("Poster: label", "Registration open"),
    posterBadge: label("Poster: badge", "Hands-on · places limited"),
    posterTitle: heading("Poster: title", "Join the {event}"),
    posterText: text("Poster: text", "AI for Professionals and AI for Workspace: practical, hands-on AI training at Daffodil International University."),
    when: label("Poster fact: dates", "When"),
    where: label("Poster fact: venue", "Where"),
  },
  homeNews: {
    tone: tone("peach"),
    eyebrow: eyebrow("Announcements"),
    title: title("News from the organisers"),
    description: intro("Updates about registration, trainers and new batches appear here first."),
    emptyTitle: heading("When there are none: title", "No announcements yet"),
    emptyText: text("When there are none: text", "Check back soon: registration and batch news will be posted here."),
    older: label("Older announcements", "Older announcements"),
    readMore: label("Default link text", "Read more"),
    pinned: label("Pinned label", "Pinned"),
    info: label("Badge: information", "Update"),
    important: label("Badge: important", "Important"),
    success: label("Badge: good news", "Good news"),
  },
  homeThemes: {
    tone: tone("lilac"),
    background: bg("band"),
    eyebrow: eyebrow("Programmes"),
    title: title("Two programmes, one goal: put AI to work for you"),
    description: intro("Each programme is a short series of hands-on sessions led by DIU's trainers. Pick the one that fits how you work, or take both."),
    theme: label("Card label", "Programme"),
    talks: label("Link: sessions", "Sessions in the schedule"),
    tutorials: label("Link: hands-on labs", "Hands-on labs"),
  },
  homeAbout: {
    tone: tone("mint"),
    background: bg("wash"),
    eyebrow: eyebrow("About the training"),
    portalKicker: short("Link card: label", "About the training"),
    portalTitle: heading("Link card: title", "Why AI training, and why now?"),
    portalText: text("Link card: text", "What each programme covers, who it is for and how the sessions run."),
  },
  homeTrainers: {
    tone: tone("lilac"),
    background: bg("wash"),
    eyebrow: eyebrow("Trainers"),
    title: title("Learn from DIU's own faculty"),
    description: intro("Every session is led by faculty of the Department of Computer Science and Engineering at Daffodil International University."),
    profile: label("Trainer card: link", "View profile"),
    moreTitle: heading("“More to come” card: title", "More trainers to be announced"),
    moreText: text("“More to come” card: text", "New trainers join as the programmes grow. Stay tuned!"),
    emptyTitle: heading("No trainers yet: title", "Trainers will be announced soon"),
    emptyText: text("No trainers yet: text", "We are finalising the trainers for each programme. Follow the announcements for updates."),
    emptyButton: label("No trainers yet: button", "See announcements"),
    portalKicker: short("Link card: label", "Trainers"),
    portalTitle: heading("Link card: title", "Meet all {count}", "{count} is the number of trainers, e.g. “9 trainers”."),
    portalText: text("Link card: text", "Every trainer's profile, with what they teach in each programme."),
    portalEmptyTitle: heading("Link card with no trainers: title", "Trainer profiles"),
    portalEmptyText: text("Link card with no trainers: text", "Profiles appear here as trainers are confirmed."),
  },
  homeParticipants: {
    tone: tone("butter"),
    background: bg("plain"),
    eyebrow: eyebrow("Past participants"),
    title: title("People who have trained with us"),
    description: intro("Professionals, teachers and students from earlier batches, in their own words."),
    portalKicker: short("Link card: label", "Past participants"),
    portalTitle: heading("Link card: title", "Meet all {count}", "{count} is the number of past participants, e.g. “120 participants”."),
    portalText: text("Link card: text", "Every batch so far: who took part, from where, and what they said."),
    emptyTitle: heading("No participants yet: title", "Our first batch is on its way"),
    emptyText: text("No participants yet: text", "Participants are listed here once their batch is completed. Want to be in the first one?"),
    emptyButton: label("No participants yet: button", "Register now"),
  },
  homeVenue: {
    tone: tone("mint"),
    background: bg("band"),
    eyebrow: eyebrow("Venue & travel"),
    title: title("Getting to Daffodil Smart City"),
    description: intro("Pick how you're arriving and follow the route to campus."),
    hallTba: label("Room not set", "Room to be announced"),
    maps: label("Map button", "Google Maps"),
    portalKicker: short("Link card: label", "Travel guide"),
    portalTitle: heading("Link card: title", "Everything for the trip"),
    portalText: text("Link card: text", "Campus entry, every route in detail, places to stay and local tips."),
  },
  homePartners: { tone: tone("butter"), title: heading("Heading (for screen readers)", "Partners") },
  contactFormText: enquiryText("Send message"),
  homeFaq: {
    tone: tone("lilac"),
    background: bg("wash"),
    eyebrow: eyebrow("FAQ"),
    title: title("Questions, answered"),
    description: intro("Can't find what you're looking for? Send us a message."),
    contactTone: tone("blush", "Contact card colour"),
    contactTitle: heading("Contact card: title", "Contact the organisers"),
    noEmail: text("Contact card without an e-mail address", "Official e-mail address coming soon. Use the form below."),
  },

  /* ----------------------------------------------------------- About -- */
  aboutHero: {
    tone: tone("mint"),
    crumb: crumb("About"),
    eyebrow: eyebrow("About the training"),
    title: title("Why AI training, and why now?"),
    description: intro("{tagline}", "Introduction", "{tagline} is the tagline from Programme details."),
  },
  aboutMotivation: {
    tone: tone("mint"),
    background: bg("plain"),
    title: heading("Heading (for screen readers)", "Why this training"),
    agenticTone: tone("lilac", "“What you will learn” card colour"),
    agenticTitle: heading("“What you will learn” card: title", "What you will learn"),
  },
  aboutAudience: { tone: tone("lilac"), background: bg("band"), eyebrow: eyebrow("Audience"), title: title("Who should attend") },
  aboutActivities: { tone: tone("peach"), background: bg("plain"), eyebrow: eyebrow("How it works"), title: title("What happens in a batch") },

  /* ------------------------------------------------------- Programme -- */
  programmeHero: {
    tone: tone("azure"),
    crumb: crumb("Schedule"),
    eyebrow: eyebrow("Schedule"),
    title: title("Training schedule"),
    description: intro(
      "{dates} at {venueName}. Lectures, hands-on labs and live demos for AI for Professionals and AI for Workspace.",
      "Introduction",
      `${PLACEHOLDERS} {venueName} is the venue without the room.`,
    ),
    pdf: label("PDF button", "Download PDF"),
  },
  programmeOverview: {
    tone: tone("azure"),
    background: bg("plain"),
    eyebrow: eyebrow("At a glance"),
    title: title("{days} of lectures, hands-on labs and demos", "Title (before sessions are added)", "{days} is the number of days, e.g. “2 days”."),
    titleWithSessions: heading("Title (once sessions are added)", "{sessions} over {days}", "{sessions} is the number of sessions, e.g. “14 sessions”."),
    description: intro("The next batch runs at {venue}. All times are Bangladesh time (BST).", "Introduction", PLACEHOLDERS),
    day: label("Day label", "Day"),
    noSessions: label("Day without sessions", "Sessions to be announced"),
    formats: label("Session formats heading", "Session formats"),
    keynote: text("Format: opening", "A welcome and an overview of the programme and what you'll be able to do by the end."),
    talk: text("Format: lecture", "Short lectures on the ideas behind each tool and when to use it."),
    panel: text("Format: discussion", "Open discussions on using AI responsibly at work and in class."),
    tutorial: text("Format: hands-on lab", "Guided practice where you use AI tools on real tasks yourself."),
    demo: text("Format: demo", "Live demonstrations of AI tools at work."),
    themes: label("Programmes heading", "Programmes"),
  },
  programmeSchedule: {
    tone: tone("azure"),
    background: bg("band"),
    eyebrow: eyebrow("Schedule"),
    title: title("Day by day"),
    draft: label("Draft badge", "Draft: subject to change"),
    final: label("Final badge", "Final schedule"),
    printTip: short("Print tip", "Tip: you can also print this page."),
    filterHint: text("Hint above the schedule", "Filter by programme or session type, star sessions to build your own agenda and add them to your calendar."),
    tbaBadge: label("Before the schedule: badge", "Coming soon"),
    tbaTitle: heading("Before the schedule: title", "Schedule to be announced"),
    tbaText: text("Before the schedule: text", "Session times, rooms and trainers will appear here, with filters by programme and format, a personal agenda and calendar links."),
    tbaCalendar: label("Before the schedule: calendar button", "Add the dates to your calendar"),
    tbaRegister: label("Before the schedule: register button", "Register to get updates"),
  },
  programmePlan: {
    tone: tone("mint"),
    background: bg("band"),
    eyebrow: eyebrow("Plan your visit"),
    title: title("Before you come"),
    venueTitle: heading("Card: venue title", "Venue & travel"),
    venueText: text("Card: venue text", "{venue}. Maps, directions and places to stay.", PLACEHOLDERS),
    registrationTitle: heading("Card: registration title", "Registration"),
    registrationOpen: text("Card: registration open", "Registration is open. Save your seat."),
    registrationClosed: text("Card: registration closed", "Registration has closed."),
    registrationSoon: text("Card: registration soon", "Registration opens soon."),
    tutorialsTitle: heading("Card: hands-on labs title", "Hands-on labs"),
    tutorialsText: text("Card: hands-on labs text", "Levels, prerequisites and materials for the practical sessions."),
    trainersTitle: heading("Card: trainers title", "Trainers"),
    trainersText: text("Card: trainers text", "Who teaches each session, with their profiles."),
  },

  /* -------------------------------------------------------- Trainers -- */
  trainersHero: {
    tone: tone("lilac"),
    crumb: crumb("Trainers"),
    eyebrow: eyebrow("Trainers"),
    title: title("Meet the trainers"),
    description: intro("Faculty of the Department of Computer Science and Engineering at Daffodil International University. Tap a card to read the full profile."),
    portalKicker: short("Link card: label", "Schedule"),
    portalTitle: heading("Link card: title", "When each session happens"),
    portalText: text("Link card: text", "Day-wise schedule and your own agenda."),
  },
  trainersSpotlight: {
    tone: tone("lilac"),
    background: bg("band"),
    eyebrow: eyebrow("Lead trainer"),
    badge: label("Badge on the profile", "Lead trainer"),
    team: short("Line under the profile", "Leading a team of {count}", "{count} is the number of trainers, e.g. “9 trainers”."),
    profile: label("Button: full profile", "Read the full profile"),
    sessions: label("Button: sessions", "See the sessions"),
  },
  trainersList: {
    tone: tone("lilac"),
    eyebrow: eyebrow("The team"),
    title: title("Every trainer"),
    emptyTitle: heading("No trainers yet: title", "More trainers to be announced"),
    emptyText: text(
      "No trainers yet: text",
      "We're finalising the trainers for each programme. Their profiles will appear here as they are confirmed.",
    ),
    emptyButton: label("No trainers yet: button", "Follow the announcements"),
  },

  /* ------------------------------------------------------- Tutorials -- */
  tutorialsHero: {
    tone: tone("mint"),
    crumb: crumb("Hands-on labs"),
    eyebrow: eyebrow("Learn by doing"),
    title: title("Hands-on labs & demos"),
    description: intro("Practical sessions where you use AI tools on real tasks, plus live demos. Check the prerequisites before you arrive."),
    tutorialsButton: label("Button: labs", "Labs"),
    demosButton: label("Button: demos", "Demos"),
  },
  tutorialsList: { tone: tone("mint") },



  /* ---------------------------------------------------- Registration -- */
  registerHero: {
    tone: tone("peach"),
    crumb: crumb("Registration"),
    eyebrow: eyebrow("Registration"),
    title: title("Register for the training"),
    description: intro(
      "{dates} · {venue}. Places are limited, so registrations are reviewed and confirmed by the organising team. Register below: you'll hear from us {replyBy} on whether we can offer you a place. Registering takes about two minutes.",
      "Introduction",
      `${PLACEHOLDERS} ${REPLY_BY}`,
    ),
    open: label("Status: open", "Registration open"),
    closed: label("Status: closed", "Registration closed"),
    soon: label("Status: soon", "Opening soon"),
  },
  registerForm: {
    externalTitle: heading("External form: title", "Register using the official form"),
    externalText: text("External form: text", "Registration is handled through an external form. It opens in a new tab."),
    externalButton: label("External form: button", "Open registration form"),
    soonTitle: heading("Opening soon: title", "Registration opens soon"),
    soonText: text(
      "Opening soon: text",
      "We're getting everything ready. Batch dates, fees and deadlines will be announced here. Check the announcements for the opening date.",
    ),
    closedTitle: heading("Closed: title", "Registration is closed"),
    closedText: text("Closed: text", "Thank you for your interest! Registration for this batch has closed. Follow the announcements for the next one."),
    announcements: label("Button: announcements", "See announcements"),
    contact: label("Button: contact", "Contact us"),
  },
  registerFormText: {
    step1: label("Step 1 name", "About you"),
    step2: label("Step 2 name", "Programme"),
    step3: label("Step 3 name", "Logistics"),
    progress: short("Under the steps", "Step {step} of {steps}", "{step} and {steps} are filled in as they go."),
    required: note("Note on the first step", "Fields marked * are required."),
    optional: label("Word beside optional fields", "optional"),
    back: label("Button: back", "Back"),
    next: label("Button: next step", "Continue"),
    submit: label("Button: send", "Complete registration"),
    sending: label("Button while sending", "Registering…"),
    doneTitle: heading("Once registered: title", "Registration received!"),
    doneId: short("Once registered: before the ID", "Your registration ID is"),
    doneMailed: text("Once registered: e-mail sent", "An e-mail with your registration ID is on its way to {email}.", EMAIL_HELP),
    doneQueued: text(
      "Once registered: ID sent by e-mail",
      "Your registration ID and details are on their way to {email}. If this address was already registered, your earlier registration stands and we've sent its details again.",
      EMAIL_HELP,
    ),
    doneNoMail: text("Once registered: no e-mail", "Please note your registration ID. The organisers will contact you at {email}.", EMAIL_HELP),
    doneReview: text(
      "Once registered: the review",
      "Places are limited, so the organising team reviews every registration: you'll hear from us {replyBy} on whether we can offer you a place.",
      REPLY_BY,
    ),
    share: label("Once registered: share label", "Tell your friends"),
    shareText: note("Once registered: shared message", "I've registered for the {event} at DIU!"),
  },
  registerFees: {
    title: heading("Title", "Fees"),
    category: label("Column: category", "Category"),
    fee: label("Column: fee", "Fee"),
    tba: label("Amount not set", "TBA"),
  },
  registerDeadlines: {
    title: heading("Title", "Deadlines"),
    workshop: short("Registration deadline", "Registration closes"),
    workshopTba: text("Registration deadline not set", "Registration deadline: to be announced."),
    portalKicker: short("Programmes card: label", "Not sure which programme?"),
    portalTitle: heading("Programmes card: title", "Compare the programmes"),
    portalText: text("Programmes card: text", "What AI for Professionals and AI for Workspace each cover, and who they are for."),
  },

  /* -------------------------------------------------------- Partners -- */
  partnerFormText: enquiryText("Send partnership enquiry"),
  partnersHero: {
    tone: tone("butter"),
    crumb: crumb("Partners"),
    eyebrow: eyebrow("Partners"),
    title: title("Bring AI skills to more people with us"),
    button: label("Button", "Become a partner"),
    formTitle: heading("Enquiry form: title", "Partner with us"),
    formText: text("Enquiry form: text", "Share a few details and the organisers will get in touch."),
    brochure: label("Brochure button", "Partnership brochure"),
  },
  partnersList: {
    tone: tone("butter"),
    background: bg("plain"),
    eyebrow: eyebrow("Our partners"),
    title: title("The organisations with us"),
    emptyTitle: heading("Title before partners are added", "Partners will be announced soon"),
  },
  partnersReach: {
    tone: tone("lilac"),
    background: bg("band"),
    eyebrow: eyebrow("Who you'll reach"),
    title: title("The people we train"),
    description: intro("Every batch brings together professionals, teachers, students and entrepreneurs learning to use AI in their work."),
  },
  partnersWays: {
    tone: tone("peach"),
    background: bg("plain"),
    eyebrow: eyebrow("Ways to take part"),
    title: title("Pick how you want to be involved"),
    sponsorTitle: heading("Card 1: title", "Sponsor a batch"),
    sponsorText: text("Card 1: text", "Support a batch of training and put your name in front of professionals, teachers and students."),
    teamTitle: heading("Card 2: title", "Train your team"),
    teamText: text("Card 2: text", "Book a dedicated batch of AI for Professionals or AI for Workspace for your organisation's staff."),
    expertTitle: heading("Card 3: title", "Share your expertise"),
    expertText: text("Card 3: text", "Join as a guest trainer, or bring a real problem from your industry for participants to work on."),
    communityTitle: heading("Card 4: title", "Community & media"),
    communityText: text("Card 4: text", "Bring the training to your members or readers as a community or media partner."),
  },
  partnersTiers: {
    tone: tone("butter"),
    background: bg("band"),
    eyebrow: eyebrow("Become a partner"),
    title: title("Partnership opportunities"),
    description: intro("Choose a tier below, or get in touch to talk it through."),
    onRequest: label("Price not set", "On request"),
    email: short("Words before the e-mail address", "Partnership enquiries:"),
  },

  /* ----------------------------------------------------------- Venue -- */
  venueHero: {
    tone: tone("mint"),
    crumb: crumb("Venue & travel"),
    eyebrow: eyebrow("Venue & travel"),
    title: title("Your guide to getting to Daffodil Smart City"),
    description: intro("Directions from the airport, the railway stations, the metro and by road, what to bring for campus entry, where to stay and a few local tips."),
    directions: label("Button", "Directions"),
    portalKicker: short("Link card: label", "Route map"),
    portalTitle: heading("Link card: title", "Follow your route to campus"),
  },
  venuePlace: {
    tone: tone("mint"),
    background: bg("plain"),
    eyebrow: eyebrow("The venue"),
    venue: label("Card label", "Venue"),
    hall: label("Room not set: label", "Room / building:"),
    hallTba: label("Room not set: badge", "to be announced"),
    openMap: label("Button: map", "Open map"),
    directions: label("Button: directions", "Directions"),
    entry: heading("Campus entry title", "Campus entry"),
  },
  venueRoutes: {
    tone: tone("azure"),
    background: bg("band"),
    eyebrow: eyebrow("Getting here"),
    title: title("By air, train, metro or road"),
    description: intro("Travel times are indicative and depend on Dhaka's traffic. Check live traffic before you set out, or follow each route on the"),
    mapLink: label("Link at the end of the introduction", "interactive map"),
    plan: label("Route link", "Plan this route in Google Maps"),
  },
  venueStay: {
    tone: tone("peach"),
    background: bg("plain"),
    eyebrow: eyebrow("Where to stay"),
    title: title("Nearby accommodation"),
    description: intro("Hotels and neighbourhoods within easy reach of campus."),
    details: label("Details link", "Details"),
    tipsTone: tone("butter", "Local tips card colour"),
    tips: heading("Local tips title", "Local tips"),
    portalKicker: short("Link card: label", "Travel questions?"),
    portalTitle: heading("Link card: title", "See the FAQ"),
    portalText: text("Link card: text", "Answers on registration, the programmes, travel and more."),
  },

  /* ------------------------------------------------------ Organisers -- */
  organisersHero: {
    tone: tone("blush"),
    crumb: crumb("Organisers"),
    eyebrow: eyebrow("The team"),
    title: title("Organisers"),
    description: intro(
      "The {event} is organised by the Department of Computer Science and Engineering, Daffodil International University.",
      "Introduction",
      PLACEHOLDERS,
    ),
    greeting: short("Aura's greeting", "We're the team behind the training!"),
  },
  organisersFaculty: { tone: tone("lilac"), background: bg("plain"), eyebrow: eyebrow("Faculty"), title: title("Faculty coordinators"), card: label("Card label", "Faculty coordinator") },
  organisersStudents: { tone: tone("mint"), background: bg("band"), eyebrow: eyebrow("Students"), title: title("Student organisers"), card: label("Card label", "Student organiser") },
  organisersVolunteers: {
    tone: tone("butter"),
    background: bg("plain"),
    eyebrow: eyebrow("Volunteers"),
    title: title("Volunteers"),
    description: intro("The friendly faces who keep every session running."),
    card: label("Card label", "Volunteer"),
    emptyBadge: label("None yet: badge", "Coming soon"),
    emptyTitle: heading("None yet: title", "The volunteer list is on its way"),
    emptyText: text("None yet: text", "Names and photos of our volunteers will appear here soon. Want to help out at a session?"),
    emptyButton: label("None yet: button", "Volunteer with us"),
  },

  /* -------------------------------------------------------- Post-event -- */
  galleryHero: {
    tone: tone("peach"),
    crumb: crumb("Photo gallery"),
    eyebrow: eyebrow("Past batches"),
    title: title("Photo gallery"),
    description: intro("Moments from the {event}.", "Introduction", PLACEHOLDERS),
    empty: heading("No photos yet", "Photos are on their way!"),
  },
  talksHero: {
    tone: tone("lilac"),
    crumb: crumb("Slides & recordings"),
    eyebrow: eyebrow("Past batches"),
    title: title("Session slides & recordings"),
    description: intro("Catch up on the sessions of the {event}.", "Introduction", PLACEHOLDERS),
    slides: label("Slides button", "Slides"),
    empty: heading("No recordings yet", "Recordings will be published soon."),
  },

  /* ------------------------------------------------- Past participants -- */
  participantsHero: {
    tone: tone("butter"),
    crumb: crumb("Past participants"),
    eyebrow: eyebrow("Past participants"),
    title: title("Our past participants"),
    description: intro("Professionals, teachers, students and entrepreneurs who have completed a batch of the {event}.", "Introduction", PLACEHOLDERS),
    register: label("Button: register", "Join the next batch"),
  },
  participantsStats: {
    tone: tone("butter"),
    background: bg("plain"),
    participants: label("Count: participants", "Participants"),
    batches: label("Count: batches", "Batches"),
    organisations: label("Count: organisations", "Organisations"),
    programmes: label("Count: programmes", "Programmes"),
  },
  participantsTestimonials: {
    tone: tone("lilac"),
    background: bg("band"),
    eyebrow: eyebrow("In their words"),
    title: title("What participants say"),
  },
  participantsList: {
    tone: tone("mint"),
    background: bg("plain"),
    eyebrow: eyebrow("Everyone so far"),
    title: title("Participants by batch"),
    all: label("Filter: every programme", "All programmes"),
    allBatches: label("Filter: every batch", "All batches"),
    search: label("Search box", "Search by name or organisation"),
    none: text("No matches", "No participants match these filters."),
    emptyBadge: label("None yet: badge", "Coming soon"),
    emptyTitle: heading("None yet: title", "Our first batch is on its way"),
    emptyText: text("None yet: text", "Participants are listed here once their batch is completed. Want to be in the first one?"),
    emptyButton: label("None yet: button", "Register now"),
  },
  participantsCta: {
    tone: tone("peach"),
    background: bg("wash"),
    title: title("Your name could be next"),
    text: text("Text", "Pick a programme and ask for your seat in the next batch. Registering takes about two minutes."),
    button: label("Button", "Register now"),
  },

  /* ------------------------------------------------------- Meet Aura -- */
  auraHero: {
    tone: tone("aqua"),
    crumb: crumb("Meet Aura"),
    eyebrow: eyebrow("Our mascot"),
    title: title("Meet Aura"),
    description: long(
      "Introduction",
      "Aura is the training programme's AI guide: a rounded, hovering robot with a floating head and glowing eyes. Like a good assistant, she adapts to her task, so you'll find her in a different role in every section of the site. Click her for tips.",
    ),
  },
  auraPlayground: {
    tone: tone("azure"),
    background: bg("plain"),
    eyebrow: eyebrow("Playground"),
    title: title("Mix and match"),
    description: intro("Try Aura's expressions, poses, props and effects."),
  },
  auraLooks: {
    tone: tone("lilac"),
    background: bg("band"),
    eyebrow: eyebrow("Around the site"),
    title: title("{count} looks, one guide", "Title", "{count} is the number of looks."),
    description: intro("Every page and section has its own version of Aura."),
  },
} satisfies Record<string, Record<string, CopyField>>;

export type CopyKey = keyof typeof PAGE_COPY;
type ValueOf<N> = N extends "tone" | `${string}Tone` ? Tone : N extends "background" ? Background : string;
/** The copy as stored in Site settings: one object of texts per section. */
export type PageCopy = { [K in CopyKey]: { [N in keyof (typeof PAGE_COPY)[K]]: ValueOf<N> } };

export const PAGE_COPY_DEFAULTS = Object.fromEntries(
  Object.entries(PAGE_COPY).map(([key, fields]) => [key, Object.fromEntries(Object.entries(fields).map(([name, f]) => [name, f.default]))]),
) as PageCopy;

/* ------------------------------------------------------------ Fields -- */

export const TONE_OPTIONS: { value: Tone; label: string }[] = [
  { value: "azure", label: "Azure (blue)" },
  { value: "lilac", label: "Lilac (purple)" },
  { value: "mint", label: "Mint (green)" },
  { value: "peach", label: "Peach (orange)" },
  { value: "blush", label: "Blush (pink)" },
  { value: "butter", label: "Butter (yellow)" },
  { value: "aqua", label: "Aqua (cyan)" },
];

export const BACKGROUND_OPTIONS: { value: Background; label: string }[] = [
  { value: "plain", label: "Plain" },
  { value: "band", label: "Tinted band" },
  { value: "wash", label: "Soft glow" },
];

/** The admin form fields of one section's copy. */
export function copyFields(key: CopyKey): FieldDef[] {
  return Object.entries(PAGE_COPY[key] as Record<string, CopyField>).map(([name, f]): FieldDef => {
    if (f.kind === "tone") return { name, label: f.label, type: "select", options: TONE_OPTIONS, required: true, width: "half" };
    if (f.kind === "background") return { name, label: f.label, type: "select", options: BACKGROUND_OPTIONS, required: true, width: "half" };
    const { cap } = LENGTHS[f.kind];
    const multiline = f.kind === "text" || f.kind === "long";
    return {
      name,
      label: f.label,
      type: multiline ? "textarea" : "text",
      rows: f.kind === "long" ? 5 : multiline ? 2 : undefined,
      maxLength: cap,
      // Every visible title needs words; other texts may be cleared to hide them.
      required: f.kind === "title" && name === "title",
      help: f.help,
      width: !multiline && f.kind !== "title" ? "half" : undefined,
    };
  });
}

/* ----------------------------------------------------- Length checks -- */

export interface LengthIssue {
  level: "warn" | "info";
  message: string;
}

/**
 * Whether a text is so long or so short that it is likely to break the section's layout.
 * Pass the text as shown on the site, with its placeholders filled in.
 */
export function lengthIssue(key: CopyKey, name: string, value: string): LengthIssue | null {
  const f = (PAGE_COPY[key] as Record<string, CopyField>)[name];
  if (!f || f.kind === "tone" || f.kind === "background") return null;
  const { min, max } = LENGTHS[f.kind];
  const n = value.trim().length;
  if (!n) return f.kind === "title" && name === "title" ? { level: "warn", message: "Empty: the section will have no title." } : { level: "info", message: "Empty: this text won't be shown." };
  if (n > max)
    return {
      level: "warn",
      message:
        f.kind === "label"
          ? `${n} characters: buttons and labels over ${max} characters wrap or push other items out of line.`
          : f.kind === "title" || f.kind === "short" || f.kind === "note"
            ? `${n} characters: over ${max} the line wraps further and pushes the section down.`
            : `${n} characters: over ${max} this block grows much taller than the cards around it.`,
    };
  if (n < min) return { level: "warn", message: `Only ${n} character${n === 1 ? "" : "s"}: this looks unfinished and leaves a gap in the layout.` };
  return null;
}

/** Recommended length of a text field, for the counter beside it. */
export function lengthRange(key: CopyKey, name: string): { min: number; max: number } | null {
  const f = (PAGE_COPY[key] as Record<string, CopyField>)[name];
  return !f || f.kind === "tone" || f.kind === "background" ? null : { min: LENGTHS[f.kind].min, max: LENGTHS[f.kind].max };
}

import type { Tone } from "@/lib/content/constants";
import type { FieldDef } from "./fields";

/*
 * The words and colours of every section of the site, editable in
 * Admin → Site settings, page by page. Each entry is one section: its colour,
 * background, headings, button labels and empty-state texts. Defaults are the
 * site's original text. Shared by client and server code.
 *
 * Texts may contain placeholders such as {programme} or {venue}; see src/lib/copy.ts.
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

const PLACEHOLDERS = "You can write {programme} or {venue}; they are filled in from Programme details.";
const STATUS = "{status} is replaced by whether requests are open, in the words below.";
const REPLY_BY = "{replyBy} becomes “by e-mail”.";

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
    aboutText: note("About: description", "How our custom training works and who it is for"),
    programme: label("Sample plan", "Sample plan"),
    trainers: label("Trainers", "Trainers"),
    participants: label("Past participants", "Past participants"),
    registration: label("Contact us", "Contact us"),
    tutorials: label("Hands-on labs", "Hands-on labs"),
    tutorialsText: note("Hands-on labs: description", "Practical sessions and live demos of AI tools"),
    venue: label("Venue & travel", "Venue & travel"),
    venueText: note("Venue & travel: description", "Getting to campus, campus entry, stays and tips"),
    partners: label("Partners", "Partners"),
    partnersText: note("Partners: description", "Organisations we work with, and how to join them"),
    organisers: label("Organisers", "Organisers"),
    organisersText: note("Organisers: description", "Coordinators, student organisers and volunteers"),
    themes: label("Home: What we train", "What we train"),
    themesText: note("What we train: description", "Professional work, office work and efficiency"),
    routeMap: label("Home: Route map", "Route map"),
    routeMapText: note("Route map: description", "Follow the route to campus on the map"),
    faq: label("Home: FAQ", "FAQ"),
    faqText: note("FAQ: description", "Custom training, pricing, travel and more"),
    contact: label("Home: Contact", "Contact"),
    contactText: note("Contact: description", "E-mail, social links and the contact form"),
    gallery: label("Photo gallery", "Photo gallery"),
    galleryText: note("Photo gallery: description", "Moments from our trainings"),
    talks: label("Slides & recordings", "Slides & recordings"),
    talksText: note("Slides & recordings: description", "Catch up on the sessions"),
    meetAura: label("Meet Aura", "Meet Aura"),
  },
  siteHeader: {
    explore: label("Explore menu", "Explore"),
    pagesHeading: label("Explore menu: pages heading", "Pages"),
    sectionsHeading: label("Explore menu: home sections heading", "On the home page"),
    register: label("Contact button", "Contact us"),
    registerNow: label("Contact button (phone menu)", "Contact us"),
  },
  siteAccount: {
    signIn: label("Sign-in button (navigation bar)", "Sign in"),
    signOut: label("Account menu: sign out", "Sign out"),
    myAgenda: label("Account menu: link to the agenda", "My agenda"),
    title: heading("Sign-in window: title", "Sign in to keep your agenda"),
    intro: text("Sign-in window: introduction", "Star sessions to build your own agenda. It is saved with your account, so it follows you to every device."),
    email: label("E-mail field", "E-mail"),
    code: label("Second field", "Password, reference number or sign-in code"),
    whoTitle: short("Who can sign in: title", "Who can sign in"),
    whoParticipants: text("Who can sign in: participants", "Participants: the e-mail you contacted us with and the reference number in your confirmation."),
    whoTeam: text("Who can sign in: volunteers", "Volunteers and organisers: your admin panel e-mail and password."),
    whoPeople: text("Who can sign in: coordinators", "Coordinators listed on the site: the e-mail and sign-in code the organisers sent you."),
    submit: label("Sign-in window: button", "Sign in"),
    signingIn: label("Sign-in window: button while signing in", "Signing in…"),
    register: label("Sign-in window: link to contact us", "New to our training? Contact us"),
    needSignIn: short("Notice: starring while signed out", "Sign in to add sessions to your agenda"),
    signedIn: short("Notice once signed in", "Signed in. Your agenda is saved to your account."),
    signedOut: short("Notice once signed out", "Signed out"),
  },
  siteFooter: {
    pagesHeading: label("Pages column heading", "Pages"),
    exploreHeading: label("Explore column heading", "Explore"),
    involveHeading: label("Get involved column heading", "Get involved"),
    register: label("Link: contact us", "Contact us about training"),
    participants: label("Link: past participants", "Meet our past participants"),
    partner: label("Link: partner", "Become a partner"),
    contact: label("Link: contact", "Send the organisers a message"),
    copyright: text("Copyright line", "© {organiser}. All rights reserved.", "{organiser} is the organiser's name; {year}, if written, becomes the current year."),
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
    status: note("Status for screen readers", "Loading the {programme} website"),
  },
  homeHero: {
    organisedBy: label("Above the university's name", "Organised by"),
    institute: short("The university's name", "Daffodil International University"),
    school: note("Under the university's name", "Department of Computer Science and Engineering"),
  },
  homePlacard: {
    text: short("Placard 1: professional work", "Professional AI, made for you", `What the first sign Aura holds up says; about 35 characters fit. ${STATUS}`),
    workspace: short("Placard 2: office work", "Office work, faster with AI", `What the second sign says. Clear both and he waves hello instead. ${STATUS}`),
    open: label("{status} while requests are open", "contact us!"),
    closed: label("{status} while requests are paused", "paused for now"),
    professionalsTab: label("Switch under Aura: placard 1", "Professional work"),
    workspaceTab: label("Switch under Aura: placard 2", "Office work"),
    professionalsTone: tone("peach", "Placard 1 colour"),
    workspaceTone: tone("mint", "Placard 2 colour"),
  },
  homeHighlights: { stub: label("Label on the ticket stub", "At a glance") },
  homeInvite: {
    tone: tone("butter"),
    background: bg("band"),
    eyebrow: eyebrow("Custom training"),
    title: title("AI training designed around your organisation"),
    description: intro(
      "No fixed course and no one-size-fits-all syllabus. Tell us about your industry, your team and the work you want done faster: we shape the sessions, the examples and the pace to your needs, and train your people hands-on.",
      "Introduction",
      `${PLACEHOLDERS} ${REPLY_BY}`,
    ),
    free: note("Line above the button", "Telling us what you need takes about two minutes."),
    button: label("Button: contact us", "Contact us"),
    expectTitle: short("Built around your work: title", "Built around your industry"),
    expectText: text("Built around your work: text", "Sessions use tasks and documents from your field (without confidential data), so your people use real AI tools on their real work from the first hour."),
    researchTitle: short("Efficiency: title", "Real efficiency gains"),
    researchText: text(
      "Efficiency: text",
      "We start from the routines that take your team the most time, such as reports, e-mails, spreadsheets and meetings, and show how AI gets them done faster, with your own judgement in charge.",
    ),
    researchTheme: text("Efficiency: the note (highlighted)", "Bring a laptop: every session is hands-on."),
    posterLink: label("Efficiency: link to what we train", "See what we train"),
    posterKicker: short("Poster: label", "Custom AI training"),
    posterBadge: label("Poster: badge", "For teams & professionals"),
    posterTitle: heading("Poster: title", "AI training for your team"),
    posterText: text("Poster: text", "Hands-on AI training from Daffodil International University, designed around your industry, your office work and your professional tasks."),
    format: label("Poster fact: training", "Training"),
    formatText: short("Poster fact: training, its value", "Custom, for your team"),
    where: label("Poster fact: venue", "Where"),
  },
  homeNews: {
    tone: tone("peach"),
    eyebrow: eyebrow("Announcements"),
    title: title("News from the organisers"),
    description: intro("News about our training, our trainers and new focus areas appears here first."),
    emptyTitle: heading("When there are none: title", "No announcements yet"),
    emptyText: text("When there are none: text", "News from the trainers and the organising team is posted here."),
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
    eyebrow: eyebrow("What we train"),
    title: title("Custom AI training for the way your organisation works"),
    description: intro("Every training is designed for its audience and led hands-on by DIU's trainers: AI for professional work, AI for everyday office work, or a mix of both, always aimed at real efficiency gains."),
    theme: label("Card label", "Focus area"),
    talks: label("Link: sessions", "Sample sessions"),
    tutorials: label("Link: hands-on labs", "Hands-on labs"),
  },
  homeAbout: {
    tone: tone("mint"),
    background: bg("wash"),
    eyebrow: eyebrow("About the training"),
    portalKicker: short("Link card: label", "About the training"),
    portalTitle: heading("Link card: title", "Why AI training, and why now?"),
    portalText: text("Link card: text", "What we cover, who it is for and how a custom training is put together."),
  },
  homeTrainers: {
    tone: tone("lilac"),
    background: bg("wash"),
    eyebrow: eyebrow("Trainers"),
    title: title("Learn from DIU's own faculty"),
    description: intro("Every session is led by faculty of the Department of Computer Science and Engineering at Daffodil International University."),
    profile: label("Trainer card: link", "View profile"),
    moreTitle: heading("“More trainers” card: title", "And a growing team"),
    moreText: text("“More trainers” card: text", "Guest experts from industry join where a training needs them."),
    emptyTitle: heading("No trainers yet: title", "Meet our trainers"),
    emptyText: text("No trainers yet: text", "Every training is led by faculty of DIU's Department of Computer Science and Engineering. Their profiles appear here."),
    emptyButton: label("No trainers yet: button", "See announcements"),
    portalKicker: short("Link card: label", "Trainers"),
    portalTitle: heading("Link card: title", "Meet all {count}", "{count} is the number of trainers, e.g. “9 trainers”."),
    portalText: text("Link card: text", "Every trainer's profile, with what they teach."),
    portalEmptyTitle: heading("Link card with no trainers: title", "Trainer profiles"),
    portalEmptyText: text("Link card with no trainers: text", "Profiles appear here as trainers are confirmed."),
  },
  homeParticipants: {
    tone: tone("butter"),
    background: bg("plain"),
    eyebrow: eyebrow("Past participants"),
    title: title("People who have trained with us"),
    description: intro("Professionals, office teams and organisations we have trained, in their own words."),
    portalKicker: short("Link card: label", "Past participants"),
    portalTitle: heading("Link card: title", "Meet all {count}", "{count} is the number of past participants, e.g. “120 participants”."),
    portalText: text("Link card: text", "Everyone so far: who took part, from where, and what they said."),
    emptyTitle: heading("No participants yet: title", "Your name could be here"),
    emptyText: text("No participants yet: text", "People and teams are listed here once their training is completed. Contact us to plan yours."),
    emptyButton: label("No participants yet: button", "Contact us"),
  },
  homeVenue: {
    tone: tone("mint"),
    background: bg("band"),
    eyebrow: eyebrow("Venue & travel"),
    title: title("Getting to Daffodil Smart City"),
    description: intro("Pick how you're arriving and follow the route to campus."),
    hallTba: label("Room not set", "Room confirmed by e-mail"),
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
    noEmail: text("Contact card without an e-mail address", "Write to the organisers with the form below: we reply by e-mail."),
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
    title: heading("Heading (for screen readers)", "Why custom AI training"),
    learnTone: tone("lilac", "“What we can cover” card colour"),
    learnTitle: heading("“What we can cover” card: title", "What we can cover"),
  },
  aboutAudience: { tone: tone("lilac"), background: bg("band"), eyebrow: eyebrow("Audience"), title: title("Who we train") },
  aboutActivities: { tone: tone("peach"), background: bg("plain"), eyebrow: eyebrow("How it works"), title: title("How a custom training comes together") },

  /* ------------------------------------------------------- Programme -- */
  programmeHero: {
    tone: tone("azure"),
    crumb: crumb("Sample plan"),
    eyebrow: eyebrow("Sample plan"),
    title: title("What a training can look like"),
    description: intro(
      "An example of how a training can run, day by day. Every training is planned with you: its sessions, length and pace follow your team's needs.",
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
    description: intro("Times are only an example, in Bangladesh time (BST): sessions are rearranged, shortened or combined for each training.", "Introduction", PLACEHOLDERS),
    day: label("Day label", "Day"),
    noSessions: label("Day without sessions", "No sessions on this day"),
    formats: label("Session formats heading", "Session formats"),
    opening: text("Format: opening", "A welcome, your team's goals and what you'll be able to do by the end."),
    lecture: text("Format: lecture", "Short lectures on the ideas behind each tool and when to use it."),
    discussion: text("Format: discussion", "Open discussions on using AI responsibly at work."),
    tutorial: text("Format: hands-on lab", "Guided practice where you use AI tools on real tasks yourself."),
    demo: text("Format: demo", "Live demonstrations of AI tools at work."),
    themes: label("Focus areas heading", "Focus areas"),
  },
  programmeSchedule: {
    tone: tone("azure"),
    background: bg("band"),
    eyebrow: eyebrow("Sessions"),
    title: title("Day by day"),
    draft: label("Draft badge", "Sample: adapted for you"),
    final: label("Final badge", "Sample plan"),
    printTip: short("Print tip", "Tip: you can also print this page."),
    filterHint: text("Hint above the schedule", "Filter by focus area or session type, and star the sessions you would like in your own training."),
    tbaBadge: label("Without a schedule: badge", "Custom"),
    tbaTitle: heading("Without a schedule: title", "Planned with you"),
    tbaText: text("Without a schedule: text", "Every training is planned around your team's needs: we agree the sessions, times and trainers with you by e-mail."),
    tbaRegister: label("Without a schedule: contact button", "Contact us"),
  },
  programmePlan: {
    tone: tone("mint"),
    background: bg("band"),
    eyebrow: eyebrow("Plan your visit"),
    title: title("Before you come"),
    venueTitle: heading("Card: venue title", "Venue & travel"),
    venueText: text("Card: venue text", "{venue}. Maps, directions and places to stay.", PLACEHOLDERS),
    registrationTitle: heading("Card: contact title", "Contact us"),
    registrationOpen: text("Card: requests open", "Tell us what your team needs and we'll plan the training with you."),
    registrationClosed: text("Card: requests paused", "We're not taking new requests right now. Follow the announcements for updates."),
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
    portalKicker: short("Link card: label", "Sample plan"),
    portalTitle: heading("Link card: title", "What a training can include"),
    portalText: text("Link card: text", "Sample sessions, day by day."),
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
    emptyTitle: heading("No trainers yet: title", "Trainer profiles"),
    emptyText: text(
      "No trainers yet: text",
      "Every training is led by faculty of DIU's Department of Computer Science and Engineering. Their profiles appear here.",
    ),
    emptyButton: label("No trainers yet: button", "See announcements"),
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



  /* ------------------------------------------------------ Contact us -- */
  registerHero: {
    tone: tone("peach"),
    crumb: crumb("Contact us"),
    eyebrow: eyebrow("Contact us"),
    title: title("Tell us what your team needs"),
    description: intro(
      "Every training is designed for the organisation that asks for it. Tell us about your industry, your team and the work you'd like AI to speed up: the organising team reads every request and replies {replyBy} to plan the sessions with you.",
      "Introduction",
      `${PLACEHOLDERS} ${REPLY_BY}`,
    ),
    open: label("Status: open", "Taking requests"),
    closed: label("Status: paused", "Requests paused"),
  },
  registerForm: {
    externalTitle: heading("External form: title", "Contact us using our form"),
    externalText: text("External form: text", "Training requests are handled through an external form. It opens in a new tab."),
    externalButton: label("External form: button", "Open the form"),
    closedTitle: heading("Paused: title", "Requests are paused"),
    closedText: text("Paused: text", "Thank you for your interest! We're not taking new training requests right now. Follow the announcements, or send us a message and we'll get back to you."),
    announcements: label("Button: announcements", "See announcements"),
    contact: label("Button: contact", "Send a message"),
  },
  registerFormText: {
    step1: label("Step 1 name", "About you"),
    step2: label("Step 2 name", "Your needs"),
    step3: label("Step 3 name", "Details"),
    progress: short("Under the steps", "Step {step} of {steps}", "{step} and {steps} are filled in as they go."),
    required: note("Note on the first step", "Fields marked * are required."),
    optional: label("Word beside optional fields", "optional"),
    back: label("Button: back", "Back"),
    next: label("Button: next step", "Continue"),
    submit: label("Button: send", "Send request"),
    sending: label("Button while sending", "Sending…"),
    doneTitle: heading("Once sent: title", "Request received!"),
    doneId: short("Once sent: before the reference", "Your reference number is"),
    doneMailed: text("Once sent: e-mail sent", "An e-mail with your reference number is on its way to {email}.", EMAIL_HELP),
    doneQueued: text(
      "Once sent: reference sent by e-mail",
      "Your reference number and details are on their way to {email}. If this address has already sent a request, that request stands and we've sent its details again.",
      EMAIL_HELP,
    ),
    doneNoMail: text("Once sent: no e-mail", "Please note your reference number. The organisers will contact you at {email}.", EMAIL_HELP),
    doneReview: text(
      "Once sent: what happens next",
      "The organising team reads every request and will get back to you {replyBy} to plan your training.",
      REPLY_BY,
    ),
    share: label("Once sent: share label", "Share with colleagues"),
    shareText: note("Once sent: shared message", "Custom AI training for teams and professionals: {programme} at DIU"),
  },
  registerFees: {
    title: heading("Title", "Pricing"),
    category: label("Column: category", "Training"),
    fee: label("Column: fee", "Fee"),
    tba: label("Amount not set", "On request"),
  },
  registerDeadlines: {
    title: heading("Title", "How it works"),
    rolling: text("Text", "Send your request any time. We reply by e-mail, agree the focus, length and format with you, and design the sessions around your team."),
    portalKicker: short("Focus areas card: label", "Not sure where to start?"),
    portalTitle: heading("Focus areas card: title", "See what we train"),
    portalText: text("Focus areas card: text", "Professional work, office work and efficiency: what each focus area covers."),
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
    emptyTitle: heading("Title before partners are added", "Be one of our first partners"),
  },
  partnersReach: {
    tone: tone("lilac"),
    background: bg("band"),
    eyebrow: eyebrow("Who you'll reach"),
    title: title("The people we train"),
    description: intro("We train professionals, office teams, teachers and entrepreneurs who want AI to make their work faster and better."),
  },
  partnersWays: {
    tone: tone("peach"),
    background: bg("plain"),
    eyebrow: eyebrow("Ways to take part"),
    title: title("Pick how you want to be involved"),
    sponsorTitle: heading("Card 1: title", "Sponsor a training"),
    sponsorText: text("Card 1: text", "Support a training for a community or a sector and put your name in front of professionals and office teams."),
    teamTitle: heading("Card 2: title", "Train your team"),
    teamText: text("Card 2: text", "Book a training designed for your organisation's staff, its tasks and the tools it uses."),
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
    hallTba: label("Room not set: badge", "confirmed by e-mail"),
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
    portalText: text("Link card: text", "Answers on custom training, pricing, travel and more."),
  },

  /* ------------------------------------------------------ Organisers -- */
  organisersHero: {
    tone: tone("blush"),
    crumb: crumb("Organisers"),
    eyebrow: eyebrow("The team"),
    title: title("Organisers"),
    description: intro(
      "The {programme} is organised by the Department of Computer Science and Engineering, Daffodil International University.",
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
    emptyBadge: label("None yet: badge", "Open call"),
    emptyTitle: heading("None yet: title", "Join the volunteer team"),
    emptyText: text("None yet: text", "Volunteers help every training run smoothly, from welcoming participants to helping out in the labs. Want to lend a hand?"),
    emptyButton: label("None yet: button", "Volunteer with us"),
  },

  /* --------------------------------------------------- Past trainings -- */
  galleryHero: {
    tone: tone("peach"),
    crumb: crumb("Photo gallery"),
    eyebrow: eyebrow("Past trainings"),
    title: title("Photo gallery"),
    description: intro("Moments from the trainings of the {programme}.", "Introduction", PLACEHOLDERS),
    empty: heading("No photos yet", "Photos from our trainings are added here."),
  },
  talksHero: {
    tone: tone("lilac"),
    crumb: crumb("Slides & recordings"),
    eyebrow: eyebrow("Past trainings"),
    title: title("Session slides & recordings"),
    description: intro("Catch up on the sessions of the {programme}.", "Introduction", PLACEHOLDERS),
    slides: label("Slides button", "Slides"),
    empty: heading("No recordings yet", "Slides and recordings are added here after a training."),
  },

  /* ------------------------------------------------- Past participants -- */
  participantsHero: {
    tone: tone("butter"),
    crumb: crumb("Past participants"),
    eyebrow: eyebrow("Past participants"),
    title: title("Our past participants"),
    description: intro("Professionals, office teams and organisations who have trained with the {programme}.", "Introduction", PLACEHOLDERS),
    register: label("Button: contact us", "Contact us"),
  },
  participantsStats: {
    tone: tone("butter"),
    background: bg("plain"),
    participants: label("Count: participants", "Participants"),
    batches: label("Count: trainings", "Trainings"),
    organisations: label("Count: organisations", "Organisations"),
    programmes: label("Count: focus areas", "Focus areas"),
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
    title: title("Participants by training"),
    all: label("Filter: every focus area", "All focus areas"),
    allBatches: label("Filter: every training", "All trainings"),
    search: label("Search box", "Search by name or organisation"),
    none: text("No matches", "No participants match these filters."),
    emptyBadge: label("None yet: badge", "Custom training"),
    emptyTitle: heading("None yet: title", "Your team could be here"),
    emptyText: text("None yet: text", "People and teams are listed here once their training is completed. Contact us to plan yours."),
    emptyButton: label("None yet: button", "Contact us"),
  },
  participantsCta: {
    tone: tone("peach"),
    background: bg("wash"),
    title: title("Your team could be next"),
    text: text("Text", "Tell us what your team needs and we'll design a training around it. It takes about two minutes."),
    button: label("Button", "Contact us"),
  },

  /* ------------------------------------------------------- Meet Aura -- */
  auraHero: {
    tone: tone("aqua"),
    crumb: crumb("Meet Aura"),
    eyebrow: eyebrow("Our mascot"),
    title: title("Meet Aura"),
    description: long(
      "Introduction",
      "Aura is DIU AI Training's guide: a sturdy, hovering robot with a square-jawed helmet, broad shoulders and glowing eyes. Like a good assistant, he adapts to his task, so you'll find him in a different role in every section of the site. Click him for tips.",
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

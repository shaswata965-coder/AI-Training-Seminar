import { AURA_BUILD_OPTIONS, AURA_COLOR_KEYS, AURA_COLORS, AURA_EYE_CHOICES, AURA_EYE_KEYS } from "@/components/aura/builds";
import {
  ATTENDEE_CATEGORIES,
  FAQ_CATEGORIES,
  FAQ_CATEGORY_META,
  LEVEL_META,
  LEVELS,
  opts,
  PEOPLE_GROUP_META,
  PEOPLE_GROUPS,
  PROGRAMME_STATUSES,
  REGISTRATION_STATUSES,
  SESSION_TYPE_META,
  SESSION_TYPES,
  TRAINER_CATEGORIES,
  TRAINER_CATEGORY_META,
  SPONSOR_TIER_META,
  SPONSOR_TIERS,
  THEME_KEYS,
  THEME_META,
} from "@/lib/content/constants";
import type { Tone } from "@/lib/content/constants";
import { copyFields, type CopyKey } from "./page-copy";
import { HIDEABLE_SECTIONS, hiddenField, isHidePage, isOrderPage, orderField, SECTION_ORDER } from "./section-order";
import {
  bool,
  color,
  datetime,
  date,
  email,
  file,
  formFieldList,
  image,
  list,
  multiselect,
  num,
  objects,
  order as orderList,
  ref,
  refList,
  richtext,
  select,
  text,
  textarea,
  time,
  url,
  type FieldDef,
  type FieldSection,
} from "./fields";

export const themeOptions = opts(THEME_KEYS, (k) => THEME_META[k].short);
const dayOptions = [
  { value: "1", label: "Day 1" },
  { value: "2", label: "Day 2" },
  { value: "3", label: "Day 3" },
  { value: "4", label: "Day 4" },
  { value: "5", label: "Day 5" },
];
const published = bool("published", "Published (visible on the website)");
const order = num("order", "Display order", { help: "Lower numbers appear first.", width: "third" });

export type AdminIcon =
  | "megaphone"
  | "mic"
  | "calendar"
  | "graduation"
  | "monitor"
  | "store"
  | "handshake"
  | "users"
  | "help"
  | "image"
  | "video"
  | "award";

export interface Column {
  key: string;
  label: string;
  kind?: "text" | "boolean" | "date" | "image" | "option";
}

export interface CollectionDef {
  key: string;
  model: string;
  label: string;
  singular: string;
  description: string;
  icon: AdminIcon;
  group: "Content" | "Programme" | "People" | "Past trainings";
  fields: FieldDef[];
  columns: Column[];
  sort: Record<string, 1 | -1>;
  titleKey: string;
  tags: string[];
  slugFrom?: string;
  publicPath?: string;
  defaults?: Record<string, unknown>;
}

export const COLLECTIONS: CollectionDef[] = [
  {
    key: "announcements",
    model: "Announcement",
    label: "Announcements",
    singular: "Announcement",
    description: "News shown in the Announcements box on the home page. Pinned items stay on top.",
    icon: "megaphone",
    group: "Content",
    titleKey: "title",
    tags: ["announcements"],
    publicPath: "/#news",
    sort: { pinned: -1, date: -1 },
    defaults: { published: true, pinned: false, tone: "info" },
    columns: [
      { key: "title", label: "Title" },
      { key: "date", label: "Date", kind: "date" },
      { key: "pinned", label: "Pinned", kind: "boolean" },
      { key: "published", label: "Published", kind: "boolean" },
    ],
    fields: [
      text("title", "Title", { required: true, maxLength: 140 }),
      textarea("body", "Message", { maxLength: 1200, rows: 4 }),
      datetime("date", "Date", { required: true, width: "half", help: "Bangladesh Standard Time." }),
      select("tone", "Style", [
        { value: "info", label: "Information" },
        { value: "important", label: "Important" },
        { value: "success", label: "Good news" },
      ], { width: "half" }),
      url("linkUrl", "Link (optional)", { width: "half" }),
      text("linkLabel", "Link text", { width: "half", placeholder: "Read more" }),
      bool("pinned", "Pin to the top"),
      published,
    ],
  },
  {
    key: "trainers",
    model: "Trainer",
    label: "Trainers",
    singular: "Trainer",
    description: "The trainers. Their cards appear on the Trainers page, the lead trainer in the spotlight at its top; featured trainers also appear on the home page.",
    icon: "mic",
    group: "Programme",
    titleKey: "name",
    slugFrom: "name",
    tags: ["trainers"],
    publicPath: "/trainers",
    sort: { order: 1, name: 1 },
    defaults: { published: true, featured: false, category: "faculty", affiliation: "Daffodil International University", order: 100 },
    columns: [
      { key: "photo", label: "", kind: "image" },
      { key: "name", label: "Name" },
      { key: "designation", label: "Designation" },
      { key: "category", label: "Label", kind: "option" },
      { key: "lead", label: "Lead", kind: "boolean" },
      { key: "featured", label: "Home", kind: "boolean" },
      { key: "published", label: "Published", kind: "boolean" },
    ],
    fields: [
      text("name", "Full name", { required: true, width: "half" }),
      text("slug", "URL slug", { width: "half", help: "Leave blank to generate from the name." }),
      text("designation", "Designation", { width: "half", placeholder: "Associate Professor, Department of CSE" }),
      text("affiliation", "Affiliation", { width: "half", placeholder: "Daffodil International University" }),
      select("category", "Label", opts(TRAINER_CATEGORIES, (k) => TRAINER_CATEGORY_META[k].label), { required: true, width: "third" }),
      select("theme", "Programme", themeOptions, { width: "third", help: "The programme they teach; General for both." }),
      bool("lead", "Lead trainer", { width: "third", help: "Shown in the spotlight at the top of the Trainers page." }),
      image("photo", "Photo", { help: "Square photos look best. Uploads are compressed automatically. Shown on their card and in their pop-up profile." }),
      file("cv", "CV (PDF)", { accept: "application/pdf", help: "Upload their CV: a “Download CV” button appears in their pop-up profile. Leave empty for none." }),
      richtext("bio", "Profile"),
      text("expertise", "Areas of expertise", { placeholder: "Machine learning, data science, software engineering" }),
      richtext("teaching", "What they teach"),
      url("website", "Profile page", { width: "half", help: "e.g. their faculty page on the DIU website." }),
      url("linkedin", "LinkedIn", { width: "half" }),
      url("x", "X / Twitter", { width: "half" }),
      url("scholar", "Google Scholar", { width: "half" }),
      url("github", "GitHub", { width: "half" }),
      bool("featured", "Feature on the home page"),
      order,
      published,
    ],
  },
  {
    key: "sessions",
    model: "Session",
    label: "Schedule",
    singular: "Session",
    description: "The sample plan: what a training can include, day by day (Day 1, Day 2…, no dates). Set its status (hidden / sample / final) in Site settings → Schedule → Schedule.",
    icon: "calendar",
    group: "Programme",
    titleKey: "title",
    tags: ["sessions"],
    publicPath: "/programme",
    sort: { day: 1, start: 1, order: 1 },
    defaults: { published: true, day: "1", type: "lecture", theme: "general", order: 0 },
    columns: [
      { key: "day", label: "Day", kind: "option" },
      { key: "start", label: "Start" },
      { key: "title", label: "Title" },
      { key: "type", label: "Type", kind: "option" },
      { key: "theme", label: "Programme", kind: "option" },
      { key: "published", label: "Published", kind: "boolean" },
    ],
    fields: [
      text("title", "Session title", { required: true }),
      select("day", "Day", dayOptions, { required: true, width: "third" }),
      time("start", "Start time", { required: true, width: "third" }),
      time("end", "End time", { width: "third" }),
      select("type", "Type", opts(SESSION_TYPES, (k) => SESSION_TYPE_META[k].label), { required: true, width: "half" }),
      select("theme", "Programme", themeOptions, { width: "half" }),
      text("room", "Room / lab", { width: "half", placeholder: "Computer lab 3", help: "Leave blank to say the room is confirmed by e-mail." }),
      text("trainerNote", "Trainer text", { width: "half", help: "Shown when no trainer is linked, e.g. “DIU CSE trainers”." }),
      refList("trainers", "Trainers", "trainers"),
      ref("moderator", "Moderator (discussions)", "trainers", { width: "half" }),
      refList("panelists", "Discussion leads (discussions)", "trainers"),
      richtext("description", "Description"),
      order,
      published,
    ],
  },
  {
    key: "tutorials",
    model: "Tutorial",
    label: "Hands-on labs",
    singular: "Lab",
    description: "Hands-on labs with their trainers, prerequisites and material links.",
    icon: "graduation",
    group: "Programme",
    titleKey: "title",
    slugFrom: "title",
    tags: ["tutorials"],
    publicPath: "/tutorials",
    sort: { order: 1, title: 1 },
    defaults: { published: true, level: "all", theme: "general", order: 100 },
    columns: [
      { key: "title", label: "Title" },
      { key: "level", label: "Level", kind: "option" },
      { key: "theme", label: "Programme", kind: "option" },
      { key: "published", label: "Published", kind: "boolean" },
    ],
    fields: [
      text("title", "Title", { required: true }),
      text("slug", "URL slug", { width: "half", help: "Leave blank to generate from the title." }),
      text("schedule", "When & where", { width: "half", placeholder: "Day 1 · 14:00–15:30 · Computer lab 3" }),
      select("level", "Level", opts(LEVELS, (k) => LEVEL_META[k].label), { width: "third" }),
      text("duration", "Duration", { width: "third", placeholder: "90 minutes" }),
      select("theme", "Programme", themeOptions, { width: "third" }),
      objects("instructors", "Trainers", "Trainer", [
        text("name", "Name", { required: true, width: "half" }),
        text("affiliation", "Affiliation", { width: "half" }),
        url("url", "Profile link"),
      ]),
      richtext("description", "Description"),
      list("prerequisites", "Prerequisites", { itemLabel: "Prerequisite", help: "Laptop, software, accounts…" }),
      objects("materials", "Materials & links", "Link", [
        text("label", "Label", { required: true, width: "half", placeholder: "GitHub repository" }),
        url("url", "URL", { required: true, width: "half" }),
      ]),
      text("capacity", "Seats / capacity", { width: "half" }),
      order,
      published,
    ],
  },
  {
    key: "demos",
    model: "Demo",
    label: "Demos",
    singular: "Demo",
    description: "Live demos shown on the Hands-on labs page.",
    icon: "monitor",
    group: "Programme",
    titleKey: "title",
    tags: ["demos"],
    publicPath: "/tutorials#demos",
    sort: { order: 1, title: 1 },
    defaults: { published: true, theme: "general", order: 100 },
    columns: [
      { key: "image", label: "", kind: "image" },
      { key: "title", label: "Title" },
      { key: "team", label: "Team / company" },
      { key: "published", label: "Published", kind: "boolean" },
    ],
    fields: [
      text("title", "Title", { required: true }),
      text("team", "Team / company", { width: "half" }),
      select("theme", "Programme", themeOptions, { width: "half" }),
      textarea("description", "Short description", { maxLength: 600 }),
      image("image", "Image"),
      url("videoUrl", "Video link (YouTube / Vimeo)", { width: "half" }),
      url("link", "Project link", { width: "half" }),
      order,
      published,
    ],
  },
  {
    key: "sponsors",
    model: "Sponsor",
    label: "Partners",
    singular: "Partner",
    description: "Logos loop on the home page and are grouped by tier on the Partners page. Partnership tiers and the enquiry text live in Site settings → Partners.",
    icon: "handshake",
    group: "Content",
    titleKey: "name",
    tags: ["sponsors"],
    publicPath: "/partners",
    sort: { order: 1, name: 1 },
    defaults: { published: true, tier: "partner", order: 100 },
    columns: [
      { key: "logo", label: "", kind: "image" },
      { key: "name", label: "Name" },
      { key: "tier", label: "Tier", kind: "option" },
      { key: "published", label: "Published", kind: "boolean" },
    ],
    fields: [
      text("name", "Name", { required: true, width: "half" }),
      select("tier", "Tier", opts(SPONSOR_TIERS, (k) => SPONSOR_TIER_META[k].label), { required: true, width: "half" }),
      image("logo", "Logo", { help: "Transparent PNG or SVG works best." }),
      url("website", "Website"),
      textarea("blurb", "Short description (optional)", { maxLength: 300 }),
      order,
      published,
    ],
  },
  {
    key: "people",
    model: "Person",
    label: "Organisers & volunteers",
    singular: "Person",
    description: "Faculty coordinators, student organisers and volunteers. All use the same card style.",
    icon: "users",
    group: "People",
    titleKey: "name",
    tags: ["people"],
    publicPath: "/organisers",
    sort: { group: 1, order: 1, name: 1 },
    defaults: { published: true, group: "volunteer", affiliation: "Daffodil International University", order: 100 },
    columns: [
      { key: "photo", label: "", kind: "image" },
      { key: "name", label: "Name" },
      { key: "group", label: "Group", kind: "option" },
      { key: "role", label: "Role" },
      { key: "published", label: "Published", kind: "boolean" },
    ],
    fields: [
      text("name", "Full name", { required: true, width: "half" }),
      select("group", "Group", opts(PEOPLE_GROUPS, (k) => PEOPLE_GROUP_META[k].label), { required: true, width: "half" }),
      text("role", "Role", { width: "half", placeholder: "Lecturer, Department of CSE" }),
      text("department", "Department", { width: "half" }),
      text("affiliation", "Affiliation", { width: "half" }),
      url("profileUrl", "Profile page", { width: "half" }),
      image("photo", "Photo"),
      textarea("bio", "Short bio", { maxLength: 600 }),
      email("loginEmail", "Sign-in e-mail (optional, never shown)", {
        width: "half",
        private: true,
        help: "With a sign-in code, lets them sign in on the website (to save their agenda), as they have sent no training request.",
      }),
      text("loginCode", "Sign-in code", {
        width: "half",
        maxLength: 100,
        private: true,
        help: "At least 8 characters. Send it to them with the e-mail above; change it to sign them out.",
      }),
      order,
      published,
    ],
  },
  {
    key: "faqs",
    model: "Faq",
    label: "FAQs",
    singular: "Question",
    description: "Frequently asked questions, shown on the home page.",
    icon: "help",
    group: "Content",
    titleKey: "question",
    tags: ["faqs"],
    publicPath: "/#faq",
    sort: { order: 1 },
    defaults: { published: true, category: "general", order: 100 },
    columns: [
      { key: "question", label: "Question" },
      { key: "category", label: "Category", kind: "option" },
      { key: "published", label: "Published", kind: "boolean" },
    ],
    fields: [
      text("question", "Question", { required: true }),
      richtext("answer", "Answer", { required: true }),
      select("category", "Category", opts(FAQ_CATEGORIES, (k) => FAQ_CATEGORY_META[k]), { width: "half" }),
      order,
      published,
    ],
  },
  {
    key: "gallery",
    model: "GalleryItem",
    label: "Photo gallery",
    singular: "Photo",
    description: "Photos from past trainings. Turn the gallery on in Site settings → Site-wide → Features & past trainings when ready.",
    icon: "image",
    group: "Past trainings",
    titleKey: "caption",
    tags: ["gallery"],
    publicPath: "/gallery",
    sort: { order: 1, createdAt: -1 },
    defaults: { published: true, order: 100 },
    columns: [
      { key: "image", label: "", kind: "image" },
      { key: "caption", label: "Caption" },
      { key: "day", label: "Day", kind: "option" },
      { key: "published", label: "Published", kind: "boolean" },
    ],
    fields: [
      image("image", "Photo", { required: true }),
      text("caption", "Caption"),
      text("alt", "Alt text (describe the photo)", { help: "Helps visitors using screen readers." }),
      select("day", "Day", [...dayOptions, { value: "other", label: "Other" }], { width: "half" }),
      order,
      published,
    ],
  },
  {
    key: "talks",
    model: "Talk",
    label: "Slides & recordings",
    singular: "Recording",
    description: "Session slides and recordings from past trainings. Turn this section on in Site settings → Site-wide → Features & past trainings.",
    icon: "video",
    group: "Past trainings",
    titleKey: "title",
    tags: ["talks"],
    publicPath: "/recordings",
    sort: { order: 1, title: 1 },
    defaults: { published: true, order: 100 },
    columns: [
      { key: "title", label: "Title" },
      { key: "trainerName", label: "Trainer" },
      { key: "published", label: "Published", kind: "boolean" },
    ],
    fields: [
      text("title", "Session title", { required: true }),
      text("trainerName", "Trainer(s)", { width: "half" }),
      select("day", "Day", dayOptions, { width: "half" }),
      textarea("description", "Description"),
      file("slides", "Slides (PDF upload or link)"),
      url("videoUrl", "Recording link (YouTube / Vimeo)"),
      order,
      published,
    ],
  },
  {
    key: "participants",
    model: "Participant",
    label: "Past participants",
    singular: "Participant",
    description: "People who completed a training. They are listed on the Past participants page by training and focus area; those with a quote and “Feature their quote” ticked appear under “What participants say” and on the home page.",
    icon: "award",
    group: "Past trainings",
    titleKey: "name",
    tags: ["participants"],
    publicPath: "/past-participants",
    sort: { order: 1, name: 1 },
    defaults: { published: true, featured: false, theme: "professionals", order: 100 },
    columns: [
      { key: "photo", label: "", kind: "image" },
      { key: "name", label: "Name" },
      { key: "organisation", label: "Organisation" },
      { key: "batch", label: "Training" },
      { key: "theme", label: "Programme", kind: "option" },
      { key: "featured", label: "Quote", kind: "boolean" },
      { key: "published", label: "Published", kind: "boolean" },
    ],
    fields: [
      text("name", "Full name", { required: true, width: "half" }),
      text("designation", "Designation", { width: "half", placeholder: "Assistant Manager, HR" }),
      text("organisation", "Organisation", { width: "half" }),
      select("theme", "Focus area", themeOptions, { required: true, width: "half", help: "General: their training covered several focus areas." }),
      text("batch", "Training", { required: true, width: "half", placeholder: "Office productivity training · Acme Bank", help: "Participants with the same training text are grouped together." }),
      date("completed", "Completed on", { width: "half", help: "Orders the trainings, newest first (the date is not shown on the site)." }),
      image("photo", "Photo (optional)", { help: "Only with their permission. Square photos look best." }),
      textarea("quote", "What they said about the training (optional)", { maxLength: 400, rows: 3, help: "Only with their permission." }),
      bool("featured", "Feature their quote", { help: "Shows the quote under “What participants say” and on the home page." }),
      url("profileUrl", "Profile link (optional)", { help: "e.g. their LinkedIn, with their permission." }),
      order,
      published,
    ],
  },
];

// No prototype: a key from a URL such as "constructor" or "__proto__" must not find anything.
export const COLLECTION_MAP: Record<string, CollectionDef> = Object.freeze(Object.assign(Object.create(null) as Record<string, CollectionDef>, Object.fromEntries(COLLECTIONS.map((c) => [c.key, c]))));

/* -------------------------------------------------------------- Singletons -- */

const iconOptions = [
  { value: "mic", label: "Microphone" },
  { value: "graduation", label: "Graduation cap" },
  { value: "monitor", label: "Screen" },
  { value: "trophy", label: "Trophy" },
  { value: "users", label: "People" },
  { value: "calendar", label: "Calendar" },
  { value: "sparkles", label: "Sparkles" },
  { value: "flask", label: "Flask" },
  { value: "briefcase", label: "Briefcase" },
  { value: "rocket", label: "Rocket" },
  { value: "code", label: "Code" },
  { value: "landmark", label: "Institution" },
  { value: "heart", label: "Heart" },
  { value: "laptop", label: "Laptop" },
  { value: "award", label: "Award" },
  { value: "clock", label: "Clock" },
];

export interface SingletonDef {
  key: "settings";
  label: string;
  description: string;
  tags: string[];
  sections: FieldSection[];
}

/** One section of a Site settings page tab: the section's texts and colours (copy) and any other settings shown on it. */
export interface SettingsSection extends FieldSection {
  copy?: CopyKey;
  /** The section on the site (its data-edit attribute), for the preview. */
  anchor?: string;
  /** The page to preview, when it isn't the tab's own page. */
  path?: string;
  /** For a part of a section with a tab of its own: that section's key, so the tab moves (and hides) with it. */
  within?: string;
}

/** A tab of Site settings: one page of the site, or the parts shared by every page. */
export interface SettingsPage {
  key: string;
  title: string;
  path: string;
  description?: string;
  sections: SettingsSection[];
  /** For a page with sections that can be hidden: the field listing the hidden ones (see section-order.ts). */
  hidden?: FieldDef;
}

const statusOptions = [
  { value: "open", label: "Open: taking training requests" },
  { value: "closed", label: "Paused: not taking requests" },
];

/** Built-in shades of the accent colours (light mode), shown as hints. */
export const PALETTE_DEFAULTS: Record<Tone, string> = { azure: "#8cc8ff", lilac: "#c3b1ff", mint: "#8fe0c0", peach: "#ffbf99", blush: "#ffa9c1", butter: "#ffdc73", aqua: "#67e3f9" };

const section = (key: string, title: string, copy: CopyKey | undefined, fields: FieldDef[] = [], extra: Partial<SettingsSection> = {}): SettingsSection => ({ key, title, copy, fields, ...extra });

const FIELDS_HELP =
  "Open a field to change its name, its guide (the line under it, and the example inside it), the type of answer and its choices, and whether it is required or shown; the arrows change the order. Built-in fields (with a padlock) can be hidden but not deleted, and the ones the site needs stay required. Add your own questions at the end: their answers appear with each response and in the CSV download.";

export const SETTINGS_PAGES: SettingsPage[] = [
  {
    key: "site",
    title: "Site-wide",
    path: "/",
    description: "Programme details, Contact us, colours and the parts every page shares: navigation, header, footer and banner.",
    sections: [
      section(
        "details",
        "Programme details",
        undefined,
        [
          text("programmeName", "Name", { required: true, width: "half", help: "Used in the logo, page titles and e-mails. The site shows no dates, so it is best without a year; one written at the end (e.g. 2027) appears under the logo." }),
          text("shortName", "Short name", { width: "half", help: "Used where space is tight: the admin panel and the name of the site when installed as an app." }),
          text("tagline", "Tagline"),
          textarea("description", "Short description", { help: "Used for search engines and social media previews.", maxLength: 300 }),
          text("organisedBy", "Organised by"),
          text("venueName", "Venue", { width: "half" }),
          text("venueHall", "Room / building", { width: "half", help: "Leave blank to say the room is confirmed by e-mail." }),
          textarea("venueAddress", "Full address", { rows: 2 }),
        ],
        { anchor: "home.hero" },
      ),
      section(
        "registration",
        "Contact us",
        undefined,
        [
          select("registrationStatus", "Training requests", statusOptions, { width: "half", help: "Also shown on the Contact us cards on the home page." }),
          url("registrationUrl", "External request form (optional)", { help: "Leave blank to use the built-in Contact us form." }),
          textarea("confirmationNote", "Extra text for the confirmation e-mail"),
        ],
        { description: "Use the built-in training request form, or paste a link to an external form (Google Forms…).", path: "/contact", anchor: "register.hero" },
      ),
      section(
        "colours",
        "Colours",
        undefined,
        [
          color("brandColor", "Brand colour", { width: "half", help: "Buttons, links and highlights. Hex colour, e.g. #3b5bdb. Leave blank for the default." }),
          {
            name: "palette",
            label: "Accent colours",
            type: "group",
            help: "Each section picks one of these. Leave blank for the built-in shade; lighter and darker tints and dark mode follow automatically.",
            fields: (Object.keys(PALETTE_DEFAULTS) as Tone[]).map((t) => color(t, `${t[0].toUpperCase()}${t.slice(1)}`, { width: "third", placeholder: PALETTE_DEFAULTS[t] })),
          },
        ],
        { description: "The site's colours. Each section's own colour is chosen in its page tab." },
      ),
      section(
        "logos",
        "Logos & images",
        undefined,
        [
          image("logoUniversity", "University logo", { width: "half", help: "Left corner of the navigation bar. Leave blank for the built-in DIU logo." }),
          image("logoDepartment", "Department logo", { width: "half", help: "Right corner of the navigation bar. Leave blank for the built-in Department of CSE seal." }),
          image("programmeLogo", "Programme logo", { width: "half" }),
          image("ogImage", "Social preview image (optional)", { help: "1200×630 px. Leave blank to use the generated preview." }),
        ],
        { description: "The DIU logo and the Department of CSE seal are built in. Upload one here only to replace it.", anchor: "site.header" },
      ),
      section("nav", "Navigation", "siteNav", [], { description: "Names of the pages and home sections in the navigation bar, its Explore menu and the footer.", anchor: "site.header" }),
      section("header", "Header", "siteHeader", [], { anchor: "site.header" }),
      section("account", "Sign-in", "siteAccount", [], {
        description:
          "Visitors sign in (Sign in in the navigation bar, or by starring a session in the schedule) to keep their agenda. There is no sign-up: participants use the reference number of their training request, volunteers their admin panel password, and coordinators the sign-in e-mail and code set on their entry under Organisers & volunteers.",
        anchor: "site.header",
      }),
      section("footer", "Footer", "siteFooter", [], { anchor: "site.footer" }),
      section(
        "banner",
        "Banner",
        "siteBanner",
        [text("bannerText", "Site-wide banner (optional)", { help: "A short notice shown at the very top of every page." }), url("bannerLink", "Banner link (optional)")],
        { anchor: "site.banner" },
      ),
      section(
        "contact",
        "Contact & social",
        undefined,
        [
          email("contactEmail", "Official e-mail", { width: "half" }),
          text("contactPhone", "Phone (optional)", { width: "half" }),
          email("notifyEmail", "Send form notifications to", { width: "half", help: "New enquiries are e-mailed here (needs SMTP). Training requests are listed under Registrations." }),
          url("website", "Website", { width: "half" }),
          url("linkedin", "LinkedIn", { width: "half" }),
          url("x", "X / Twitter", { width: "half" }),
          url("instagram", "Instagram", { width: "half" }),
          url("youtube", "YouTube", { width: "half" }),
        ],
        { anchor: "site.footer" },
      ),
      section(
        "aura",
        "Aura",
        undefined,
        [
          select("auraBuild", "Look", AURA_BUILD_OPTIONS, { required: true, help: "How Aura, the mascot, is drawn on every page, in the logo and in the social preview." }),
          select("auraColor", "Colours", AURA_COLOR_KEYS.map((k) => ({ value: k, label: AURA_COLORS[k].label })), { required: true, width: "half" }),
          select("auraEyes", "Eye colour", AURA_EYE_KEYS.map((k) => ({ value: k, label: AURA_EYE_CHOICES[k].label })), {
            required: true,
            width: "half",
            help: "Each section's own colour matches its role (amber for professional work, mint for office work…).",
          }),
        ],
        { description: "Aura's look across the site. The preview shows the Meet Aura page, with every look he takes.", path: "/meet-aura", anchor: "meetAura.hero" },
      ),
      section("features", "Features & past trainings", undefined, [
        bool("showAssistant", "Show “Ask Aura”, the site search, in the bottom-right corner of every page"),
        bool("showGallery", "Past trainings: show the photo gallery"),
        bool("showTalks", "Past trainings: show session slides & recordings"),
      ]),
      section("seo", "SEO & analytics", undefined, [
        text("gaId", "Google Analytics measurement ID", { placeholder: "G-XXXXXXXXXX", width: "half" }),
        list("keywords", "Search keywords", { itemLabel: "Keyword" }),
      ]),
    ],
  },
  {
    key: "home",
    title: "Home",
    path: "/",
    sections: [
      section("loader", "Loading screen", "homeLoader", [bool("showLoader", "Show the loading screen while the site's files are cached")], {
        description:
          "The first time someone opens the home page (and after the site is updated), the pages, scripts, styles and images are fetched and cached behind a loading screen, so the rest of the visit is quick. Aura's ship tries to take off as small Auras work on it and the ring around the window fills; once everything is cached he lifts off and the smoke clears to show the page. Visitors who ask for reduced motion get the caching without the screen. It isn't shown in this preview: open the home page in a private window to see it.",
      }),
      section("hero", "Hero", "homeHero", [
        bool("showHeroPhoto", "Show the photo of the DIU campus behind the hero"),
        image("heroPhoto", "Hero photo", { help: "Leave it empty for the built-in photo of DIU's academic building at Daffodil Smart City, framed so that its “Daffodil International University” sign shows above Aura. An uploaded landscape photo (16:9 works best) sits at the top right instead and fades into the background towards the title." }),
      ], {
        description: "The name, tagline and venue come from Site-wide → Programme details.",
      }),
      section("placard", "Hero announcements", "homePlacard", [], {
        description:
          "Aura holds up two placards in turn in the hero: one for professional work, one for office work. {status} in a placard becomes whether training requests are open (Site-wide → Contact us), in the words below. Clear one placard to show only the other.",
      }),
      section("invite", "Custom training", "homeInvite", [image("invitePhoto", "Poster image", { help: "Leave it empty for the built-in photo of the DIU campus. An uploaded landscape picture (16:9, e.g. 1920×1080) replaces it across the top of the poster, under its label and badge, fading into the poster below." })], {
        description:
          "Under the hero: that every training is designed for the organisation that asks for it, how the sessions use the industry's own tasks, the efficiency gains they aim at, the Contact us button, and the poster with its picture. Its venue comes from Site-wide → Programme details.",
      }),
      section("highlights", "Highlight strip", "homeHighlights", [
        objects("highlights", "Highlights", "Highlight", [
          text("label", "Label", { required: true, width: "third" }),
          text("value", "Value", { width: "third", placeholder: "2" }),
          select("icon", "Icon", iconOptions, { width: "third" }),
        ], { maxItems: 6 }),
      ]),
      section("news", "Announcements", "homeNews", [], { description: "The announcements themselves are added under Announcements." }),
      section("themes", "What we train", "homeThemes", [
        objects("themes", "Focus areas", "Focus area", [
          select("key", "Focus area", themeOptions.filter((t) => t.value !== "general"), { required: true, width: "half" }),
          text("title", "Title", { required: true, width: "half" }),
          textarea("description", "Description (2–3 lines)", { rows: 3 }),
          image("image", "Photo", { help: "A landscape photo (16:9 works best) across the top of the card, with Aura below it. Leave it empty to use the built-in photo for the focus area." }),
        ], { titleKey: "title", maxItems: 2 }),
      ]),
      section("about", "About", "homeAbout", [
        objects("aboutPoints", "Topics around Aura", "Topic", [
          text("title", "Topic (two or three words)", { required: true, width: "half", maxLength: 24 }),
          select("icon", "Icon", iconOptions, { width: "half" }),
          textarea("description", "Summary (shown in Aura's speech bubble)", { rows: 2, maxLength: 150, help: "You can write {venue} or {programme}; they are filled in from these settings." }),
        ], { maxItems: 8, help: "Up to 8 topics around Aura, each summarising part of the About page. Aura waits in a thinking pose; hovering or tapping a topic makes him point at it and answer with its summary." }),
      ]),
      section("trainers", "Trainers", "homeTrainers", [
        num("featuredTrainers", "Featured trainers on the home page", { min: 0, max: 12, width: "half" }),
        bool("showMoreTrainers", "Show the “More trainers” card after the trainers"),
      ], { description: "Trainers are added under Trainers; tick “Feature on the home page” to show them here." }),
      section("participants", "Past participants", "homeParticipants", [], { description: "Quotes from past participants (under Past participants, with “Feature their quote” ticked), and a link to the Past participants page." }),
      section("venue", "Venue & travel", "homeVenue", [], { description: "The routes on the map are edited in the Venue tab → Getting here." }),
      section("partners", "Partners", "homePartners", [], { description: "The logos come from Partners & sponsors." }),
      section("faq", "FAQ & contact", "homeFaq", [], { description: "Questions are added under FAQs; the e-mail and phone under Site-wide → Contact & social." }),
      section("contactForm", "Contact form", "contactFormText", [formFieldList("contactFields", "Fields of the contact form", "contact", { help: FIELDS_HELP })], {
        description: "The contact form beside the FAQ: its fields and texts. Messages arrive under Enquiries.",
        within: "faq",
        anchor: "home.faq",
      }),
    ],
  },
  {
    key: "about",
    title: "About",
    path: "/about",
    sections: [
      section("hero", "Hero", "aboutHero"),
      section("motivation", "Motivation", "aboutMotivation", [richtext("motivation", "Why this training"), richtext("learningText", "What you will learn")]),
      section("audience", "Who should attend", "aboutAudience", [
        objects("audience", "Audiences", "Audience", [
          text("title", "Title", { required: true, width: "half" }),
          select("icon", "Icon", iconOptions, { width: "half" }),
          textarea("description", "Description", { rows: 2 }),
        ], { help: "Also listed on the Partners page under “Who you'll meet”." }),
      ]),
      section("activities", "Activities", "aboutActivities", [
        objects("activities", "Activities", "Activity", [
          text("title", "Title", { required: true, width: "half" }),
          select("icon", "Icon", iconOptions, { width: "half" }),
          textarea("description", "Description", { rows: 2 }),
        ]),
      ]),
    ],
  },
  {
    key: "programme",
    title: "Schedule",
    path: "/programme",
    sections: [
      section("hero", "Hero", "programmeHero", [file("schedulePdf", "Sample plan PDF (optional)", { accept: "application/pdf", help: "Upload to replace the automatically generated PDF." })]),
      section("overview", "At a glance", "programmeOverview"),
      section("schedule", "Schedule", "programmeSchedule", [
        select("programmeStatus", "Sample plan status", [
          { value: "tba", label: "Hidden: say every training is planned with you" },
          { value: "draft", label: "Sample (show sessions marked “adapted for you”)" },
          { value: "final", label: "Shown without that mark" },
        ]),
        textarea("programmeNote", "Note above the sample plan"),
      ], { description: "Sessions are added under Schedule." }),
      section("plan", "Plan your visit", "programmePlan"),
    ],
  },
  {
    key: "trainers",
    title: "Trainers",
    path: "/trainers",
    sections: [
      section("hero", "Hero", "trainersHero"),
      section("spotlight", "Lead trainer", "trainersSpotlight", [], { description: "The trainer marked “Lead trainer” under Trainers (the first one, if several are), shown large at the top of the page with their profile." }),
      section("list", "Trainer list", "trainersList", [], { description: "Trainers are added under Trainers. The “More trainers” card is edited under Home → Trainers; the texts here show while there are no trainers yet." }),
    ],
  },
  {
    key: "tutorials",
    title: "Hands-on labs",
    path: "/tutorials",
    sections: [section("hero", "Hero", "tutorialsHero"), section("list", "Labs & demos", "tutorialsList", [], { description: "Labs and demos are added under Hands-on labs and Demos." })],
  },
  {
    key: "register",
    title: "Contact us",
    path: "/contact",
    sections: [
      section("hero", "Hero", "registerHero"),
      section("form", "Form & status", "registerForm", [], { description: "Whether training requests are open, and an external form link, are set under Site-wide → Contact us." }),
      section("fields", "Form fields", "registerFormText", [formFieldList("registerFields", "Fields", "register", { help: FIELDS_HELP })], {
        description: "The training request form's fields, in three steps, and its texts. The preview shows the form even while requests are paused.",
        within: "form",
        anchor: "register.form",
      }),
      section("fees", "Pricing", "registerFees", [
        objects("fees", "Prices", "Price", [
          text("category", "Training", { required: true, width: "half", placeholder: "Custom training" }),
          text("amount", "Amount", { width: "half", placeholder: "On request" }),
          text("note", "Note"),
        ]),
        textarea("feeNote", "Fee note", { placeholder: "Group fees are available for teams from one organisation." }),
      ]),
      section("deadlines", "How it works", "registerDeadlines"),
    ],
  },
  {
    key: "partners",
    title: "Partners",
    path: "/partners",
    sections: [
      section("hero", "Hero", "partnersHero", [
        textarea("sponsorshipIntro", "Introduction"),
        file("sponsorBrochure", "Partnership brochure (PDF)", { accept: "application/pdf" }),
      ]),
      section("partnerForm", "Partner form", "partnerFormText", [formFieldList("partnerFields", "Fields of the “Become a partner” form", "sponsor", { help: FIELDS_HELP })], {
        description: "The form behind the “Become a partner” button: its fields and texts. Enquiries arrive under Enquiries.",
        anchor: "partners.hero",
      }),
      section("list", "Our partners", "partnersList", [], { description: "Partners are added under Partners." }),
      section("reach", "Who you'll reach", "partnersReach", [], { description: "The list comes from About → Who should attend." }),
      section("ways", "Ways to take part", "partnersWays"),
      section("tiers", "Partnership tiers", "partnersTiers", [
        objects("sponsorTiers", "Partnership tiers", "Tier", [
          text("name", "Tier name", { required: true, width: "half" }),
          text("price", "Contribution", { width: "half", placeholder: "On request" }),
          list("perks", "Benefits", { itemLabel: "Benefit" }),
        ]),
      ]),
    ],
  },
  {
    key: "venue",
    title: "Venue",
    path: "/venue",
    sections: [
      section("hero", "Hero", "venueHero"),
      section("place", "The venue", "venuePlace", [
        text("mapPin", "Map pin (latitude, longitude)", {
          width: "half",
          placeholder: "23.8770, 90.3200",
          help: "Where the embedded map, “Open map” and every “Directions” link point. In Google Maps, right-click the spot and click the numbers at the top to copy them. Leave blank to search for the map location below instead.",
        }),
        text("mapQuery", "Map location (search text)", { width: "half", help: "Used only when the map pin is blank, e.g. a building name and area." }),
        url("mapEmbedUrl", "Custom map embed URL (optional)", { help: "Paste the src of a Google Maps “Embed a map” iframe. It replaces the embedded map only (the links still use the pin), and one showing a place outside Bangladesh is ignored." }),
        richtext("campusEntry", "Campus entry information"),
      ], { description: "The venue's name and address are under Site-wide → Programme details." }),
      section("routes", "Getting here", "venueRoutes", [
        objects("directions", "Directions", "Route", [
          select("mode", "Mode", [
            { value: "air", label: "By air" },
            { value: "rail", label: "By train" },
            { value: "metro", label: "By metro rail" },
            { value: "road", label: "By road" },
          ], { width: "half" }),
          text("title", "Title", { required: true, width: "half" }),
          textarea("details", "Details", { rows: 3 }),
        ], { help: "Also drawn on the route map on the home page." }),
      ]),
      section("stay", "Where to stay", "venueStay", [
        objects("accommodation", "Nearby accommodation", "Option", [
          text("name", "Name", { required: true, width: "half" }),
          select("kind", "Type", [
            { value: "campus", label: "On campus" },
            { value: "guesthouse", label: "Guest house" },
            { value: "hotel", label: "Hotel" },
            { value: "area", label: "Area" },
          ], { width: "half" }),
          text("distance", "Distance", { width: "half" }),
          url("url", "Link", { width: "half" }),
          textarea("note", "Note", { rows: 2 }),
        ]),
        list("localInfo", "Local tips", { itemLabel: "Tip" }),
      ]),
    ],
  },
  {
    key: "organisers",
    title: "Organisers",
    path: "/organisers",
    description: "People are added under Organisers & volunteers.",
    sections: [
      section("hero", "Hero", "organisersHero"),
      section("faculty", "Faculty coordinators", "organisersFaculty"),
      section("students", "Student organisers", "organisersStudents"),
      section("volunteers", "Volunteers", "organisersVolunteers"),
    ],
  },
  {
    key: "gallery",
    title: "Photo gallery",
    path: "/gallery",
    description: "Shown once “Past trainings: show the photo gallery” is on (Site-wide → Features); the preview here shows it before that. Photos are added under Photo gallery.",
    sections: [section("hero", "Page", "galleryHero")],
  },
  {
    key: "talks",
    title: "Slides & recordings",
    path: "/recordings",
    description: "Shown once “Past trainings: show session slides & recordings” is on (Site-wide → Features); the preview here shows it before that. Recordings are added under Slides & recordings.",
    sections: [section("hero", "Page", "talksHero")],
  },
  {
    key: "participants",
    title: "Past participants",
    path: "/past-participants",
    description: "Participants are added under Past participants.",
    sections: [
      section("hero", "Hero", "participantsHero"),
      section("stats", "Numbers", "participantsStats", [], { description: "Counted from the participants listed under Past participants." }),
      section("testimonials", "What participants say", "participantsTestimonials", [], { description: "The quotes of participants with “Feature their quote” ticked." }),
      section("list", "Participants by training", "participantsList"),
      section("cta", "Closing call to action", "participantsCta"),
    ],
  },
  {
    key: "meetAura",
    title: "Meet Aura",
    path: "/meet-aura",
    sections: [section("hero", "Hero", "auraHero"), section("playground", "Playground", "auraPlayground"), section("looks", "Around the site", "auraLooks")],
  },
];

// Pages with sections that can be moved get a Section order tab (see section-order.ts); the hero stays first.
for (const p of SETTINGS_PAGES) {
  if (!isOrderPage(p.key)) continue;
  const titleOf = (key: string) => p.sections.find((s) => s.key === key)?.title ?? key;
  const options = SECTION_ORDER[p.key].map((key) => ({ value: key, label: titleOf(key) }));
  p.sections.push(
    section("order", "Section order", undefined, [orderList(orderField(p.key), "Order of sections", options, { pinned: [titleOf("hero")] })], {
      description:
        "Move the sections up or down the page by dragging them or with their arrows; the preview follows. The hero always stays at the top. A section that isn't showing right now (one with nothing in it yet, say, or one switched off at the top of its tab) keeps its place for when it appears. Each section's background is set in its own tab, so after a move you may want to check that tinted and plain sections still take turns.",
      anchor: "",
    }),
  );
}

// Pages with sections that can be hidden list the hidden ones in one field, switched in each section's tab (see section-order.ts).
for (const p of SETTINGS_PAGES) {
  if (!isHidePage(p.key)) continue;
  const titleOf = (key: string) => p.sections.find((s) => s.key === key)?.title ?? key;
  p.hidden = multiselect(hiddenField(p.key), `${p.title}: hidden sections`, HIDEABLE_SECTIONS[p.key].map((key) => ({ value: key, label: titleOf(key) })));
}

// Each section previews itself at `[data-edit="<page>.<section>"]` unless it names another place.
for (const p of SETTINGS_PAGES) for (const s of p.sections) s.anchor ??= `${p.key}.${s.key}`;

/** A section's form fields: its texts and colours (stored under the copy key), then its other settings. */
export function settingsSectionFields(p: SettingsPage, s: SettingsSection): FieldDef[] {
  return [...(s.copy ? [{ name: s.copy, label: `${p.title}: ${s.title}`, type: "group" as const, fields: copyFields(s.copy) }] : []), ...s.fields];
}

export const SETTINGS_DEF: SingletonDef = {
  key: "settings",
  label: "Site settings",
  description: "Every page of the site, section by section: texts, colours and settings, with a live preview.",
  tags: ["settings"],
  sections: SETTINGS_PAGES.flatMap((p) => [
    ...p.sections.map((s) => ({ key: `${p.key}.${s.key}`, title: `${p.title} › ${s.title}`, fields: settingsSectionFields(p, s) })),
    ...(p.hidden ? [{ key: `${p.key}.hidden`, title: `${p.title} › Hidden sections`, fields: [p.hidden] }] : []),
  ]),
};

export const SINGLETONS = { settings: SETTINGS_DEF } as const;

/* Form option lists used by the public forms */
export const attendeeCategoryKeys = ATTENDEE_CATEGORIES;
export const registrationStatusKeys = REGISTRATION_STATUSES;
export const programmeStatusKeys = PROGRAMME_STATUSES;

export function flattenFields(sections: FieldSection[]): FieldDef[] {
  return sections.flatMap((s) => s.fields);
}

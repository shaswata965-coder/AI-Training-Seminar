import type {
  PeopleGroup,
  ProgrammeStatus,
  RegistrationStatus,
  SessionType,
  TrainerCategory,
  SponsorTier,
  ThemeKey,
} from "./constants";
import type { FormSettings } from "@/lib/forms";
import type { PageCopy } from "@/lib/schema/page-copy";
import type { HiddenSections, SectionOrders } from "@/lib/schema/section-order";
import type { Tone } from "./constants";

export interface IconItem {
  title: string;
  icon: string;
  description: string;
}

/** Accent colours chosen in Site settings → Site-wide → Colours; empty means the built-in shade. */
export type Palette = Record<Tone, string>;

/** Everything in Admin → Site settings, including every section's texts and colours (PageCopy) and the forms' fields. */
export interface SiteSettings extends PageCopy, SectionOrders, HiddenSections, FormSettings {
  eventName: string;
  shortName: string;
  tagline: string;
  description: string;
  organisedBy: string;
  startDate: string;
  endDate: string;
  venueName: string;
  venueHall: string;
  venueAddress: string;

  workshopStatus: RegistrationStatus;
  workshopDeadline: string;
  /** When the organising committee will have told registrants whether they have a place; empty for “by e-mail”. */
  workshopReplyBy: string;
  workshopUrl: string;
  fees: { category: string; amount: string; note: string }[];
  feeNote: string;
  confirmationNote: string;

  /** Cache the site's files behind a loading screen on the home page (components/loading). */
  showLoader: boolean;
  /** The photo of the Daffodil International University campus behind the home hero: an upload, or empty for the built-in one. */
  showHeroPhoto: boolean;
  heroPhoto: string;
  /** The picture at the top of the home page's registration poster: an upload, or empty for the built-in one. */
  invitePhoto: string;
  highlights: { label: string; value: string; icon: string }[];
  featuredTrainers: number;

  motivation: string;
  agenticAI: string;
  /** Short points circled around Aura in the home page About section. */
  aboutPoints: IconItem[];
  audience: IconItem[];
  activities: IconItem[];
  themes: { key: Exclude<ThemeKey, "general">; title: string; description: string; image?: string }[];

  programmeStatus: ProgrammeStatus;
  programmeNote: string;
  schedulePdf: string;

  mapQuery: string;
  mapEmbedUrl: string;
  directions: { mode: "air" | "rail" | "metro" | "road"; title: string; details: string }[];
  campusEntry: string;
  accommodation: { name: string; kind: string; distance: string; url: string; note: string }[];
  localInfo: string[];

  sponsorshipIntro: string;
  sponsorTiers: { name: string; price: string; perks: string[] }[];
  sponsorBrochure: string;

  contactEmail: string;
  contactPhone: string;
  notifyEmail: string;
  website: string;
  linkedin: string;
  x: string;
  instagram: string;
  youtube: string;

  /** The university's logo (left corner of the navigation bar) and the department's seal (right corner). */
  logoUniversity: string;
  logoDepartment: string;
  eventLogo: string;
  brandColor: string;
  palette: Palette;
  ogImage: string;

  showMoreTrainers: boolean;
  showGallery: boolean;
  showTalks: boolean;
  bannerText: string;
  bannerLink: string;

  gaId: string;
  keywords: string[];
}

interface Doc {
  id: string;
  order?: number;
  published?: boolean;
}

export interface Announcement extends Doc {
  title: string;
  body: string;
  date: string;
  tone: "info" | "important" | "success";
  linkUrl: string;
  linkLabel: string;
  pinned: boolean;
}

export interface Trainer extends Doc {
  name: string;
  slug: string;
  designation: string;
  affiliation: string;
  category: TrainerCategory;
  theme: ThemeKey | "";
  /** The lead trainer: shown in the spotlight at the top of the Trainers page. */
  lead: boolean;
  photo: string;
  bio: string;
  /** Areas of expertise, in a line. */
  expertise: string;
  /** What they teach in the programmes. */
  teaching: string;
  website: string;
  linkedin: string;
  x: string;
  scholar: string;
  github: string;
  featured: boolean;
}

export interface Session extends Doc {
  title: string;
  day: string;
  start: string;
  end: string;
  type: SessionType;
  theme: ThemeKey;
  room: string;
  trainerNote: string;
  trainers: string[];
  moderator: string;
  panelists: string[];
  description: string;
}

export interface Tutorial extends Doc {
  title: string;
  slug: string;
  schedule: string;
  level: "beginner" | "intermediate" | "advanced" | "all";
  duration: string;
  theme: ThemeKey;
  instructors: { name: string; affiliation: string; url: string }[];
  description: string;
  prerequisites: string[];
  materials: { label: string; url: string }[];
  capacity: string;
}

export interface Demo extends Doc {
  title: string;
  team: string;
  theme: ThemeKey;
  description: string;
  image: string;
  videoUrl: string;
  link: string;
}

export interface Sponsor extends Doc {
  name: string;
  tier: SponsorTier;
  logo: string;
  website: string;
  blurb: string;
}

export interface Person extends Doc {
  name: string;
  group: PeopleGroup;
  role: string;
  department: string;
  affiliation: string;
  profileUrl: string;
  photo: string;
  bio: string;
}

export interface Faq extends Doc {
  question: string;
  answer: string;
  category: string;
}

export interface GalleryItem extends Doc {
  image: string;
  caption: string;
  alt: string;
  day: string;
}

export interface Talk extends Doc {
  title: string;
  trainerName: string;
  day: string;
  description: string;
  slides: string;
  videoUrl: string;
}

export interface Participant extends Doc {
  name: string;
  designation: string;
  organisation: string;
  /** The programme they completed; "general" for both. */
  theme: ThemeKey;
  /** Their batch, as written in the admin ("Batch 1 · January 2026"): participants with the same text are grouped. */
  batch: string;
  /** YYYY-MM-DD the batch was completed, to order the batches. */
  completed: string;
  photo: string;
  quote: string;
  featured: boolean;
  profileUrl: string;
}

export interface CollectionTypes {
  announcements: Announcement;
  trainers: Trainer;
  sessions: Session;
  tutorials: Tutorial;
  demos: Demo;
  sponsors: Sponsor;
  people: Person;
  faqs: Faq;
  gallery: GalleryItem;
  talks: Talk;
  participants: Participant;
}
export type CollectionKey = keyof CollectionTypes;

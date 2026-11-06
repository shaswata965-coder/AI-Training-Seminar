import type { AuraVariant } from "@/components/aura/types";

export type Tone = "azure" | "lilac" | "mint" | "peach" | "blush" | "butter" | "aqua";

/** The training programmes (shown as "Programmes" on the site), plus "general" for sessions shared by both. */
export const THEME_KEYS = ["professionals", "workspace", "general"] as const;
export type ThemeKey = (typeof THEME_KEYS)[number];

/** Other names for a programme, as they may be typed into a link (?theme=…) or stored: read as the current keys. */
const RENAMED_THEMES: Record<string, ThemeKey> = { professional: "professionals", workplace: "workspace" };
export const currentThemeKey = (key: string): string => (Object.hasOwn(RENAMED_THEMES, key) ? RENAMED_THEMES[key] : key);

/** Session types stored by the site's first version under other names, read as their current ones. */
const RENAMED_SESSION_TYPES: Record<string, string> = { keynote: "opening", talk: "lecture", panel: "discussion" };
export const currentSessionType = (key: string): string => (Object.hasOwn(RENAMED_SESSION_TYPES, key) ? RENAMED_SESSION_TYPES[key] : key);

export const THEME_META: Record<
  ThemeKey,
  { label: string; short: string; tone: Tone; aura: AuraVariant; icon: "briefcase" | "laptop" | "spark" }
> = {
  professionals: { label: "AI for Professionals", short: "AI for Professionals", tone: "peach", aura: "professionals", icon: "briefcase" },
  workspace: { label: "AI for Workspace", short: "AI for Workspace", tone: "mint", aura: "workspace", icon: "laptop" },
  general: { label: "Both programmes", short: "General", tone: "azure", aura: "guide", icon: "spark" },
};

export const SESSION_TYPES = ["opening", "lecture", "discussion", "tutorial", "demo", "break", "other"] as const;
export type SessionType = (typeof SESSION_TYPES)[number];

export const SESSION_TYPE_META: Record<SessionType, { label: string; tone: Tone }> = {
  opening: { label: "Opening", tone: "lilac" },
  lecture: { label: "Lecture", tone: "azure" },
  discussion: { label: "Discussion", tone: "peach" },
  tutorial: { label: "Hands-on lab", tone: "mint" },
  demo: { label: "Demo", tone: "aqua" },
  break: { label: "Break", tone: "butter" },
  other: { label: "Session", tone: "azure" },
};

export const TRAINER_CATEGORIES = ["faculty", "industry", "guest"] as const;
export type TrainerCategory = (typeof TRAINER_CATEGORIES)[number];
export const TRAINER_CATEGORY_META: Record<TrainerCategory, { label: string; tone: Tone }> = {
  faculty: { label: "DIU faculty", tone: "lilac" },
  industry: { label: "Industry expert", tone: "peach" },
  guest: { label: "Guest trainer", tone: "mint" },
};

export const PEOPLE_GROUPS = ["faculty", "student", "volunteer"] as const;
export type PeopleGroup = (typeof PEOPLE_GROUPS)[number];
export const PEOPLE_GROUP_META: Record<PeopleGroup, { label: string; plural: string }> = {
  faculty: { label: "Faculty coordinator", plural: "Faculty coordinators" },
  student: { label: "Student organiser", plural: "Student organisers" },
  volunteer: { label: "Volunteer", plural: "Volunteers" },
};

export const SPONSOR_TIERS = ["title", "platinum", "gold", "silver", "bronze", "partner", "academic", "community", "media"] as const;
export type SponsorTier = (typeof SPONSOR_TIERS)[number];
export const SPONSOR_TIER_META: Record<SponsorTier, { label: string; size: "xl" | "lg" | "md" | "sm" }> = {
  title: { label: "Title partner", size: "xl" },
  platinum: { label: "Platinum", size: "lg" },
  gold: { label: "Gold", size: "lg" },
  silver: { label: "Silver", size: "md" },
  bronze: { label: "Bronze", size: "md" },
  partner: { label: "Partners", size: "md" },
  academic: { label: "Academic partners", size: "sm" },
  community: { label: "Community partners", size: "sm" },
  media: { label: "Media partners", size: "sm" },
};

export const LEVELS = ["beginner", "intermediate", "advanced", "all"] as const;
export const LEVEL_META: Record<(typeof LEVELS)[number], { label: string; tone: Tone }> = {
  beginner: { label: "Beginner", tone: "mint" },
  intermediate: { label: "Intermediate", tone: "azure" },
  advanced: { label: "Advanced", tone: "lilac" },
  all: { label: "All levels", tone: "butter" },
};

export const FAQ_CATEGORIES = ["general", "registration", "programme", "travel", "sponsorship"] as const;
export const FAQ_CATEGORY_META: Record<(typeof FAQ_CATEGORIES)[number], string> = {
  general: "General",
  registration: "Registration",
  programme: "Programmes & schedule",
  travel: "Venue & travel",
  sponsorship: "Partnerships",
};

/** "open": enrolling for the next batch (the training runs continuously); "closed": registration paused. */
export const REGISTRATION_STATUSES = ["open", "closed"] as const;
export type RegistrationStatus = (typeof REGISTRATION_STATUSES)[number];

export const PROGRAMME_STATUSES = ["tba", "draft", "final"] as const;
export type ProgrammeStatus = (typeof PROGRAMME_STATUSES)[number];

export const ATTENDEE_CATEGORIES = ["student", "faculty", "professional", "public", "entrepreneur", "other"] as const;
export const ATTENDEE_CATEGORY_META: Record<(typeof ATTENDEE_CATEGORIES)[number], string> = {
  student: "Student",
  faculty: "Faculty / teacher",
  professional: "Working professional",
  public: "Government / NGO staff",
  entrepreneur: "Entrepreneur / business owner",
  other: "Other",
};

export const ENQUIRY_TYPES = ["contact", "sponsor"] as const;
export type EnquiryType = (typeof ENQUIRY_TYPES)[number];

export const opts = <T extends string>(keys: readonly T[], label: (k: T) => string) =>
  keys.map((value) => ({ value, label: label(value) }));

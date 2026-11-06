import { googleCalendarUrl, outlookCalendarUrl } from "./calendar";
import type { SiteSettings } from "./content/types";
import { batchDayDate, formatDateRange, localDateTime } from "./format";
import { absoluteUrl } from "./paths";

export interface BatchDay {
  day: number;
  date: string;
  start: Date;
  end: Date;
}

/** One entry per day of the batch, each from the start time to the end time (BST). */
export function batchDays(s: SiteSettings): BatchDay[] {
  const start = new Date(s.startDate);
  const end = new Date(s.endDate);
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return [];
  const startTime = new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Dhaka", hour: "2-digit", minute: "2-digit", hour12: false }).format(start);
  const endTime = new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Dhaka", hour: "2-digit", minute: "2-digit", hour12: false }).format(end);
  const first = batchDayDate(s.startDate, 1);
  const last = batchDayDate(s.endDate, 1);
  const count = Math.max(1, Math.round((Date.parse(last) - Date.parse(first)) / 86_400_000) + 1);
  return Array.from({ length: Math.min(count, 7) }, (_, i) => {
    const date = batchDayDate(s.startDate, i + 1);
    return {
      day: i + 1,
      date,
      start: localDateTime(date, startTime) ?? start,
      end: localDateTime(date, endTime) ?? end,
    };
  });
}

/** "DIU AI Training Seminars 2026" → { title: "DIU AI Training Seminars", year: "2026" }. Names without a trailing year keep it empty. */
export function splitProgrammeName(name: string): { title: string; year: string } {
  const m = name.trim().match(/^(.+?)\s+(20\d\d)$/);
  return m ? { title: m[1], year: m[2] } : { title: name.trim(), year: "" };
}

/** The programme's name for the logo, and a year only if the name ends with one: the training runs all year round. */
export function brandName(s: SiteSettings): { title: string; year: string } {
  return splitProgrammeName(s.programmeName);
}

export function venueLine(s: SiteSettings) {
  return [s.venueHall, s.venueName].filter(Boolean).join(", ");
}

export function batchSummary(s: SiteSettings) {
  return `${s.programmeName} · ${formatDateRange(s.startDate, s.endDate)} · ${venueLine(s)}`;
}

export interface CalendarLinks {
  google: string;
  outlook: string;
  ics: string;
}

export function batchCalendarLinks(s: SiteSettings): CalendarLinks {
  const start = new Date(s.startDate);
  const end = new Date(s.endDate);
  const details = `${s.tagline}\n\n${absoluteUrl("/")}`;
  const location = s.venueAddress || venueLine(s);
  return {
    google: googleCalendarUrl({ title: s.programmeName, start, end, details, location, allDay: true }),
    outlook: outlookCalendarUrl({ title: s.programmeName, start, end, details, location, allDay: true }),
    ics: "/api/calendar",
  };
}

/** True once a registration deadline (ISO date-time) has passed. */
export function deadlinePassed(iso: string | null | undefined, now = Date.now()): boolean {
  if (!iso) return false;
  const t = Date.parse(iso);
  return !Number.isNaN(t) && now >= t;
}

export function registrationHref(s: SiteSettings) {
  return s.registrationUrl || "/register";
}

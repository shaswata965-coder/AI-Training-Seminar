export const EVENT_TZ = "Asia/Dhaka";
const TZ_OFFSET_MIN = 360;

function parse(iso?: string | null): Date | null {
  if (!iso) return null;
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? null : d;
}

export function formatDate(iso: string | null | undefined, opts: Intl.DateTimeFormatOptions = { day: "numeric", month: "long", year: "numeric" }) {
  const d = parse(iso);
  if (!d) return "";
  return new Intl.DateTimeFormat("en-GB", { timeZone: EVENT_TZ, ...opts }).format(d);
}

export function formatDateTime(iso: string | null | undefined) {
  return formatDate(iso, { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit", hour12: false });
}

/** Admin datetime-local value ("2026-12-15T09:00") ⇄ stored ISO in BST. */
export function localInputToIso(value: string): string {
  if (!value) return "";
  if (/[zZ]|[+-]\d{2}:\d{2}$/.test(value)) return value;
  const v = value.length === 16 ? `${value}:00` : value;
  return `${v}+06:00`;
}
export function isoToLocalInput(iso: string): string {
  const d = parse(iso);
  if (!d) return "";
  const local = new Date(d.getTime() + TZ_OFFSET_MIN * 60_000);
  return local.toISOString().slice(0, 16);
}

export function timeRange(start?: string, end?: string) {
  if (!start) return "";
  return end ? `${start} – ${end}` : start;
}

export function initials(name: string) {
  const parts = name
    .replace(/^((prof(essor)?|dr|mr|ms|mrs|engr)\.?\s+)+/i, "")
    .split(/\s+/)
    .filter(Boolean);
  return ((parts[0]?.[0] ?? "") + (parts.length > 1 ? parts[parts.length - 1][0] : "")).toUpperCase();
}

export function slugify(s: string) {
  return s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/^(prof|dr)\.?\s+/i, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

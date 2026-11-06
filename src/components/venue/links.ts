import type { SiteSettings } from "@/lib/content/types";
import { ROUTES, type Mode } from "./dhaka-map";

/** "23.8770, 90.3200" → "23.877,90.32", or null when it isn't a latitude and longitude. */
export function pinCoordinates(pin: string | undefined): string | null {
  const m = pin?.trim().match(/^(-?\d{1,2}(?:\.\d+)?)\s*,\s*(-?\d{1,3}(?:\.\d+)?)$/);
  if (!m) return null;
  const lat = Number(m[1]);
  const lng = Number(m[2]);
  return Math.abs(lat) <= 90 && Math.abs(lng) <= 180 ? `${lat},${lng}` : null;
}

/** Bangladesh, with a margin: the venue is always somewhere in it. */
const BANGLADESH = { south: 20.3, north: 26.9, west: 87.8, east: 92.9 };

/**
 * A custom Google Maps embed address, unless its coordinates (the `!2d<lng>!3d<lat>` of an "Embed a map" link)
 * are outside Bangladesh: a map left over from another site, or pasted by mistake, never replaces the venue's.
 */
export function usableEmbedUrl(url: string | undefined): string | undefined {
  if (!url || !/^https:\/\/(www\.)?google\.[a-z.]+\/maps\/embed/.test(url)) return undefined;
  const lng = url.match(/!2d(-?\d+(?:\.\d+)?)/);
  const lat = url.match(/!3d(-?\d+(?:\.\d+)?)/);
  if (!lng || !lat) return url;
  const [y, x] = [Number(lat[1]), Number(lng[1])];
  return y >= BANGLADESH.south && y <= BANGLADESH.north && x >= BANGLADESH.west && x <= BANGLADESH.east ? url : undefined;
}

/**
 * Where the venue's maps and directions point: the map pin (exact) when it is set, otherwise the search text,
 * the address or the venue's name (read by Google, which may place it less precisely).
 */
export function mapLinks(s: SiteSettings) {
  const query = pinCoordinates(s.mapPin) ?? (s.mapQuery || s.venueAddress || s.venueName);
  return {
    query,
    open: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`,
    directions: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(query)}`,
  };
}

/** Google Maps directions to the venue for one way of arriving, from its usual starting point. */
export function routeUrl(query: string, mode: Mode) {
  const r = (ROUTES[mode] ?? ROUTES.road)[0];
  const p = new URLSearchParams({ api: "1", destination: query, travelmode: r.travel });
  if (r.origin) p.set("origin", r.origin);
  return `https://www.google.com/maps/dir/?${p}`;
}

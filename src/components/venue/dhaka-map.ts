/*
 * Geometry for the schematic route map of north-west Dhaka (VenueMap), from the airport and Uttara to
 * Mirpur, Gabtoli and Daffodil Smart City across the Turag. Everything is latitude/longitude, projected
 * once onto a 1000-wide canvas, so landmarks, the metro line and the routes keep their places relative to
 * each other. It is a sketch, not a street map: positions are approximate and lines smoothed and simplified.
 */

type LatLng = readonly [lat: number, lng: number];
export type Pt = readonly [x: number, y: number];

const NORTH = 23.902;
const SOUTH = 23.772;
const WEST = 90.282;
const EAST = 90.452;
const COS = Math.cos((((NORTH + SOUTH) / 2) * Math.PI) / 180);

export const MAP_W = 1000;
const KX = MAP_W / (EAST - WEST);
const KY = KX / COS;
export const MAP_H = Math.round((NORTH - SOUTH) * KY);

const r1 = (v: number) => Math.round(v * 10) / 10;
export const project = ([lat, lng]: LatLng): Pt => [r1((lng - WEST) * KX), r1((NORTH - lat) * KY)];

/** Smooth path through the points (Catmull-Rom as cubic Béziers). */
function smooth(points: readonly LatLng[], closed = false): string {
  const p = points.map(project);
  const n = p.length;
  if (n < 2) return "";
  const at = (i: number) => (closed ? p[(i + n) % n] : p[Math.max(0, Math.min(n - 1, i))]);
  let d = `M${p[0][0]} ${p[0][1]}`;
  for (let i = 0; i < (closed ? n : n - 1); i++) {
    const [a, b, c, e] = [at(i - 1), at(i), at(i + 1), at(i + 2)];
    const c1 = [r1(b[0] + (c[0] - a[0]) / 6), r1(b[1] + (c[1] - a[1]) / 6)];
    const c2 = [r1(c[0] - (e[0] - b[0]) / 6), r1(c[1] - (e[1] - b[1]) / 6)];
    d += ` C${c1[0]} ${c1[1]} ${c2[0]} ${c2[1]} ${c[0]} ${c[1]}`;
  }
  return closed ? `${d} Z` : d;
}

// --- Places -----------------------------------------------------------------

const P = {
  diu: [23.8768, 90.3207],
  airport: [23.8505, 90.4065],
  airportStation: [23.8545, 90.4125],
  abdullahpur: [23.8795, 90.4005],
  uttaraNorth: [23.8693, 90.367],
  pallabi: [23.8262, 90.3646],
  mirpur10: [23.807, 90.3686],
  mirpur1: [23.7957, 90.3537],
  gabtoli: [23.7836, 90.3446],
  birulia: [23.8452, 90.3265],
  botanical: [23.8178, 90.346],
} as const satisfies Record<string, LatLng>;

export type PlaceKind = "venue" | "air" | "rail" | "metro" | "road" | "sight";
export interface Place {
  id: string;
  label: string;
  kind: PlaceKind;
  at: Pt;
  /** Which side of the pin the label sits on. */
  side?: "left" | "right" | "top" | "top-start" | "bottom";
}

export const VENUE: Place = { id: "diu", label: "Daffodil Smart City", kind: "venue", at: project(P.diu), side: "bottom" };

export const PLACES: Place[] = [
  { id: "airport", label: "Shahjalal Airport", kind: "air", at: project(P.airport), side: "left" },
  { id: "airportStation", label: "Airport station", kind: "rail", at: project(P.airportStation), side: "right" },
  { id: "uttaraNorth", label: "Uttara North", kind: "metro", at: project(P.uttaraNorth), side: "top" },
  { id: "mirpur10", label: "Mirpur 10", kind: "metro", at: project(P.mirpur10), side: "right" },
  { id: "gabtoli", label: "Gabtoli", kind: "road", at: project(P.gabtoli), side: "right" },
  { id: "botanical", label: "Botanical Garden", kind: "sight", at: project(P.botanical), side: "right" },
];

// --- Base map ---------------------------------------------------------------

const GREEN_SHAPES: LatLng[][] = [
  // National Botanical Garden and the zoo, Mirpur
  [[23.8225, 90.3425], [23.822, 90.3505], [23.8125, 90.3515], [23.8115, 90.3435]],
  // The low fields along the Turag, Birulia
  [[23.862, 90.302], [23.858, 90.322], [23.835, 90.324], [23.83, 90.306]],
  // Uttara's lake and parks
  [[23.8735, 90.3875], [23.872, 90.3935], [23.866, 90.3925], [23.8675, 90.3865]],
];
export const GREEN = GREEN_SHAPES.map((shape) => smooth(shape, true));

export const AIRPORT = smooth([[23.869, 90.3885], [23.8665, 90.4075], [23.8395, 90.4145], [23.8265, 90.4045], [23.8405, 90.3875]], true);
export const RUNWAYS = [smooth([[23.8625, 90.3915], [23.833, 90.4035]])];

export const CAMPUS = smooth([[23.8812, 90.3152], [23.8806, 90.3262], [23.8726, 90.3268], [23.8722, 90.3158]], true);

/** The Turag, round the north-west of the city from Tongi to Gabtoli. */
export const RIVER = smooth([[23.8935, 90.44], [23.8885, 90.405], [23.8885, 90.378], [23.8805, 90.352], [23.8655, 90.3405], [23.845, 90.3355], [23.822, 90.3335], [23.801, 90.3375], [23.785, 90.3405], [23.772, 90.3455]]);

export const ROADS: { id: string; d: string; major?: boolean }[] = [
  { id: "airport-road", d: smooth([[23.772, 90.4075], [23.8, 90.4095], [23.83, 90.4135], [23.8545, 90.4105], [23.8795, 90.4005], [23.9, 90.4005]]), major: true },
  { id: "ashulia", d: smooth([[23.8795, 90.4005], [23.8845, 90.382], [23.8865, 90.358], [23.8835, 90.338], [23.8775, 90.3235], [23.8745, 90.3], [23.875, 90.282]]), major: true },
  { id: "beribadh", d: smooth([[23.7836, 90.3446], [23.799, 90.3405], [23.818, 90.3385], [23.8375, 90.3345], [23.8452, 90.3265], [23.8605, 90.3225], [23.8768, 90.3207]]) },
  { id: "aricha", d: smooth([[23.7836, 90.3446], [23.788, 90.322], [23.795, 90.3], [23.8, 90.282]]), major: true },
  { id: "mirpur", d: smooth([[23.772, 90.367], [23.7957, 90.3537], [23.807, 90.3686], [23.8262, 90.3646], [23.8458, 90.3634]]) },
  { id: "uttara", d: smooth([[23.8693, 90.367], [23.8735, 90.381], [23.8795, 90.4005]]) },
];

export type LineId = "mrt6";

export const METRO: { id: LineId; name: string; color: string; d: string; stations: Pt[] }[] = [
  {
    id: "mrt6",
    name: "MRT Line 6",
    color: "#e5007d",
    d: smooth([[23.8693, 90.367], [23.8595, 90.3655], [23.8458, 90.3634], [23.8262, 90.3646], [23.8191, 90.3654], [23.807, 90.3686], [23.7975, 90.3727], [23.7905, 90.3757], [23.7779, 90.3802], [23.772, 90.382]]),
    stations: ([[23.8693, 90.367], [23.8595, 90.3655], [23.8458, 90.3634], [23.8262, 90.3646], [23.8191, 90.3654], [23.807, 90.3686], [23.7975, 90.3727], [23.7905, 90.3757], [23.7779, 90.3802]] as LatLng[]).map(project),
  },
];

export const AREA_LABELS: { label: string; at: Pt; rotate?: number }[] = [
  { label: "Uttara", at: project([23.8745, 90.3975]) },
  { label: "Mirpur", at: project([23.8035, 90.3605]) },
  { label: "Ashulia", at: project([23.893, 90.345]) },
  { label: "Savar", at: project([23.825, 90.293]) },
  { label: "Birulia", at: project([23.851, 90.311]) },
  { label: "Turag", at: project([23.832, 90.3315]), rotate: -84 },
];

// --- Routes -----------------------------------------------------------------

export type Mode = "air" | "rail" | "metro" | "road";

export interface Route {
  /** Where the trip starts (a Place id). */
  from: string;
  d: string;
  /** Metro lines that matter for this way of arriving. */
  lines: LineId[];
  /** Pre-filled origin and travel mode for the Google Maps directions link. */
  origin?: string;
  travel: "driving" | "transit";
}

const VIA_ASHULIA: LatLng[] = [P.abdullahpur, [23.8845, 90.382], [23.8865, 90.358], [23.8835, 90.338], P.diu];

export const ROUTES: Record<Mode, Route[]> = {
  air: [
    {
      from: "airport",
      d: smooth([P.airport, [23.8665, 90.407], ...VIA_ASHULIA]),
      lines: [],
      origin: "Hazrat Shahjalal International Airport, Dhaka",
      travel: "driving",
    },
  ],
  rail: [
    {
      from: "airportStation",
      d: smooth([P.airportStation, [23.868, 90.408], ...VIA_ASHULIA]),
      lines: [],
      origin: "Dhaka Airport Railway Station",
      travel: "driving",
    },
  ],
  metro: [
    {
      from: "mirpur10",
      d: smooth([P.mirpur10, [23.8015, 90.3605], P.mirpur1, [23.799, 90.3405], [23.818, 90.3385], [23.8375, 90.3345], P.birulia, [23.8605, 90.3225], P.diu]),
      lines: ["mrt6"],
      origin: "Mirpur 10 Metro Station, Dhaka",
      travel: "driving",
    },
  ],
  road: [
    {
      from: "gabtoli",
      d: smooth([P.gabtoli, [23.799, 90.3405], [23.818, 90.3385], [23.8375, 90.3345], P.birulia, [23.8605, 90.3225], P.diu]),
      lines: [],
      origin: "Gabtoli Bus Terminal, Dhaka",
      travel: "driving",
    },
  ],
};

export const MODE_ORIGIN_KIND: Record<Mode, PlaceKind> = { air: "air", rail: "rail", metro: "metro", road: "road" };

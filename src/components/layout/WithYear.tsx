"use client";

import { useSyncExternalStore } from "react";

const noSubscribe = () => () => {};

/**
 * A text with {year} filled in with the current year. The clock is read in the browser only (reading it while the
 * page is prerendered fails the build), so the prerendered page shows `fallback` until it hydrates.
 */
export function WithYear({ text, fallback }: { text: string; fallback: string }) {
  const year = useSyncExternalStore(noSubscribe, () => new Date().getFullYear(), () => null);
  return <>{text.replaceAll("{year}", year === null ? fallback : String(year))}</>;
}

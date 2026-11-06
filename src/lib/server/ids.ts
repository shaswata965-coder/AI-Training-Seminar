import "server-only";
import { randomInt } from "node:crypto";

const ALPHABET = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ"; // no 0/O/1/I

/** Human-friendly registration ID, e.g. DIUAI-7K3QX (no year: batches run all year). */
export function makeRegId(prefix = "DIUAI") {
  let s = "";
  for (let i = 0; i < 5; i++) s += ALPHABET[randomInt(ALPHABET.length)];
  return `${prefix}-${s}`;
}

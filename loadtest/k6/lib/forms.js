/*
 * The public forms: training registration and enquiries. Payloads
 * are what the site's own forms send with their built-in fields (src/lib/forms.ts; choices must be among
 * a field's options), with made-up people whose addresses are unique to the run, and every answer is
 * sorted into an outcome (see `thresholds` in config.js).
 */
import { check } from "k6";
import http from "k6/http";
import { Counter, Trend } from "k6/metrics";
import { BASE, pick, RUN_ID } from "./config.js";

/** Every answer to a form, tagged with `form` and `outcome`. */
export const submissions = new Counter("submissions");
/** People whose submission was saved (once each, however many times they sent it). */
export const peopleRegistered = new Counter("people_registered");
/** People who never got through: every attempt was refused or failed. */
export const peopleBlocked = new Counter("people_blocked");
export const submitTime = new Trend("submit_time", true);

const FIRST = ["Ayesha", "Rahim", "Nusrat", "Tanvir", "Farhana", "Imran", "Sadia", "Karim", "Tasnim", "Arif", "Mitu", "Shakil", "Rumana", "Sabbir", "Lamia", "Fahim"];
const LAST = ["Rahman", "Hossain", "Ahmed", "Islam", "Chowdhury", "Khan", "Akter", "Alam", "Sarker", "Das", "Roy", "Uddin", "Haque", "Begum"];
const ORGS = ["Daffodil International University", "A Dhaka bank", "A garments exporter", "A telecom company", "A software firm", "A government office", "An NGO", "A school in Savar", "A start-up", "A hospital"];
const CATEGORIES = ["Student", "Student", "Faculty / teacher", "Working professional", "Working professional", "Government / NGO staff", "Entrepreneur / business owner", "Other"];
const PROGRAMMES = ["AI for Professionals", "AI for Workspace"];
const CITIES = ["Dhaka", "Savar", "Gazipur", "Narayanganj", "Chattogram", "Sylhet"];

const digits = (n) => Array.from({ length: n }, () => Math.floor(Math.random() * 10)).join("");

/** A made-up person. `id` must be unique in the run. */
export function person(id) {
  const name = `${pick(FIRST)} ${pick(LAST)}`;
  return { name, email: `diuai-${RUN_ID}-${id}@example.com`, phone: `+880 17${digits(8)}`, organisation: pick(ORGS) };
}

export function registrationPayload(id) {
  const p = person(id);
  return {
    ...p,
    designation: pick(["Assistant Manager", "BSc student", "Lecturer", "Officer", "Founder", ""]),
    category: pick(CATEGORIES),
    city: pick(CITIES),
    // At least one programme: the field is required.
    interests: Math.random() < 0.3 ? PROGRAMMES : [pick(PROGRAMMES)],
    experience: pick(["Never or hardly ever", "Now and then", "Every week", "Every day"]),
    tutorials: Math.random() < 0.6,
    accessibility: "",
    heardFrom: pick(["Social media", "E-mail", "Colleague or friend", "DIU website", "Other"]),
    message: Math.random() < 0.2 ? "I'd like to use AI for the reports I write every week." : "",
    consent: true,
    website: "", // the honeypot the real form leaves empty
  };
}

export function enquiryPayload(id, type = "contact") {
  const p = person(id);
  return {
    type,
    name: p.name,
    email: p.email,
    organisation: type === "contact" ? "" : pick(ORGS),
    phone: p.phone,
    subject: type === "contact" ? "Question about the training" : "Partnering with the training",
    message: "Hello, could you share more details about the schedule and accommodation near the venue? Thank you.",
    website: "",
  };
}

const ENDPOINT = { register: "/api/register", enquiry: "/api/enquiries" };

function postParams(form, from) {
  return {
    headers: {
      "Content-Type": "application/json",
      Accept: "*/*",
      Origin: BASE,
      Referer: `${BASE}${from}`,
      "Sec-Fetch-Site": "same-origin",
      "Sec-Fetch-Mode": "cors",
      "Sec-Fetch-Dest": "empty",
      "User-Agent": "Mozilla/5.0 diuai-loadtest",
    },
    responseType: "text",
    // Sorted below; a 409 or 429 is an answer the site means to give, not a broken request.
    responseCallback: http.expectedStatuses(201, 409, 429),
    tags: { kind: "submit", name: `submit ${form}` },
  };
}

/** `ok`, `duplicate`, `rate_limited` or `error`, from the site's answer. */
function outcomeOf(res, { repeat }) {
  if (res.status === 201) return "ok";
  if (res.status === 429) return "rate_limited";
  // A repeat from the same person, refused as designed.
  if (res.status === 409 && repeat) return "duplicate";
  return "error";
}

/**
 * Send one form. `repeat`: this person already sent it (a second tab, or sending again later). Returns
 * the outcome.
 */
export function submit(form, payload, from, { repeat = false } = {}) {
  const res = http.post(`${BASE}${ENDPOINT[form]}`, JSON.stringify(payload), postParams(form, from));
  return record(form, res, { repeat });
}

/** The same person sending the form from two tabs at once. Returns both outcomes. */
export function submitTwice(form, payload, from) {
  const req = { method: "POST", url: `${BASE}${ENDPOINT[form]}`, body: JSON.stringify(payload), params: postParams(form, from) };
  const [a, b] = http.batch([req, req]);
  const first = record(form, a, { repeat: true });
  const second = record(form, b, { repeat: true });
  return [first, second];
}

function record(form, res, { repeat }) {
  const outcome = outcomeOf(res, { repeat });
  submissions.add(1, { form, outcome });
  submitTime.add(res.timings.duration, { form });
  check(res, { [`${form}: accepted or refused as designed`]: () => outcome !== "error" });
  if (outcome === "error") console.warn(`[${form}] ${res.status} ${res.error || ""} ${String(res.body).slice(0, 200)}`);
  return outcome;
}

/** Count the person once: registered if any attempt was saved, blocked if none was. */
export function settle(form, outcomes) {
  if (outcomes.includes("ok")) peopleRegistered.add(1, { form });
  else peopleBlocked.add(1, { form, reason: outcomes.includes("rate_limited") ? "rate_limited" : "error" });
}

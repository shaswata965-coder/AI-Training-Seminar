import type { Metadata } from "next";
import Link from "next/link";
import { PageTitle } from "@/components/admin/AdminShell";
import { Aura } from "@/components/aura/Aura";

export const metadata: Metadata = { title: "Help guide" };

const SECTIONS: { id: string; title: string; steps: (string | [string, string])[] }[] = [
  {
    id: "basics",
    title: "How it works",
    steps: [
      "Everything you save here is live on the website within a few seconds. There is no separate “publish” step.",
      "Each item has a “Published” switch. Turn it off to hide something without deleting it.",
      "Use the ↑ ↓ arrows in a list to change the order items appear on the website.",
      "Text boxes with a “Preview” button support simple formatting: `**bold**`, `*italic*`, `[link text](https://example.com)` and bullet lists (start lines with `- `). Use “Preview” to check.",
    ],
  },
  {
    id: "pages",
    title: "Texts & colours of every page",
    steps: [
      ["Site settings", "A tab for each page of the site and one for what every page shares (Site-wide). Pick a section to change its colour, background, headings, introductions, button labels and empty-state messages."],
      ["Live preview", "The real page beside the form shows your changes as you type, on desktop or phone. Visitors only see them once you press Save changes."],
      ["Hiding a section", "Every section below a page's hero has a “Show this section on the page” switch at the top of its tab. Switch it off to take the whole section off the page; its texts are kept for when you switch it back on."],
      ["Layout check", "Each text has a counter. Too much or too little text, or a title wrapping onto many lines, text spilling out of its box or the page scrolling sideways, is flagged on the field, the tabs and in the Layout check box."],
      "In many texts you can write `{event}`, `{dates}` or `{venue}`: they are filled in from Programme details.",
    ],
  },
  {
    id: "event",
    title: "Programme details, batch dates & registration",
    steps: [
      ["Site settings → Site-wide → Programme details", "Name, tagline, the next batch's dates, the venue and the room."],
      ["Site settings → Site-wide → Registration", "Open or close registration, set its deadline (the form closes automatically once it passes) and the fees. Paste a Google Form link to use an external form instead of the built-in one."],
      ["The forms' fields", "Registration → Form fields, Home → Contact form and Partners → Partner form. Click a field to change its name, guide, example and type of answer (text, e-mail, phone, number, link, date, a drop-down list, choices or a tick box), its choices, whether it is required, or to hide it. Add questions of your own with “Add a question”. Fields with a lock came with the site and can't be deleted."],
      ["Site settings → Site-wide → Colours and Logos", "Set the brand colour and the accent colours, and replace the built-in DIU logo and Department of CSE seal if ever needed."],
      ["Site settings → Site-wide → Contact & social", "Official e-mail, phone and social links shown in the footer and contact section."],
    ],
  },
  {
    id: "news",
    title: "Announcements",
    steps: ["Announcements → New announcement. Pin important news to keep it on top.", "Add an optional link (for example to the registration page or a PDF)."],
  },
  {
    id: "programme",
    title: "Programmes, schedule & trainers",
    steps: [
      ["Programmes", "Site settings → Home → Programmes: the titles, descriptions and photos of AI for Professionals and AI for Workspace. Sessions, labs, demos, trainers and past participants each pick a programme, or General for both."],
      ["Trainers", "Add each trainer with a photo, designation, affiliation, label (DIU faculty / Industry expert / Guest trainer), programme, profile, areas of expertise and what they teach. Tick “Lead trainer” for the one shown in the spotlight at the top of the Trainers page, and “Feature on the home page” for the home page carousel."],
      ["Schedule", "Add sessions with day, start/end time, type (opening, lecture, discussion, hands-on lab, demo, break), programme and room, and link their trainers."],
      ["Schedule status", "Site settings → Schedule → Schedule. Keep “To be announced” until the schedule is ready; switch to “Draft” or “Final” to show it. The PDF download updates automatically."],
    ],
  },
  {
    id: "learn",
    title: "Hands-on labs, demos & partners",
    steps: [
      "Hands-on labs: trainers, level, duration, prerequisites (laptop, software, accounts) and material links.",
      "Demos: title, team, description, an image and/or a YouTube link.",
      "Partners: logo, name, website and description. Partner logos loop on the home page and are grouped by tier on the Partners page. Partnership tiers and the introduction are in Site settings → Partners.",
    ],
  },
  {
    id: "participants",
    title: "Past participants",
    steps: [
      "Past participants → New participant, once their batch is completed: name, designation, organisation, the programme they completed (General for both) and the batch, written the same way for everyone in it (e.g. “Batch 1 · January 2026”), with the date it was completed to put the batches in order.",
      "A photo, a quote and a profile link are optional: add them only with the participant's permission. Tick “Feature their quote” to show it under “What participants say” and on the home page.",
      "The numbers at the top of the Past participants page (participants, batches, organisations) are counted from the list.",
    ],
  },
  {
    id: "people",
    title: "Organisers & volunteers",
    steps: [
      "Organisers & volunteers → New person. Choose the group: Faculty coordinator, Student organiser or Volunteer.",
      "A group shows on the Organisers page once it has someone in it; volunteers show a “Coming soon” card until you add the first one.",
      "Square photos (at least 400×400 px) look best. Uploads are compressed automatically.",
    ],
  },
  {
    id: "responses",
    title: "Registrations & enquiries",
    steps: [
      "Registrations lists everyone who registered on the website. Change a status (e.g. confirmed / waitlisted), add notes, or download a CSV for Excel.",
      "Places are limited, so registrations are reviewed: new ones are “registered” until the organising team sets them to confirmed or waitlisted. Registrants are told they'll hear by the date in Site settings → Site-wide → Registration → Places confirmed by (or “by e-mail” while it is blank).",
      "Enquiries collects contact-form messages and partnership requests. Use “Reply” to answer by e-mail.",
      "Confirmation e-mails are sent automatically when e-mail (SMTP) is configured on the server.",
    ],
  },
  {
    id: "post",
    title: "After a batch",
    steps: ["Upload photos under Photo gallery and add slides / YouTube links under Slides & recordings.", "Then switch them on in Site settings → Site-wide → Features & past batches."],
  },
  {
    id: "access",
    title: "Users & passwords",
    steps: ["Administrators can add users under Users. Editors can change all content; administrators can also manage users and volunteers and delete registrations.", "Change your own password under My account (10 to 72 characters). That signs you out on your other devices; My account also lists where you're signed in, with a button to sign out everywhere else. Each sign-in lasts 7 days."],
  },
  {
    id: "volunteers",
    title: "Volunteers & the task tracker",
    steps: [
      ["Volunteers → Add volunteer", "Name, e-mail, password (or “Generate”), their responsibility and the areas they may change. Site settings is given page by page: tick only the pages (tabs) they look after, such as Home or Venue, and they see and save only those. They only see their areas. “Delete items” is a separate permission; without it they can add, edit, hide and reorder but not delete. A new password or disabling an account signs them out at once."],
      ["Changes apply at once", "Editing a volunteer's permissions, or disabling them, takes effect on their next click, even if they are signed in."],
      ["Task tracker", "Everything volunteers do, newest first: who, when, where, and each changed field before and after. Filter by volunteer or area and mark entries as reviewed. Administrators' and editors' changes are not tracked."],
      "To show volunteers on the website, add them under Organisers & volunteers; that is separate from their sign-in.",
    ],
  },
];

function Step({ s }: { s: string | [string, string] }) {
  if (typeof s === "string") {
    const parts = s.split(/(`[^`]+`)/g);
    return (
      <>
        {parts.map((p, i) =>
          p.startsWith("`") ? (
            <code key={i} className="rounded bg-surface-2 px-1.5 py-0.5 text-[13px] text-fg ring-1 ring-border">
              {p.slice(1, -1)}
            </code>
          ) : (
            p
          ),
        )}
      </>
    );
  }
  return (
    <>
      <strong className="text-fg">{s[0]}:</strong> {s[1]}
    </>
  );
}

export default function GuidePage() {
  return (
    <div className="max-w-4xl">
      <PageTitle title="Help guide" description="How to keep the website up to date, no coding needed." />
      <div className="card mb-6 flex items-center gap-4 p-5">
        <Aura variant="admin" size={90} lite />
        <p className="text-[15px] text-muted">
          Start with <Link className="font-semibold text-brand underline" href="/admin/settings">Site settings</Link>, then add <Link className="font-semibold text-brand underline" href="/admin/content/trainers">trainers</Link> and the{" "}
          <Link className="font-semibold text-brand underline" href="/admin/content/sessions">programme</Link>. A printable version of this guide is in <code>docs/ADMIN_GUIDE.md</code>.
        </p>
      </div>
      <nav aria-label="Guide contents" className="mb-6 flex flex-wrap gap-2">
        {SECTIONS.map((s) => (
          <a key={s.id} href={`#${s.id}`} className="rounded-full bg-surface px-3 py-1.5 text-sm font-semibold text-muted ring-1 ring-border hover:text-fg">
            {s.title}
          </a>
        ))}
      </nav>
      <div className="grid gap-4">
        {SECTIONS.map((s) => (
          <section key={s.id} id={s.id} className="card scroll-mt-6 p-6">
            <h2 className="font-display text-xl font-bold text-fg">{s.title}</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-[15px] text-muted marker:text-brand">
              {s.steps.map((step, i) => (
                <li key={i}>
                  <Step s={step} />
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}

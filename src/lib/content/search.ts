import type { AssistantEntry } from "@/components/aura/AuraAssistant";
import { stripMarkdown } from "@/components/ui/RichText";
import { SESSION_TYPE_META, THEME_META } from "@/lib/content/constants";
import { isShown } from "@/lib/schema/section-order";
import { getFaqs, getSessions, getTrainers, getTutorials } from "./queries";
import type { SiteSettings } from "./types";

const clip = (text: string, max = 90) => (text.length > max ? `${text.slice(0, max - 2)}…` : text);

/**
 * What "Ask Aura" searches: the pages and home sections (by the names set in Site settings → Navigation, without
 * the hidden ones), then the FAQs, trainers, schedule and hands-on labs as they are on the site.
 */
export async function buildAssistantIndex(s: SiteSettings): Promise<AssistantEntry[]> {
  const [faqs, trainers, sessions, tutorials] = await Promise.all([getFaqs(), getTrainers(), getSessions(), getTutorials()]);
  const n = s.siteNav;
  const home = (key: string) => isShown(s, "home", key);

  const entries: AssistantEntry[] = [
    { kind: "Page", title: n.home, href: "/", keywords: "home overview start next batch dates" },
    { kind: "Page", title: n.programme, subtitle: "Each batch, day by day", href: "/programme", keywords: "schedule timetable agenda sessions day pdf calendar times rooms" },
    { kind: "Page", title: n.trainers, subtitle: "DIU faculty who lead every batch", href: "/trainers", keywords: "trainers teachers faculty instructors lead profile" },
    { kind: "Page", title: n.registration, subtitle: "Enrol any time for the next batch", href: s.workshopUrl || "/register", keywords: "register registration enrol enroll sign up apply seat fee fees deadline batch" },
    { kind: "Page", title: n.about, subtitle: n.aboutText, href: "/about", keywords: "about why what you will learn who should attend audience how it works" },
    { kind: "Page", title: n.tutorials, subtitle: n.tutorialsText, href: "/tutorials", keywords: "labs hands-on practical demos prerequisites laptop software materials" },
    { kind: "Page", title: n.participants, subtitle: "Earlier batches, in their own words", href: "/past-participants", keywords: "past participants alumni testimonials quotes batches certificate" },
    { kind: "Page", title: n.venue, subtitle: n.venueText, href: "/venue", keywords: "venue travel directions campus daffodil smart city savar birulia airport train metro bus road hotel stay entry gate id" },
    { kind: "Page", title: n.partners, subtitle: n.partnersText, href: "/partners", keywords: "partners sponsor sponsorship organisation company train your team" },
    { kind: "Page", title: n.organisers, subtitle: n.organisersText, href: "/organisers", keywords: "organisers team coordinators volunteers faculty students" },
    { kind: "Page", title: n.meetAura, subtitle: "Our mascot", href: "/meet-aura", keywords: "aura mascot robot" },
  ];
  if (s.showGallery) entries.push({ kind: "Page", title: n.gallery, subtitle: n.galleryText, href: "/gallery", keywords: "photos pictures gallery past batches" });
  if (s.showTalks) entries.push({ kind: "Page", title: n.talks, subtitle: n.talksText, href: "/talks", keywords: "slides recordings videos past batches" });

  if (home("invite")) entries.push({ kind: "Section", title: "Enrol for the next batch", subtitle: "New batches start all year round", href: "/#join", keywords: "enrol enroll register next batch dates places continuous" });
  if (home("themes")) entries.push({ kind: "Section", title: n.themes, subtitle: n.themesText, href: "/#themes", keywords: "programmes professionals workspace compare which programme" });
  if (home("news")) entries.push({ kind: "Section", title: "Announcements", href: "/#news", keywords: "news updates announcements new batch" });
  if (home("venue")) entries.push({ kind: "Section", title: n.routeMap, subtitle: n.routeMapText, href: "/#venue", keywords: "map route directions airport railway metro road how to reach" });
  if (home("faq")) {
    entries.push({ kind: "Section", title: n.faq, subtitle: n.faqText, href: "/#faq", keywords: "faq questions help" });
    entries.push({ kind: "Section", title: n.contact, subtitle: n.contactText, href: "/#contact", keywords: "contact email phone message write organisers" });
    for (const f of faqs) {
      const answer = stripMarkdown(f.answer);
      entries.push({ kind: "FAQ", title: f.question, subtitle: clip(answer), href: "/#faq", keywords: answer });
    }
  }

  for (const t of trainers) {
    entries.push({
      kind: "Trainer",
      title: t.name,
      subtitle: [t.designation, t.affiliation].filter(Boolean).join(", "),
      href: `/trainers?trainer=${encodeURIComponent(t.slug)}`,
      keywords: [t.expertise, t.teaching, t.theme ? THEME_META[t.theme]?.label : ""].filter(Boolean).join(" "),
    });
  }
  if (s.programmeStatus !== "tba") {
    for (const x of sessions) {
      if (x.type === "break") continue;
      entries.push({
        kind: "Session",
        title: x.title,
        subtitle: [`Day ${x.day} · ${x.start}`, x.room].filter(Boolean).join(" · "),
        href: `/programme?day=${x.day}#session-${x.id}`,
        keywords: [SESSION_TYPE_META[x.type]?.label, THEME_META[x.theme]?.label].filter(Boolean).join(" "),
      });
    }
  }
  if (isShown(s, "tutorials", "list")) {
    for (const t of tutorials) {
      entries.push({ kind: "Lab", title: t.title, subtitle: t.instructors.map((i) => i.name).join(", "), href: `/tutorials#${t.slug || t.id}`, keywords: [...t.prerequisites, THEME_META[t.theme]?.label ?? ""].join(" ") });
    }
  }
  return entries;
}

import { About } from "@/components/home/About";
import { Announcements } from "@/components/home/Announcements";
import { FaqContact } from "@/components/home/FaqContact";
import { BUILT_IN_HERO_PHOTOS, Hero, heroPhoto } from "@/components/home/Hero";
import { Highlights } from "@/components/home/Highlights";
import { Invite } from "@/components/home/Invite";
import { ParticipantsTeaser } from "@/components/home/ParticipantsTeaser";
import { Partners } from "@/components/home/Partners";
import { TrainersPreview } from "@/components/home/TrainersPreview";
import { themePhoto, Themes } from "@/components/home/Themes";
import { Venue } from "@/components/home/Venue";
import { InOrder } from "@/components/layout/InOrder";
import { LoadingScreen } from "@/components/loading/LoadingScreen";
import { getAnnouncements, getDemos, getFaqs, getParticipants, getPeople, getSettings, getSponsors, getTrainers } from "@/lib/content/queries";
import { copy } from "@/lib/copy";
import { JsonLd, trainingJsonLd } from "@/lib/jsonld";
import { explorePages, pastBatchNav, primaryNav, registrationNav } from "@/lib/nav";

export default async function HomePage() {
  const [s, announcements, trainers, sponsors, faqs, demos, people, participants] = await Promise.all([
    getSettings(),
    getAnnouncements(),
    getTrainers(),
    getSponsors(),
    getFaqs(),
    getDemos(),
    getPeople(),
    getParticipants(),
  ]);
  // What the loading screen loads behind it: the main pages, and the uploaded images they show (the
  // gallery, which can be large, is left to load when visited).
  const routes = [...primaryNav(s.siteNav), registrationNav(s.siteNav), ...explorePages(s.siteNav), ...pastBatchNav(s, s.siteNav)]
    .map((n) => n.href)
    .filter((href) => href.startsWith("/"));
  const files = [
    ...new Set(
      [
        s.logoUniversity,
        s.logoDepartment,
        s.programmeLogo,
        ...(s.showHeroPhoto && !s.heroPhoto ? BUILT_IN_HERO_PHOTOS : [heroPhoto(s)]),
        ...s.themes.map(themePhoto),
        ...trainers.map((x) => x.photo),
        ...people.map((x) => x.photo),
        ...sponsors.map((x) => x.logo),
        ...demos.map((x) => x.image),
        ...participants.filter((x) => x.featured).map((x) => x.photo),
      ].filter((src): src is string => typeof src === "string" && src.startsWith("/")),
    ),
  ];
  return (
    <>
      {s.showLoader ? <LoadingScreen programmeName={s.programmeName} routes={routes} files={files} text={copy(s, "homeLoader")} /> : null}
      <JsonLd data={trainingJsonLd(s)} />
      <Hero s={s} />
      <InOrder
        s={s}
        page="home"
        sections={{
          invite: <Invite s={s} />,
          highlights: <Highlights s={s} />,
          news: <Announcements s={s} items={announcements} />,
          themes: <Themes s={s} />,
          about: <About s={s} />,
          trainers: <TrainersPreview s={s} trainers={trainers} />,
          participants: <ParticipantsTeaser s={s} participants={participants} />,
          venue: <Venue s={s} />,
          partners: <Partners s={s} sponsors={sponsors} />,
          faq: <FaqContact s={s} faqs={faqs} />,
        }}
      />
    </>
  );
}

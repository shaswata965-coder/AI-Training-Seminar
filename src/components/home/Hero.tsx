import { CalendarDays, MapPin } from "lucide-react";
import type { CSSProperties, ReactNode } from "react";
import { NetworkCanvas } from "@/components/effects/NetworkCanvas";
import { Img } from "@/components/ui/Img";
import type { SiteSettings } from "@/lib/content/types";
import { copy } from "@/lib/copy";
import { splitEventName, venueLine } from "@/lib/event";
import { formatDateRange } from "@/lib/format";
import { HeroPlacards, type HeroPlacard } from "./HeroPlacards";
import { RegisterChooser } from "./RegisterChooser";

/**
 * The built-in photos of Daffodil International University's campus at Daffodil Smart City (public/hero, from
 * Wikimedia Commons, 1280×712): the academic building by day in the light theme, the Knowledge Tower by night in
 * the dark one. Each is placed by its "Daffodil International University" sign: `sx` is the sign's centre across
 * the photo and `sy` its top down it (fractions), `avoid` the box the agent network keeps off (left, top, width,
 * height in %) and `fade` where the photo fades in from the left (from, to in %), so it stays clear of the title.
 */
const CAMPUS = [
  { src: "/hero/diu-campus.webp", sx: 0.397, sy: 0.46, fade: [4, 26], avoid: [33, 42, 14, 12], theme: "dark:hidden" },
  { src: "/hero/diu-campus-night.webp", sx: 0.632, sy: 0.247, fade: [14, 42], avoid: [50, 20, 26, 12], theme: "hidden dark:block" },
] as const;
const BUILDING = CAMPUS[0].src;
const ASPECT = 712 / 1280;

/** The built-in campus photos, for the loading screen to cache. */
export const BUILT_IN_HERO_PHOTOS = CAMPUS.map((c) => c.src);

/** The hero's photo: the one uploaded in Site settings → Home → Hero, or the built-in one. */
export const heroPhoto = (s: SiteSettings): string | undefined => (s.showHeroPhoto ? s.heroPhoto || BUILDING : undefined);

/**
 * The built-in campus photo behind Aura, placed so that the university's sign sits just above her head and clear of
 * the text: --w is the photo's width, the sign is centred on her column, its top --y from the column's top. The
 * photo fades in from the left and out below, behind her; while the text is above her (below lg) it starts a little
 * above the sign, and her column leaves room for it. The agent network keeps off the sign.
 */
function BuildingSign() {
  return CAMPUS.map((c) => (
    <div
      key={c.src}
      aria-hidden
      className={`pointer-events-none absolute -z-20 aspect-[1280/712] [--w:860px] [--y:1.75rem] sm:[--w:960px] lg:[--w:1100px] lg:[--y:-1.25rem] ${c.theme}`}
      style={
        {
          width: "var(--w)",
          left: `calc(50% - var(--w) * ${c.sx})`,
          top: `calc(var(--y) - var(--w) * ${(c.sy * ASPECT).toFixed(4)})`,
          "--from": `${Math.max(0, c.sy * 100 - 12)}%`,
          "--to": `${Math.max(4, c.sy * 100 - 7.5)}%`,
          "--fade-from": `${c.fade[0]}%`,
          "--fade-to": `${c.fade[1]}%`,
        } as CSSProperties
      }
    >
      <div className="h-full w-full [mask-image:linear-gradient(to_right,transparent_var(--fade-from),black_var(--fade-to)),linear-gradient(to_bottom,transparent_var(--from),black_var(--to),black_76%,transparent_96%)] [mask-composite:intersect] lg:[mask-image:linear-gradient(to_right,transparent_var(--fade-from),black_var(--fade-to)),linear-gradient(to_bottom,black_76%,transparent_96%)]">
        <Img src={c.src} alt="" width={1280} height={712} loading="eager" className="h-full w-full object-cover opacity-95 dark:opacity-90" />
      </div>
      <span data-graph-avoid="" className="absolute" style={{ left: `${c.avoid[0]}%`, top: `${c.avoid[1]}%`, width: `${c.avoid[2]}%`, height: `${c.avoid[3]}%` }} />
    </div>
  ));
}

/** One fact under the title: a coloured rule, a small label and the value. */
function Fact({ label, icon, tone, children }: { label: string; icon: ReactNode; tone: string; children: ReactNode }) {
  return (
    <div data-graph-avoid="" className={`${tone} border-t-2 border-[color-mix(in_oklab,var(--accent)_60%,var(--accent-ink))] pt-3`}>
      <dt className="flex items-center gap-1.5 text-[11px] font-bold tracking-[0.14em] text-subtle uppercase">
        <span className="text-accent-ink">{icon}</span>
        {label}
      </dt>
      <dd className="mt-1 font-display text-lg font-semibold text-fg">{children}</dd>
    </div>
  );
}

export function Hero({ s }: { s: SiteSettings }) {
  const c = copy(s, "homeHero");
  const p = copy(s, "homePlacard");
  const tones = copy(s, "homeRegister");
  // Aura's two placards, in turn: one per programme, both with the registration status ({status} is filled in as they show).
  const placards: HeroPlacard[] = [
    { key: "professionals" as const, text: p.text, tab: p.professionalsTab, tone: tones.professionalsTone, status: s.workshopStatus, deadline: s.workshopDeadline },
    { key: "workspace" as const, text: p.workspace, tab: p.workspaceTab, tone: tones.workspaceTone, status: s.workshopStatus, deadline: s.workshopDeadline },
  ].filter((x) => x.text.trim());
  // "DIU AI Training Seminars 2026" → highlighted "DIU AI Training", then "Seminars", then a muted "2026".
  const { title, year } = splitEventName(s.eventName);
  const lead = title.split(/\s+/);
  const last = lead.pop();
  const photo = heroPhoto(s);
  return (
    <section data-edit="home.hero" className="fit-reset relative isolate overflow-hidden" aria-labelledby="hero-title">
      {/* Background: pastel mesh, dotted grid and the live agent network, which keeps clear of every [data-graph-avoid] text block. */}
      <div aria-hidden className="absolute inset-0 -z-20 bg-[radial-gradient(70%_60%_at_15%_10%,color-mix(in_oklab,var(--azure)_38%,transparent),transparent_70%),radial-gradient(50%_55%_at_85%_20%,color-mix(in_oklab,var(--lilac)_34%,transparent),transparent_70%),radial-gradient(45%_50%_at_60%_95%,color-mix(in_oklab,var(--mint)_26%,transparent),transparent_70%)] dark:opacity-50" />
      {photo && photo !== BUILDING ? (
        // An uploaded photo at the top right, melting into the background to the left and downwards. While the
        // text spans the whole width (below lg) it stays faint behind it; beside the text it shows in full.
        <div aria-hidden className="pointer-events-none absolute top-0 right-0 -z-20 h-[55%] w-full [mask-image:radial-gradient(90%_80%_at_100%_0%,black_20%,transparent_75%)] sm:h-[60%] lg:h-[80%] lg:w-[64%] lg:[mask-image:radial-gradient(115%_100%_at_100%_0%,black_42%,transparent_80%)]">
          <Img src={photo} alt="" width={1280} height={712} loading="eager" className="h-full w-full object-cover object-[65%_35%] opacity-35 lg:opacity-90 dark:opacity-25 dark:brightness-75 lg:dark:opacity-40" />
        </div>
      ) : null}
      <div aria-hidden className="bg-dots absolute inset-0 -z-20 [mask-image:radial-gradient(80%_70%_at_50%_40%,black,transparent)]" />
      <NetworkCanvas className="absolute inset-0 -z-10" avoid="[data-graph-avoid]" />

      <div className="container-site grid items-center gap-8 pt-8 pb-10 sm:pt-12 lg:grid-cols-[1.12fr_0.88fr] lg:gap-x-6 lg:gap-y-10 lg:pt-14 lg:pb-12">
        {/* hero-copy makes the text as tall as Aura beside it; the space is shared evenly around the text. */}
        <div className="hero-copy flex flex-col justify-evenly gap-8">
          <div>
            {/* Who organises it, above the title (the emblem is in the navigation bar). */}
            <div data-graph-avoid="" className="mb-7">
              <p className="min-w-0 leading-snug">
                {c.organisedBy ? <span className="block text-[11px] font-bold tracking-[0.18em] text-subtle uppercase">{c.organisedBy}</span> : null}
                <span className="mt-1 block font-display text-lg font-bold text-fg sm:text-xl">{c.institute}</span>
                {c.school ? <span className="block text-sm text-muted sm:text-[15px]">{c.school}</span> : null}
              </p>
            </div>
            <h1 id="hero-title" data-graph-avoid="text" className="font-display text-[2.6rem] leading-[1.02] font-extrabold tracking-tight text-fg sm:text-6xl lg:text-[4.4rem]">
              {lead.length ? (
                <>
                  <span className="text-gradient animate-gradient">{lead.join(" ")}</span> {last}
                </>
              ) : (
                <span className="text-gradient animate-gradient">{last}</span>
              )}
              {year ? (
                <>
                  {" "}
                  <span className="text-muted">{year}</span>
                </>
              ) : null}
            </h1>
            <p data-graph-avoid="text" className="mt-5 max-w-xl text-lg text-muted sm:text-xl">
              {s.tagline}
            </p>
          </div>

          <dl className="flex flex-wrap gap-x-10 gap-y-5">
            <Fact label={c.when} icon={<CalendarDays size={14} aria-hidden />} tone="tone-azure">
              <time dateTime={s.startDate}>{formatDateRange(s.startDate, s.endDate)}</time>
            </Fact>
            <Fact label={c.where} icon={<MapPin size={14} aria-hidden />} tone="tone-lilac">
              {venueLine(s)}
            </Fact>
          </dl>
        </div>

        {/* data-launch-land: after the loading screen, Aura flies down into place from where her ship went up (loading.css).
            She holds up the placards from Home → Hero announcements in turn. */}
        <div data-launch-land="" data-edit="home.placard" className={`relative mx-auto flex w-full max-w-[460px] flex-col items-center lg:pt-0 ${photo === BUILDING ? "pt-20" : "pt-6"}`}>
          {photo === BUILDING ? <BuildingSign /> : null}
          <div aria-hidden className="absolute inset-[8%] -z-10 rounded-full bg-[conic-gradient(from_200deg,var(--azure-soft),var(--lilac-soft),var(--blush-soft),var(--mint-soft),var(--azure-soft))] blur-2xl" />
          <div aria-hidden className="absolute inset-[16%] -z-10 rounded-full border border-dashed border-border-strong opacity-60 animate-spin-slow" />
          <HeroPlacards placards={placards} words={{ open: p.open, soon: p.soon, closed: p.closed }} />
        </div>

        <RegisterChooser s={s} className="lg:col-span-2" />
      </div>
    </section>
  );
}

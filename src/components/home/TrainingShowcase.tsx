"use client";

import { ArrowUpRight, ChevronLeft, ChevronRight, CircleCheck, Expand, ImagePlus, Images, Users } from "lucide-react";
import { useEffect, useRef, useState, type PointerEvent } from "react";
import { Tilt } from "@/components/effects/Tilt";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Img } from "@/components/ui/Img";
import { Modal } from "@/components/ui/Modal";
import { cn } from "@/lib/cn";
import type { Tone } from "@/lib/content/constants";
import type { PastTraining } from "@/lib/content/types";
import type { PageCopy } from "@/lib/schema/page-copy";

type Text = PageCopy["homeTrainings"];
/** The training as the browser needs it. */
export type ShowcaseTraining = Pick<PastTraining, "id" | "slug" | "name" | "programme" | "label" | "summary" | "highlights" | "trainerNames" | "link" | "photos" | "emptySpots">;

/** Tiles in the mosaic: one large and five small, every one 16:9 (three columns, three rows). */
const TILES = 6;
/** Where each tile sits in the mosaic: the first spans two columns and two rows. */
const PLACE = ["col-span-2 row-span-2", "", "", "", "", ""];

/** The built-in photos (public/trainings) come with a smaller copy for the grid ("…-sm.webp"); uploads are used as they are. */
const thumbOf = (src: string) => (/^\/trainings\/.+(?<!-sm)\.webp$/.test(src) ? src.replace(/\.webp$/, "-sm.webp") : src);
const initials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

/**
 * One past training under “Past training sessions”: the organisation, the programme, its highlights and trainers
 * beside its photos. On wider screens the photos are a mosaic (the first one large, slowly panning; each lifts and
 * zooms under the pointer and shows its caption; the last tile counts the photos left), on phones a strip to swipe.
 * Any photo opens the lightbox: the photo large, its caption, Previous / Next (also ← → and a swipe) and every photo
 * as a thumbnail. A training without photos shows empty photo spots, shimmering softly, as many as set in the admin.
 */
export function TrainingShowcase({ t, tone, reverse, text }: { t: ShowcaseTraining; tone: Tone; reverse: boolean; text: Text }) {
  const photos = t.photos.filter((p) => p.image);
  const n = photos.length;
  const spots = n ? 0 : Math.min(TILES, Math.max(0, t.emptySpots ?? 0));
  const [open, setOpen] = useState<number | null>(null);
  const titleId = `training-${t.slug || t.id}-title`;
  const step = (d: number) => setOpen((i) => (i === null ? i : (i + d + n) % n));

  return (
    <article aria-labelledby={titleId} className={`tone-${tone} grid items-center gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:gap-14`}>
      <div data-reveal className={cn(reverse && "lg:order-2")}>
        <div className="flex items-center gap-4">
          <span
            aria-hidden
            className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-[linear-gradient(140deg,color-mix(in_oklab,var(--accent)_75%,var(--surface)),color-mix(in_oklab,var(--accent)_25%,var(--surface)))] font-display text-xl font-extrabold text-accent-ink shadow-card ring-1 ring-[color-mix(in_oklab,var(--accent)_55%,transparent)] ring-inset"
          >
            {initials(t.name)}
          </span>
          <div className="min-w-0">
            {t.label ? (
              <Badge tone={tone} size="xs" dot>
                {t.label}
              </Badge>
            ) : null}
            <h3 id={titleId} className="mt-1.5 font-display text-3xl leading-tight font-bold text-fg sm:text-4xl">
              {t.name}
            </h3>
          </div>
        </div>
        {t.programme ? <p className="mt-5 font-display text-lg leading-snug font-semibold text-accent-ink">{t.programme}</p> : null}
        {t.summary ? <p className="mt-2 text-[15.5px] leading-relaxed text-muted">{t.summary}</p> : null}
        {t.highlights.length ? (
          <ul className="mt-5 grid gap-2.5">
            {t.highlights.map((h) => (
              <li key={h} className="flex items-start gap-2.5 text-[15px] text-fg">
                <CircleCheck size={18} aria-hidden className="mt-0.5 shrink-0 text-accent-ink" />
                {h}
              </li>
            ))}
          </ul>
        ) : null}
        {t.trainerNames ? (
          <p className="mt-5 flex items-start gap-2 text-sm text-muted">
            <Users size={16} aria-hidden className="mt-0.5 shrink-0 text-accent-ink" />
            <span>
              {text.trainers ? <span className="font-semibold text-fg">{text.trainers}: </span> : null}
              {t.trainerNames}
            </span>
          </p>
        ) : null}
        {(n && text.photos) || t.link ? (
          <div className="mt-6 flex flex-wrap items-center gap-3">
            {n && text.photos ? (
              <Button onClick={() => setOpen(0)} icon={<Images size={17} aria-hidden />} aria-haspopup="dialog">
                {text.photos} ({n})
              </Button>
            ) : null}
            {t.link && text.link ? (
              <a href={t.link} target="_blank" rel="noopener noreferrer" className="group/link inline-flex items-center gap-1 font-semibold text-accent-ink">
                <span className="mi-underline">{text.link}</span>
                <ArrowUpRight size={16} aria-hidden className="transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
              </a>
            ) : null}
          </div>
        ) : null}
      </div>

      <div className={cn("min-w-0", reverse && "lg:order-1")}>
        {n ? (
          <>
            {/* Phones: a strip to swipe through every photo. */}
            <ul className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:hidden">
              {photos.map((p, i) => (
                <li key={`${p.image}-${i}`} className="w-[84%] shrink-0 snap-center">
                  <PhotoTile photo={p} index={i} total={n} onOpen={setOpen} className="aspect-video w-full" />
                </li>
              ))}
            </ul>
            {/* Wider screens: the mosaic. */}
            <div className="hidden aspect-video grid-cols-3 grid-rows-3 gap-3 sm:grid">
              {photos.slice(0, TILES).map((p, i) => {
                const left = i === TILES - 1 ? n - TILES : 0;
                const tile = <PhotoTile photo={p} index={i} total={n} onOpen={setOpen} big={i === 0} more={left > 0 ? text.more.replace("{count}", String(left)) : ""} className="h-full w-full" />;
                return (
                  <div key={`${p.image}-${i}`} data-reveal className={cn("min-h-0", PLACE[i])}>
                    {i === 0 ? <Tilt className="h-full" max={4}>{tile}</Tilt> : tile}
                  </div>
                );
              })}
            </div>
          </>
        ) : spots ? (
          <div>
            <ul className="grid aspect-video grid-cols-3 grid-rows-3 gap-2 sm:gap-3">
              {Array.from({ length: spots }, (_, i) => (
                <li key={i} data-reveal className={cn("min-h-0", PLACE[i])}>
                  <EmptySpot label={text.emptySpot} big={i === 0} />
                </li>
              ))}
            </ul>
            {text.emptyNote ? <p className="mt-3 text-center text-sm text-subtle">{text.emptyNote}</p> : null}
          </div>
        ) : null}
      </div>

      {n ? (
        <Modal open={open !== null} onClose={() => setOpen(null)} labelledBy={`${titleId}-photos`} size="xl">
          {open !== null ? <Lightbox t={t} photos={photos} index={open} onStep={step} onPick={setOpen} titleId={`${titleId}-photos`} /> : null}
        </Modal>
      ) : null}
    </article>
  );
}

function PhotoTile({
  photo,
  index,
  total,
  onOpen,
  big = false,
  more = "",
  className,
}: {
  photo: PastTraining["photos"][number];
  index: number;
  total: number;
  onOpen: (i: number) => void;
  big?: boolean;
  more?: string;
  className?: string;
}) {
  const what = photo.caption || photo.alt;
  return (
    <button
      type="button"
      onClick={() => onOpen(index)}
      aria-haspopup="dialog"
      aria-label={`Open photo ${index + 1} of ${total}${what ? `: ${what}` : ""}`}
      className={cn(
        "group/tile relative block overflow-hidden rounded-2xl bg-surface-2 shadow-card ring-1 ring-border transition-[translate,box-shadow] duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] hover:-translate-y-1 hover:shadow-card-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ring)]",
        className,
      )}
    >
      <Img
        src={big ? photo.image : thumbOf(photo.image)}
        alt=""
        width={big ? 1600 : 720}
        height={big ? 900 : 405}
        className={cn("h-full w-full object-cover transition-[scale] duration-[900ms] ease-out group-hover/tile:scale-110", big && "training-kenburns")}
      />
      {/* A tint rises from the bottom with the caption under the pointer (always on the big tile). */}
      <span
        aria-hidden
        className={cn(
          "absolute inset-0 bg-[linear-gradient(to_top,rgb(8_22_44/0.78),rgb(8_22_44/0.1)_45%,transparent_70%)] transition-opacity duration-500",
          big ? "opacity-90 group-hover/tile:opacity-100" : "opacity-0 group-hover/tile:opacity-100 group-focus-visible/tile:opacity-100",
        )}
      />
      {photo.caption ? (
        <span
          aria-hidden
          className={cn(
            "absolute inset-x-0 bottom-0 p-3 text-left font-semibold text-white drop-shadow transition-[translate,opacity] duration-500 sm:p-4",
            big ? "text-base sm:text-lg" : "translate-y-3 text-sm opacity-0 group-hover/tile:translate-y-0 group-hover/tile:opacity-100 group-focus-visible/tile:translate-y-0 group-focus-visible/tile:opacity-100",
          )}
        >
          {photo.caption}
        </span>
      ) : null}
      <span aria-hidden className="absolute top-2.5 right-2.5 grid h-8 w-8 scale-75 place-items-center rounded-full bg-surface/85 text-fg opacity-0 shadow-card backdrop-blur transition-[scale,opacity] duration-300 group-hover/tile:scale-100 group-hover/tile:opacity-100">
        <Expand size={15} />
      </span>
      {more ? (
        <span aria-hidden className="absolute inset-0 grid place-items-center bg-[rgb(8_22_44/0.55)] font-display text-xl font-bold text-white backdrop-blur-[2px] transition-colors duration-300 group-hover/tile:bg-[rgb(8_22_44/0.4)] sm:text-2xl">
          {more}
        </span>
      ) : null}
    </button>
  );
}

/** A photo yet to come: a dashed frame with a soft shimmer passing over it. */
function EmptySpot({ label, big }: { label: string; big: boolean }) {
  return (
    <div className="relative grid h-full w-full place-items-center overflow-hidden rounded-2xl border-2 border-dashed border-[color-mix(in_oklab,var(--accent)_55%,var(--border))] bg-accent-soft/50">
      <span aria-hidden className="training-shimmer absolute inset-0" />
      <span className="relative flex flex-col items-center gap-1.5 text-accent-ink">
        <ImagePlus size={big ? 34 : 20} aria-hidden className="transition-transform duration-300" />
        {label ? <span className={cn("font-semibold", big ? "text-sm" : "hidden text-xs sm:block")}>{label}</span> : null}
      </span>
    </div>
  );
}

function Lightbox({
  t,
  photos,
  index,
  onStep,
  onPick,
  titleId,
}: {
  t: ShowcaseTraining;
  photos: PastTraining["photos"];
  index: number;
  onStep: (d: number) => void;
  onPick: (i: number) => void;
  titleId: string;
}) {
  const n = photos.length;
  const p = photos[index];
  const swipe = useRef<{ x: number; id: number } | null>(null);
  const stripRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") onStep(1);
      if (e.key === "ArrowLeft") onStep(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onStep]);

  // Keep the current thumbnail in view.
  useEffect(() => {
    stripRef.current?.querySelector<HTMLElement>('[aria-current="true"]')?.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
  }, [index]);

  const onDown = (e: PointerEvent) => {
    swipe.current = { x: e.clientX, id: e.pointerId };
  };
  const onUp = (e: PointerEvent) => {
    const s = swipe.current;
    swipe.current = null;
    if (!s || s.id !== e.pointerId) return;
    const dx = e.clientX - s.x;
    if (Math.abs(dx) > 40) onStep(dx < 0 ? 1 : -1);
  };

  return (
    <div className="p-3 pt-14 sm:p-5 sm:pt-16">
      <h2 id={titleId} className="absolute top-4 left-5 max-w-[75%] truncate font-display text-lg font-bold text-fg sm:left-6">
        {t.name}
      </h2>
      <div className="relative overflow-hidden rounded-2xl bg-[#08162c] select-none" onPointerDown={onDown} onPointerUp={onUp} onPointerCancel={() => (swipe.current = null)}>
        <Img key={p.image} src={p.image} alt={p.alt || p.caption} width={1600} height={900} loading="eager" className="aspect-video w-full animate-[mi-fade_0.35s_ease] object-contain" draggable={false} />
        <span className="absolute top-3 left-3 rounded-lg bg-[rgb(8_22_44/0.7)] px-2.5 py-1 font-mono text-xs font-bold text-white tabular">
          {index + 1} / {n}
        </span>
        {n > 1 ? (
          <>
            <button type="button" onClick={() => onStep(-1)} aria-label="Previous photo" className="absolute top-1/2 left-2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-surface/85 text-fg shadow-card backdrop-blur transition hover:scale-105 hover:bg-surface sm:left-3">
              <ChevronLeft size={22} aria-hidden />
            </button>
            <button type="button" onClick={() => onStep(1)} aria-label="Next photo" className="absolute top-1/2 right-2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-surface/85 text-fg shadow-card backdrop-blur transition hover:scale-105 hover:bg-surface sm:right-3">
              <ChevronRight size={22} aria-hidden />
            </button>
          </>
        ) : null}
      </div>
      <p className="mt-3 min-h-6 px-1 font-semibold text-fg" aria-live="polite">
        {p.caption}
      </p>
      {n > 1 ? (
        <ul ref={stripRef} aria-label="All photos" className="mt-3 flex gap-2 overflow-x-auto p-1 pb-2 [scrollbar-width:thin]">
          {photos.map((q, i) => (
            <li key={`${q.image}-${i}`} className="shrink-0">
              <button
                type="button"
                onClick={() => onPick(i)}
                aria-current={i === index ? "true" : undefined}
                aria-label={`Photo ${i + 1}${q.caption ? `: ${q.caption}` : ""}`}
                className={cn(
                  "block overflow-hidden rounded-lg ring-2 transition-[opacity,box-shadow,translate] duration-200",
                  i === index ? "opacity-100 ring-[var(--accent-ink)]" : "opacity-60 ring-transparent hover:-translate-y-0.5 hover:opacity-100",
                )}
              >
                <Img src={thumbOf(q.image)} alt="" width={120} height={68} className="h-[54px] w-24 object-cover sm:h-[68px] sm:w-[120px]" draggable={false} />
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

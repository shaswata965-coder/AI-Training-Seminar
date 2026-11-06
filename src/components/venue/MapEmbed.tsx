import { usableEmbedUrl } from "./links";

/** The venue's Google Map: a custom "Embed a map" address when one is set (in Bangladesh), else the pin (or search text) from mapLinks. */
export function MapEmbed({ query, embedUrl, title }: { query: string; embedUrl?: string; title: string }) {
  const src = usableEmbedUrl(embedUrl) ?? `https://www.google.com/maps?q=${encodeURIComponent(query)}&z=16&output=embed`;
  return (
    <iframe
      title={title}
      src={src}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      allowFullScreen
      className="h-full w-full border-0"
    />
  );
}

import { MapPin, Mic2, Users } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { SESSION_TYPE_META, THEME_META } from "@/lib/content/constants";
import type { Session, Trainer } from "@/lib/content/types";

export function SessionBadges({ session }: { session: Session }) {
  const type = SESSION_TYPE_META[session.type] ?? SESSION_TYPE_META.other;
  const theme = session.theme && session.theme !== "general" ? THEME_META[session.theme] : null;
  return (
    <span className="flex flex-wrap gap-1.5">
      <Badge tone={type.tone} size="xs" dot>
        {type.label}
      </Badge>
      {theme ? (
        <Badge tone="neutral" size="xs">
          {theme.short}
        </Badge>
      ) : null}
    </span>
  );
}

export function trainerNames(session: Session, byId: Record<string, Trainer>) {
  const ids = session.type === "panel" ? session.panelists : session.trainers;
  return ids.map((id) => byId[id]).filter(Boolean);
}

export function SessionPeople({ session, byId, linked = true }: { session: Session; byId: Record<string, Trainer>; linked?: boolean }) {
  const people = trainerNames(session, byId);
  const moderator = session.moderator ? byId[session.moderator] : undefined;
  const name = (sp: Trainer) =>
    linked ? (
      <Link key={sp.id} href={`/trainers?trainer=${encodeURIComponent(sp.slug)}`} className="font-semibold text-fg underline decoration-border-strong underline-offset-2 hover:decoration-brand">
        {sp.name}
      </Link>
    ) : (
      <span key={sp.id} className="font-semibold text-fg">
        {sp.name}
      </span>
    );
  if (!people.length && !moderator && !session.trainerNote) return null;
  return (
    <div className="space-y-1 text-sm text-muted">
      {moderator ? (
        <p className="flex items-start gap-1.5">
          <Mic2 size={15} aria-hidden className="mt-0.5 shrink-0 text-subtle" />
          <span>
            Moderator: {name(moderator)}
          </span>
        </p>
      ) : null}
      {people.length ? (
        <p className="flex items-start gap-1.5">
          <Users size={15} aria-hidden className="mt-0.5 shrink-0 text-subtle" />
          <span>
            {session.type === "panel" ? "Panelists: " : null}
            {people.map((sp, i) => (
              <span key={sp.id}>
                {i > 0 ? ", " : null}
                {name(sp)}
                {sp.affiliation ? <span className="text-subtle"> ({sp.affiliation})</span> : null}
              </span>
            ))}
          </span>
        </p>
      ) : session.trainerNote ? (
        <p className="flex items-start gap-1.5">
          <Users size={15} aria-hidden className="mt-0.5 shrink-0 text-subtle" />
          <span>{session.trainerNote}</span>
        </p>
      ) : null}
    </div>
  );
}

export function SessionRoom({ room }: { room: string }) {
  return (
    <span className="inline-flex items-center gap-1 text-sm text-subtle">
      <MapPin size={14} aria-hidden /> {room || "Room e-mailed before your batch"}
    </span>
  );
}

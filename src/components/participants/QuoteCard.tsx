import { Quote } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/cn";
import { THEME_META } from "@/lib/content/constants";
import type { Participant } from "@/lib/content/types";

/** A past participant's words about the training, with who said it, their programme and batch. */
export function QuoteCard({ p, className }: { p: Participant; className?: string }) {
  const programme = THEME_META[p.theme] ?? THEME_META.general;
  const role = [p.designation, p.organisation].filter(Boolean).join(", ");
  return (
    <figure data-glow="" className={cn(`tone-${programme.tone}`, "card relative flex h-full flex-col p-6 sm:p-7", className)}>
      <Quote aria-hidden size={34} className="text-accent opacity-80" />
      <blockquote className="mt-3 flex-1 text-[15px] leading-relaxed text-fg sm:text-base">“{p.quote}”</blockquote>
      <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-5">
        <Avatar name={p.name} src={p.photo} size={48} />
        <span className="min-w-0">
          <span className="block font-display font-semibold text-fg">{p.name}</span>
          {role ? <span className="block text-sm text-muted">{role}</span> : null}
          <span className="mt-1.5 flex flex-wrap gap-1.5">
            <Badge tone={programme.tone} size="xs">
              {p.theme === "general" ? "Both programmes" : programme.short}
            </Badge>
            {p.batch ? (
              <Badge tone="neutral" size="xs">
                {p.batch}
              </Badge>
            ) : null}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}

/** The quotes shown first: those ticked "Feature their quote", in their order. */
export const featuredQuotes = (participants: Participant[]) => participants.filter((p) => p.featured && p.quote.trim());

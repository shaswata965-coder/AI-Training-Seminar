import { Aura } from "@/components/aura/Aura";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import type { SiteSettings } from "@/lib/content/types";
import { copy } from "@/lib/copy";
import { registrationHref } from "@/lib/training";

/** Shown instead of the sample plan while it is hidden (Site settings → Schedule) or has no sessions: every training is planned with you. */
export function ScheduleTba({ s }: { s: SiteSettings }) {
  const c = copy(s, "programmeSchedule");
  return (
    <div className="card relative overflow-hidden p-6 sm:p-10">
      <div aria-hidden className="wash pointer-events-none absolute inset-0" />
      <div className="relative grid items-center gap-8 md:grid-cols-[auto_1fr]">
        <div className="mx-auto">
          <Aura variant="programme" size={210} interactive tips={["Every training is planned around your team.", "Tell us what you need and we'll plan it with you!"]} />
        </div>
        <div>
          {c.tbaBadge ? (
            <Badge tone="butter" dot>
              {c.tbaBadge}
            </Badge>
          ) : null}
          <h3 className="mt-3 font-display text-2xl font-bold text-fg sm:text-3xl">{c.tbaTitle}</h3>
          {s.programmeNote ? <p className="mt-3 max-w-xl text-muted">{s.programmeNote}</p> : null}
          {c.tbaText ? <p className="mt-3 max-w-xl text-muted">{c.tbaText}</p> : null}
          <div className="mt-6 flex flex-wrap gap-3">
            {c.tbaRegister ? (
              <ButtonLink href={registrationHref(s)}>
                {c.tbaRegister}
              </ButtonLink>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

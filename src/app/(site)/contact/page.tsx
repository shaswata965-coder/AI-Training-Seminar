import { ExternalLink, Mail } from "lucide-react";
import type { Metadata } from "next";
import { Aura } from "@/components/aura/Aura";
import { RegistrationForm } from "@/components/forms/RegistrationForm";
import { PageHero } from "@/components/layout/PageHero";
import { LoopArt } from "@/components/portals/PortalArt";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Portal } from "@/components/ui/Portal";
import { TagScope } from "@/components/ui/Tag";
import { cn } from "@/lib/cn";
import { getSettings, inPreview } from "@/lib/content/queries";
import type { SiteSettings } from "@/lib/content/types";
import { copy } from "@/lib/copy";
import { absoluteUrl } from "@/lib/paths";
import { isShown } from "@/lib/schema/section-order";

export async function generateMetadata(): Promise<Metadata> {
  const s = await getSettings();
  return {
    title: "Contact us",
    description: `Contact ${s.programmeName} at Daffodil International University for custom AI training designed around your industry, your office work and your team's tasks.`,
    alternates: { canonical: absoluteUrl("/contact") },
  };
}

export default async function ContactPage() {
  const [s, preview] = await Promise.all([getSettings(), inPreview()]);
  const hero = copy(s, "registerHero");
  const form = copy(s, "registerForm");
  const fees = copy(s, "registerFees");
  const dl = copy(s, "registerDeadlines");
  const showForm = isShown(s, "register", "form");
  const showFees = isShown(s, "register", "fees");
  const showDeadlines = isShown(s, "register", "deadlines");
  const showAside = showFees || showDeadlines;
  const fields = s.registerFields;
  const closedBadge = (
    <Badge tone="blush" dot>
      {hero.closed}
    </Badge>
  );
  const status =
    s.registrationStatus === "open" ? (
      <Badge tone="mint" dot>
        {hero.open}
      </Badge>
    ) : (
      closedBadge
    );

  return (
    <TagScope style="stamp">
      <PageHero
        edit="register.hero"
        home={s.siteNav.home}
        tone={hero.tone}
        crumb={hero.crumb}
        eyebrow={hero.eyebrow}
        title={hero.title}
        aura="registration"
        description={<p>{hero.description}</p>}
      >
        {status}
      </PageHero>

      {showForm || showAside ? (
        <section id="register-form" data-edit={showForm ? "register.form" : undefined} className={`tone-${hero.tone} scroll-mt-24 py-12 sm:py-16`}>
          <div className={cn("container-site grid gap-8", showForm && showAside && "lg:grid-cols-[1.35fr_0.65fr]")}>
            {showForm ? (
              <div>
                {s.registrationUrl ? (
                  <div className="card flex flex-col items-center gap-5 p-8 text-center sm:flex-row sm:text-left">
                    <Aura variant="registration" size={150} />
                    <div>
                      <h2 className="font-display text-2xl font-bold text-fg">{form.externalTitle}</h2>
                      {form.externalText ? <p className="mt-2 text-muted">{form.externalText}</p> : null}
                      <div className="mt-5">
                        <ButtonLink href={s.registrationUrl} size="lg" iconRight={<ExternalLink size={17} aria-hidden />}>
                          {form.externalButton}
                        </ButtonLink>
                      </div>
                    </div>
                  </div>
                ) : preview ? (
                  // The admin's live preview shows the form whatever the status, so its fields can be edited.
                  <RegistrationForm fields={fields} text={copy(s, "registerFormText")} shareUrl={absoluteUrl("/")} programmeName={s.programmeName} />
                ) : s.registrationStatus === "open" ? (
                  <RegistrationForm fields={fields} text={copy(s, "registerFormText")} shareUrl={absoluteUrl("/")} programmeName={s.programmeName} />
                ) : (
                  <PausedCard s={s} />
                )}
              </div>
            ) : null}

            {/* Without the form beside them, the fees and the deadlines sit side by side. */}
            {showAside ? (
              <aside className={cn("grid content-start gap-5", !showForm && showFees && showDeadlines && "lg:grid-cols-2")}>
                {showFees ? (
                  <div data-edit="register.fees" className="card p-6">
                    <h2 className="font-display text-xl font-bold text-fg">{fees.title}</h2>
                    {s.fees.length ? (
                      <table className="mt-4 w-full text-left text-sm">
                        <caption className="sr-only">Training fees</caption>
                        <thead>
                          <tr className="text-xs tracking-[0.12em] text-subtle uppercase">
                            <th scope="col" className="pb-2 font-bold">
                              {fees.category}
                            </th>
                            <th scope="col" className="pb-2 text-right font-bold">
                              {fees.fee}
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {s.fees.map((f, i) => (
                            <tr key={i} className="border-t border-border">
                              <th scope="row" className="py-3 pr-3 font-semibold text-fg">
                                {f.category}
                                {f.note ? <span className="block text-xs font-normal text-subtle">{f.note}</span> : null}
                              </th>
                              <td className="py-3 text-right font-semibold text-accent-ink">{f.amount || fees.tba}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : null}
                    {s.feeNote ? <p className="mt-3 text-sm text-muted">{s.feeNote}</p> : null}
                  </div>
                ) : null}
                {showDeadlines ? (
                  <div data-edit="register.deadlines" className="grid content-start gap-5">
                    <div className="card grid gap-3 p-6">
                      <h2 className="font-display text-xl font-bold text-fg">{dl.title}</h2>
                      {dl.rolling ? <p className="text-sm text-muted">{dl.rolling}</p> : null}
                    </div>
                    {dl.portalTitle && isShown(s, "home", "themes") ? (
                      <div>
                        <h2 className="sr-only">{dl.portalKicker}</h2>
                        <Portal href="/#themes" tone="lilac" compact kicker={dl.portalKicker} title={dl.portalTitle} text={dl.portalText} art={<LoopArt />} />
                      </div>
                    ) : null}
                  </div>
                ) : null}
              </aside>
            ) : null}
          </div>
        </section>
      ) : null}
    </TagScope>
  );
}

/** Shown instead of the form while training requests are paused. */
function PausedCard({ s }: { s: SiteSettings }) {
  const c = copy(s, "registerForm");
  return (
    <div className="card flex flex-col items-center gap-5 p-8 text-center sm:flex-row sm:text-left">
      <Aura variant="sleep" size={160} interactive />
      <div>
        <h2 className="font-display text-2xl font-bold text-fg">{c.closedTitle}</h2>
        {c.closedText ? <p className="mt-2 max-w-lg text-muted">{c.closedText}</p> : null}
        <div className="mt-5 flex flex-wrap gap-3">
          {c.announcements && isShown(s, "home", "news") ? (
            <ButtonLink href="/#news" variant="soft">
              {c.announcements}
            </ButtonLink>
          ) : null}
          {c.contact && isShown(s, "home", "faq") ? (
            <ButtonLink href="/#contact" variant="outline" icon={<Mail size={17} aria-hidden />}>
              {c.contact}
            </ButtonLink>
          ) : null}
        </div>
      </div>
    </div>
  );
}

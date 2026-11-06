import { AccountProvider } from "@/components/account/Account";
import { AuraAssistant } from "@/components/aura/AuraAssistant";
import { BackToTop } from "@/components/effects/BackToTop";
import { AuraBadgeByPage } from "@/components/layout/AuraBadgeByPage";
import { PreviewBridge } from "@/components/layout/PreviewBridge";
import { SiteBanner } from "@/components/layout/SiteBanner";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { VercelAnalytics } from "@/components/layout/VercelAnalytics";
import { ServiceWorker } from "@/components/loading/ServiceWorker";
import { ToastProvider } from "@/components/ui/Toast";
import { getSettings } from "@/lib/content/queries";
import { buildAssistantIndex } from "@/lib/content/search";
import { copy } from "@/lib/copy";
import { registrationHref, venueLine } from "@/lib/training";
import { formatDateRange } from "@/lib/format";
import { pastBatchNav } from "@/lib/nav";
import { isShown } from "@/lib/schema/section-order";

export default async function SiteLayout({ children }: LayoutProps<"/">) {
  const s = await getSettings();
  const index = s.showAssistant ? await buildAssistantIndex(s) : [];
  return (
    <ToastProvider>
      <AccountProvider text={copy(s, "siteAccount")}>
        <AuraBadgeByPage>
          <a
            href="#main"
            className="sr-only z-[70] rounded-lg bg-brand px-4 py-2 font-semibold text-brand-fg focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
          >
            Skip to content
          </a>
          {s.bannerText ? <SiteBanner text={s.bannerText} link={s.bannerLink} tone={s.siteBanner.tone} /> : null}
          <SiteHeader logos={{ university: s.logoUniversity, department: s.logoDepartment }} registerHref={registrationHref(s)} extraNav={pastBatchNav(s, s.siteNav)} nav={s.siteNav} text={s.siteHeader} homeHidden={s.homeHidden} />
          <main id="main" tabIndex={-1} className="fit-screen outline-none">
            {children}
          </main>
          <SiteFooter s={s} />
          {s.showAssistant ? (
            <AuraAssistant
              entries={index}
              facts={{
                programmeName: s.programmeName,
                dates: formatDateRange(s.startDate, s.endDate),
                venue: venueLine(s),
                registerHref: registrationHref(s),
                programmesHref: isShown(s, "home", "themes") ? "/#themes" : "",
              }}
            />
          ) : null}
          <BackToTop raised={s.showAssistant} />
          <PreviewBridge />
          <ServiceWorker />
          {/* Vercel sets VERCEL=1 when it builds and runs the site; elsewhere there is nothing to report to. */}
          {process.env.VERCEL ? <VercelAnalytics /> : null}
        </AuraBadgeByPage>
      </AccountProvider>
    </ToastProvider>
  );
}

import type { SiteSettings } from "./content/types";
import { absoluteUrl } from "./paths";

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}

const DIU = { "@type": "CollegeOrUniversity", name: "Daffodil International University", url: "https://daffodilvarsity.edu.bd" };

/**
 * The training provider for search engines: an organisation of DIU offering custom AI training (no course with
 * fixed dates: each training is designed with the organisation that asks for it).
 */
export function trainingJsonLd(s: SiteSettings) {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: s.programmeName,
    description: s.description || s.tagline,
    url: absoluteUrl("/"),
    image: [absoluteUrl("/opengraph-image")],
    parentOrganization: { ...DIU, department: { "@type": "Organization", name: s.organisedBy || "Department of Computer Science and Engineering, Daffodil International University" } },
    address: s.venueAddress || s.venueName,
    knowsAbout: ["Custom AI training", "AI for professional work", "AI for office work", "Efficiency gains with AI"],
    ...(s.contactEmail ? { email: s.contactEmail } : {}),
  };
}

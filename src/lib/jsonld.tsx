import type { SiteSettings } from "./content/types";
import { absoluteUrl } from "./paths";

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}

const DIU = { "@type": "CollegeOrUniversity", name: "Daffodil International University", url: "https://daffodilvarsity.edu.bd" };

/**
 * The training for search engines: a course that runs continuously, in batches, with the next batch (the dates in
 * Site settings → Programme details) as its scheduled instance.
 */
export function trainingJsonLd(s: SiteSettings) {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: s.programmeName,
    description: s.description || s.tagline,
    url: absoluteUrl("/"),
    image: [absoluteUrl("/opengraph-image")],
    provider: { ...DIU, department: { "@type": "Organization", name: s.organisedBy || "Department of Computer Science and Engineering, Daffodil International University" } },
    hasCourseInstance: [
      {
        "@type": "CourseInstance",
        name: `${s.programmeName}: next batch`,
        courseMode: "Onsite",
        startDate: s.startDate,
        endDate: s.endDate,
        location: { "@type": "Place", name: s.venueName, address: s.venueAddress || s.venueName },
      },
    ],
  };
}

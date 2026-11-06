import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { AuraArt } from "@/components/aura/AuraArt";
import { AURA_EYE_CHOICES, auraLookSettings } from "@/components/aura/builds";
import { auraLook } from "@/components/aura/presets";
import { getSettings } from "@/lib/content/queries";
import { formatDateRange } from "@/lib/format";
import { svgDataUri, toSvgString } from "@/lib/svg-string";

// A static string, so it describes the card rather than naming the programme (the name is edited in the admin).
export const alt = "The training programme's title, dates and tagline beside Aura, the robot guide, with the Daffodil International University and Department of CSE names";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Outfit (SIL Open Font License), bundled so images render without network access.
const fonts = Promise.all([
  readFile(join(process.cwd(), "assets/fonts/outfit-latin-500-normal.woff")),
  readFile(join(process.cwd(), "assets/fonts/outfit-latin-800-normal.woff")),
]);
// The DIU shield and the Department of CSE seal, inlined: the image is drawn from data URIs, where the site's own addresses don't load.
const png = (file: string) => readFile(join(process.cwd(), "public/logos", file)).then((b) => `data:image/png;base64,${b.toString("base64")}`);
const emblem = png("diu-shield.png");
const seal = png("diu-cse.png");

export default async function OpenGraphImage() {
  const [s, [regular, heavy], badge, cse] = await Promise.all([getSettings(), fonts, emblem, seal]);
  const look = auraLook("hero");
  // Drawn in the look chosen in Site settings → Site-wide → Aura (the image has no stylesheet to switch it).
  const { build, color, eyes } = auraLookSettings(s);
  const eyeColor = AURA_EYE_CHOICES[eyes].colour ?? look.eyeColor;
  const aura = svgDataUri(toSvgString(<AuraArt uid="og" palette="light" {...look} eyeColor={eyeColor} build={build} colors={color} badge={badge} width={400} height={462} />));
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          padding: "56px 64px",
          background: "linear-gradient(135deg, #eaf5ff 0%, #f2eeff 55%, #ffeef3 100%)",
          fontFamily: "Outfit",
          color: "#0f172a",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: 700 }}>
          <div style={{ display: "flex", gap: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "8px 18px 8px 10px", borderRadius: 8, background: "rgba(255,255,255,0.85)", fontSize: 24, fontWeight: 700 }}>
              <img src={badge} alt="" width={40} height={40} />
              Daffodil International University
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 18px 8px 10px", borderRadius: 8, background: "rgba(255,255,255,0.85)", fontSize: 24, fontWeight: 700 }}>
              <img src={cse} alt="" width={40} height={40} />
              Dept. of CSE
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", fontSize: 30, fontWeight: 700, color: "#5b3cc4", letterSpacing: 2 }}>
              {`Next batch · ${formatDateRange(s.startDate, s.endDate)}`.toUpperCase()}
            </div>
            <div style={{ display: "flex", fontSize: 86, fontWeight: 800, lineHeight: 1.02, marginTop: 14 }}>{s.eventName}</div>
            <div style={{ display: "flex", fontSize: 30, color: "#475569", marginTop: 22, lineHeight: 1.3 }}>{s.tagline}</div>
          </div>
          <div style={{ display: "flex", gap: 14, fontSize: 24, color: "#334155" }}>
            {["AI for Professionals", "AI for Workspace", "Hands-on labs"].map((t) => (
              <div key={t} style={{ display: "flex", flexShrink: 0, padding: "8px 16px 8px 14px", borderRadius: "0 8px 8px 0", borderLeft: "4px solid #8b6cf0", background: "rgba(255,255,255,0.7)" }}>
                {t}
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", flex: 1, alignItems: "center", justifyContent: "center" }}>
          <img src={aura} alt="" width={400} height={462} />
        </div>
        <div style={{ position: "absolute", left: 64, bottom: 18, display: "flex", fontSize: 18, color: "#64748b" }}>{formatDateRange(s.startDate, s.endDate)} · {s.venueName}</div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Outfit", data: regular, weight: 500, style: "normal" },
        { name: "Outfit", data: heavy, weight: 800, style: "normal" },
      ],
    },
  );
}

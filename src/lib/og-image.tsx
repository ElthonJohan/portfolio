import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { profile } from "@/data/site";

/**
 * Imagen que se muestra al compartir el sitio (WhatsApp, LinkedIn, X…).
 * Se genera en el build a partir de `src/data/site.ts`, así nunca queda desactualizada.
 */
export const ogAlt = `${profile.brand} — ${profile.brandType}. ${profile.headline}`;
export const ogSize = { width: 1200, height: 630 };

const fontsDir = join(process.cwd(), "src/assets/fonts");
const fonts = Promise.all([
  readFile(join(fontsDir, "Geist-Medium.woff")),
  readFile(join(fontsDir, "GeistMono-Medium.woff")),
  readFile(join(fontsDir, "InstrumentSerif-Italic.woff")),
]);

const accent = "#c8ff3d";
const accentWords = new Set<string>(profile.headlineAccent);
const domain = new URL(profile.siteUrl).hostname.replace(/^www\./, "");

export async function renderOgImage() {
  const [geist, geistMono, serif] = await fonts;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          color: "#ededea",
          fontFamily: "Geist",
          backgroundColor: "#08080a",
          backgroundImage:
            "radial-gradient(circle at 92% 0%, rgba(200,255,61,0.2), transparent 45%), radial-gradient(circle at 0% 100%, rgba(91,61,255,0.22), transparent 40%)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 56,
                height: 56,
                borderRadius: 999,
                background: accent,
                color: "#0b0d02",
                fontSize: 24,
              }}
            >
              {profile.brand.slice(0, 2)}
            </div>
            <div style={{ fontSize: 30 }}>{profile.brand}</div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "12px 22px",
              borderRadius: 999,
              border: "1px solid rgba(255,255,255,0.12)",
              background: "rgba(255,255,255,0.04)",
              fontSize: 20,
              color: "rgba(237,237,234,0.85)",
            }}
          >
            <div style={{ width: 12, height: 12, borderRadius: 999, background: accent }} />
            Disponible para nuevos proyectos
          </div>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", fontSize: 92, lineHeight: 1.05, letterSpacing: "-0.04em" }}>
          {profile.headline.split(" ").map((w, i) =>
            accentWords.has(w) ? (
              <span key={i} style={{ fontFamily: "Instrument Serif", color: accent, letterSpacing: "-0.01em", marginRight: 20 }}>
                {w}
              </span>
            ) : (
              <span key={i} style={{ marginRight: 20 }}>
                {w}
              </span>
            ),
          )}
        </div>

        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", fontFamily: "Geist Mono" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, fontSize: 19, letterSpacing: "0.06em" }}>
            <div style={{ color: accent }}>{profile.brandType.toUpperCase()}</div>
            <div style={{ color: "#8a8a90" }}>
              {`FUNDADO POR ${profile.name.toUpperCase()} · ${profile.location.toUpperCase()}`}
            </div>
          </div>
          <div style={{ fontSize: 22, color: "#8a8a90" }}>{domain}</div>
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Geist", data: geist, weight: 500, style: "normal" },
        { name: "Geist Mono", data: geistMono, weight: 500, style: "normal" },
        { name: "Instrument Serif", data: serif, weight: 400, style: "italic" },
      ],
    },
  );
}

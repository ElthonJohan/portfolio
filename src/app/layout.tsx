import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { Preloader } from "@/components/layout/preloader";
import { Providers } from "@/components/providers";
import { Cursor } from "@/components/ui/cursor";
import { profile } from "@/data/site";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL(profile.siteUrl),
  title: {
    default: `${profile.brand} — ${profile.role}`,
    template: `%s — ${profile.brand}`,
  },
  description: profile.tagline,
  keywords: [
    "desarrollador web",
    "ingeniero de sistemas",
    "software a medida",
    "desarrollo de aplicaciones",
    "sistemas empresariales",
    "freelance",
  ],
  authors: [{ name: profile.name }],
  openGraph: {
    type: "website",
    locale: "es",
    siteName: profile.brand,
    title: `${profile.brand} — ${profile.role}`,
    description: profile.tagline,
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#08080a",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} antialiased`}>
      <body className="min-h-svh overflow-x-clip">
        <Providers>
          <Preloader />
          <Navbar />
          {children}
          <Footer />
          <Cursor />
        </Providers>
        <div aria-hidden className="grain" />
      </body>
    </html>
  );
}

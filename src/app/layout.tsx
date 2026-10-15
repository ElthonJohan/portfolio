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

const defaultTitle = `${profile.name} — ${profile.role} | ${profile.brand}`;
const description = `${profile.tagline} ${profile.role} en ${profile.location}.`;

export const metadata: Metadata = {
  metadataBase: new URL(profile.siteUrl),
  title: {
    default: defaultTitle,
    template: `%s | ${profile.brand}`,
  },
  description,
  keywords: [
    profile.name,
    profile.brand,
    "desarrollador de software",
    "desarrollador web",
    "ingeniero de sistemas",
    "software a medida",
    "sistemas empresariales",
    "desarrollo de aplicaciones",
    "freelance",
    "Cajamarca",
    "Perú",
  ],
  authors: [{ name: profile.name, url: profile.siteUrl }],
  creator: profile.name,
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  openGraph: {
    type: "website",
    locale: "es_PE",
    url: "/",
    siteName: profile.brand,
    title: defaultTitle,
    description,
  },
  twitter: { card: "summary_large_image", title: defaultTitle, description },
};

export const viewport: Viewport = {
  themeColor: "#08080a",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* Antes del primer pintado: si el preloader ya se vio en esta sesión, se oculta sin parpadeo */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(sessionStorage.getItem("intro-seen")==="1")document.documentElement.dataset.intro="seen"}catch(e){}`,
          }}
        />
      </head>
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

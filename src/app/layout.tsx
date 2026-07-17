import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";

const SITE_URL = "https://moveapt.com";
const SITE_NAME = "moveAPT";
const DESCRIPTION =
  "AI-powered furniture fitting tool. Take photos of your furniture, tell us your new apartment, and moveAPT predicts whether everything fits before moving day.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "moveAPT — Will your furniture fit?",
    template: "%s | moveAPT",
  },
  description: DESCRIPTION,
  keywords: [
    "furniture fitting app",
    "will my couch fit",
    "AI furniture measurement",
    "apartment moving tool",
    "furniture size checker",
    "moving app",
    "couch fit doorway",
    "furniture dimensions AI",
    "move smarter",
    "apartment floor plan",
  ],
  authors: [{ name: "moveAPT", url: SITE_URL }],
  creator: "moveAPT",
  publisher: "moveAPT",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "moveAPT — Will your furniture fit?",
    description: DESCRIPTION,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "moveAPT — AI furniture fitting tool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@moveapt",
    creator: "@moveapt",
    title: "moveAPT — Will your furniture fit?",
    description: DESCRIPTION,
    images: ["/og-image.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icons/icon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/icons/icon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/manifest.webmanifest",
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#030712" },
    { media: "(prefers-color-scheme: light)", color: "#030712" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: DESCRIPTION,
      potentialAction: {
        "@type": "SearchAction",
        target: { "@type": "EntryPoint", urlTemplate: `${SITE_URL}/?q={search_term_string}` },
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/icons/icon-192.png`,
        width: 192,
        height: 192,
      },
      sameAs: ["https://twitter.com/moveapt", "https://github.com/moveapt"],
      description: "moveAPT builds AI-powered tools that help renters move smarter.",
      foundingDate: "2024",
      areaServed: "Worldwide",
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${SITE_URL}/#app`,
      name: SITE_NAME,
      url: SITE_URL,
      description: DESCRIPTION,
      applicationCategory: "LifestyleApplication",
      operatingSystem: "iOS, Android, Web",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
        availability: "https://schema.org/PreOrder",
      },
      featureList: [
        "AI furniture measurement from photos",
        "Doorway and hallway clearance prediction",
        "Room layout planning",
        "Move score calculation",
        "Apartment floor plan import",
        "Moving checklist generation",
        "Furniture inventory management",
        "Packing suggestions",
      ],
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${SITE_URL}/#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: SITE_URL,
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}/#faq`,
      mainEntity: [
        {
          "@type": "Question",
          name: "Can AI accurately measure furniture from photos?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. moveAPT uses computer vision and depth estimation to calculate furniture dimensions from standard smartphone photos. Our models are trained on millions of furniture images and achieve accuracy within 2–4 inches for most items — sufficient to reliably predict whether a piece will fit through a doorway or into a room.",
          },
        },
        {
          "@type": "Question",
          name: "How accurate is moveAPT?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "In beta testing, moveAPT correctly predicted furniture fit outcomes with over 94% accuracy for standard doorway clearances and 91% for room layout scenarios. We always display a confidence score alongside each prediction so you know exactly how certain the AI is.",
          },
        },
        {
          "@type": "Question",
          name: "Will my couch fit through the doorway?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "That's exactly what moveAPT is built to answer. Take a few photos of your couch, enter your doorway dimensions or let our AI read them from a photo, and we'll calculate clearance in seconds — including whether you can angle or tilt it through.",
          },
        },
        {
          "@type": "Question",
          name: "Can I import a Zillow or StreetEasy listing?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Paste a Zillow, StreetEasy, Realtor.com, or Apartments.com URL and moveAPT automatically extracts floor plan dimensions and room measurements when they're publicly available.",
          },
        },
        {
          "@type": "Question",
          name: "Can ChatGPT or other AI tell me if my furniture will fit?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "General AI assistants like ChatGPT can do rough math if you give them exact measurements, but they can't measure furniture from photos or model real-world 3D spatial constraints like doorway angles. moveAPT is purpose-built for this problem with specialized computer vision models.",
          },
        },
        {
          "@type": "Question",
          name: "Do I need to measure my furniture manually?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. Just take a few photos of each piece from different angles and moveAPT's AI estimates dimensions automatically. You can review and adjust any measurement before running the fit check.",
          },
        },
      ],
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,300..800;1,14..32,300..800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        {children}
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js"
          strategy="lazyOnload"
        />
        {/* Cloudflare Web Analytics */}
        <Script
          defer
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon='{"token": "YOUR_CF_ANALYTICS_TOKEN"}'
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}

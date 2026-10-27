import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Chakra_Petch, JetBrains_Mono } from "next/font/google";
import GoogleAnalytics from "@/components/analytics/google-analytics";
import { siteConfig } from "@/lib/site-config";
import "./globals.css";

const chakraPetch = Chakra_Petch({
  variable: "--font-chakra-petch",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Indubot Afrika | Le logiciel qui vit dans la machine",
    template: "%s",
  },
  description: siteConfig.description,
  openGraph: {
    title: "Indubot Afrika | Le logiciel qui vit dans la machine",
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Indubot Afrika | Le logiciel qui vit dans la machine",
    description: siteConfig.description,
  },
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: siteConfig.name,
  description: siteConfig.description,
  url: siteConfig.url,
  email: siteConfig.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: siteConfig.address.street,
    addressLocality: siteConfig.address.locality,
    addressRegion: siteConfig.address.region,
    addressCountry: siteConfig.address.country,
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="fr"
      className={`${chakraPetch.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
          type="application/ld+json"
        />
      </head>
      <body className="min-h-full flex flex-col bg-navy font-sans text-text">
        {children}
        <GoogleAnalytics />
      </body>
    </html>
  );
}

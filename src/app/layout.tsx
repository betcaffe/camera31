import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { getSiteData } from "@/lib/data-loader";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileNav from "@/components/MobileNav";
import WhatsAppButton from "@/components/WhatsAppButton";

const inter = Inter({ subsets: ["latin"] });

export async function generateMetadata(): Promise<Metadata> {
  const data = getSiteData();
  return {
    title: {
      default: data.settings.siteName,
      template: `%s | ${data.settings.siteName}`,
    },
    description: data.homepage.hero.subtitle,
    keywords: ["appartamento vacanze", "affitto breve", "soggiorno", data.settings.siteName, "ospitalità"],
    authors: [{ name: data.settings.siteName }],
    creator: data.settings.siteName,
    openGraph: {
      type: "website",
      locale: "it_IT",
      url: "https://camera31.netlify.app/", // Sostituire con dominio reale se diverso
      siteName: data.settings.siteName,
      title: data.settings.siteName,
      description: data.homepage.hero.subtitle,
      images: [
        {
          url: "/background.jpg",
          width: 1200,
          height: 630,
          alt: data.settings.siteName,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: data.settings.siteName,
      description: data.homepage.hero.subtitle,
      images: ["/background.jpg"],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const data = getSiteData();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    "name": data.settings.siteName,
    "description": data.homepage.hero.subtitle,
    "url": "https://camera31.netlify.app/",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": data.contact.address,
      "addressLocality": "Torino", // Modifica se necessario
      "addressCountry": "IT"
    },
    "telephone": data.contact.phone,
    "image": "https://camera31.netlify.app/background.jpg"
  };

  return (
    <html lang="it">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={inter.className}>
        <style dangerouslySetInnerHTML={{ __html: `
          :root {
            --primary: ${data.settings.primaryColor};
            --secondary: ${data.settings.secondaryColor};
            --accent: ${data.settings.accentColor};
          }
        `}} />
        <Navbar />
        <main className="min-h-screen pb-20 md:pb-0">
          {children}
        </main>
        <Footer />
        <MobileNav />
        <WhatsAppButton />
      </body>
    </html>
  );
}

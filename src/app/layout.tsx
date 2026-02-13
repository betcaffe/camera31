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
    title: data.settings.siteName,
    description: data.homepage.hero.subtitle,
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const data = getSiteData();

  return (
    <html lang="it">
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

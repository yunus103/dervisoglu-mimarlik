import type { Metadata } from "next";
import { Archivo, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { buildMetadata, getLayoutData } from "@/lib/seo";

import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import { JsonLd, organizationJsonLd, websiteJsonLd } from "@/components/seo/JsonLd";
import NextTopLoader from "nextjs-toploader";

// Tek süper-aile: başlıklarda genişletilmiş (wdth), gövdede normal kesim kullanılır.
// latin-ext, Türkçe karakterlerin (ş ğ ı İ ç ö ü) doğru render edilmesi için zorunlu.
const archivo = Archivo({
  subsets: ["latin", "latin-ext"],
  variable: "--font-archivo",
  display: "swap",
  axes: ["wdth"],
});

// Sadece gerçek veri taşıyan yerlerde: ay, süre, m², ada/parsel.
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin", "latin-ext"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata();
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { settings } = await getLayoutData();

  return (
    <html lang="tr" suppressHydrationWarning className={`${archivo.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans antialiased">
        <noscript>
          <style>{`[data-fade-in]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        {/* Sayfa geçişlerinde üstte ince ilerleme çubuğu — marka rengi kullanır */}
        <NextTopLoader
          color="var(--primary)"
          height={3}
          showSpinner={false}
          shadow={false}
          speed={200}
          crawlSpeed={200}
        />
        {settings?.gtmId && <GoogleTagManager gtmId={settings.gtmId} />}
        {settings?.gaId && <GoogleAnalytics gaId={settings.gaId} />}
        <JsonLd data={organizationJsonLd(settings)} />
        <JsonLd data={websiteJsonLd(settings)} />
        {children}
      </body>
    </html>
  );
}

import { getLayoutData } from "@/lib/seo";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const data = await getLayoutData();

  return (
    <>
      <Header settings={data?.settings} navigation={data?.navigation} />
      {/* Header sabit (fixed) konumda ve 5rem yüksekliğinde; içerik onun altından başlar.
          Ana sayfa hero'su bu boşluğu negatif margin ile geri alıp header'ın altına uzanır. */}
      <main className="pt-20">{children}</main>
      <Footer settings={data?.settings} navigation={data?.navigation} />
      {data?.settings?.contactInfo?.whatsappNumber && (
        <WhatsAppButton number={data.settings.contactInfo.whatsappNumber} />
      )}
    </>
  );
}

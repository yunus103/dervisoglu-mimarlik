import { getLayoutData } from "@/lib/seo";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SplashScreen } from "@/components/layout/SplashScreen";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";

/**
 * Sayfa boyanmadan önce çalışır: perdenin gösterilip gösterilmeyeceğine karar
 * verir. Oturumda daha önce gösterildiyse veya kullanıcı hareket azaltma
 * tercih ettiyse öznitelik hiç eklenmez, perde bir an bile görünmez.
 */
const splashInitScript = `try{if(!sessionStorage.getItem('dm-splash')){var e=document.documentElement;e.setAttribute('data-splash','active');setTimeout(function(){e.removeAttribute('data-splash')},3000)}}catch(e){}`;

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const data = await getLayoutData();

  return (
    <>
      {/* Sayfanın geri kalanı ayrıştırılmadan çalışması için en üstte durur */}
      <script dangerouslySetInnerHTML={{ __html: splashInitScript }} />
      <SplashScreen
        siteName={data?.settings?.siteName}
        siteTagline={data?.settings?.siteTagline}
      />

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

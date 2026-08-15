import { AboutFact } from "@/types";

/**
 * Ana sayfa yedek (fallback) içeriği.
 *
 * Buradaki metinlerin tamamı `homePage` şemasındaki `initialValue` değerleriyle
 * BİREBİR aynıdır. Sanity'deki Ana Sayfa dokümanında ilgili alan boşsa sayfa
 * bu değerleri gösterir; alan doldurulduğu anda Sanity'deki içerik geçerli olur.
 *
 * Şemayı güncellerken burayı da güncelleyin — iki taraf aynı kalmalıdır.
 */

export const homeFallback = {
  heroTitle: "Mimarlık Ofisiyiz",
  heroSubtitle: "Mimari proje, iç mimarlık ve uygulama süreçlerini bir arada yürütüyoruz.",
  heroCtaLabel: "Ön fizibilite talep edin",
  heroSecondaryCtaLabel: "Hizmetlerimizi İnceleyin",
  heroSecondaryCtaLink: {
    linkType: "manual" as const,
    manual: "/hizmetler",
  },

  aboutTitle: "Hakkımızda",
  aboutSubtitle: "2004'ten bu yana mimarlık ve iç mimarlık hizmeti veriyoruz.",
  aboutCtaLabel: "Hakkımızda",
  aboutCtaLink: "/hakkimizda",

  servicesTitle: "Hizmetlerimiz",
  servicesSubtitle:
    "Mimari projelendirmeden anahtar teslim uygulamaya kadar iki ana başlıkta hizmet verilmektedir.",
  servicesCtaLabel: "Tüm Hizmetleri İncele",
  servicesCtaLink: "/hizmetler",

  processTeaserTitle: "Çalışma Sürecimiz",
  processTeaserText:
    "Tasarımdan uygulamaya kadar süreci nasıl yönettiğimizi ve sık sorulan soruları inceleyebilirsiniz.",
  processCtaLabel: "Çalışma Sürecimizi İnceleyin",
  faqCtaLabel: "Sıkça Sorulan Sorular",

  ctaTitle: "Arsanız İçin Ön Fizibilite Çalışması",
  ctaText:
    "Adres veya ada/parsel bilgisini iletmeniz halinde arsanızın imar durumu çıkarılarak oluşabilecek bağımsız bölüm sayısı hesaplanır. Bu çalışma ücretsizdir.",
  ctaButtonLabel: "Ön fizibilite talep edin",
  ctaScopeTitle: "Çalışma kapsamı",
};

export const homeFallbackAboutFacts: AboutFact[] = [
  { value: "2004", label: "Mimarlık ve iç mimarlık tecrübesi" },
  { value: "50+", label: "Tamamlanmış proje" },
];

export const homeFallbackCtaScopeItems: string[] = [
  "Arsanın güncel imar durumu",
  "Yaklaşık inşaat alanı ve bağımsız bölüm sayısı",
  "Kaba maliyet aralığı ve süreç planı",
];

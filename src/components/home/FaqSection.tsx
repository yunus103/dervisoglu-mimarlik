import { FadeIn } from "@/components/ui/FadeIn";
import { FAQ } from "@/components/ui/FAQ";

interface FaqSectionProps {
  title?: string;
  subtitle?: string;
}

/**
 * Aşamaya bağlı sorular süreç bölümünde, ilgili aşamanın yanında cevaplanır.
 * Burada yalnızca belirli bir aşamaya ait olmayan genel sorular yer alır.
 */
const generalFaqs = [
  {
    question: "Mevcut yapılar için tadilat, güçlendirme ve iç mimari yenileme hizmeti veriyor musunuz?",
    answer:
      "Evet. Mevcut yapıların rölöve ve statik durum analizlerini yaparak iç mimari konsept tasarımı, tadilat uygulamaları ve şantiye yönetimi hizmeti sunmaktayız.",
  },
  {
    question: "Hangi bölgelerde hizmet veriyorsunuz?",
    answer:
      "Mimari ve tasarım hizmetlerinde merkezimiz Arnavutköy olmak üzere tüm Marmara Bölgesi'nde; inşaat ve uygulama işlerinde ise Marmara Bölgesi genelinde çalışmaktayız.",
  },
  {
    question: "Kat karşılığı anlaşmalarda oran nasıl belirleniyor?",
    answer:
      "Oran; arsanın imar durumuna, konumuna, oluşacak bağımsız bölüm sayısına ve inşaat maliyetine göre hesaplanır. İlk görüşmede yapılan ön fizibilite çalışmasının ardından somut bir oran değerlendirilebilir hale gelir.",
  },
  {
    question: "Deprem yönetmeliğine uygunluk nasıl güvence altına alınıyor?",
    answer:
      "Statik projeler güncel Türkiye Bina Deprem Yönetmeliği'ne göre hazırlanır, bağımsız yapı denetim kuruluşu tarafından onaylanır ve imalat aşamasında kendi saha ekibimiz tarafından ayrıca denetlenir.",
  },
];

export function FaqSection({
  title = "Sıkça Sorulan Sorular",
  subtitle = "Mimari proje, imar ve ruhsat süreçleri ile inşaat uygulamalarımız hakkında merak edilenler.",
}: FaqSectionProps) {
  return (
    <section className="border-t border-border bg-background py-20 md:py-28">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-8 lg:px-12">
        <FadeIn direction="up">
          <h2 className="display text-3xl font-extrabold leading-[1.05] text-primary sm:text-4xl lg:text-5xl">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
              {subtitle}
            </p>
          )}
        </FadeIn>

        <FadeIn delay={0.1}>
          <FAQ items={generalFaqs} className="mt-14 max-w-4xl md:mt-16" />
        </FadeIn>
      </div>
    </section>
  );
}

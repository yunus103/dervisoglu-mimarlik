import { FadeIn } from "@/components/ui/FadeIn";
import Link from "next/link";
import { Service } from "@/types";

interface ServicesSectionProps {
  title?: string;
  subtitle?: string;
  services?: Service[];
}

/**
 * Hizmetler kart ızgarası olarak değil, iki kategoriye ayrılmış bir liste
 * olarak verilir. Kategoriler firmanın gerçek hizmet yapısını birebir
 * karşılar ve altı hizmetin tamamı tek ekranda görünür.
 */
const categories = [
  {
    label: "Mimari & Tasarım Hizmetleri",
    items: [
      {
        title: "Mimari Projelendirme",
        desc: "Avan proje, uygulama projesi ve ruhsat çizimleri",
        slug: "mimari-projelendirme",
      },
      {
        title: "İç Mimarlık & Konsept Tasarım",
        desc: "Mekân organizasyonu, 3D görselleştirme ve malzeme seçimi",
        slug: "ic-mimarlik-konsept-tasarim",
      },
      {
        title: "Belediye & İmar Takibi",
        desc: "İmar durumu, ruhsat ve resmi kurum süreç yönetimi",
        slug: "belediye-imar-takibi",
      },
    ],
  },
  {
    label: "İnşaat & Uygulama Hizmetleri",
    items: [
      {
        title: "İnşaat Müteahhitliği & Kat Karşılığı",
        desc: "Konut ve ticari yapı üretimi",
        slug: "insaat-muteahhitligi-kat-karsiligi",
      },
      {
        title: "Taahhüt & Şantiye Yönetimi",
        desc: "Bütçe ve zaman planına uygun inşa süreci",
        slug: "taahhut-santiye-yonetimi",
      },
      {
        title: "Kentsel Dönüşüm Danışmanlığı",
        desc: "Riskli yapı tespiti, bina yenileme ve hak sahipliği süreçleri",
        slug: "kentsel-donusum-danismanligi",
      },
    ],
  },
];

export function ServicesSection({
  title,
  subtitle,
  services = [],
}: ServicesSectionProps) {
  const displayTitle = title || "Hizmetlerimiz";
  const displaySubtitle =
    subtitle ||
    "Mimari projelendirmeden anahtar teslim uygulamaya kadar iki ana başlıkta hizmet verilmektedir.";

  // Sanity'de hizmet tanımlıysa aynı listeye yerleştirilir.
  const hasSanityServices = services.length > 0;
  const half = Math.ceil(services.length / 2);
  const columns = hasSanityServices
    ? categories.map((c, i) => ({
        ...c,
        items: services.slice(i * half, (i + 1) * half).map((s) => ({
          title: s.title ?? "",
          desc: "",
          slug: s.slug?.current ?? "",
        })),
      }))
    : categories;

  return (
    <section className="border-t border-border bg-background py-20 md:py-28">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-8 lg:px-12">
        <FadeIn direction="up">
          <h2 className="display text-3xl font-extrabold leading-[1.05] text-primary sm:text-4xl lg:text-5xl">
            {displayTitle}
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {displaySubtitle}
          </p>
        </FadeIn>

        <div className="mt-14 grid grid-cols-1 gap-x-12 gap-y-14 md:mt-20 lg:grid-cols-2">
          {columns.map((column, ci) => (
            <FadeIn key={column.label} direction="up" delay={ci * 0.1}>
              <div>
                <h3 className="display border-b-2 border-primary pb-3 text-lg font-bold text-primary">
                  {column.label}
                </h3>

                <ul>
                  {column.items.map((item) => (
                    <li key={item.slug || item.title}>
                      <Link
                        href={item.slug ? `/hizmetler/${item.slug}` : "/hizmetler"}
                        className="group flex items-baseline gap-5 border-b border-border py-6 transition-colors hover:bg-primary focus-visible:bg-primary focus-visible:outline-none"
                      >
                        <span className="min-w-0 flex-1 px-1">
                          <span className="display block text-xl font-bold leading-snug text-foreground transition-colors group-hover:text-white group-focus-visible:text-white lg:text-2xl">
                            {item.title}
                          </span>
                          {item.desc && (
                            <span className="mt-1.5 block text-sm leading-relaxed text-muted-foreground transition-colors group-hover:text-white/70 group-focus-visible:text-white/70">
                              {item.desc}
                            </span>
                          )}
                        </span>
                        <span
                          aria-hidden
                          className="shrink-0 pr-1 text-lg text-muted-foreground transition-all group-hover:translate-x-1 group-hover:text-white group-focus-visible:text-white"
                        >
                          →
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* eslint-disable @typescript-eslint/no-explicit-any */
import { FadeIn } from "@/components/ui/FadeIn";
import { SanityImage } from "@/components/ui/SanityImage";
import { RichText } from "@/components/ui/RichText";
import Link from "next/link";
import { SanityImage as SanityImageType } from "@/types";

interface AboutSectionProps {
  title?: string;
  subtitle?: string;
  text?: any[];
  image?: SanityImageType;
  ctaLabel?: string;
  ctaLink?: string;
}

/**
 * Kurumsal yapı bölümü. Firmanın asıl ayırt edici özelliği, sürecin
 * üç ayrı aşamasının da kendi bünyesindeki ekiplerle yürütülmesidir;
 * bölüm bu yapıyı ekip ekip açık şekilde listeler.
 */
const teams = [
  {
    name: "Belediye & Resmi İş Takip Ekibi",
    scope: "İmar durumu, ruhsat başvurusu, revizyon takibi ve iskan süreçleri",
  },
  {
    name: "İç Mimari Tasarım Ekibi",
    scope: "Konsept, avan ve uygulama projeleri, 3D görselleştirme, malzeme kararları",
  },
  {
    name: "Şantiye & Saha Kontrol Ekibi",
    scope: "İmalat denetimi, malzeme kontrolü, ilerleme ve hakediş raporlaması",
  },
];

const facts = [
  { value: "2004", label: "Aileden gelen müteahhitlik tecrübesi" },
  { value: "50+", label: "Tamamlanmış bina projesi" },
];

export function AboutSection({
  title,
  subtitle,
  text,
  image,
  ctaLabel,
  ctaLink,
}: AboutSectionProps) {
  const displayTitle = title || "Proje ve Uygulama Tek Elden Yürütülür";
  const displaySubtitle =
    subtitle ||
    "Mimari projelendirme, resmi süreç takibi ve şantiye uygulaması firmamız bünyesindeki üç ayrı ekip tarafından yürütülmektedir. Süreç boyunca tek muhatap Dervişoğlu Mimarlık'tır.";
  const displayCtaLabel = ctaLabel || "Hakkımızda";
  const displayCtaLink = ctaLink || "/hakkimizda";

  return (
    <section className="border-t border-border bg-primary text-white">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 lg:grid-cols-12">
        {/* Metin */}
        <div className="px-4 py-20 sm:px-8 lg:col-span-7 lg:px-12 lg:py-28">
          <FadeIn direction="up">
            <h2 className="display max-w-[20ch] text-3xl font-extrabold leading-[1.05] sm:text-4xl lg:text-5xl">
              {displayTitle}
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/75 md:text-lg">
              {displaySubtitle}
            </p>
          </FadeIn>

          {text && text.length > 0 && (
            <FadeIn delay={0.1}>
              <RichText value={text} className="mt-5 max-w-2xl leading-relaxed text-white/75" />
            </FadeIn>
          )}

          <FadeIn delay={0.15}>
            <ul className="mt-12">
              {teams.map((team) => (
                <li
                  key={team.name}
                  className="flex flex-col gap-1.5 border-t border-white/15 py-5 sm:flex-row sm:items-baseline sm:gap-8"
                >
                  <span className="display shrink-0 text-base font-bold sm:w-[17rem]">
                    {team.name}
                  </span>
                  <span className="text-sm leading-relaxed text-white/65">{team.scope}</span>
                </li>
              ))}
            </ul>
          </FadeIn>

          <FadeIn delay={0.2}>
            <dl className="mt-12 grid grid-cols-1 gap-8 border-t border-white/15 pt-10 sm:grid-cols-2">
              {facts.map((fact) => (
                <div key={fact.value}>
                  <dt className="display text-4xl font-extrabold tabular-nums text-white lg:text-5xl">
                    {fact.value}
                  </dt>
                  <dd className="mt-2 text-sm leading-snug text-white/65">{fact.label}</dd>
                </div>
              ))}
            </dl>
          </FadeIn>

          <FadeIn delay={0.25}>
            <Link
              href={displayCtaLink}
              className="mt-12 inline-block border-b-2 border-white/60 pb-1 text-base font-semibold transition-colors hover:border-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              {displayCtaLabel}
            </Link>
          </FadeIn>
        </div>

        {/* Görsel — çerçevesiz, kenara kadar akar */}
        <div className="relative min-h-[320px] lg:col-span-5 lg:min-h-full">
          {image?.asset ? (
            <SanityImage
              image={image}
              fill
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="object-cover"
            />
          ) : (
            <div className="absolute inset-0 bg-[linear-gradient(200deg,#24476F_0%,#1E3A5F_60%,#0F172A_100%)]" />
          )}
        </div>
      </div>
    </section>
  );
}

/* eslint-disable @typescript-eslint/no-explicit-any */
import { FadeIn } from "@/components/ui/FadeIn";
import { SanityImage } from "@/components/ui/SanityImage";
import { RichText } from "@/components/ui/RichText";
import Link from "next/link";
import { SanityImage as SanityImageType, AboutFact } from "@/types";

interface AboutSectionProps {
  title?: string;
  subtitle?: string;
  text?: any[];
  image?: SanityImageType;
  ctaLabel?: string;
  ctaLink?: string;
  /** Sanity'de alan tanımsızsa GROQ null döner; bu yüzden null da kabul edilir. */
  facts?: AboutFact[] | null;
}

/**
 * Ana sayfadaki kısa Hakkımızda özeti. İçeriğin tamamı Sanity'deki
 * Ana Sayfa dokümanından gelir.
 */
export function AboutSection({
  title,
  subtitle,
  text,
  image,
  ctaLabel,
  ctaLink,
  facts,
}: AboutSectionProps) {
  const factList = facts ?? [];
  const displayTitle = title;
  const displaySubtitle = subtitle;
  const displayCtaLabel = ctaLabel;
  const displayCtaLink = ctaLink || "/hakkimizda";

  return (
    <section className="relative border-t border-border bg-primary text-white">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 lg:grid-cols-12">
        {/* Metin — mobilde fotoğrafın altında, masaüstünde solda (order sırası aşağıda tersine döner) */}
        <div className="order-2 px-4 py-14 sm:px-8 lg:order-none lg:col-span-7 lg:py-28 lg:pl-12 lg:pr-10">
          <FadeIn direction="up">
            {displayTitle && (
              <h2 className="display max-w-[20ch] text-3xl font-extrabold leading-[1.05] sm:text-4xl lg:text-5xl">
                {displayTitle}
              </h2>
            )}
            {displaySubtitle && (
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/75 md:text-lg">
                {displaySubtitle}
              </p>
            )}
          </FadeIn>

          {text && text.length > 0 && (
            <FadeIn delay={0.1}>
              <RichText value={text} className="mt-5 max-w-2xl leading-relaxed text-white/75" />
            </FadeIn>
          )}

          {factList.length > 0 && (
            <FadeIn delay={0.2}>
              <dl className="mt-12 grid grid-cols-1 gap-8 border-t border-white/15 pt-10 sm:grid-cols-2">
                {factList.map((fact) => (
                  <div key={fact.value}>
                    <dt className="display text-4xl font-extrabold tabular-nums text-white lg:text-5xl">
                      {fact.value}
                    </dt>
                    {fact.label && (
                      <dd className="mt-2 text-sm leading-snug text-white/65">{fact.label}</dd>
                    )}
                  </div>
                ))}
              </dl>
            </FadeIn>
          )}

          {displayCtaLabel && (
            <FadeIn delay={0.25}>
              <Link
                href={displayCtaLink}
                className="mt-12 inline-block border-b-2 border-white/60 pb-1 text-base font-semibold transition-colors hover:border-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                {displayCtaLabel}
              </Link>
            </FadeIn>
          )}
        </div>

        {/* Görsel — mobil/tabletde normal akışta, masaüstünde sağ kenara yaslı (aşağıdaki katman) */}
        <div className="relative order-1 min-h-[280px] lg:hidden">
          {image?.asset ? (
            <SanityImage
              image={image}
              fill
              sizes="100vw"
              className="object-cover"
            />
          ) : (
            <div className="absolute inset-0 bg-[linear-gradient(200deg,#24476F_0%,#1E3A5F_60%,#0F172A_100%)]" />
          )}
        </div>
      </div>

      {/*
        Masaüstü görseli: gerçek sağ kenara yaslanır (aradaki boşluğu kapatır),
        ancak çok geniş ekranlarda sayfanın 1400px sınırının dışına taşmaz —
        o noktadan sonra sağ boşluk yeniden açılır, sınır asla aşılmaz.
      */}
      <div
        className="pointer-events-none absolute inset-y-0 right-[max(0px,calc((100vw_-_1400px)/2))] hidden lg:block lg:w-[40%] lg:max-w-[680px]"
      >
        {image?.asset ? (
          <SanityImage
            image={image}
            fill
            sizes="(max-width: 1400px) 40vw, 680px"
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-[linear-gradient(200deg,#24476F_0%,#1E3A5F_60%,#0F172A_100%)]" />
        )}
      </div>
    </section>
  );
}

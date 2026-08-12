"use client";

import { useState } from "react";
import { SanityImage } from "@/components/ui/SanityImage";
import { QuickQuoteModal } from "@/components/forms/QuickQuoteModal";
import { StageAxis } from "./StageAxis";
import { SanityImage as SanityImageType, CtaLink, ProcessStep } from "@/types";

interface HeroSectionProps {
  data?: {
    heroImage?: SanityImageType;
    heroTitle?: string;
    heroSubtitle?: string;
    heroCtaLabel?: string;
    heroCtaLink?: CtaLink;
  };
  phone?: string;
  /** Hero altındaki şeritte gösterilen aşamalar (Süreç bölümüyle aynı kaynak) */
  stages?: ProcessStep[] | null;
}

export function resolveLink(linkData?: CtaLink) {
  if (!linkData) return "/projeler";
  if (linkData.linkType === "manual") return linkData.manual || "/projeler";

  const ref = linkData.internal;
  if (!ref || !ref._type) return "/projeler";

  switch (ref._type) {
    case "service":
      return `/hizmetler/${ref.slug}`;
    case "project":
      return `/projeler/${ref.slug}`;
    case "blogPost":
      return `/${ref.slug}`;
    case "aboutPage":
      return `/hakkimizda`;
    case "contactPage":
      return `/iletisim`;
    default:
      return "/projeler";
  }
}

export function HeroSection({ data, phone, stages }: HeroSectionProps) {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);

  const title = data?.heroTitle;
  const subtitle = data?.heroSubtitle;
  const ctaLabel = data?.heroCtaLabel;

  return (
    <>
      {/* Sabit header'ın altına uzanır (-mt-20) ve tam ekranı kaplar.
          svh birimi, mobil tarayıcı adres çubuğu açılıp kapanırken
          yüksekliğin zıplamasını engeller. */}
      <section className="relative -mt-20 flex min-h-[100svh] flex-col bg-primary text-white">
        {/* Arka plan fotoğrafı — çerçevesiz, tam kanama */}
        <div aria-hidden className="absolute inset-0 overflow-hidden">
          {data?.heroImage?.asset ? (
            <>
              <SanityImage
                image={data.heroImage}
                fill
                sizes="100vw"
                quality={90}
                className="object-cover"
                priority
              />
              {/* Metnin okunabilirliği için alttan yukarı koyulaşan katman */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-primary/35" />
              <div className="absolute inset-0 bg-primary/25" />
            </>
          ) : (
            <div className="absolute inset-0 bg-[linear-gradient(160deg,#0F172A_0%,#1E3A5F_55%,#24476F_100%)]" />
          )}
        </div>

        {/* Tez cümlesi, sola-alta hizalı */}
        <div className="relative z-10 mx-auto flex w-full max-w-[1400px] flex-1 flex-col justify-end px-4 pb-14 pt-32 sm:px-8 lg:px-12 lg:pb-20">
          {title && (
            <h1 className="display max-w-[16ch] text-[2.75rem] font-extrabold uppercase leading-[0.95] sm:text-6xl lg:text-[5.25rem]">
              {title}
            </h1>
          )}

          {subtitle && (
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-white/80">
              {subtitle}
            </p>
          )}

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            {ctaLabel && (
              <button
                type="button"
                onClick={() => setIsQuoteOpen(true)}
                className="cursor-pointer bg-white px-7 py-4 text-base font-semibold text-primary transition-colors hover:bg-white/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                {ctaLabel}
              </button>
            )}

            {phone && (
              <a
                href={`tel:${phone.replace(/\s/g, "")}`}
                className="text-xl font-semibold tabular-nums underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                {phone}
              </a>
            )}
          </div>
        </div>

        {/* Sayfanın kurgusu burada tanıtılıyor */}
        <div className="relative z-10">
          <StageAxis stages={stages} />
        </div>
      </section>

      <QuickQuoteModal isOpen={isQuoteOpen} onClose={() => setIsQuoteOpen(false)} />
    </>
  );
}

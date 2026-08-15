"use client";

import { useState } from "react";
import Link from "next/link";
import { SanityImage } from "@/components/ui/SanityImage";
import { QuickQuoteModal } from "@/components/forms/QuickQuoteModal";
import { SanityImage as SanityImageType, CtaLink } from "@/types";

interface HeroSectionProps {
  data?: {
    heroImage?: SanityImageType;
    heroTitle?: string;
    heroSubtitle?: string;
    heroCtaLabel?: string;
    heroCtaLink?: CtaLink;
    heroSecondaryCtaLabel?: string;
    heroSecondaryCtaLink?: CtaLink;
  };
}

export function resolveLink(linkData?: CtaLink) {
  if (!linkData) return "/hizmetler";
  if (linkData.linkType === "manual") return linkData.manual || "/hizmetler";

  const ref = linkData.internal;
  if (!ref || !ref._type) return "/hizmetler";

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
      return "/hizmetler";
  }
}

export function HeroSection({ data }: HeroSectionProps) {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);

  const title = data?.heroTitle;
  const subtitle = data?.heroSubtitle;
  const ctaLabel = data?.heroCtaLabel;
  const secondaryCtaLabel = data?.heroSecondaryCtaLabel;

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
              {/* Metnin okunabilirliği için sol-alt odaklı ve fotoğraf canlılığını koruyan yumuşak katmanlar */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A]/90 via-[#0F172A]/50 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/80 via-transparent to-[#0F172A]/30" />
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

          <div className="mt-10 flex flex-wrap items-center gap-4 sm:gap-6">
            {ctaLabel && (
              <button
                type="button"
                onClick={() => setIsQuoteOpen(true)}
                className="cursor-pointer bg-white px-7 py-4 text-base font-semibold text-primary transition-all duration-200 hover:bg-white/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                {ctaLabel}
              </button>
            )}

            {secondaryCtaLabel && (
              <Link
                href={resolveLink(data?.heroSecondaryCtaLink)}
                className="cursor-pointer border border-white/40 bg-white/10 px-7 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all duration-200 hover:border-white hover:bg-white hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                {secondaryCtaLabel}
              </Link>
            )}
          </div>
        </div>
      </section>

      <QuickQuoteModal isOpen={isQuoteOpen} onClose={() => setIsQuoteOpen(false)} />
    </>
  );
}

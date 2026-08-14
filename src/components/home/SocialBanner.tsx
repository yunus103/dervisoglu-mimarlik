"use client";

import Link from "next/link";
import { FadeIn } from "@/components/ui/FadeIn";
import { SocialLink } from "@/types";
import { socialIconMap } from "@/lib/social-icons";

interface SocialBannerProps {
  socialLinks?: SocialLink[];
  showBlog?: boolean;
}

export function SocialBanner({ socialLinks = [], showBlog = true }: SocialBannerProps) {
  const activeSocials = socialLinks.filter((s) => s.url);

  return (
    <section className="border-t border-border bg-muted/40 py-10 md:py-12">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-8 lg:px-12">
        <FadeIn direction="up">
          <div className="flex flex-col items-start justify-between gap-6 rounded-xl border border-border/80 bg-background p-6 shadow-sm sm:p-8 lg:flex-row lg:items-center">
            {/* Metin Alanı */}
            <div className="max-w-2xl">
              <span className="data text-xs uppercase tracking-wider text-primary">
                Bizi Takip Edin
              </span>
              <h3 className="display mt-1 text-xl font-bold text-foreground sm:text-2xl">
                Mimari süreçler ve bilgilendirici rehberlerimiz için sosyal medyadayız
              </h3>
              <p className="mt-2 text-sm text-muted-foreground sm:text-base">
                Proje aşamaları, imar mevzuatları ve teknik rehber içeriklerimizi sosyal medya hesaplarımızdan takip edebilirsiniz.
              </p>
            </div>

            {/* Bağlantılar ve İkonlar */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-5">
              {activeSocials.length > 0 && (
                <div className="flex flex-wrap items-center gap-3">
                  {activeSocials.map((social, i) => {
                    const Icon = socialIconMap[social.platform.toLowerCase()];
                    if (!Icon) return null;
                    return (
                      <a
                        key={i}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${social.platform} sayfamızı ziyaret edin`}
                        className="flex h-14 w-14 items-center justify-center rounded-xl border border-border bg-background text-foreground shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-primary hover:bg-primary hover:text-white hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                      >
                        <Icon size={24} />
                      </a>
                    );
                  })}
                </div>
              )}

              {showBlog && (
                <Link
                  href="/blog"
                  className="inline-flex h-14 items-center gap-2.5 rounded-xl bg-primary px-6 text-base font-semibold text-primary-foreground shadow-sm transition-all hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  <span>Rehber & Blog</span>
                  <span aria-hidden className="text-lg">→</span>
                </Link>
              )}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

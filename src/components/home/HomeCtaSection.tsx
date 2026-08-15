"use client";

import { useState } from "react";
import { FadeIn } from "@/components/ui/FadeIn";
import { QuickQuoteModal } from "@/components/forms/QuickQuoteModal";

interface HomeCtaSectionProps {
  title?: string;
  text?: string;
  buttonLabel?: string;
  scopeTitle?: string;
  /** Sanity'de alan tanımsızsa GROQ null döner; bu yüzden null da kabul edilir. */
  scopeItems?: string[] | null;
  phone?: string;
}

/**
 * Kapanış bölümü. Genel bir iletişim çağrısı yerine, arsa sahibinin
 * doğrudan ihtiyaç duyduğu somut bir çalışma önerilir ve bu çalışmanın
 * kapsamı açıkça listelenir. İçerik Sanity'den gelir.
 */
export function HomeCtaSection({
  title,
  text,
  buttonLabel,
  scopeTitle,
  scopeItems,
  phone,
}: HomeCtaSectionProps) {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const scopeList = scopeItems ?? [];

  if (!title) return null;

  return (
    <>
      <section className="relative overflow-hidden border-t border-border bg-background py-20 md:py-28">
        {/* Fotoğrafsız kapanış bölümüne pafta hissi veren köşe işaretleri */}
        <span
          aria-hidden
          className="pointer-events-none absolute left-4 top-4 h-6 w-6 border-l border-t border-accent/30 sm:left-8 sm:top-8"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute bottom-4 right-4 h-6 w-6 border-b border-r border-accent/30 sm:bottom-8 sm:right-8"
        />

        <div className="relative mx-auto max-w-[1400px] px-4 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 gap-x-16 gap-y-10 lg:grid-cols-12">
            <FadeIn direction="up" className="lg:col-span-7">
              <div>
                <h2 className="display max-w-[18ch] text-3xl font-extrabold leading-[1.05] text-primary sm:text-4xl lg:text-5xl">
                  {title}
                </h2>
                {text && (
                  <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
                    {text}
                  </p>
                )}

                <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
                  {buttonLabel && (
                    <button
                      type="button"
                      onClick={() => setIsQuoteOpen(true)}
                      className="cursor-pointer bg-primary px-7 py-4 text-base font-semibold text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                    >
                      {buttonLabel}
                    </button>
                  )}

                  {phone && (
                    <a
                      href={`tel:${phone.replace(/\s/g, "")}`}
                      className="text-xl font-semibold tabular-nums text-primary underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                    >
                      {phone}
                    </a>
                  )}
                </div>
              </div>
            </FadeIn>

            {scopeList.length > 0 && (
              <FadeIn direction="up" delay={0.1} className="lg:col-span-5">
                <div>
                  {scopeTitle && (
                    <h3 className="display border-b-2 border-primary pb-3 text-lg font-bold text-primary">
                      {scopeTitle}
                    </h3>
                  )}
                  <ul>
                    {scopeList.map((item) => (
                      <li
                        key={item}
                        className="border-b border-border py-4 text-base text-foreground"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            )}
          </div>
        </div>
      </section>

      <QuickQuoteModal isOpen={isQuoteOpen} onClose={() => setIsQuoteOpen(false)} />
    </>
  );
}

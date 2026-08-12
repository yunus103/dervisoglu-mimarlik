"use client";

import { useState } from "react";
import { FadeIn } from "@/components/ui/FadeIn";
import { QuickQuoteModal } from "@/components/forms/QuickQuoteModal";

interface HomeCtaSectionProps {
  phone?: string;
}

/**
 * Kapanış bölümü. Genel bir iletişim çağrısı yerine, arsa sahibinin
 * doğrudan ihtiyaç duyduğu somut bir çalışma önerilir ve bu çalışmanın
 * kapsamı açıkça listelenir.
 */
const scope = [
  "Arsanın güncel imar durumu",
  "Yaklaşık inşaat alanı ve bağımsız bölüm sayısı",
  "Kaba maliyet aralığı ve süreç planı",
];

export function HomeCtaSection({ phone }: HomeCtaSectionProps) {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);

  return (
    <>
      <section className="border-t border-border bg-background py-20 md:py-28">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 gap-x-16 gap-y-10 lg:grid-cols-12">
            <FadeIn direction="up" className="lg:col-span-7">
              <div>
                <h2 className="display max-w-[18ch] text-3xl font-extrabold leading-[1.05] text-primary sm:text-4xl lg:text-5xl">
                  Arsanız İçin Ön Fizibilite Çalışması
                </h2>
                <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
                  Adres veya ada/parsel bilgisini iletmeniz halinde arsanızın imar durumu
                  çıkarılarak oluşabilecek bağımsız bölüm sayısı hesaplanır. Bu çalışma ücretsizdir.
                </p>

                <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
                  <button
                    type="button"
                    onClick={() => setIsQuoteOpen(true)}
                    className="cursor-pointer bg-primary px-7 py-4 text-base font-semibold text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  >
                    Ön fizibilite talep edin
                  </button>

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

            <FadeIn direction="up" delay={0.1} className="lg:col-span-5">
              <div>
                <h3 className="display border-b-2 border-primary pb-3 text-lg font-bold text-primary">
                  Çalışma kapsamı
                </h3>
                <ul>
                  {scope.map((item) => (
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
          </div>
        </div>
      </section>

      <QuickQuoteModal isOpen={isQuoteOpen} onClose={() => setIsQuoteOpen(false)} />
    </>
  );
}

import Link from "next/link";
import { FadeIn } from "@/components/ui/FadeIn";

interface ProcessSectionProps {
  title?: string;
  text?: string;
  processCtaLabel?: string;
  faqCtaLabel?: string;
}

/**
 * Ana sayfadaki kısa Süreç & SSS yönlendirme bloğu. Adımların ve soruların
 * tamamı artık `/surec` sayfasında; burada yalnızca oraya yönlendiren
 * iki bağlantı yer alır. İçerik Sanity'deki Ana Sayfa dokümanından gelir.
 */
export function ProcessSection({
  title,
  text,
  processCtaLabel,
  faqCtaLabel,
}: ProcessSectionProps) {
  if (!title && !processCtaLabel && !faqCtaLabel) return null;

  return (
    <section className="relative overflow-hidden border-t border-border bg-primary py-20 text-white md:py-28">
      <span
        aria-hidden
        className="pointer-events-none absolute left-4 top-4 h-6 w-6 border-l border-t border-white/20 sm:left-8 sm:top-8"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute bottom-4 right-4 h-6 w-6 border-b border-r border-white/20 sm:bottom-8 sm:right-8"
      />

      <div className="relative mx-auto max-w-[1400px] px-4 sm:px-8 lg:px-12">
        <FadeIn direction="up">
          {title && (
            <h2 className="display max-w-[20ch] text-3xl font-extrabold leading-[1.05] sm:text-4xl lg:text-5xl">
              {title}
            </h2>
          )}
          {text && (
            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/75 md:text-lg">
              {text}
            </p>
          )}

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            {processCtaLabel && (
              <Link
                href="/surec"
                className="bg-white px-7 py-4 text-base font-semibold text-primary transition-colors hover:bg-white/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                {processCtaLabel}
              </Link>
            )}
            {faqCtaLabel && (
              <Link
                href="/surec#sss"
                className="border border-white/40 px-7 py-4 text-base font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                {faqCtaLabel}
              </Link>
            )}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

import { FadeIn } from "@/components/ui/FadeIn";
import { FAQ } from "@/components/ui/FAQ";
import { FaqItem } from "@/types";

interface FaqSectionProps {
  title?: string;
  subtitle?: string;
  /** Sanity'de alan tanımsızsa GROQ null döner; bu yüzden null da kabul edilir. */
  items?: FaqItem[] | null;
}

/**
 * Aşamaya bağlı sorular süreç bölümünde, ilgili aşamanın yanında cevaplanır.
 * Burada yalnızca belirli bir aşamaya ait olmayan genel sorular yer alır.
 * İçerik Sanity'deki Ana Sayfa dokümanından gelir.
 */
export function FaqSection({ title, subtitle, items }: FaqSectionProps) {
  const validItems = (items ?? []).filter((item) => item?.question && item?.answer);

  if (validItems.length === 0) return null;

  return (
    <section className="border-t border-border bg-background py-20 md:py-28">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-8 lg:px-12">
        {(title || subtitle) && (
          <FadeIn direction="up">
            {title && (
              <h2 className="display text-3xl font-extrabold leading-[1.05] text-primary sm:text-4xl lg:text-5xl">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
                {subtitle}
              </p>
            )}
          </FadeIn>
        )}

        <FadeIn delay={0.1}>
          <FAQ items={validItems} className="mt-14 max-w-4xl md:mt-16" />
        </FadeIn>
      </div>
    </section>
  );
}

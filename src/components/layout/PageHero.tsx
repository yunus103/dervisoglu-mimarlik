import { SanityImage } from "@/components/ui/SanityImage";
import { FadeIn } from "@/components/ui/FadeIn";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SanityImage as SanityImageType } from "@/types";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  backgroundImage?: SanityImageType;
  className?: string;
}

/**
 * İç sayfaların ortak açılışı. Ana sayfadaki tam ekran koyu hero bilinçli
 * olarak tekrarlanmaz; iç sayfalar açık zeminli, yarım yükseklikte ve
 * tipografik bir giriş alır. Böylece ana sayfa ana sayfa olarak kalır.
 */
export function PageHero({
  title,
  subtitle,
  backgroundImage,
  className = "",
}: PageHeroProps) {
  const hasImage = Boolean(backgroundImage?.asset);

  return (
    <section
      className={`relative overflow-hidden border-b border-border ${
        hasImage ? "bg-primary text-white" : "bg-background"
      } ${className}`}
    >
      {hasImage && backgroundImage && (
        <div aria-hidden className="absolute inset-0">
          <SanityImage
            image={backgroundImage}
            fill
            sizes="100vw"
            quality={85}
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-primary/50" />
        </div>
      )}

      <div className="relative z-10 mx-auto max-w-[1400px] px-4 py-16 sm:px-8 md:py-24 lg:px-12 lg:py-28">
        <FadeIn direction="up" duration={0.6}>
          <Breadcrumbs
            customTitle={title}
            className={`mb-8 ${
              hasImage
                ? "text-white/60 [&_a]:text-white/60 [&_a:hover]:text-white [&_span]:text-white"
                : ""
            }`}
          />

          <h1
            className={`display max-w-[20ch] text-4xl font-extrabold leading-[1.02] md:text-5xl lg:text-6xl ${
              hasImage ? "text-white" : "text-primary"
            }`}
          >
            {title}
          </h1>

          {subtitle && (
            <p
              className={`mt-6 max-w-2xl text-lg leading-relaxed ${
                hasImage ? "text-white/80" : "text-muted-foreground"
              }`}
            >
              {subtitle}
            </p>
          )}
        </FadeIn>
      </div>
    </section>
  );
}

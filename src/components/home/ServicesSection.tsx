import { FadeIn } from "@/components/ui/FadeIn";
import { SanityImage } from "@/components/ui/SanityImage";
import { ArchitecturalMark } from "@/components/ui/ArchitecturalMark";
import Link from "next/link";
import { groupServicesByCategory } from "@/lib/services";
import { Service, ServiceCategoryLabels } from "@/types";

interface ServicesSectionProps {
  title?: string;
  subtitle?: string;
  /** Sanity'de alan tanımsızsa GROQ null döner; bu yüzden null da kabul edilir. */
  services?: Service[] | null;
  categoryLabels?: ServiceCategoryLabels | null;
}

/**
 * Hizmetler kart ızgarası olarak değil, kategoriye ayrılmış bir liste olarak
 * verilir. İçeriğin tamamı Sanity'den gelir; hizmet tanımlanmamışsa bölüm
 * hiç render edilmez.
 */
export function ServicesSection({
  title,
  subtitle,
  services,
  categoryLabels,
}: ServicesSectionProps) {
  const groups = groupServicesByCategory(services, categoryLabels);

  if (groups.length === 0) return null;

  return (
    <section className="relative border-t border-border bg-background py-20 md:py-28">
      {/* Koyu Hakkımızda bölümünden aydınlık zemine geçişi işaretleyen nirengi noktası */}
      <div
        aria-hidden
        className="absolute left-1/2 top-0 hidden -translate-x-1/2 -translate-y-1/2 bg-background px-3 sm:block"
      >
        <ArchitecturalMark className="h-7 w-7 text-accent/50" />
      </div>

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

        <div className="mt-14 grid grid-cols-1 gap-x-12 gap-y-14 md:mt-20 lg:grid-cols-2">
          {groups.map((group, gi) => (
            <FadeIn key={group.key} direction="up" delay={gi * 0.1}>
              <div>
                <h3 className="display border-b-2 border-primary pb-3 text-lg font-bold text-primary">
                  {group.label}
                </h3>

                <ul>
                  {group.items.map((service) => (
                    <li key={service.slug?.current || service.title}>
                      <Link
                        href={`/hizmetler/${service.slug?.current ?? ""}`}
                        className="group flex items-center gap-4 border-b border-border py-5 transition-colors hover:bg-primary focus-visible:bg-primary focus-visible:outline-none sm:gap-5"
                      >
                        {/* Küçük kare görsel — yüklenmemişse aynı nirengi motifi yer tutucu olarak kalır */}
                        <span className="relative h-16 w-16 shrink-0 overflow-hidden border border-border bg-muted sm:h-20 sm:w-20">
                          {service.mainImage?.asset ? (
                            <SanityImage
                              image={service.mainImage}
                              fill
                              sizes="80px"
                              className="object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                          ) : (
                            <span className="absolute inset-0 flex items-center justify-center text-accent/40">
                              <ArchitecturalMark className="h-6 w-6" />
                            </span>
                          )}
                        </span>

                        <span className="min-w-0 flex-1 px-1">
                          <span className="display block text-lg font-bold leading-snug text-foreground transition-colors group-hover:text-white group-focus-visible:text-white lg:text-xl">
                            {service.title}
                          </span>
                          {service.summary && (
                            <span className="mt-1.5 block text-sm leading-relaxed text-muted-foreground transition-colors group-hover:text-white/70 group-focus-visible:text-white/70">
                              {service.summary}
                            </span>
                          )}
                        </span>
                        <span
                          aria-hidden
                          className="hidden shrink-0 pr-1 text-lg text-muted-foreground transition-all group-hover:translate-x-1 group-hover:text-white group-focus-visible:text-white sm:block"
                        >
                          →
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

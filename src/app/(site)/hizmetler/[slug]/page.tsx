import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cachedFetch } from "@/sanity/lib/client";
import {
  serviceBySlugQuery,
  serviceSlugsQuery,
  otherServicesQuery,
  servicesPageQuery,
} from "@/sanity/lib/queries";
import { buildMetadata, portableTextToPlainText } from "@/lib/seo";
import { RichText } from "@/components/ui/RichText";
import { SanityImage } from "@/components/ui/SanityImage";
import { FAQ } from "@/components/ui/FAQ";
import { FadeIn } from "@/components/ui/FadeIn";
import { PageHero } from "@/components/layout/PageHero";
import Link from "next/link";

import { Service, ServicesPage } from "@/types";
import { JsonLd, serviceJsonLd } from "@/components/seo/JsonLd";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const services = await cachedFetch<Array<{ slug: string }>>(serviceSlugsQuery, {}, { next: { tags: ["service:list"] } });
  return (services || []).map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = await cachedFetch<Service | null>(serviceBySlugQuery, { slug }, { next: { tags: [`service:detail:${slug}`] } });
  if (!service) return {};
  return buildMetadata({
    title: service.title,
    description: service.summary || portableTextToPlainText(service.body),
    canonicalPath: `/hizmetler/${slug}`,
    pageSeo: service.seo,
  });
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;

  const [service, otherServices, servicesPage] = await Promise.all([
    cachedFetch<Service | null>(serviceBySlugQuery, { slug }, { next: { tags: [`service:detail:${slug}`] } }),
    cachedFetch<Service[]>(otherServicesQuery, { slug }, { next: { tags: ["service:list"] } }),
    cachedFetch<ServicesPage | null>(servicesPageQuery, {}, { next: { tags: ["servicesPage"] } }),
  ]);

  if (!service) notFound();

  const categoryLabel =
    service.category === "insaat-uygulama"
      ? servicesPage?.categoryTwoLabel || "Uygulama & Yapım Süreçleri"
      : servicesPage?.categoryOneLabel || "Mimari & Tasarım Hizmetleri";

  const others = otherServices ?? [];

  return (
    <>
      <JsonLd data={serviceJsonLd(service)} />

      <PageHero title={service.title} subtitle={service.summary} />

      <section className="border-b border-border bg-background py-16 md:py-24">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 gap-x-16 gap-y-14 lg:grid-cols-12">
            {/* İçerik */}
            <div className="lg:col-span-8">
              <FadeIn direction="up">
                <p className="data text-muted-foreground">{categoryLabel}</p>
              </FadeIn>

              {/* Ana Görsel - İçerik alanı genişliğinde */}
              {service.mainImage?.asset && (
                <FadeIn delay={0.05} className="mt-6">
                  <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg bg-muted shadow-sm">
                    <SanityImage
                      image={service.mainImage}
                      fill
                      sizes="(max-width: 1024px) 100vw, 800px"
                      quality={90}
                      className="object-cover"
                      priority
                    />
                  </div>
                </FadeIn>
              )}

              {service.body && service.body.length > 0 && (
                <FadeIn delay={0.1}>
                  <RichText value={service.body} className="mt-8 w-full leading-relaxed" />
                </FadeIn>
              )}

              {/* Sıkça Sorulan Sorular (SSS) */}
              {service.faq && service.faq.length > 0 && (
                <FadeIn delay={0.2} className="mt-16 border-t border-border pt-12">
                  <h2 className="display text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                    Sıkça Sorulan Sorular
                  </h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Bu hizmetimiz ile ilgili en çok merak edilen konular ve yanıtları.
                  </p>
                  <FAQ items={service.faq} className="mt-8" />
                </FadeIn>
              )}
            </div>

            {/* Yan sütun */}
            <aside className="lg:col-span-4">
              <div className="lg:sticky lg:top-28">
                {others.length > 0 && (
                  <FadeIn direction="up" delay={0.15}>
                    <div>
                      <h2 className="display border-b-2 border-primary pb-3 text-sm font-bold uppercase tracking-wide text-primary">
                        Diğer hizmetler
                      </h2>
                      <ul>
                        {others.map((other) => (
                          <li key={other.slug?.current}>
                            <Link
                              href={`/hizmetler/${other.slug?.current ?? ""}`}
                              className="group flex items-baseline gap-4 border-b border-border py-4 transition-colors hover:bg-primary focus-visible:bg-primary focus-visible:outline-none"
                            >
                              <span className="flex-1 px-1 text-base font-medium text-foreground transition-colors group-hover:text-white group-focus-visible:text-white">
                                {other.title}
                              </span>
                              <span
                                aria-hidden
                                className="shrink-0 pr-1 text-muted-foreground transition-all group-hover:translate-x-1 group-hover:text-white group-focus-visible:text-white"
                              >
                                →
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </FadeIn>
                )}

                <FadeIn direction="up" delay={0.2}>
                  <Link
                    href="/iletisim"
                    className="mt-10 block bg-primary px-6 py-4 text-center text-base font-semibold text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  >
                    Bu hizmet için iletişime geçin
                  </Link>
                </FadeIn>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}

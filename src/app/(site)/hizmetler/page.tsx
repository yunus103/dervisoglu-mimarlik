import { Metadata } from "next";
import { cache } from "react";
import { client, cachedFetch } from "@/sanity/lib/client";
import { servicesPageQuery, serviceListQuery } from "@/sanity/lib/queries";
import { buildMetadata } from "@/lib/seo";
import { groupServicesByCategory } from "@/lib/services";
import { PageHero } from "@/components/layout/PageHero";
import { SanityImage } from "@/components/ui/SanityImage";
import { FadeIn } from "@/components/ui/FadeIn";
import Link from "next/link";
import { ServicesPage as ServicesPageType, Service } from "@/types";

const getServicesPageData = cache(
  (): Promise<ServicesPageType> =>
    client.fetch<ServicesPageType>(servicesPageQuery, {}, { next: { tags: ["servicesPage"] } })
);

export async function generateMetadata(): Promise<Metadata> {
  const pageData = await getServicesPageData();
  return buildMetadata({
    title: pageData?.heroTitle || pageData?.pageTitle || "Hizmetlerimiz",
    canonicalPath: "/hizmetler",
    pageSeo: pageData?.seo,
  });
}

export default async function ServicesHubPage() {
  const [services, pageData] = await Promise.all([
    cachedFetch<Service[]>(serviceListQuery, {}, { next: { tags: ["service:list"] } }),
    getServicesPageData(),
  ]);

  const groups = groupServicesByCategory(services, pageData);
  const hasServices = groups.length > 0;

  return (
    <>
      <PageHero
        title={pageData?.heroTitle || pageData?.pageTitle || "Hizmetlerimiz"}
        subtitle={pageData?.heroSubtitle || pageData?.pageSubtitle}
        backgroundImage={pageData?.heroImage}
      />

      {/* Hizmet listesi — kategori başlıkları altında tam genişlik satırlar */}
      <section className="border-b border-border bg-background py-20 md:py-28">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-8 lg:px-12">
          {hasServices ? (
            <div className="space-y-20 md:space-y-28">
              {groups.map((group) => (
                <div key={group.key}>
                  <FadeIn direction="up">
                    <h2 className="display border-b-2 border-primary pb-4 text-xl font-bold text-primary md:text-2xl">
                      {group.label}
                    </h2>
                  </FadeIn>

                  <ul>
                    {group.items.map((service, i) => (
                      <li key={service.slug?.current || service.title}>
                        <FadeIn direction="up" delay={Math.min(i, 4) * 0.06}>
                          <Link
                            href={`/hizmetler/${service.slug?.current ?? ""}`}
                            className="group flex items-center gap-6 border-b border-border py-7 transition-colors hover:bg-primary focus-visible:bg-primary focus-visible:outline-none md:gap-10 md:py-9"
                          >
                            {service.mainImage?.asset && (
                              <span className="relative hidden h-24 w-32 shrink-0 overflow-hidden bg-muted sm:block">
                                <SanityImage
                                  image={service.mainImage}
                                  fill
                                  sizes="128px"
                                  className="object-cover"
                                />
                              </span>
                            )}

                            <span className="min-w-0 flex-1 px-1">
                              <span className="display block text-2xl font-bold leading-snug text-foreground transition-colors group-hover:text-white group-focus-visible:text-white lg:text-3xl">
                                {service.title}
                              </span>
                              {service.summary && (
                                <span className="mt-2 block max-w-2xl text-base leading-relaxed text-muted-foreground transition-colors group-hover:text-white/75 group-focus-visible:text-white/75">
                                  {service.summary}
                                </span>
                              )}
                            </span>

                            <span
                              aria-hidden
                              className="shrink-0 pr-1 text-xl text-muted-foreground transition-all group-hover:translate-x-1 group-hover:text-white group-focus-visible:text-white"
                            >
                              →
                            </span>
                          </Link>
                        </FadeIn>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ) : (
            <FadeIn>
              <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
                {pageData?.emptyText || "Hizmetler yakında bu sayfada yayınlanacaktır."}
              </p>
            </FadeIn>
          )}
        </div>
      </section>

      {/* Hizmet bölgeleri */}
      {pageData?.regionsTitle && (
        <section className="bg-primary text-white">
          <div className="mx-auto max-w-[1400px] px-4 py-20 sm:px-8 lg:px-12 md:py-24">
            <FadeIn direction="up">
              <div className="grid grid-cols-1 gap-x-16 gap-y-6 lg:grid-cols-12">
                <h2 className="display text-3xl font-extrabold leading-[1.05] sm:text-4xl lg:col-span-5">
                  {pageData.regionsTitle}
                </h2>
                {pageData.regionsText && (
                  <p className="max-w-2xl text-base leading-relaxed text-white/75 md:text-lg lg:col-span-7">
                    {pageData.regionsText}
                  </p>
                )}
              </div>
            </FadeIn>
          </div>
        </section>
      )}

      {/* Kapanış */}
      {pageData?.ctaTitle && (
        <section className="border-t border-border bg-background py-20 md:py-28">
          <div className="mx-auto max-w-[1400px] px-4 sm:px-8 lg:px-12">
            <FadeIn direction="up">
              <h2 className="display max-w-[18ch] text-3xl font-extrabold leading-[1.05] text-primary sm:text-4xl lg:text-5xl">
                {pageData.ctaTitle}
              </h2>
              {pageData.ctaText && (
                <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
                  {pageData.ctaText}
                </p>
              )}
              {pageData.ctaLabel && pageData.ctaLink && (
                <Link
                  href={pageData.ctaLink}
                  className="mt-10 inline-block bg-primary px-7 py-4 text-base font-semibold text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  {pageData.ctaLabel}
                </Link>
              )}
            </FadeIn>
          </div>
        </section>
      )}
    </>
  );
}

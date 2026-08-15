import { Metadata } from "next";
import { cachedFetch } from "@/sanity/lib/client";
import { surecPageQuery } from "@/sanity/lib/queries";
import { buildMetadata } from "@/lib/seo";
import { FadeIn } from "@/components/ui/FadeIn";
import { FAQ } from "@/components/ui/FAQ";
import { PageHero } from "@/components/layout/PageHero";
import { SurecPage as SurecPageType } from "@/types";

export async function generateMetadata(): Promise<Metadata> {
  const data = await cachedFetch<SurecPageType>(surecPageQuery, {}, { next: { tags: ["surec"] } });
  return buildMetadata({
    title: data?.heroTitle || "Çalışma Sürecimiz",
    canonicalPath: "/surec",
    pageSeo: data?.seo,
  });
}

export default async function SurecPage() {
  const data = await cachedFetch<SurecPageType>(surecPageQuery, {}, { next: { tags: ["surec"] } });

  const steps = data?.steps ?? [];
  const faqItems = (data?.faqItems ?? []).filter((item) => item?.question && item?.answer);

  return (
    <>
      <PageHero
        title={data?.heroTitle || "Çalışma Sürecimiz"}
        subtitle={data?.heroSubtitle}
        backgroundImage={data?.heroImage}
      />

      {/* Süreç aşamaları */}
      {steps.length > 0 && (
        <section className="border-b border-border bg-background py-20 md:py-28">
          <div className="mx-auto max-w-[1400px] px-4 sm:px-8 lg:px-12">
            {(data?.stepsTitle || data?.stepsSubtitle) && (
              <FadeIn direction="up">
                {data?.stepsTitle && (
                  <h2 className="display text-3xl font-extrabold leading-[1.05] text-primary sm:text-4xl lg:text-5xl">
                    {data.stepsTitle}
                  </h2>
                )}
                {data?.stepsSubtitle && (
                  <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
                    {data.stepsSubtitle}
                  </p>
                )}
              </FadeIn>
            )}

            <ol className="mt-16 md:mt-20">
              {steps.map((step, i) => {
                const number = step.stepNumber || String(i + 1).padStart(2, "0");
                return (
                  <li key={number}>
                    <FadeIn direction="up" delay={0.05}>
                      <div className="grid grid-cols-1 gap-y-6 border-t border-border py-10 md:grid-cols-12 md:gap-x-10 lg:py-12">
                        <div className="md:col-span-2">
                          <span className="data font-semibold text-primary">Aşama {number}</span>
                        </div>

                        <div className="md:col-span-6">
                          <h3 className="display text-xl font-bold leading-snug text-foreground lg:text-2xl">
                            {step.title}
                          </h3>
                          {step.description && (
                            <p className="mt-3 max-w-prose text-base leading-relaxed text-muted-foreground">
                              {step.description}
                            </p>
                          )}
                        </div>

                        {step.deliverable && (
                          <div className="md:col-span-4">
                            <dl>
                              <div>
                                <dt className="data text-muted-foreground">{data?.deliverableLabel}</dt>
                                <dd className="mt-2 text-sm font-medium leading-snug text-foreground">
                                  {step.deliverable}
                                </dd>
                              </div>
                            </dl>
                          </div>
                        )}
                      </div>
                    </FadeIn>
                  </li>
                );
              })}
            </ol>

            {data?.stepsFooterNote && (
              <div className="border-t border-border pt-6">
                <p className="text-sm leading-relaxed text-muted-foreground">{data.stepsFooterNote}</p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Sıkça Sorulan Sorular */}
      {faqItems.length > 0 && (
        <section id="sss" className="scroll-mt-24 bg-background py-20 md:py-28">
          <div className="mx-auto max-w-[1400px] px-4 sm:px-8 lg:px-12">
            {(data?.faqTitle || data?.faqSubtitle) && (
              <FadeIn direction="up">
                {data?.faqTitle && (
                  <h2 className="display text-3xl font-extrabold leading-[1.05] text-primary sm:text-4xl lg:text-5xl">
                    {data.faqTitle}
                  </h2>
                )}
                {data?.faqSubtitle && (
                  <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
                    {data.faqSubtitle}
                  </p>
                )}
              </FadeIn>
            )}

            <FadeIn delay={0.1}>
              <FAQ items={faqItems} className="mt-14 max-w-4xl md:mt-16" />
            </FadeIn>
          </div>
        </section>
      )}
    </>
  );
}

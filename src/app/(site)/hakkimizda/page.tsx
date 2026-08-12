import { Metadata } from "next";
import { cachedFetch } from "@/sanity/lib/client";
import { aboutPageQuery } from "@/sanity/lib/queries";
import { buildMetadata } from "@/lib/seo";
import { FadeIn } from "@/components/ui/FadeIn";
import { SanityImage } from "@/components/ui/SanityImage";
import { RichText } from "@/components/ui/RichText";
import { PageHero } from "@/components/layout/PageHero";
import { AboutPage as AboutPageType } from "@/types";

export async function generateMetadata(): Promise<Metadata> {
  const data = await cachedFetch<AboutPageType>(aboutPageQuery, {}, { next: { tags: ["about"] } });
  return buildMetadata({
    title: data?.heroTitle || data?.pageTitle || "Hakkımızda",
    canonicalPath: "/hakkimizda",
    pageSeo: data?.seo,
  });
}

export default async function AboutPage() {
  const data = await cachedFetch<AboutPageType>(aboutPageQuery, {}, { next: { tags: ["about"] } });

  const members = data?.teamMembers ?? [];
  const hasTeam = members.length > 0;
  const hasBody = Boolean(data?.body && data.body.length > 0);

  return (
    <>
      <PageHero
        title={data?.heroTitle || data?.pageTitle || "Hakkımızda"}
        subtitle={data?.heroSubtitle || data?.pageSubtitle}
        backgroundImage={data?.heroImage}
      />

      {/* Kurumsal metin ve görsel */}
      {(hasBody || data?.pageTitle || data?.mainImage) && (
        <section className="border-b border-border bg-background py-20 md:py-28">
          <div className="mx-auto max-w-[1400px] px-4 sm:px-8 lg:px-12">
            <div className="grid grid-cols-1 gap-x-16 gap-y-12 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <FadeIn direction="up">
                  {data?.pageTitle && (
                    <h2 className="display max-w-[22ch] text-3xl font-extrabold leading-[1.05] text-primary sm:text-4xl">
                      {data.pageTitle}
                    </h2>
                  )}
                  {data?.pageSubtitle && (
                    <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
                      {data.pageSubtitle}
                    </p>
                  )}
                </FadeIn>

                {hasBody && (
                  <FadeIn delay={0.15}>
                    <RichText value={data?.body} className="mt-8 max-w-2xl leading-relaxed" />
                  </FadeIn>
                )}
              </div>

              {data?.mainImage?.asset && (
                <div className="lg:col-span-5">
                  <FadeIn direction="left" delay={0.2}>
                    <div className="relative aspect-[4/5] w-full overflow-hidden bg-muted">
                      <SanityImage
                        image={data.mainImage}
                        fill
                        sizes="(max-width: 1024px) 100vw, 40vw"
                        className="object-cover"
                        priority
                      />
                    </div>
                  </FadeIn>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Ekibimiz — üye eklenmemişse bölüm hiç render edilmez */}
      {hasTeam && (
        <section className="bg-primary text-white">
          <div className="mx-auto max-w-[1400px] px-4 py-20 sm:px-8 lg:px-12 md:py-28">
            <FadeIn direction="up">
              {data?.teamTitle && (
                <h2 className="display text-3xl font-extrabold leading-[1.05] sm:text-4xl lg:text-5xl">
                  {data.teamTitle}
                </h2>
              )}
              {data?.teamSubtitle && (
                <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/75 md:text-lg">
                  {data.teamSubtitle}
                </p>
              )}
            </FadeIn>

            <ul className="mt-14 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 md:mt-20 lg:grid-cols-3">
              {members.map((member, i) => (
                <li key={`${member.name}-${i}`}>
                  <FadeIn direction="up" delay={(i % 3) * 0.08}>
                    <div>
                      {member.photo?.asset ? (
                        <div className="relative aspect-[4/5] w-full overflow-hidden bg-white/10">
                          <SanityImage
                            image={member.photo}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="aspect-[4/5] w-full border border-white/15 bg-white/5" />
                      )}

                      <div className="border-t border-white/20 pt-4">
                        <h3 className="display text-xl font-bold">{member.name}</h3>
                        {member.role && (
                          <p className="data mt-2 text-white/60">{member.role}</p>
                        )}
                        {member.bio && (
                          <p className="mt-3 text-sm leading-relaxed text-white/70">
                            {member.bio}
                          </p>
                        )}
                      </div>
                    </div>
                  </FadeIn>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}

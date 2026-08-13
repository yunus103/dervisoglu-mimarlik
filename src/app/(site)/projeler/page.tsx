import { Metadata } from "next";
import { cache } from "react";
import { notFound } from "next/navigation";
import { client, cachedFetch } from "@/sanity/lib/client";
import { projectsPageQuery, projectListQuery } from "@/sanity/lib/queries";
import { buildMetadata, getLayoutData } from "@/lib/seo";
import { PageHero } from "@/components/layout/PageHero";
import { SanityImage } from "@/components/ui/SanityImage";
import { FadeIn } from "@/components/ui/FadeIn";
import Link from "next/link";
import { ProjectsPage as ProjectsPageType, Project } from "@/types";

const getProjectsPageData = cache(
  (): Promise<ProjectsPageType> =>
    client.fetch<ProjectsPageType>(projectsPageQuery, {}, { next: { tags: ["projectsPage"] } })
);

export async function generateMetadata(): Promise<Metadata> {
  const pageData = await getProjectsPageData();
  return buildMetadata({
    title: pageData?.heroTitle || pageData?.pageTitle || "Projelerimiz",
    canonicalPath: "/projeler",
    pageSeo: pageData?.seo,
  });
}

export default async function ProjectsHubPage() {
  const { settings } = await getLayoutData();
  if (settings?.enableProjectsPage === false) {
    notFound();
  }

  const [projects, pageData] = await Promise.all([
    cachedFetch<Project[]>(projectListQuery, {}, { next: { tags: ["project:list"] } }),
    getProjectsPageData(),
  ]);

  const list = projects ?? [];

  return (
    <>
      <PageHero
        title={pageData?.heroTitle || pageData?.pageTitle || "Projelerimiz"}
        subtitle={pageData?.heroSubtitle || pageData?.pageSubtitle}
        backgroundImage={pageData?.heroImage}
      />

      <section className="border-b border-border bg-background py-20 md:py-28">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-8 lg:px-12">
          {list.length > 0 ? (
            <ul className="grid grid-cols-1 gap-x-10 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
              {list.map((project, i) => (
                <li key={project.slug?.current}>
                  <FadeIn direction="up" delay={Math.min(i, 5) * 0.06}>
                    <Link
                      href={`/projeler/${project.slug?.current ?? ""}`}
                      className="group block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                    >
                      <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
                        {project.mainImage?.asset && (
                          <SanityImage
                            image={project.mainImage}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                          />
                        )}
                      </div>

                      <div className="flex items-baseline gap-4 border-t border-border pt-4">
                        <h2 className="display flex-1 text-xl font-bold leading-snug text-foreground transition-colors group-hover:text-primary">
                          {project.title}
                        </h2>
                        <span
                          aria-hidden
                          className="shrink-0 text-muted-foreground transition-all group-hover:translate-x-1 group-hover:text-primary"
                        >
                          →
                        </span>
                      </div>
                    </Link>
                  </FadeIn>
                </li>
              ))}
            </ul>
          ) : (
            <FadeIn>
              <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
                Projeler yakında bu sayfada yayınlanacaktır.
              </p>
            </FadeIn>
          )}
        </div>
      </section>

      {/* Kapanış */}
      {pageData?.ctaLabel && pageData?.ctaLink && (
        <section className="bg-primary text-white">
          <div className="mx-auto max-w-[1400px] px-4 py-20 sm:px-8 lg:px-12 md:py-24">
            <FadeIn direction="up">
              <h2 className="display max-w-[18ch] text-3xl font-extrabold leading-[1.05] sm:text-4xl">
                Projeniz için görüşelim
              </h2>
              <Link
                href={pageData.ctaLink}
                className="mt-8 inline-block bg-white px-7 py-4 text-base font-semibold text-primary transition-colors hover:bg-white/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                {pageData.ctaLabel}
              </Link>
            </FadeIn>
          </div>
        </section>
      )}
    </>
  );
}

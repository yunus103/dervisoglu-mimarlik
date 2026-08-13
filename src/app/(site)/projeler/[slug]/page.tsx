import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cachedFetch } from "@/sanity/lib/client";
import { projectBySlugQuery, projectSlugsQuery } from "@/sanity/lib/queries";
import { buildMetadata, portableTextToPlainText } from "@/lib/seo";
import { RichText } from "@/components/ui/RichText";
import { SanityImage } from "@/components/ui/SanityImage";
import { FadeIn } from "@/components/ui/FadeIn";
import { PageHero } from "@/components/layout/PageHero";
import Link from "next/link";

import { Project } from "@/types";
import { JsonLd, projectJsonLd } from "@/components/seo/JsonLd";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const projects = await cachedFetch<Array<{ slug: string }>>(projectSlugsQuery, {}, { next: { tags: ["project:list"] } });
  return (projects || []).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await cachedFetch<Project | null>(projectBySlugQuery, { slug }, { next: { tags: [`project:detail:${slug}`] } });
  if (!project) return {};
  return buildMetadata({
    title: project.title,
    description: portableTextToPlainText(project.body),
    canonicalPath: `/projeler/${slug}`,
    pageSeo: project.seo,
  });
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = await cachedFetch<Project | null>(
    projectBySlugQuery,
    { slug },
    { next: { tags: [`project:detail:${slug}`] } }
  );

  if (!project) notFound();

  return (
    <>
      <JsonLd data={projectJsonLd(project)} />

      <PageHero title={project.title} />

      {project.mainImage?.asset && (
        <div className="relative h-64 w-full bg-muted md:h-[480px]">
          <SanityImage
            image={project.mainImage}
            fill
            sizes="100vw"
            quality={90}
            className="object-cover"
            priority
          />
        </div>
      )}

      <section className="border-b border-border bg-background py-16 md:py-24">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-8 lg:px-12">
          {project.body && project.body.length > 0 && (
            <FadeIn direction="up">
              <RichText value={project.body} className="max-w-prose leading-relaxed" />
            </FadeIn>
          )}

          <FadeIn delay={0.15}>
            <Link
              href="/projeler"
              className="mt-14 inline-block border-b-2 border-primary pb-1 text-base font-semibold text-primary transition-opacity hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
            >
              Tüm projeler
            </Link>
          </FadeIn>
        </div>
      </section>
    </>
  );
}

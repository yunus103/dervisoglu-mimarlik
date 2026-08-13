import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cachedFetch } from "@/sanity/lib/client";
import { blogPostBySlugQuery, blogSlugsQuery } from "@/sanity/lib/queries";
import { buildMetadata, getLayoutData } from "@/lib/seo";
import { RichText } from "@/components/ui/RichText";
import { SanityImage } from "@/components/ui/SanityImage";
import { FadeIn } from "@/components/ui/FadeIn";
import { PageHero } from "@/components/layout/PageHero";
import { JsonLd, articleJsonLd } from "@/components/seo/JsonLd";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import { blogRelatedPostsQuery } from "@/sanity/lib/queries";

import { BlogPost } from "@/types";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const posts = await cachedFetch<Array<{ slug: string }>>(
    blogSlugsQuery,
    {},
    { next: { tags: ["blog:list"] } }
  );
  return (posts || []).map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await cachedFetch<BlogPost | null>(
    blogPostBySlugQuery,
    { slug },
    { next: { tags: [`blog:detail:${slug}`, "blog:categories"] } }
  );
  if (!post) return {};

  const baseSeo = await buildMetadata({
    title: post.title,
    description: post.excerpt,
    canonicalPath: `/blog/${slug}`,
    pageSeo: post.seo,
  });

  if (post.seoTags?.length) {
    baseSeo.keywords = post.seoTags;
  }

  return baseSeo;
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const [post, layoutData] = await Promise.all([
    cachedFetch<BlogPost | null>(
      blogPostBySlugQuery,
      { slug },
      { next: { tags: [`blog:detail:${slug}`, "blog:categories"] } }
    ),
    getLayoutData(),
  ]);

  if (!post) notFound();

  let relatedPosts: BlogPost[] = [];
  if (post.category?._id) {
    relatedPosts = await cachedFetch<BlogPost[]>(
      blogRelatedPostsQuery,
      { categoryId: post.category._id, currentPostId: post._id },
      { next: { tags: [`blog:related:${post.category._id}`] } }
    );
  }

  const related = relatedPosts ?? [];

  return (
    <>
      <JsonLd data={articleJsonLd(post, layoutData?.settings)} />

      <PageHero title={post.title} subtitle={post.excerpt} />

      {post.mainImage?.asset && (
        <div className="relative h-64 w-full bg-muted md:h-[480px]">
          <SanityImage
            image={post.mainImage}
            fill
            sizes="100vw"
            quality={90}
            className="object-cover"
            priority
          />
        </div>
      )}

      <article className="border-b border-border bg-background py-16 md:py-24">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-8 lg:px-12">
          <div className="max-w-prose">
            <FadeIn direction="up">
              <div className="data flex flex-wrap items-center gap-x-3 text-muted-foreground">
                {post.category && (
                  <Link
                    href={
                      post.category.slug?.current
                        ? `/blog?category=${post.category.slug.current}`
                        : "/blog"
                    }
                    className="transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  >
                    {post.category.title}
                  </Link>
                )}
                {post.category && post.publishedAt && <span aria-hidden>·</span>}
                {post.publishedAt && <time>{formatDate(post.publishedAt)}</time>}
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <RichText value={post.body} className="mt-8 leading-relaxed" />
            </FadeIn>

            {post.seoTags && post.seoTags.length > 0 && (
              <FadeIn delay={0.15}>
                <div className="mt-14 border-t border-border pt-6">
                  <p className="data text-muted-foreground">Etiketler</p>
                  <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
                    {post.seoTags.map((tag: string) => (
                      <span key={tag} className="text-sm text-foreground">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </FadeIn>
            )}

            <FadeIn delay={0.2}>
              <Link
                href="/blog"
                className="mt-12 inline-block border-b-2 border-primary pb-1 text-base font-semibold text-primary transition-opacity hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
              >
                Tüm yazılar
              </Link>
            </FadeIn>
          </div>

          {related.length > 0 && (
            <FadeIn delay={0.25}>
              <div className="mt-20 border-t border-border pt-12">
                <h2 className="display text-2xl font-extrabold text-primary">İlgili Yazılar</h2>

                <ul className="mt-10 grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                  {related.map((rPost: BlogPost) => (
                    <li key={rPost.slug?.current}>
                      <Link
                        href={`/blog/${rPost.slug?.current}`}
                        className="group flex flex-col focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                      >
                        {rPost.mainImage?.asset && (
                          <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
                            <SanityImage
                              image={rPost.mainImage}
                              fill
                              sizes="(max-width: 768px) 100vw, 33vw"
                              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                            />
                          </div>
                        )}
                        <div className="border-t border-border pt-4">
                          {rPost.publishedAt && (
                            <time className="data text-muted-foreground">
                              {formatDate(rPost.publishedAt)}
                            </time>
                          )}
                          <h3 className="display mt-2 text-lg font-bold leading-snug text-foreground transition-colors group-hover:text-primary">
                            {rPost.title}
                          </h3>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          )}
        </div>
      </article>
    </>
  );
}

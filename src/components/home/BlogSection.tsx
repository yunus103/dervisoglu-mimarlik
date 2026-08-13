import { FadeIn } from "@/components/ui/FadeIn";
import { SanityImage } from "@/components/ui/SanityImage";
import { AnimateGroup } from "@/components/ui/AnimateGroup";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import { BlogPost } from "@/types";

interface BlogSectionProps {
  title?: string;
  subtitle?: string;
  /** Sanity'de alan tanımsızsa GROQ null döner; bu yüzden null da kabul edilir. */
  posts?: BlogPost[] | null;
}

/**
 * Öne çıkan blog yazıları. İçeriğin tamamı Sanity'den gelir; yazı yoksa
 * bölüm hiç render edilmez.
 */
export function BlogSection({ title, subtitle, posts }: BlogSectionProps) {
  const list = (posts ?? []).slice(0, 3);

  if (list.length === 0) return null;

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

        <AnimateGroup className="mt-14 grid grid-cols-1 gap-x-10 gap-y-14 md:mt-20 md:grid-cols-3">
          {list.map((post: BlogPost) => (
            <Link
              key={post.slug?.current}
              href={`/blog/${post.slug?.current ?? ""}`}
              className="group flex flex-col focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
            >
              {post.mainImage?.asset && (
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
                  <SanityImage
                    image={post.mainImage}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
              )}

              <div className="flex flex-1 flex-col border-t border-border pt-4">
                <div className="data flex flex-wrap items-center gap-x-3 text-muted-foreground">
                  {post.category && <span>{post.category.title}</span>}
                  {post.category && post.publishedAt && <span aria-hidden>·</span>}
                  {post.publishedAt && <time>{formatDate(post.publishedAt)}</time>}
                </div>

                <h3 className="display mt-3 text-xl font-bold leading-snug text-foreground transition-colors group-hover:text-primary">
                  {post.title}
                </h3>

                {post.excerpt && (
                  <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                    {post.excerpt}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </AnimateGroup>

        <FadeIn delay={0.2}>
          <Link
            href="/blog"
            className="mt-14 inline-block border-b-2 border-primary pb-1 text-base font-semibold text-primary transition-opacity hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
          >
            Tüm yazılar
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}

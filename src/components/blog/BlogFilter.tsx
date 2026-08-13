"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { AnimateGroup } from "@/components/ui/AnimateGroup";
import { SanityImage } from "@/components/ui/SanityImage";
import { FadeIn } from "@/components/ui/FadeIn";
import { formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { BlogPost, BlogCategory } from "@/types";

interface BlogFilterProps {
  posts: BlogPost[];
  categories: BlogCategory[];
}

export function BlogFilter({ posts, categories }: BlogFilterProps) {
  const [currentCategory, setCurrentCategory] = useState<string | null>(null);

  // Sayfa yüklendiğinde URL'den kategoriyi al
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const categoryQuery = urlParams.get("category");
    if (categoryQuery) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCurrentCategory(categoryQuery);
    }
  }, []);

  const setCategory = (slug: string | null) => {
    setCurrentCategory(slug);

    // URL'yi sayfayı yenilemeden değiştir
    const newUrl = slug ? `/blog?category=${slug}` : "/blog";
    window.history.pushState({ path: newUrl }, "", newUrl);
  };

  const list = posts ?? [];
  const filteredPosts = currentCategory
    ? list.filter((post) => post.category?.slug?.current === currentCategory)
    : list;

  /** Filtre sekmeleri; kart butonu yerine alt çizgili sekme dili kullanılır. */
  const tabClass = (active: boolean) =>
    cn(
      "cursor-pointer border-b-2 pb-3 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
      active
        ? "border-primary text-primary"
        : "border-transparent text-muted-foreground hover:text-primary"
    );

  return (
    <>
      {categories?.length > 0 && (
        <FadeIn direction="up">
          <div className="mb-14 flex flex-wrap items-end gap-x-8 gap-y-3 border-b border-border">
            <button type="button" onClick={() => setCategory(null)} className={tabClass(!currentCategory)}>
              Tümü
            </button>
            {categories.map((cat: BlogCategory) => (
              <button
                key={cat._id}
                type="button"
                onClick={() => setCategory(cat.slug?.current || null)}
                className={tabClass(currentCategory === cat.slug?.current)}
              >
                {cat.title}
              </button>
            ))}
          </div>
        </FadeIn>
      )}

      {filteredPosts.length > 0 ? (
        <AnimateGroup
          key={currentCategory || "all"}
          className="grid grid-cols-1 gap-x-10 gap-y-14 md:grid-cols-2 lg:grid-cols-3"
        >
          {filteredPosts.map((post: BlogPost) => (
            <Link
              key={post.slug?.current}
              href={`/blog/${post.slug?.current}`}
              className="group flex flex-col focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
            >
              {post.mainImage?.asset && (
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
                  <SanityImage
                    image={post.mainImage}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
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

                <h2 className="display mt-3 text-xl font-bold leading-snug text-foreground transition-colors group-hover:text-primary">
                  {post.title}
                </h2>

                {post.excerpt && (
                  <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                    {post.excerpt}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </AnimateGroup>
      ) : (
        <FadeIn key={`empty-${currentCategory}`}>
          <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Bu kategoride henüz yazı bulunmuyor.
          </p>
        </FadeIn>
      )}
    </>
  );
}

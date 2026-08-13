import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cachedFetch } from "@/sanity/lib/client";
import { blogListQuery, blogCategoriesQuery, blogPageQuery } from "@/sanity/lib/queries";
import { buildMetadata, getLayoutData } from "@/lib/seo";
import { BlogFilter } from "@/components/blog/BlogFilter";
import { PageHero } from "@/components/layout/PageHero";
import { BlogPage as BlogPageType, BlogPost, BlogCategory } from "@/types";

export async function generateMetadata(): Promise<Metadata> {
  const pageData = await cachedFetch<BlogPageType>(blogPageQuery, {}, { next: { tags: ["blogPage"] } });
  return buildMetadata({
    title: pageData?.heroTitle || pageData?.pageTitle || "Blog",
    canonicalPath: "/blog",
    pageSeo: pageData?.seo,
  });
}

export default async function BlogListPage() {
  const { settings } = await getLayoutData();
  if (settings?.enableBlogPage === false) {
    notFound();
  }

  const [posts, categories, pageData] = await Promise.all([
    cachedFetch<BlogPost[]>(blogListQuery, {}, { next: { tags: ["blog:list", "blog:categories"] } }),
    cachedFetch<BlogCategory[]>(blogCategoriesQuery, {}, { next: { tags: ["blog:categories"] } }),
    cachedFetch<BlogPageType>(blogPageQuery, {}, { next: { tags: ["blogPage"] } })
  ]);

  return (
    <>
      <PageHero
        title={pageData?.heroTitle || pageData?.pageTitle || "Blog"}
        subtitle={pageData?.heroSubtitle || pageData?.pageSubtitle}
        backgroundImage={pageData?.heroImage}
      />

      <section className="border-b border-border bg-background py-20 md:py-28">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-8 lg:px-12">
          <BlogFilter posts={posts} categories={categories} />
        </div>
      </section>
    </>
  );
}

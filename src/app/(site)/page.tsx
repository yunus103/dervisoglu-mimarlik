import { Metadata } from "next";
import { cachedFetch } from "@/sanity/lib/client";
import {
  homePageQuery,
  serviceFallbackQuery,
  projectFallbackQuery,
  blogFallbackQuery,
} from "@/sanity/lib/queries";
import { buildMetadata, getLayoutData } from "@/lib/seo";
import { HeroSection } from "@/components/home/HeroSection";
import { AboutSection } from "@/components/home/AboutSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { ProcessSection } from "@/components/home/ProcessSection";
import { ProjectsSection } from "@/components/home/ProjectsSection";
import { BlogSection } from "@/components/home/BlogSection";
import { FaqSection } from "@/components/home/FaqSection";
import { HomeCtaSection } from "@/components/home/HomeCtaSection";
import { HomePage as HomePageType, Service, Project, BlogPost } from "@/types";

export async function generateMetadata(): Promise<Metadata> {
  const data = await cachedFetch<HomePageType>(homePageQuery, {}, { next: { tags: ["home", "home:featured"] } });
  return buildMetadata({
    canonicalPath: "/",
    pageSeo: data?.seo,
  });
}

export default async function HomePage() {
  // 1. Fetch main homepage data and global layout settings
  const [data, { settings }] = await Promise.all([
    cachedFetch<HomePageType>(homePageQuery, {}, { next: { tags: ["home", "home:featured"] } }),
    getLayoutData(),
  ]);

  const showProjects = settings?.enableProjectsPage !== false;
  const showBlog = settings?.enableBlogPage !== false;

  // 2. Check if fallback lists are needed when references array is empty
  const needsFallbackServices = !data?.featuredServices || data.featuredServices.length === 0;
  const needsFallbackProjects = showProjects && (!data?.featuredProjects || data.featuredProjects.length === 0);
  const needsFallbackPosts = showBlog && (!data?.featuredPosts || data.featuredPosts.length === 0);

  // 3. Parallel fetch of dynamic lists if references are unpopulated
  const [fallbackServices, fallbackProjects, fallbackPosts] = await Promise.all([
    needsFallbackServices
      ? cachedFetch<Service[]>(serviceFallbackQuery, {}, { next: { tags: ["service:list"] } })
      : Promise.resolve([]),
    needsFallbackProjects
      ? cachedFetch<Project[]>(projectFallbackQuery, {}, { next: { tags: ["project:list"] } })
      : Promise.resolve([]),
    needsFallbackPosts
      ? cachedFetch<BlogPost[]>(blogFallbackQuery, {}, { next: { tags: ["blog:list", "blog:categories"] } })
      : Promise.resolve([]),
  ]);

  const servicesToDisplay = data?.featuredServices && data.featuredServices.length > 0
    ? data.featuredServices
    : fallbackServices;

  const projectsToDisplay = data?.featuredProjects && data.featuredProjects.length > 0
    ? data.featuredProjects
    : fallbackProjects;

  const postsToDisplay = data?.featuredPosts && data.featuredPosts.length > 0
    ? data.featuredPosts
    : fallbackPosts;

  const phone = settings?.contactInfo?.phone;

  return (
    <div className="flex flex-col w-full min-h-screen">
      {/* 1. Hero — tez cümlesi ve ay ekseni */}
      <HeroSection data={data} phone={phone} />

      {/* 2. Takvim — sayfanın omurgası, süreç + aşama soruları */}
      <ProcessSection
        title={data?.processTitle}
        subtitle={data?.processSubtitle}
        steps={data?.processSteps}
      />

      {/* 3. Hizmetler — iki disiplinli defter, altısı da görünür */}
      <ServicesSection
        title={data?.servicesTitle}
        subtitle={data?.servicesSubtitle}
        services={servicesToDisplay}
      />

      {/* 4. Kanıt — kendi ekiplerimiz ve rakamlar */}
      <AboutSection
        title={data?.aboutTitle}
        subtitle={data?.aboutSubtitle}
        text={data?.aboutText}
        image={data?.aboutImage}
        ctaLabel={data?.aboutCtaLabel}
        ctaLink={data?.aboutCtaLink}
      />

      {/* 5. Öne Çıkan Projeler (Eğer Sanity Studio'dan pasif edilmediyse) */}
      {showProjects && (
        <ProjectsSection
          title={data?.projectsTitle}
          subtitle={data?.projectsSubtitle}
          projects={projectsToDisplay}
        />
      )}

      {/* 6. Blog & Makaleler (Eğer Sanity Studio'dan pasif edilmediyse) */}
      {showBlog && (
        <BlogSection
          title={data?.blogTitle}
          subtitle={data?.blogSubtitle}
          posts={postsToDisplay}
        />
      )}

      {/* 7. Takvime girmeyen genel sorular */}
      <FaqSection />

      {/* 8. Kapanış — somut ön fizibilite teklifi */}
      <HomeCtaSection phone={phone} />
    </div>
  );
}

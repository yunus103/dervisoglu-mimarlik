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
import { HomeCtaSection } from "@/components/home/HomeCtaSection";
import { SocialBanner } from "@/components/home/SocialBanner";
import {
  homeFallback,
  homeFallbackAboutFacts,
  homeFallbackCtaScopeItems,
} from "@/lib/home-fallback";
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

  // Sanity'deki Ana Sayfa dokümanında ilgili alan boşsa yedek içerik gösterilir.
  // Yedek metinler homePage şemasındaki initialValue değerleriyle birebir aynıdır.
  const pick = <T,>(value: T | null | undefined, fallback: T): T =>
    value === null || value === undefined || value === "" ? fallback : value;

  const pickList = <T,>(value: T[] | null | undefined, fallback: T[]): T[] =>
    value && value.length > 0 ? value : fallback;

  return (
    <div className="flex flex-col w-full min-h-screen">
      {/* 1. Hero — tez cümlesi */}
      <HeroSection
        data={{
          ...data,
          heroTitle: pick(data?.heroTitle, homeFallback.heroTitle),
          heroSubtitle: pick(data?.heroSubtitle, homeFallback.heroSubtitle),
          heroCtaLabel: pick(data?.heroCtaLabel, homeFallback.heroCtaLabel),
          heroSecondaryCtaLabel: pick(
            data?.heroSecondaryCtaLabel,
            homeFallback.heroSecondaryCtaLabel
          ),
          heroSecondaryCtaLink: data?.heroSecondaryCtaLink || homeFallback.heroSecondaryCtaLink,
        }}
      />

      {/* 2. Kısa Hakkımızda özeti */}
      <AboutSection
        title={pick(data?.aboutTitle, homeFallback.aboutTitle)}
        subtitle={pick(data?.aboutSubtitle, homeFallback.aboutSubtitle)}
        text={data?.aboutText}
        image={data?.aboutImage}
        ctaLabel={pick(data?.aboutCtaLabel, homeFallback.aboutCtaLabel)}
        ctaLink={pick(data?.aboutCtaLink, homeFallback.aboutCtaLink)}
        facts={pickList(data?.aboutFacts, homeFallbackAboutFacts)}
      />

      {/* 3. Hizmetler — kategoriye ayrılmış liste, tamamı Sanity'den */}
      <ServicesSection
        title={pick(data?.servicesTitle, homeFallback.servicesTitle)}
        subtitle={pick(data?.servicesSubtitle, homeFallback.servicesSubtitle)}
        services={servicesToDisplay}
        categoryLabels={data?.serviceCategories}
        ctaLabel={pick(data?.servicesCtaLabel, homeFallback.servicesCtaLabel)}
        ctaLink={pick(data?.servicesCtaLink, homeFallback.servicesCtaLink)}
      />

      {/* 4. Çalışma Sürecimiz & SSS yönlendirmesi */}
      <ProcessSection
        title={pick(data?.processTeaserTitle, homeFallback.processTeaserTitle)}
        text={pick(data?.processTeaserText, homeFallback.processTeaserText)}
        processCtaLabel={pick(data?.processCtaLabel, homeFallback.processCtaLabel)}
        faqCtaLabel={pick(data?.faqCtaLabel, homeFallback.faqCtaLabel)}
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

      {/* 7. Kapanış — somut ön fizibilite teklifi */}
      <HomeCtaSection
        title={pick(data?.ctaTitle, homeFallback.ctaTitle)}
        text={pick(data?.ctaText, homeFallback.ctaText)}
        buttonLabel={pick(data?.ctaButtonLabel, homeFallback.ctaButtonLabel)}
        scopeTitle={pick(data?.ctaScopeTitle, homeFallback.ctaScopeTitle)}
        scopeItems={pickList(data?.ctaScopeItems, homeFallbackCtaScopeItems)}
        phone={phone}
      />

      {/* 8. Sosyal Medya & Bilgi İçerikleri Takip Bandı */}
      <SocialBanner socialLinks={settings?.socialLinks} showBlog={showBlog} />
    </div>
  );
}

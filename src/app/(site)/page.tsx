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
import { SocialBanner } from "@/components/home/SocialBanner";
import {
  homeFallback,
  homeFallbackAboutFacts,
  homeFallbackAboutTeams,
  homeFallbackCtaScopeItems,
  homeFallbackFaqItems,
  homeFallbackProcessSteps,
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

  const processSteps = pickList(data?.processSteps, homeFallbackProcessSteps);

  return (
    <div className="flex flex-col w-full min-h-screen">
      {/* 1. Hero — tez cümlesi ve aşama şeridi */}
      <HeroSection
        data={{
          ...data,
          heroTitle: pick(data?.heroTitle, homeFallback.heroTitle),
          heroSubtitle: pick(data?.heroSubtitle, homeFallback.heroSubtitle),
          heroCtaLabel: pick(data?.heroCtaLabel, homeFallback.heroCtaLabel),
        }}
        phone={phone}
        stages={processSteps}
      />

      {/* 2. Süreç — sayfanın omurgası, aşamalar + aşama soruları */}
      <ProcessSection
        title={pick(data?.processTitle, homeFallback.processTitle)}
        subtitle={pick(data?.processSubtitle, homeFallback.processSubtitle)}
        steps={processSteps}
        teamLabel={pick(data?.processTeamLabel, homeFallback.processTeamLabel)}
        deliverableLabel={pick(
          data?.processDeliverableLabel,
          homeFallback.processDeliverableLabel
        )}
        footerNote={pick(data?.processFooterNote, homeFallback.processFooterNote)}
      />

      {/* 3. Hizmetler — kategoriye ayrılmış liste, tamamı Sanity'den */}
      <ServicesSection
        title={pick(data?.servicesTitle, homeFallback.servicesTitle)}
        subtitle={pick(data?.servicesSubtitle, homeFallback.servicesSubtitle)}
        services={servicesToDisplay}
        categoryLabels={data?.serviceCategories}
      />

      {/* 4. Kurumsal yapı — kendi ekiplerimiz ve rakamlar */}
      <AboutSection
        title={pick(data?.aboutTitle, homeFallback.aboutTitle)}
        subtitle={pick(data?.aboutSubtitle, homeFallback.aboutSubtitle)}
        text={data?.aboutText}
        image={data?.aboutImage}
        ctaLabel={pick(data?.aboutCtaLabel, homeFallback.aboutCtaLabel)}
        ctaLink={pick(data?.aboutCtaLink, homeFallback.aboutCtaLink)}
        teams={pickList(data?.aboutTeams, homeFallbackAboutTeams)}
        facts={pickList(data?.aboutFacts, homeFallbackAboutFacts)}
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

      {/* 7. Aşamalara girmeyen genel sorular */}
      <FaqSection
        title={pick(data?.faqTitle, homeFallback.faqTitle)}
        subtitle={pick(data?.faqSubtitle, homeFallback.faqSubtitle)}
        items={pickList(data?.faqItems, homeFallbackFaqItems)}
      />

      {/* 8. Kapanış — somut ön fizibilite teklifi */}
      <HomeCtaSection
        title={pick(data?.ctaTitle, homeFallback.ctaTitle)}
        text={pick(data?.ctaText, homeFallback.ctaText)}
        buttonLabel={pick(data?.ctaButtonLabel, homeFallback.ctaButtonLabel)}
        scopeTitle={pick(data?.ctaScopeTitle, homeFallback.ctaScopeTitle)}
        scopeItems={pickList(data?.ctaScopeItems, homeFallbackCtaScopeItems)}
        phone={phone}
      />

      {/* 9. Sosyal Medya & Bilgi İçerikleri Takip Bandı */}
      <SocialBanner socialLinks={settings?.socialLinks} showBlog={showBlog} />
    </div>
  );
}

import { FadeIn } from "@/components/ui/FadeIn";
import { SanityImage } from "@/components/ui/SanityImage";
import { AnimateGroup } from "@/components/ui/AnimateGroup";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import { RiArrowRightLine, RiNewspaperLine } from "react-icons/ri";
import { BlogPost } from "@/types";

interface BlogSectionProps {
  title?: string;
  subtitle?: string;
  posts?: BlogPost[];
}

const fallbackPosts = [
  {
    title: "2026 Mimari Tasarım Trendleri ve Sürdürülebilir Yapılar",
    excerpt: "Geleceğin konut ve ticari mimarisinde öne çıkan çevre dostu malzemeler, enerji verimliliği ve doğal ışık kullanımı.",
    date: "10 Ağustos 2026",
    category: "Mimari Trendler",
  },
  {
    title: "İmar ve Ruhsat Süreçlerinde Dikkat Edilmesi Gereken 5 Kritik Adım",
    excerpt: "Belediye ruhsat süreçlerinde yaşanan gecikmeleri önlemek ve projenizi sorunsuz başlatmak için bilmeniz gerekenler.",
    date: "05 Ağustos 2026",
    category: "Mevzuat & İmar",
  },
  {
    title: "Anahtar Teslim İnşaat Uygulamalarında Malzeme Seçiminin Önemi",
    excerpt: "Şantiye aşamasında doğru yapı malzemeleri ve teknik denetim ile yapı ömrünü ve yaşam konforunu artırmanın yolları.",
    date: "28 Temmuz 2026",
    category: "İnşaat & Saha",
  },
];

export function BlogSection({
  title,
  subtitle,
  posts = [],
}: BlogSectionProps) {
  const displayTitle = title || "Haberler & Mimari Makaleler";
  const displaySubtitle = subtitle || "Mimarlık, inşaat mevzuatı ve tasarım dünyasından güncel yazılar ve içerikler.";

  const hasSanityPosts = posts && posts.length > 0;

  return (
    <section className="py-20 md:py-28 bg-background border-t border-border/80">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Heading - Clean typography, no eyebrow slop */}
        <div className="max-w-3xl mb-16 space-y-3">
          <FadeIn direction="up">
            <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-foreground">
              {displayTitle}
            </h2>
            {displaySubtitle && (
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed pt-1">
                {displaySubtitle}
              </p>
            )}
          </FadeIn>
        </div>

        {/* Blog Posts Grid */}
        <AnimateGroup className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {hasSanityPosts
            ? posts.slice(0, 3).map((post: BlogPost) => (
                <Link key={post.slug?.current} href={`/blog/${post.slug?.current}`} className="group block">
                  <article className="border border-border/90 rounded-md overflow-hidden bg-card hover:border-primary/40 hover:shadow-xl transition-all duration-300 h-full flex flex-col hover:-translate-y-1">
                    {post.mainImage ? (
                      <div className="relative aspect-video overflow-hidden border-b border-border/60">
                        <SanityImage
                          image={post.mainImage}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    ) : (
                      <div className="h-44 bg-slate-100 flex items-center justify-center p-6 text-center border-b border-border/60">
                        <RiNewspaperLine size={40} className="text-primary/40" />
                      </div>
                    )}
                    <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          {post.category && (
                            <span className="text-xs font-semibold px-2.5 py-0.5 bg-secondary/15 text-secondary rounded-md">
                              {post.category.title}
                            </span>
                          )}
                          {post.publishedAt && (
                            <time className="text-xs text-muted-foreground">
                              {formatDate(post.publishedAt)}
                            </time>
                          )}
                        </div>
                        <h3 className="font-heading font-bold text-xl text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                          {post.title}
                        </h3>
                        {post.excerpt && (
                          <p className="text-sm text-muted-foreground line-clamp-3">
                            {post.excerpt}
                          </p>
                        )}
                      </div>
                      <div className="pt-2 flex items-center text-primary font-semibold text-sm gap-1 group-hover:gap-2 transition-all">
                        <span>Yazıyı Oku</span>
                        <RiArrowRightLine size={16} />
                      </div>
                    </div>
                  </article>
                </Link>
              ))
            : fallbackPosts.map((post, i) => (
                <Link key={i} href="/blog" className="group block">
                  <article className="border border-border/90 rounded-md overflow-hidden bg-card p-6 md:p-8 hover:border-primary/40 hover:shadow-xl transition-all duration-300 h-full flex flex-col justify-between space-y-6 hover:-translate-y-1">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span className="font-semibold px-2.5 py-0.5 bg-secondary/15 text-secondary rounded-md">
                          {post.category}
                        </span>
                        <span>{post.date}</span>
                      </div>
                      <h3 className="font-heading font-bold text-xl text-foreground group-hover:text-primary transition-colors leading-snug">
                        {post.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                        {post.excerpt}
                      </p>
                    </div>
                    <div className="pt-2 flex items-center text-primary font-semibold text-sm gap-1 group-hover:gap-2 transition-all">
                      <span>Yazıyı Oku</span>
                      <RiArrowRightLine size={16} />
                    </div>
                  </article>
                </Link>
              ))}
        </AnimateGroup>

        {/* View All Button */}
        <FadeIn delay={0.25} className="text-center pt-12">
          <Button variant="outline" size="lg" className="h-11 px-6 rounded-md font-semibold gap-2" render={<Link href="/blog" />}>
            Tüm Blog Yazılarını Gör
            <RiArrowRightLine size={18} />
          </Button>
        </FadeIn>
      </div>
    </section>
  );
}

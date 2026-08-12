import { FadeIn } from "@/components/ui/FadeIn";
import { SanityImage } from "@/components/ui/SanityImage";
import { AnimateGroup } from "@/components/ui/AnimateGroup";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { RiArrowRightLine, RiBuilding4Line } from "react-icons/ri";
import { Project } from "@/types";

interface ProjectsSectionProps {
  title?: string;
  subtitle?: string;
  projects?: Project[];
}

const fallbackProjects = [
  {
    title: "Modern Lüks Villa Konut Projesi",
    category: "Konut & Villa Tasarımı",
    location: "İstanbul, Beykoz",
  },
  {
    title: "Kurumsal Plaza & Ofis Kompleksi",
    category: "Ticari Yapı Tasarımı",
    location: "İstanbul, Maslak",
  },
  {
    title: "Butik Otel & Restorasyon Projesi",
    category: "İç Mimari & Taahhüt",
    location: "Muğla, Bodrum",
  },
];

export function ProjectsSection({
  title,
  subtitle,
  projects = [],
}: ProjectsSectionProps) {
  const displayTitle = title || "Öne Çıkan Projelerimiz";
  const displaySubtitle = subtitle || "Tamamladığımız ve devam eden nitelikli mimari ile inşaat projelerimizden örnekler.";

  const hasSanityProjects = projects && projects.length > 0;

  return (
    <section className="py-20 md:py-28 bg-slate-50/50 border-t border-border/80">
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

        {/* Projects Grid */}
        <AnimateGroup className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {hasSanityProjects
            ? projects.slice(0, 3).map((project: Project) => (
                <Link
                  key={project.slug?.current}
                  href={`/projeler/${project.slug?.current}`}
                  className="group block relative overflow-hidden rounded-md border border-border/90 aspect-[4/3] bg-card shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  {project.mainImage ? (
                    <div className="absolute inset-0">
                      <SanityImage
                        image={project.mainImage}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/40 to-transparent group-hover:via-slate-950/60 transition-all duration-300" />
                    </div>
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-slate-900 to-slate-950 flex flex-col justify-end p-6 text-white">
                      <RiBuilding4Line size={32} className="text-white/60 mb-2" />
                    </div>
                  )}

                  <div className="absolute bottom-0 inset-x-0 p-6 z-10 flex flex-col justify-end">
                    <h3 className="font-heading font-bold text-xl text-white group-hover:text-primary-foreground transition-colors duration-200 line-clamp-2">
                      {project.title}
                    </h3>
                    <div className="mt-2 flex items-center text-white/80 font-medium text-xs tracking-wider uppercase gap-1 group-hover:text-white transition-colors">
                      <span>Projeyi İncele</span>
                      <RiArrowRightLine size={14} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))
            : fallbackProjects.map((project, i) => (
                <Link
                  key={i}
                  href="/projeler"
                  className="group block relative overflow-hidden rounded-md border border-border/90 aspect-[4/3] bg-gradient-to-br from-slate-900 via-primary/90 to-slate-950 shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1 p-6 flex flex-col justify-between text-white"
                >
                  <div className="flex items-center justify-between text-xs font-semibold text-white/70 uppercase tracking-widest">
                    <span>{project.category}</span>
                    <span>{project.location}</span>
                  </div>

                  <div>
                    <h3 className="font-heading font-bold text-xl text-white mb-2 group-hover:underline underline-offset-4">
                      {project.title}
                    </h3>
                    <div className="flex items-center text-white/80 font-medium text-xs tracking-wider uppercase gap-1">
                      <span>Projeyi İncele</span>
                      <RiArrowRightLine size={14} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
        </AnimateGroup>

        {/* View All Button */}
        <FadeIn delay={0.25} className="text-center pt-12">
          <Button variant="outline" size="lg" className="h-11 px-6 rounded-md font-semibold gap-2" render={<Link href="/projeler" />}>
            Tüm Projelerimizi Gör
            <RiArrowRightLine size={18} />
          </Button>
        </FadeIn>
      </div>
    </section>
  );
}

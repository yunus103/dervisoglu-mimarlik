import { FadeIn } from "@/components/ui/FadeIn";
import { SanityImage } from "@/components/ui/SanityImage";
import { AnimateGroup } from "@/components/ui/AnimateGroup";
import Link from "next/link";
import { Project } from "@/types";

interface ProjectsSectionProps {
  title?: string;
  subtitle?: string;
  /** Sanity'de alan tanımsızsa GROQ null döner; bu yüzden null da kabul edilir. */
  projects?: Project[] | null;
}

/**
 * Öne çıkan projeler. İçeriğin tamamı Sanity'den gelir; proje tanımlı
 * değilse bölüm hiç render edilmez.
 */
export function ProjectsSection({
  title,
  subtitle,
  projects,
}: ProjectsSectionProps) {
  const list = (projects ?? []).slice(0, 3);

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
          {list.map((project: Project) => (
            <Link
              key={project.slug?.current}
              href={`/projeler/${project.slug?.current ?? ""}`}
              className="group flex flex-col focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
                {project.mainImage?.asset && (
                  <SanityImage
                    image={project.mainImage}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                )}
              </div>

              <div className="flex items-baseline gap-4 border-t border-border pt-4">
                <h3 className="display flex-1 text-xl font-bold leading-snug text-foreground transition-colors group-hover:text-primary">
                  {project.title}
                </h3>
                <span
                  aria-hidden
                  className="shrink-0 text-muted-foreground transition-all group-hover:translate-x-1 group-hover:text-primary"
                >
                  →
                </span>
              </div>
            </Link>
          ))}
        </AnimateGroup>

        <FadeIn delay={0.2}>
          <Link
            href="/projeler"
            className="mt-14 inline-block border-b-2 border-primary pb-1 text-base font-semibold text-primary transition-opacity hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
          >
            Tüm projeler
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}

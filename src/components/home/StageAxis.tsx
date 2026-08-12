import { timelineStages } from "./timeline-data";

/**
 * Hero'nun alt kenarındaki aşama şeridi. Sayfanın kurgusunu tek bakışta
 * gösterir ve süreç bölümündeki ilgili aşamaya atlayan gerçek bir
 * navigasyondur. Sembol kullanılmaz; sıra numarası ve dikey ayraçlar yeterlidir.
 */
export function StageAxis() {
  return (
    <nav aria-label="Proje aşamaları" className="border-t border-white/20">
      <ol className="mx-auto grid max-w-[1400px] grid-cols-5">
        {timelineStages.map((stage) => (
          <li key={stage.number}>
            <a
              href={`#asama-${stage.number}`}
              className="group flex h-full flex-col gap-1.5 border-l border-white/15 px-3 py-5 transition-colors first:border-l-0 hover:bg-white/10 focus-visible:bg-white/10 focus-visible:outline-none sm:px-5"
            >
              <span className="data text-white/50 transition-colors group-hover:text-white/80">
                {stage.number}
              </span>
              <span className="text-sm font-medium text-white/85 transition-colors group-hover:text-white sm:text-base">
                {stage.shortName}
              </span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

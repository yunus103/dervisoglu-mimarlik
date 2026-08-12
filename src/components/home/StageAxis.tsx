import { ProcessStep } from "@/types";

interface StageAxisProps {
  /** Sanity'de alan tanımsızsa GROQ null döner; bu yüzden null da kabul edilir. */
  stages?: ProcessStep[] | null;
}

/**
 * Hero'nun alt kenarındaki aşama şeridi. Sayfanın kurgusunu tek bakışta
 * gösterir ve süreç bölümündeki ilgili aşamaya atlayan gerçek bir
 * navigasyondur. Aşamalar Sanity'deki "Süreç Aşamaları" listesinden gelir.
 */
export function StageAxis({ stages }: StageAxisProps) {
  const list = stages ?? [];
  if (list.length === 0) return null;

  return (
    <nav aria-label="Proje aşamaları" className="border-t border-white/20">
      {/* Sütun sayısı aşama sayısına göre kendini ayarlar */}
      <ol className="mx-auto grid auto-cols-fr grid-flow-col max-w-[1400px]">
        {list.map((stage, i) => {
          const number = stage.stepNumber || String(i + 1).padStart(2, "0");
          return (
            <li key={number}>
              <a
                href={`#asama-${number}`}
                className="group flex h-full flex-col gap-1.5 border-l border-white/15 px-3 py-5 transition-colors first:border-l-0 hover:bg-white/10 focus-visible:bg-white/10 focus-visible:outline-none sm:px-5"
              >
                <span className="data text-white/50 transition-colors group-hover:text-white/80">
                  {number}
                </span>
                {stage.shortName && (
                  <span className="text-sm font-medium text-white/85 transition-colors group-hover:text-white sm:text-base">
                    {stage.shortName}
                  </span>
                )}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

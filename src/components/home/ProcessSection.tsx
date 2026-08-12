import { FadeIn } from "@/components/ui/FadeIn";
import { ProcessStep } from "@/types";

interface ProcessSectionProps {
  title?: string;
  subtitle?: string;
  /** Sanity'de alan tanımsızsa GROQ null döner; bu yüzden null da kabul edilir. */
  steps?: ProcessStep[] | null;
  teamLabel?: string;
  deliverableLabel?: string;
  footerNote?: string;
}

/**
 * Sayfanın omurgası. Süreç, adım kartları yerine sıralı bir aşama listesi
 * olarak verilir: her aşamada görev alan ekip, teslim edilen belge ve o
 * aşamada akla gelen sorunun cevabı aynı satırda yer alır.
 * İçeriğin tamamı Sanity'deki Ana Sayfa dokümanından gelir.
 */
export function ProcessSection({
  title,
  subtitle,
  steps,
  teamLabel,
  deliverableLabel,
  footerNote,
}: ProcessSectionProps) {
  const list = steps ?? [];
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

        <ol className="mt-16 md:mt-20">
          {list.map((stage, i) => {
            const number = stage.stepNumber || String(i + 1).padStart(2, "0");
            return (
              <li key={number} id={`asama-${number}`} className="scroll-mt-24">
                <FadeIn direction="up" delay={0.05}>
                  <div className="grid grid-cols-1 gap-y-6 border-t border-border py-10 md:grid-cols-12 md:gap-x-10 lg:py-12">
                    {/* Sıra numarası */}
                    <div className="md:col-span-2">
                      <span className="data font-semibold text-primary">Aşama {number}</span>
                    </div>

                    {/* Ne yapılır */}
                    <div className="md:col-span-5">
                      <h3 className="display text-xl font-bold leading-snug text-foreground lg:text-2xl">
                        {stage.title}
                      </h3>
                      {stage.description && (
                        <p className="mt-3 max-w-prose text-base leading-relaxed text-muted-foreground">
                          {stage.description}
                        </p>
                      )}
                    </div>

                    {/* Kim yürütür, ne teslim edilir, ilgili soru */}
                    <div className="md:col-span-5">
                      {(stage.team || stage.deliverable) && (
                        <dl className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:gap-6">
                          {stage.team && (
                            <div>
                              <dt className="data text-muted-foreground">{teamLabel}</dt>
                              <dd className="mt-2 text-sm font-medium leading-snug text-foreground">
                                {stage.team}
                              </dd>
                            </div>
                          )}
                          {stage.deliverable && (
                            <div>
                              <dt className="data text-muted-foreground">{deliverableLabel}</dt>
                              <dd className="mt-2 text-sm font-medium leading-snug text-foreground">
                                {stage.deliverable}
                              </dd>
                            </div>
                          )}
                        </dl>
                      )}

                      {stage.question && (
                        <div className="mt-6 border-l-2 border-primary/25 pl-4">
                          <p className="text-sm font-semibold text-foreground">{stage.question}</p>
                          {stage.answer && (
                            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                              {stage.answer}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </FadeIn>
              </li>
            );
          })}
        </ol>

        {footerNote && (
          <div className="border-t border-border pt-6">
            <p className="text-sm leading-relaxed text-muted-foreground">{footerNote}</p>
          </div>
        )}
      </div>
    </section>
  );
}

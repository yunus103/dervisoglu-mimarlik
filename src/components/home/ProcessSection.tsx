import { FadeIn } from "@/components/ui/FadeIn";
import { timelineStages } from "./timeline-data";
import { ProcessStep } from "@/types";

interface ProcessSectionProps {
  title?: string;
  subtitle?: string;
  steps?: ProcessStep[];
}

/**
 * Sayfanın omurgası. Süreç, adım kartları yerine sıralı bir aşama listesi
 * olarak verilir: her aşamada görev alan ekip, teslim edilen belge ve o
 * aşamada akla gelen sorunun cevabı aynı satırda yer alır.
 */
export function ProcessSection({
  title = "Proje Sürecimiz",
  subtitle = "Arsanın imar durumunun çıkarılmasından yapı kullanma izninin alınmasına kadar yürütülen aşamalar, her aşamada görev alan ekip ve teslim edilen belgeler aşağıda yer almaktadır.",
}: ProcessSectionProps) {
  return (
    <section className="border-t border-border bg-background py-20 md:py-28">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-8 lg:px-12">
        <FadeIn direction="up">
          <h2 className="display text-3xl font-extrabold leading-[1.05] text-primary sm:text-4xl lg:text-5xl">
            {title}
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {subtitle}
          </p>
        </FadeIn>

        <ol className="mt-16 md:mt-20">
          {timelineStages.map((stage) => (
            <li key={stage.number} id={`asama-${stage.number}`} className="scroll-mt-24">
              <FadeIn direction="up" delay={0.05}>
                <div className="grid grid-cols-1 gap-y-6 border-t border-border py-10 md:grid-cols-12 md:gap-x-10 lg:py-12">
                  {/* Sıra numarası */}
                  <div className="md:col-span-2">
                    <span className="data font-semibold text-primary">
                      Aşama {stage.number}
                    </span>
                  </div>

                  {/* Ne yapılır */}
                  <div className="md:col-span-5">
                    <h3 className="display text-xl font-bold leading-snug text-foreground lg:text-2xl">
                      {stage.title}
                    </h3>
                    <p className="mt-3 max-w-prose text-base leading-relaxed text-muted-foreground">
                      {stage.description}
                    </p>
                  </div>

                  {/* Kim yürütür, ne teslim edilir, ilgili soru */}
                  <div className="md:col-span-5">
                    <dl className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:gap-6">
                      <div>
                        <dt className="data text-muted-foreground">Yürüten ekip</dt>
                        <dd className="mt-2 text-sm font-medium leading-snug text-foreground">
                          {stage.team}
                        </dd>
                      </div>
                      <div>
                        <dt className="data text-muted-foreground">Teslim edilen</dt>
                        <dd className="mt-2 text-sm font-medium leading-snug text-foreground">
                          {stage.deliverable}
                        </dd>
                      </div>
                    </dl>

                    <div className="mt-6 border-l-2 border-primary/25 pl-4">
                      <p className="text-sm font-semibold text-foreground">{stage.question}</p>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {stage.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </li>
          ))}
        </ol>

        <div className="border-t border-border pt-6">
          <p className="text-sm leading-relaxed text-muted-foreground">
            Aşamaların tamamı Dervişoğlu Mimarlık bünyesindeki ekipler tarafından yürütülür.
            Süreler proje ölçeğine göre değişiklik gösterir ve sözleşmede tarihleriyle tanımlanır.
          </p>
        </div>
      </div>
    </section>
  );
}

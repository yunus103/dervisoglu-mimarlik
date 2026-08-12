import { Metadata } from "next";
import { cachedFetch } from "@/sanity/lib/client";
import { contactPageQuery } from "@/sanity/lib/queries";
import { buildMetadata, getLayoutData } from "@/lib/seo";
import { FadeIn } from "@/components/ui/FadeIn";
import { ContactForm } from "@/components/forms/ContactForm";
import { PageHero } from "@/components/layout/PageHero";
import { ContactPage as ContactPageType } from "@/types";

export async function generateMetadata(): Promise<Metadata> {
  const data = await cachedFetch<ContactPageType>(contactPageQuery, {}, { next: { tags: ["contact"] } });
  return buildMetadata({
    title: data?.heroTitle || data?.pageTitle || "İletişim",
    canonicalPath: "/iletisim",
    pageSeo: data?.seo,
  });
}

export default async function ContactPage() {
  const [data, { settings }] = await Promise.all([
    cachedFetch<ContactPageType>(contactPageQuery, {}, { next: { tags: ["contact"] } }),
    getLayoutData(),
  ]);

  const contact = settings?.contactInfo;
  const whatsappHref = contact?.whatsappNumber
    ? `https://wa.me/${contact.whatsappNumber.replace(/\D/g, "")}`
    : undefined;

  /** Yalnızca Site Ayarları'nda dolu olan kanallar listelenir. */
  const channels = [
    contact?.phone && {
      label: "Telefon",
      value: contact.phone,
      href: `tel:${contact.phone.replace(/\s/g, "")}`,
    },
    whatsappHref && {
      label: "WhatsApp",
      value: contact?.whatsappNumber,
      href: whatsappHref,
    },
    contact?.email && {
      label: "E-posta",
      value: contact.email,
      href: `mailto:${contact.email}`,
    },
    contact?.address && {
      label: "Adres",
      value: contact.address,
      href: undefined,
    },
    data?.workingHours && {
      label: "Çalışma saatleri",
      value: data.workingHours,
      href: undefined,
    },
  ].filter(Boolean) as { label: string; value: string; href?: string }[];

  return (
    <>
      <PageHero
        title={data?.heroTitle || data?.pageTitle || "İletişim"}
        subtitle={data?.heroSubtitle || data?.pageSubtitle}
        backgroundImage={data?.heroImage}
      />

      <section className="border-b border-border bg-background py-20 md:py-28">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 gap-x-16 gap-y-16 lg:grid-cols-12">
            {/* Form */}
            <FadeIn direction="up" className="lg:col-span-7">
              <ContactForm
                formTitle={data?.formTitle}
                successMessage={data?.successMessage}
              />
            </FadeIn>

            {/* Doğrudan kanallar */}
            {channels.length > 0 && (
              <FadeIn direction="up" delay={0.1} className="lg:col-span-5">
                <div>
                  {data?.directTitle && (
                    <h2 className="display border-b-2 border-primary pb-3 text-lg font-bold text-primary">
                      {data.directTitle}
                    </h2>
                  )}

                  <dl>
                    {channels.map((channel) => (
                      <div key={channel.label} className="border-b border-border py-5">
                        <dt className="data text-muted-foreground">{channel.label}</dt>
                        <dd className="mt-2 text-base font-medium text-foreground">
                          {channel.href ? (
                            <a
                              href={channel.href}
                              target={channel.href.startsWith("http") ? "_blank" : undefined}
                              rel={channel.href.startsWith("http") ? "noopener noreferrer" : undefined}
                              className="underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                            >
                              {channel.value}
                            </a>
                          ) : (
                            channel.value
                          )}
                        </dd>
                      </div>
                    ))}
                  </dl>

                  {data?.responseNote && (
                    <p className="mt-6 border-l-2 border-primary/25 pl-4 text-sm leading-relaxed text-muted-foreground">
                      {data.responseNote}
                    </p>
                  )}
                </div>
              </FadeIn>
            )}
          </div>
        </div>
      </section>

      {/* Harita — kenardan kenara, Site Ayarları'ndaki harita kodundan */}
      {contact?.mapIframe && (
        <section>
          {data?.mapTitle && (
            <div className="mx-auto max-w-[1400px] px-4 pt-16 pb-8 sm:px-8 lg:px-12">
              <h2 className="display text-2xl font-extrabold text-primary sm:text-3xl">
                {data.mapTitle}
              </h2>
            </div>
          )}
          <div
            className="h-[380px] w-full bg-muted md:h-[460px] [&_iframe]:h-full [&_iframe]:w-full [&_iframe]:border-0"
            dangerouslySetInnerHTML={{ __html: contact.mapIframe }}
          />
        </section>
      )}
    </>
  );
}

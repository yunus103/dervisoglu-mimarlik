import Link from "next/link";
import {
  FaInstagram,
  FaFacebook,
  FaLinkedin,
  FaYoutube,
  FaTiktok,
  FaPinterest,
  FaWhatsapp,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { SanityImage } from "@/components/ui/SanityImage";

import { SiteSettings, Navigation } from "@/types";

type NavItem = {
  label: string;
  href: string;
  openInNewTab?: boolean;
};

type SocialLink = {
  platform: string;
  url: string;
};

/** Sosyal medya ikonları, marka tanınırlığı için bilinçli olarak korunur. */
const socialIconMap: Record<string, React.ElementType> = {
  instagram: FaInstagram,
  facebook: FaFacebook,
  twitter: FaXTwitter,
  linkedin: FaLinkedin,
  youtube: FaYoutube,
  tiktok: FaTiktok,
  pinterest: FaPinterest,
  whatsapp: FaWhatsapp,
};

const defaultFooterLinks: NavItem[] = [
  { label: "Hakkımızda", href: "/hakkimizda" },
  { label: "Hizmetlerimiz", href: "/hizmetler" },
  { label: "Projelerimiz", href: "/projeler" },
  { label: "Blog & Haberler", href: "/blog" },
  { label: "İletişim", href: "/iletisim" },
];

function resolveHref(item: NavItem): string {
  return item.href || "#";
}

export function Footer({ settings, navigation }: { settings: SiteSettings; navigation: Navigation }) {
  const baseFooterLinks = navigation?.footerLinks && navigation.footerLinks.length > 0
    ? navigation.footerLinks
    : defaultFooterLinks;

  // Dynamically filter footer links based on siteSettings
  const rawFooterLinks = baseFooterLinks.filter((item) => {
    const href = resolveHref(item);
    if (href === "/projeler" && settings?.enableProjectsPage === false) return false;
    if (href === "/blog" && settings?.enableBlogPage === false) return false;
    return true;
  });

  const socialLinks: SocialLink[] = (settings?.socialLinks || []).filter((s: SocialLink) => s.url);
  const contact = settings?.contactInfo;
  const currentYear = new Date().getFullYear();
  const siteName = settings?.siteName || "Dervişoğlu Mimarlık";
  const siteTagline = settings?.siteTagline;

  /** İletişim satırları; yalnızca Site Ayarları'nda dolu olanlar listelenir. */
  const contactRows = [
    contact?.address && { label: "Adres", value: contact.address, href: undefined },
    contact?.phone && {
      label: "Telefon",
      value: contact.phone,
      href: `tel:${contact.phone.replace(/\s/g, "")}`,
    },
    contact?.email && {
      label: "E-posta",
      value: contact.email,
      href: `mailto:${contact.email}`,
    },
    contact?.whatsappNumber && {
      label: "WhatsApp",
      value: contact.whatsappNumber,
      href: `https://wa.me/${contact.whatsappNumber.replace(/\D/g, "")}`,
    },
  ].filter(Boolean) as { label: string; value: string; href?: string }[];

  return (
    <footer className="border-t border-border bg-background text-foreground">
      <div className="mx-auto max-w-[1400px] px-4 py-16 sm:px-8 lg:px-12 md:py-20">
        <div className="grid grid-cols-1 gap-x-12 gap-y-12 md:grid-cols-12">
          {/* Marka */}
          <div className="md:col-span-5">
            <Link href="/" className="inline-flex items-center">
              {settings?.logo?.asset ? (
                <SanityImage
                  image={settings.logo}
                  width={600}
                  height={160}
                  fit="max"
                  className="h-14 w-auto object-contain object-left"
                />
              ) : (
                <span className="flex flex-col leading-none">
                  <span className="display text-2xl font-extrabold tracking-tight text-primary">
                    {siteName}
                  </span>
                  {siteTagline && (
                    <span className="data mt-2 text-muted-foreground">{siteTagline}</span>
                  )}
                </span>
              )}
            </Link>

            {settings?.footerDescription && (
              <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground">
                {settings.footerDescription}
              </p>
            )}

            {socialLinks.length > 0 && (
              <div className="mt-8 flex flex-wrap gap-3">
                {socialLinks.map((social, i) => {
                  const Icon = socialIconMap[social.platform.toLowerCase()];
                  if (!Icon) return null;
                  return (
                    <a
                      key={i}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.platform}
                      className="flex h-10 w-10 items-center justify-center border border-border text-muted-foreground transition-colors hover:border-primary hover:bg-primary hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                    >
                      <Icon size={16} />
                    </a>
                  );
                })}
              </div>
            )}
          </div>

          {/* Bağlantılar */}
          <div className="md:col-span-3">
            <h2 className="display border-b-2 border-primary pb-3 text-sm font-bold uppercase tracking-wide text-primary">
              Sayfalar
            </h2>
            <nav>
              {rawFooterLinks.map((item, i) => (
                <Link
                  key={i}
                  href={resolveHref(item)}
                  target={item.openInNewTab ? "_blank" : undefined}
                  rel={item.openInNewTab ? "noopener noreferrer" : undefined}
                  className="block border-b border-border py-3.5 text-sm text-muted-foreground transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* İletişim */}
          {contactRows.length > 0 && (
            <div className="md:col-span-4">
              <h2 className="display border-b-2 border-primary pb-3 text-sm font-bold uppercase tracking-wide text-primary">
                İletişim
              </h2>
              <dl>
                {contactRows.map((row) => (
                  <div key={row.label} className="border-b border-border py-4">
                    <dt className="data text-muted-foreground">{row.label}</dt>
                    <dd className="mt-1.5 text-sm leading-snug text-foreground">
                      {row.href ? (
                        <a
                          href={row.href}
                          target={row.href.startsWith("http") ? "_blank" : undefined}
                          rel={row.href.startsWith("http") ? "noopener noreferrer" : undefined}
                          className="underline-offset-4 transition-colors hover:text-primary hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                        >
                          {row.value}
                        </a>
                      ) : (
                        row.value
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
        </div>

        {/* Telif */}
        <div className="mt-14 flex flex-col items-start justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <p>
            © {currentYear} {siteName}. Tüm hakları saklıdır.
          </p>
          <Link
            href="/iletisim"
            className="transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Gizlilik &amp; İletişim
          </Link>
        </div>
      </div>
    </footer>
  );
}

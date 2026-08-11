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
import { RiMailLine, RiPhoneLine, RiMapPinLine, RiArrowRightSLine } from "react-icons/ri";

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
  const rawFooterLinks = navigation?.footerLinks && navigation.footerLinks.length > 0
    ? navigation.footerLinks
    : defaultFooterLinks;
  
  const socialLinks: SocialLink[] = (settings?.socialLinks || []).filter((s: SocialLink) => s.url);
  const contact = settings?.contactInfo;
  const currentYear = new Date().getFullYear();
  const siteName = settings?.siteName || "Dervişoğlu Mimarlık";
  const siteTagline = settings?.siteTagline || "Mimari Tasarım & Uygulama";

  return (
    <footer className="border-t border-border bg-slate-50/50 text-foreground">
      <div className="container mx-auto px-4 lg:px-8 py-14">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">

          {/* Marka & Tanıtım (Col 5) */}
          <div className="md:col-span-5 space-y-4 pr-0 md:pr-6">
            <div className="flex flex-col">
              <span className="font-heading font-bold text-2xl tracking-tight text-primary leading-none">
                {siteName}
              </span>
              {siteTagline && (
                <span className="text-xs font-semibold tracking-[0.2em] text-secondary uppercase mt-1">
                  {siteTagline}
                </span>
              )}
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed max-w-md">
              Köklü deneyim ve çağdaş estetik anlayışıyla; konut, ticari ve kamu yapılarında mimari tasarımdan mühendislik ve anahtar teslim inşaat uygulamalarına kadar bütüncül çözümler sunuyoruz.
            </p>

            {/* Social Links */}
            {socialLinks.length > 0 && (
              <div className="pt-2">
                <div className="flex flex-wrap gap-2">
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
                        className="flex h-9 w-9 items-center justify-center rounded-md border border-border bg-background text-muted-foreground hover:bg-primary hover:text-white hover:border-primary transition-all duration-200 shadow-2xs"
                      >
                        <Icon size={16} />
                      </a>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Hızlı Bağlantılar (Col 3) */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="font-heading text-base font-semibold text-foreground tracking-wide">
              Hızlı Bağlantılar
            </h4>
            <nav className="flex flex-col space-y-2.5">
              {rawFooterLinks.map((item, i) => (
                <Link
                  key={i}
                  href={resolveHref(item)}
                  target={item.openInNewTab ? "_blank" : undefined}
                  rel={item.openInNewTab ? "noopener noreferrer" : undefined}
                  className="group flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors duration-150"
                >
                  <RiArrowRightSLine className="size-4 text-muted-foreground/60 transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* İletişim Bilgileri (Col 4) */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="font-heading text-base font-semibold text-foreground tracking-wide">
              İletişim & Ofis
            </h4>
            <div className="space-y-3 text-sm">
              {contact?.address && (
                <div className="flex items-start gap-3 text-muted-foreground">
                  <RiMapPinLine className="shrink-0 size-5 text-secondary mt-0.5" />
                  <span className="leading-snug">{contact.address}</span>
                </div>
              )}
              {contact?.phone && (
                <a
                  href={`tel:${contact.phone}`}
                  className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                >
                  <RiPhoneLine className="shrink-0 size-5 text-secondary" />
                  <span>{contact.phone}</span>
                </a>
              )}
              {contact?.email && (
                <a
                  href={`mailto:${contact.email}`}
                  className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                >
                  <RiMailLine className="shrink-0 size-5 text-secondary" />
                  <span>{contact.email}</span>
                </a>
              )}
              {contact?.whatsappNumber && (
                <a
                  href={`https://wa.me/${contact.whatsappNumber.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-muted-foreground hover:text-emerald-600 transition-colors"
                >
                  <FaWhatsapp className="shrink-0 size-5 text-emerald-600" />
                  <span>WhatsApp ile İletişime Geçin</span>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Alt Telif Satırı */}
        <div className="mt-12 border-t border-border/80 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p className="text-center sm:text-left">
            © {currentYear} {siteName}. Tüm hakları saklıdır.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/iletisim" className="hover:text-primary transition-colors">
              Gizlilik & İletişim
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { SanityImage } from "@/components/ui/SanityImage";
import { QuickQuoteModal } from "@/components/forms/QuickQuoteModal";
import { RiMenu3Line, RiCloseLine, RiArrowDownSLine } from "react-icons/ri";
import { cn } from "@/lib/utils";

import { SiteSettings, Navigation, NavItem } from "@/types";

function resolveHref(item: NavItem): string {
  return item.href || "#";
}

const defaultNavLinks: NavItem[] = [
  { label: "Hakkımızda", href: "/hakkimizda" },
  { label: "Hizmetler", href: "/hizmetler" },
  { label: "Çalışma Sürecimiz", href: "/surec" },
  { label: "Projeler", href: "/projeler" },
  { label: "Blog", href: "/blog" },
  { label: "İletişim", href: "/iletisim" },
];

export function Header({ settings, navigation }: { settings: SiteSettings; navigation: Navigation }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isHome = pathname === "/";
  /** Ana sayfada, henüz kaydırılmamışken header koyu hero'nun üzerinde şeffaf durur. */
  const overlay = isHome && !scrolled && !menuOpen;

  const phone = settings?.contactInfo?.phone;

  const baseLinks: NavItem[] = navigation?.headerLinks && navigation.headerLinks.length > 0
    ? navigation.headerLinks
    : defaultNavLinks;

  // Sanity enableProjectsPage & enableBlogPage switchlerine göre dinamik filtreleme
  const rawLinks = baseLinks.filter((item) => {
    const href = resolveHref(item);
    if (href === "/projeler" && settings?.enableProjectsPage === false) return false;
    if (href === "/blog" && settings?.enableBlogPage === false) return false;
    return true;
  });

  useEffect(() => {
    if (!isHome) return;
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [menuOpen]);

  const isActive = (item: NavItem) => {
    const href = resolveHref(item);
    if (href === "/" && pathname !== "/") return false;
    return pathname.startsWith(href);
  };

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 w-full transition-colors duration-300",
          overlay
            ? "border-b border-white/15 bg-transparent text-white"
            : "border-b border-border bg-background/95 text-foreground backdrop-blur-md supports-[backdrop-filter]:bg-background/85"
        )}
      >
        <div className="mx-auto flex h-20 max-w-[1400px] items-center justify-between px-4 sm:px-8 lg:px-12">
          {/* Logo */}
          <Link href="/" className="flex h-full items-center py-4">
            {settings?.logo ? (
              <SanityImage
                image={settings.logo}
                width={600}
                height={160}
                fit="max"
                className={cn(
                  "h-full max-h-12 w-auto object-contain object-left transition-[filter] duration-300",
                  overlay && "brightness-0 invert"
                )}
                priority
              />
            ) : (
              <span className="flex flex-col leading-none">
                <span className="display text-xl font-extrabold tracking-tight md:text-2xl">
                  DERVİŞOĞLU
                </span>
                <span className="data mt-1 opacity-70">Mimarlık &amp; İnşaat</span>
              </span>
            )}
          </Link>

          {/* Masaüstü navigasyon */}
          <nav className="hidden items-center gap-8 md:flex">
            {rawLinks.map((item, i) => (
              <DesktopNavItem key={i} item={item} active={isActive(item)} overlay={overlay} />
            ))}
          </nav>

          {/* Telefon + teklif + mobil menü */}
          <div className="flex items-center gap-5">
            {phone && (
              <a
                href={`tel:${phone.replace(/\s/g, "")}`}
                className="hidden text-base font-semibold tabular-nums underline-offset-4 hover:underline lg:block"
              >
                {phone}
              </a>
            )}

            <button
              type="button"
              onClick={() => setQuoteModalOpen(true)}
              className={cn(
                "hidden cursor-pointer px-6 py-3 text-sm font-semibold transition-colors sm:inline-flex",
                overlay
                  ? "bg-white text-primary hover:bg-white/90"
                  : "bg-primary text-primary-foreground hover:opacity-90"
              )}
            >
              Teklif Al
            </button>

            <button
              type="button"
              className="-mr-2 flex h-10 w-10 items-center justify-center md:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menüyü aç/kapat"
              aria-expanded={menuOpen}
            >
              {menuOpen ? <RiCloseLine size={24} /> : <RiMenu3Line size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/*
        Mobil menü — tam ekran. Header'ın DIŞINDA, ayrı bir kardeş eleman olarak
        render edilir: header açıkken `backdrop-blur` sınıfı alıyor, bu da CSS'te
        `position: fixed` alt elemanlar için header'ı yeni bir konumlandırma
        referansı (containing block) yapıyor. Menü header'ın içinde kalsaydı,
        "fixed" konumlandırması viewport yerine 80px yükseklikteki header
        kutusuna göre hesaplanır ve menü küçük bir kutuya sıkışırdı.
      */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="fixed inset-x-0 top-20 bottom-0 z-40 flex flex-col bg-primary text-white md:hidden"
          >
            <nav className="flex flex-1 flex-col justify-center overflow-y-auto px-6 sm:px-8">
              {rawLinks.map((item, i) => (
                <div key={i} className="border-b border-white/15">
                  <Link
                    href={resolveHref(item)}
                    className={cn(
                      "display block py-4 text-2xl font-bold leading-tight transition-colors",
                      isActive(item) ? "text-white" : "text-white/85"
                    )}
                  >
                    {item.label}
                  </Link>
                  {item.subLinks && item.subLinks.length > 0 && (
                    <div className="flex flex-col pb-4">
                      {item.subLinks.map((sub, j) => (
                        <Link
                          key={j}
                          href={resolveHref(sub)}
                          className={cn(
                            "py-2 text-base transition-colors",
                            isActive(sub) ? "text-white" : "text-white/60"
                          )}
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            <div className="border-t border-white/15 px-6 py-6 sm:px-8">
              {phone && (
                <a
                  href={`tel:${phone.replace(/\s/g, "")}`}
                  className="block py-2 text-xl font-semibold tabular-nums text-white underline-offset-4 hover:underline"
                >
                  {phone}
                </a>
              )}
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  setQuoteModalOpen(true);
                }}
                className="mt-4 w-full cursor-pointer bg-white px-6 py-4 text-base font-semibold text-primary transition-opacity hover:opacity-90"
              >
                Teklif Al
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <QuickQuoteModal isOpen={quoteModalOpen} onClose={() => setQuoteModalOpen(false)} />
    </>
  );
}

function DesktopNavItem({
  item,
  active,
  overlay,
}: {
  item: NavItem;
  active: boolean;
  overlay: boolean;
}) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const isSubActive = item.subLinks?.some((sub) => pathname === resolveHref(sub));
  const reallyActive = active || isSubActive;

  const linkClass = cn(
    "group relative py-2 text-base transition-opacity hover:opacity-100",
    reallyActive ? "font-semibold opacity-100" : "opacity-80"
  );

  const underline = (
    <span
      aria-hidden
      className={cn(
        "absolute bottom-0 left-0 h-px w-0 transition-all duration-300 group-hover:w-full",
        overlay ? "bg-white" : "bg-primary",
        reallyActive && "w-full"
      )}
    />
  );

  if (!item.subLinks || item.subLinks.length === 0) {
    return (
      <Link
        href={resolveHref(item)}
        target={item.openInNewTab ? "_blank" : undefined}
        rel={item.openInNewTab ? "noopener noreferrer" : undefined}
        className={linkClass}
      >
        {item.label}
        {underline}
      </Link>
    );
  }

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <Link href={resolveHref(item)} className={cn(linkClass, "flex items-center gap-1.5")}>
        {item.label}
        <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <RiArrowDownSLine size={16} />
        </motion.span>
        {underline}
      </Link>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 top-full z-50 min-w-[230px] pt-3"
          >
            <div className="border border-border bg-card text-foreground">
              {item.subLinks.map((sub, j) => {
                const subActive = pathname === resolveHref(sub);
                return (
                  <Link
                    key={j}
                    href={resolveHref(sub)}
                    target={sub.openInNewTab ? "_blank" : undefined}
                    rel={sub.openInNewTab ? "noopener noreferrer" : undefined}
                    className={cn(
                      "block border-b border-border px-5 py-3 text-sm transition-colors last:border-b-0 hover:bg-primary hover:text-white",
                      subActive ? "font-semibold text-primary" : "text-foreground"
                    )}
                  >
                    {sub.label}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

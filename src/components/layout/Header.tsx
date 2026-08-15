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

        {/* Mobil menü */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="overflow-hidden border-t border-border bg-background text-foreground md:hidden"
            >
              <nav className="mx-auto max-w-[1400px] px-4 py-2 sm:px-8">
                {rawLinks.map((item, i) => (
                  <div key={i} className="border-b border-border last:border-b-0">
                    <Link
                      href={resolveHref(item)}
                      className={cn(
                        "block py-4 text-base transition-colors hover:text-primary",
                        isActive(item) ? "font-semibold text-primary" : "text-foreground"
                      )}
                    >
                      {item.label}
                    </Link>
                    {item.subLinks && item.subLinks.length > 0 && (
                      <div className="ml-1 border-l border-border pb-3 pl-4">
                        {item.subLinks.map((sub, j) => (
                          <Link
                            key={j}
                            href={resolveHref(sub)}
                            className={cn(
                              "block py-2 text-sm transition-colors hover:text-primary",
                              isActive(sub) ? "text-primary" : "text-muted-foreground"
                            )}
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

                <div className="flex flex-col gap-3 py-5">
                  {phone && (
                    <a
                      href={`tel:${phone.replace(/\s/g, "")}`}
                      className="text-lg font-semibold tabular-nums text-primary"
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
                    className="w-full cursor-pointer bg-primary px-6 py-3.5 text-base font-semibold text-primary-foreground transition-opacity hover:opacity-90"
                  >
                    Teklif Al
                  </button>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

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

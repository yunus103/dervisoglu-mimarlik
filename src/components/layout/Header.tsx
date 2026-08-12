"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { SanityImage } from "@/components/ui/SanityImage";
import { Button } from "@/components/ui/button";
import { QuickQuoteModal } from "@/components/forms/QuickQuoteModal";
import { RiMenu3Line, RiCloseLine, RiArrowDownSLine, RiSendPlaneLine } from "react-icons/ri";
import { cn } from "@/lib/utils";

import { SiteSettings, Navigation, NavItem } from "@/types";

function resolveHref(item: NavItem): string {
  return item.href || "#";
}

const defaultNavLinks: NavItem[] = [
  { label: "Hakkımızda", href: "/hakkimizda" },
  { label: "Hizmetler", href: "/hizmetler" },
  { label: "Projeler", href: "/projeler" },
  { label: "Blog", href: "/blog" },
  { label: "İletişim", href: "/iletisim" },
];

export function Header({ settings, navigation }: { settings: SiteSettings; navigation: Navigation }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);

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
    if (menuOpen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setMenuOpen(false);
    }
  }, [pathname, menuOpen, setMenuOpen]);

  const isActive = (item: NavItem) => {
    const href = resolveHref(item);
    if (href === "/" && pathname !== "/") return false;
    return pathname.startsWith(href);
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-border/80 bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/80 shadow-2xs">
        <div className="container mx-auto flex h-20 items-center justify-between px-4 lg:px-8">
          {/* Logo Section */}
          <Link href="/" className="flex items-center group h-full">
            <div className="relative flex items-center justify-start transition-transform duration-200 group-hover:scale-[1.01] active:scale-98 h-full py-4">
              {settings?.logo ? (
                <SanityImage
                  image={settings.logo}
                  width={600}
                  height={160}
                  fit="max"
                  className="h-full w-auto object-contain object-left max-h-12"
                  priority
                />
              ) : (
                <div className="flex flex-col">
                  <span className="font-heading font-bold text-xl md:text-2xl tracking-tight text-primary leading-none">
                    DERVİŞOĞLU
                  </span>
                  <span className="text-[10px] md:text-xs font-semibold tracking-[0.2em] text-secondary uppercase mt-1">
                    MİMARLIK & İNŞAAT
                  </span>
                </div>
              )}
            </div>
          </Link>

          {/* Center Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            {rawLinks.map((item, i) => (
              <DesktopNavItem key={i} item={item} active={isActive(item)} />
            ))}
          </nav>

          {/* Right Action & Mobile Button */}
          <div className="flex items-center gap-4">
            <Button
              onClick={() => setQuoteModalOpen(true)}
              className="hidden sm:inline-flex h-11 px-6 rounded-md font-semibold text-sm md:text-base tracking-wide bg-primary text-primary-foreground hover:bg-primary/90 shadow-md hover:shadow-lg transition-all duration-200 gap-2.5 cursor-pointer hover:-translate-y-[1px]"
            >
              <RiSendPlaneLine size={18} className="shrink-0" />
              Teklif Al
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden h-10 w-10 rounded-md"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menüyü aç/kapat"
            >
              {menuOpen ? <RiCloseLine size={24} /> : <RiMenu3Line size={24} />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="border-t border-border md:hidden overflow-hidden bg-background shadow-lg"
            >
              <nav className="container mx-auto flex flex-col gap-3 px-4 py-6">
                {rawLinks.map((item, i) => (
                  <div key={i} className="flex flex-col gap-1">
                    <Link
                      href={resolveHref(item)}
                      className={cn(
                        "text-base font-medium py-2 transition-colors hover:text-primary flex items-center justify-between",
                        isActive(item) ? "text-primary font-semibold" : "text-foreground/80"
                      )}
                    >
                      {item.label}
                    </Link>
                    {item.subLinks && (
                      <div className="flex flex-col gap-1 pl-4 border-l border-border ml-2 mt-1">
                        {item.subLinks.map((sub, j) => (
                          <Link
                            key={j}
                            href={resolveHref(sub)}
                            className={cn(
                              "text-sm font-medium py-1.5 transition-colors hover:text-primary",
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
                <div className="pt-4 border-t border-border">
                  <Button
                    onClick={() => {
                      setMenuOpen(false);
                      setQuoteModalOpen(true);
                    }}
                    className="w-full h-11 rounded-md font-semibold text-base gap-2 shadow-md"
                  >
                    <RiSendPlaneLine size={18} />
                    Teklif Al
                  </Button>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Quick Quote Modal */}
      <QuickQuoteModal isOpen={quoteModalOpen} onClose={() => setQuoteModalOpen(false)} />
    </>
  );
}

function DesktopNavItem({ item, active }: { item: NavItem; active: boolean }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const isSubActive = item.subLinks?.some((sub) => pathname === resolveHref(sub));
  const reallyActive = active || isSubActive;

  if (!item.subLinks || item.subLinks.length === 0) {
    return (
      <Link
        href={resolveHref(item)}
        target={item.openInNewTab ? "_blank" : undefined}
        rel={item.openInNewTab ? "noopener noreferrer" : undefined}
        className={cn(
          "group relative py-2 text-sm md:text-base font-medium transition-colors hover:text-primary",
          reallyActive ? "text-primary font-semibold" : "text-foreground/80"
        )}
      >
        {item.label}
        <span
          className={cn(
            "absolute bottom-0 left-0 h-[2px] w-0 bg-primary transition-all duration-300 group-hover:w-full",
            reallyActive && "w-full"
          )}
        />
      </Link>
    );
  }

  return (
    <div
      className="relative group"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <Link
        href={resolveHref(item)}
        className={cn(
          "relative py-2 flex items-center gap-1.5 text-sm md:text-base font-medium transition-colors hover:text-primary",
          reallyActive ? "text-primary font-semibold" : "text-foreground/80"
        )}
      >
        {item.label}
        <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <RiArrowDownSLine size={16} />
        </motion.span>
        <span
          className={cn(
            "absolute bottom-0 left-0 h-[2px] w-0 bg-primary transition-all duration-300 group-hover:w-full",
            reallyActive && "w-full"
          )}
        />
      </Link>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 top-full pt-2 min-w-[210px] z-50"
          >
            <div className="bg-card border border-border rounded-md shadow-xl p-1.5 overflow-hidden">
              {item.subLinks.map((sub, j) => {
                const subActive = pathname === resolveHref(sub);
                return (
                  <Link
                    key={j}
                    href={resolveHref(sub)}
                    target={sub.openInNewTab ? "_blank" : undefined}
                    rel={sub.openInNewTab ? "noopener noreferrer" : undefined}
                    className={cn(
                      "flex items-center px-3.5 py-2 text-sm font-medium rounded-md hover:bg-muted transition-colors",
                      subActive ? "text-primary bg-primary/5 font-semibold" : "text-foreground/80"
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

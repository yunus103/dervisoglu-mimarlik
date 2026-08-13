"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { SanityImage } from "@/components/ui/SanityImage";
import { SanityImage as SanityImageType } from "@/types";

interface SplashScreenProps {
  logo?: SanityImageType;
  siteName?: string;
  siteTagline?: string;
}

/**
 * Açılış perdesi.
 *
 * Görünürlüğü, sayfa boyanmadan önce çalışan satır içi betik tarafından
 * `<html data-splash="active">` özniteliğiyle belirlenir; bu sayede tekrar
 * gelen ziyaretçide perde bir an bile görünmez. Betik oturumda daha önce
 * gösterildiyse veya kullanıcı hareket azaltma tercih ettiyse özniteliği hiç
 * eklemez, bileşen de kendini anında kaldırır.
 *
 * Sanity'den gelen görsel logo koyu zeminde (`#0F172A`) net görünmesi için
 * CSS `brightness-0 invert` filtresi ile beyaz tonda render edilir.
 */
export function SplashScreen({ logo, siteName, siteTagline }: SplashScreenProps) {
  const [active, setActive] = useState(true);

  useEffect(() => {
    if (document.documentElement.getAttribute("data-splash") !== "active") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setActive(false);
      return;
    }
    // Perde başlar başlamaz işaretlenir; aynı oturumda tekrar gösterilmez.
    try {
      sessionStorage.setItem("dm-splash", "1");
    } catch {
      /* private mode — sessionStorage kullanılamıyorsa perde her açılışta görünür */
    }
  }, []);

  const handleDone = () => {
    document.documentElement.removeAttribute("data-splash");
    setActive(false);
  };

  if (!active) return null;

  return (
    <motion.div
      aria-hidden
      className="splash fixed inset-0 z-[100] flex-col items-center justify-center bg-[#0F172A]"
      initial={{ y: 0 }}
      animate={{ y: "-100%" }}
      transition={{ duration: 0.55, delay: 1.05, ease: [0.76, 0, 0.24, 1] }}
      onAnimationComplete={handleDone}
    >
      {logo?.asset ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35 }}
          className="flex items-center justify-center px-6"
        >
          <SanityImage
            image={logo}
            width={600}
            height={200}
            fit="max"
            className="h-16 w-auto max-w-[280px] object-contain brightness-0 invert sm:h-20 sm:max-w-[360px]"
            priority
          />
        </motion.div>
      ) : siteName ? (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35 }}
          className="display px-6 text-center text-3xl font-extrabold uppercase leading-none tracking-tight text-white sm:text-5xl"
        >
          {siteName}
        </motion.p>
      ) : null}

      {/* Site genelindeki saç teli çizgi sisteminin habercisi */}
      <motion.span
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.45, delay: 0.3, ease: "easeInOut" }}
        className="mt-7 h-px w-40 origin-left bg-white/50 sm:w-56"
      />

      {siteTagline && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35, delay: 0.65 }}
          className="data mt-7 px-6 text-center text-white/45"
        >
          {siteTagline}
        </motion.p>
      )}
    </motion.div>
  );
}

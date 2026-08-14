"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";

export function WhatsAppButton({ number }: { number: string }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 250) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const cleanNumber = number.replace(/\D/g, "");

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.a
          href={`https://wa.me/${cleanNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp ile iletişime geç"
          className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg hover:bg-green-600"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            className="absolute h-full w-full rounded-full bg-green-500 opacity-75"
            animate={{ scale: [1, 1.4, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
          />
          <FaWhatsapp size={28} className="relative z-10" />
        </motion.a>
      )}
    </AnimatePresence>
  );
}

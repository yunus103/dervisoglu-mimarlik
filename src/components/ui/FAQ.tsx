"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { JsonLd, faqPageJsonLd } from "@/components/seo/JsonLd";

type FAQItem = {
  question: string;
  answer: string;
};

export function FAQ({ items, className = "" }: { items: FAQItem[], className?: string }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  if (!items || items.length === 0) return null;

  return (
    <>
      {/* Automate FAQPage Structured Data injection */}
      <JsonLd data={faqPageJsonLd(items)} />

      <div className={className}>
        {items.map((item, index) => {
          const isOpen = activeIndex === index;
          return (
            <div key={index} className="border-t border-border last:border-b">
              <button
                onClick={() => setActiveIndex(isOpen ? null : index)}
                className="group flex w-full items-start justify-between gap-6 py-6 text-left transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                aria-expanded={isOpen}
              >
                <span className="display max-w-[46ch] text-lg font-bold leading-snug text-foreground transition-colors group-hover:text-primary md:text-xl">
                  {item.question}
                </span>
                <span
                  aria-hidden
                  className="relative mt-2 h-3 w-3 shrink-0 text-primary"
                >
                  <span className="absolute left-0 top-1/2 h-px w-3 -translate-y-1/2 bg-current" />
                  <span
                    className={`absolute left-1/2 top-0 h-3 w-px -translate-x-1/2 bg-current transition-transform duration-300 ${
                      isOpen ? "scale-y-0" : "scale-y-100"
                    }`}
                  />
                </span>
              </button>

              {/* DOM-persistent & Pure-CSS/Motion-transitioned for full search indexing */}
              <motion.div
                initial={false}
                animate={{ height: isOpen ? "auto" : 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="max-w-prose pb-7 text-base leading-relaxed text-muted-foreground">
                  {item.answer}
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>
    </>
  );
}

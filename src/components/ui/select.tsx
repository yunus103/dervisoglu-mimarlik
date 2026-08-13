import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Native <select> tabanlı sade açılır liste. Input ve Textarea ile aynı
 * yükseklik, kenarlık ve focus davranışını paylaşır; mobil cihazlarda
 * işletim sisteminin kendi seçicisini kullandığı için erişilebilir kalır.
 */
function Select({ className, children, ...props }: React.ComponentProps<"select">) {
  return (
    <span className="relative block">
      <select
        data-slot="select"
        className={cn(
          "h-12 w-full appearance-none rounded-xs border border-input bg-card px-4 pr-11 text-base text-foreground transition-colors outline-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/20",
          className
        )}
        {...props}
      >
        {children}
      </select>

      {/* Açılır liste göstergesi */}
      <span
        aria-hidden
        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground"
      >
        <svg width="12" height="8" viewBox="0 0 12 8" fill="none" aria-hidden>
          <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </span>
    </span>
  );
}

export { Select };

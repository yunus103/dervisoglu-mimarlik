"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Hatayı logla
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-screen flex-col justify-center bg-background">
      <div className="mx-auto w-full max-w-[1400px] px-4 py-24 sm:px-8 lg:px-12">
        <p className="data text-muted-foreground">Beklenmeyen hata</p>

        <h1 className="display mt-6 max-w-[18ch] text-4xl font-extrabold leading-[1.02] text-primary sm:text-5xl">
          Sayfa yüklenirken bir sorun oluştu
        </h1>

        <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
          Sayfayı yeniden yüklemeyi deneyin. Sorun sürerse doğrudan bizimle iletişime
          geçebilirsiniz.
        </p>

        <div className="mt-12 flex flex-wrap items-center gap-4">
          <button
            type="button"
            onClick={() => reset()}
            className="cursor-pointer bg-primary px-7 py-4 text-base font-semibold text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Tekrar dene
          </button>

          <Link
            href="/"
            className="border border-border px-7 py-4 text-base font-semibold text-foreground transition-colors hover:border-primary hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Ana sayfa
          </Link>
        </div>

        {process.env.NODE_ENV === "development" && (
          <pre className="mt-14 max-w-full overflow-auto border border-border bg-muted p-4 text-left text-xs">
            {error.message}
          </pre>
        )}
      </div>
    </main>
  );
}

import Link from "next/link";

const links = [
  { label: "Ana sayfa", href: "/" },
  { label: "Hizmetlerimiz", href: "/hizmetler" },
  { label: "Hakkımızda", href: "/hakkimizda" },
  { label: "İletişim", href: "/iletisim" },
];

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col justify-center bg-background">
      <div className="mx-auto w-full max-w-[1400px] px-4 py-24 sm:px-8 lg:px-12">
        <p className="data text-muted-foreground">Hata 404</p>

        <h1 className="display mt-6 max-w-[16ch] text-4xl font-extrabold leading-[1.02] text-primary sm:text-5xl lg:text-6xl">
          Aradığınız sayfa bulunamadı
        </h1>

        <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
          Sayfa taşınmış veya adres yanlış yazılmış olabilir. Aşağıdaki bağlantılardan
          devam edebilirsiniz.
        </p>

        <nav className="mt-12 max-w-md border-t border-border">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group flex items-baseline gap-4 border-b border-border py-5 transition-colors hover:bg-primary focus-visible:bg-primary focus-visible:outline-none"
            >
              <span className="display flex-1 px-1 text-lg font-bold text-foreground transition-colors group-hover:text-white group-focus-visible:text-white">
                {link.label}
              </span>
              <span
                aria-hidden
                className="shrink-0 pr-1 text-muted-foreground transition-all group-hover:translate-x-1 group-hover:text-white group-focus-visible:text-white"
              >
                →
              </span>
            </Link>
          ))}
        </nav>
      </div>
    </main>
  );
}

interface ArchitecturalMarkProps {
  className?: string;
}

/**
 * Mimari paftalardaki nirengi/referans noktası işaretinden esinlenen dekoratif
 * motif. Bölüm geçişlerinde ayraç, fotoğrafsız hizmetlerde yer tutucu ve CTA
 * zemininde filigran olarak tekrar kullanılır — tek bir görsel dilin
 * (fotoğraf yerine "çizim") site genelinde tutarlı kalması içindir.
 */
export function ArchitecturalMark({ className }: ArchitecturalMarkProps) {
  return (
    <svg viewBox="0 0 40 40" fill="none" aria-hidden className={className}>
      <path d="M20 3V14M20 26V37M3 20H14M26 20H37" stroke="currentColor" strokeWidth="1" />
      <circle cx="20" cy="20" r="7" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

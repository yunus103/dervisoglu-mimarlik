import { Service, ServiceCategoryLabels } from "@/types";

export interface ServiceGroup {
  key: string;
  label: string;
  items: Service[];
}

/**
 * Hizmetleri Sanity'deki kategori alanına göre iki başlık altında toplar.
 * Kategori başlıkları Hizmetler Sayfası dokümanından gelir; tek kaynak orasıdır.
 * Kategorisi belirtilmemiş hizmetler ilk kategoride listelenir.
 */
export function groupServicesByCategory(
  services?: Service[] | null,
  labels?: ServiceCategoryLabels | null
): ServiceGroup[] {
  // Sanity'de ilgili doküman henüz oluşturulmamışsa sorgular null döner.
  const list = services ?? [];
  const groups: ServiceGroup[] = [
    {
      key: "mimari-tasarim",
      label: labels?.categoryOneLabel || "Mimari & Tasarım Hizmetleri",
      items: [],
    },
    {
      key: "insaat-uygulama",
      label: labels?.categoryTwoLabel || "Uygulama & Yapım Süreçleri",
      items: [],
    },
  ];

  for (const service of list) {
    const target =
      service.category === "insaat-uygulama" ? groups[1] : groups[0];
    target.items.push(service);
  }

  return groups.filter((group) => group.items.length > 0);
}

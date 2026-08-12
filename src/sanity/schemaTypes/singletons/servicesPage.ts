import { defineField, defineType } from "sanity";

export const servicesPageType = defineType({
  name: "servicesPage",
  title: "Hizmetler Sayfası",
  type: "document",
  groups: [
    { name: "hero", title: "Page Hero Bölümü" },
    { name: "content", title: "Sayfa İçeriği" },
    { name: "seo", title: "SEO Ayarları" },
  ],
  fields: [
    // Page Hero Group
    defineField({ name: "heroTitle", title: "Hero Başlık", type: "string", group: "hero", initialValue: "Hizmetlerimiz", description: "Sayfa üst kısmında duracak ana başlık. Boş bırakılırsa Sayfa Başlığı kullanılır." }),
    defineField({ name: "heroSubtitle", title: "Hero Alt Başlık / Kısa Açıklama", type: "text", rows: 2, group: "hero", initialValue: "Mimari proje tasarımlarından inşaat uygulamalarına kadar tüm süreçlerde profesyonel çözüm ortağınız.", description: "Sayfa üst kısmında duracak kısa açıklama yazısı." }),
    defineField({
      name: "heroImage",
      title: "Hero Arka Plan Görseli",
      type: "image",
      group: "hero",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt Metni", type: "string" })],
      description: "Hero arka plan resmi. Yüklenmezse şık bir degrade renk arka planı kullanılır."
    }),
    // Content Group
    defineField({ name: "pageTitle", title: "Sayfa Başlığı", type: "string", group: "content", initialValue: "Hizmetlerimiz", validation: (Rule) => Rule.required() }),
    defineField({ name: "pageSubtitle", title: "Alt Başlık / Kısa Yazı", type: "text", rows: 3, group: "content", initialValue: "Uçtan uca mimarlık, tasarım ve uygulama çözümleri." }),
    defineField({
      name: "categoryOneLabel",
      title: "1. Kategori Başlığı",
      type: "string",
      group: "content",
      description: "Hizmet dokümanında \"Mimari & Tasarım\" seçilen hizmetlerin üstünde görünen başlık.",
      initialValue: "Mimari & Tasarım Hizmetleri",
    }),
    defineField({
      name: "categoryTwoLabel",
      title: "2. Kategori Başlığı",
      type: "string",
      group: "content",
      description: "Hizmet dokümanında \"İnşaat & Uygulama\" seçilen hizmetlerin üstünde görünen başlık.",
      initialValue: "İnşaat & Uygulama Hizmetleri",
    }),
    defineField({
      name: "emptyText",
      title: "Hizmet Yokken Gösterilecek Metin",
      type: "string",
      group: "content",
      initialValue: "Hizmetler yakında bu sayfada yayınlanacaktır.",
    }),
    defineField({
      name: "regionsTitle",
      title: "Hizmet Bölgeleri Başlığı",
      type: "string",
      group: "content",
      description: "Boş bırakılırsa bölgeler bölümü gizlenir.",
      initialValue: "Hizmet Bölgelerimiz",
    }),
    defineField({
      name: "regionsText",
      title: "Hizmet Bölgeleri Metni",
      type: "text",
      rows: 3,
      group: "content",
      initialValue:
        "Mimari ve tasarım hizmetlerinde merkezimiz Arnavutköy olmak üzere tüm Marmara Bölgesi'nde; inşaat ve uygulama işlerinde ise Marmara Bölgesi genelinde hizmet vermekteyiz.",
    }),
    defineField({
      name: "ctaTitle",
      title: "CTA Başlığı",
      type: "string",
      group: "content",
      initialValue: "Projeniz İçin Görüşelim",
    }),
    defineField({
      name: "ctaText",
      title: "CTA Açıklaması",
      type: "text",
      rows: 3,
      group: "content",
      initialValue:
        "Arsanız veya mevcut yapınız için hangi hizmetin uygun olduğunu birlikte belirleyelim.",
    }),
    defineField({ name: "ctaLabel", title: "CTA Buton Metni", type: "string", group: "content", initialValue: "İletişime Geçin", description: "Boş bırakılırsa CTA butonu gizlenir" }),
    defineField({ name: "ctaLink", title: "CTA Buton Linki", type: "string", group: "content", initialValue: "/iletisim" }),
    // SEO Group
    defineField({ name: "seo", title: "SEO", type: "seo", group: "seo" }),
  ],
});

import { defineField, defineType } from "sanity";

export const contactPageType = defineType({
  name: "contactPage",
  title: "İletişim Sayfası",
  type: "document",
  groups: [
    { name: "hero", title: "Page Hero Bölümü" },
    { name: "content", title: "Sayfa İçeriği" },
    { name: "seo", title: "SEO Ayarları" },
  ],
  fields: [
    // Page Hero Group
    defineField({ name: "heroTitle", title: "Hero Başlık", type: "string", group: "hero", initialValue: "İletişim", description: "Sayfa üst kısmında duracak ana başlık. Boş bırakılırsa Sayfa Başlığı kullanılır." }),
    defineField({ name: "heroSubtitle", title: "Hero Alt Başlık / Kısa Açıklama", type: "text", rows: 2, group: "hero", initialValue: "Projeleriniz ve sorularınız için bizimle iletişime geçin.", description: "Sayfa üst kısmında duracak kısa açıklama yazısı." }),
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
    defineField({ name: "pageTitle", title: "Sayfa Başlığı", type: "string", group: "content", initialValue: "İletişim", validation: (Rule) => Rule.required() }),
    defineField({ name: "pageSubtitle", title: "Giriş Metni", type: "text", rows: 3, group: "content", initialValue: "Sorularınız, proje fikirleriniz veya danışmanlık talepleriniz için form üzerinden veya doğrudan iletişim bilgilerimizden bize ulaşabilirsiniz." }),
    defineField({ name: "formTitle", title: "Form Başlığı", type: "string", group: "content", initialValue: "Bize Ulaşın" }),
    defineField({
      name: "directTitle",
      title: "Doğrudan İletişim Başlığı",
      type: "string",
      group: "content",
      initialValue: "Doğrudan İletişim",
      description: "Formun yanındaki telefon, e-posta ve adres listesinin başlığı.",
    }),
    defineField({
      name: "workingHours",
      title: "Çalışma Saatleri",
      type: "string",
      group: "content",
      initialValue: "Pazartesi – Cumartesi, 09:00 – 18:00",
      description: "Boş bırakılırsa gösterilmez.",
    }),
    defineField({
      name: "responseNote",
      title: "Dönüş Süresi Notu",
      type: "text",
      rows: 2,
      group: "content",
      initialValue: "Mesai saatleri içinde iletilen taleplere aynı gün içinde dönüş yapılır.",
      description: "Boş bırakılırsa gösterilmez.",
    }),
    defineField({
      name: "mapTitle",
      title: "Harita Bölümü Başlığı",
      type: "string",
      group: "content",
      initialValue: "Ofisimiz",
      description: "Harita, Site Ayarları içindeki harita kodundan gelir. Kod yoksa bölüm gizlenir.",
    }),
    defineField({
      name: "successMessage",
      title: "Form Başarı Mesajı",
      type: "text",
      rows: 2,
      group: "content",
      initialValue: "Mesajınız alındı. En kısa sürede size dönüş yapacağız.",
    }),
    // SEO Group
    defineField({ name: "seo", title: "SEO", type: "seo", group: "seo" }),
  ],
});

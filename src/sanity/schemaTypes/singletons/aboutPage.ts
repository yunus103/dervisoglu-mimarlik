import { defineField, defineType } from "sanity";

export const aboutPageType = defineType({
  name: "aboutPage",
  title: "Hakkımızda",
  type: "document",
  groups: [
    { name: "hero", title: "Page Hero Bölümü" },
    { name: "content", title: "Sayfa İçeriği" },
    { name: "team", title: "Ekibimiz Bölümü" },
    { name: "seo", title: "SEO Ayarları" },
  ],
  fields: [
    // Page Hero Group
    defineField({ name: "heroTitle", title: "Hero Başlık", type: "string", group: "hero", initialValue: "Hakkımızda", description: "Sayfa üst kısmında duracak ana başlık. Boş bırakılırsa Sayfa Başlığı kullanılır." }),
    defineField({ name: "heroSubtitle", title: "Hero Alt Başlık / Kısa Açıklama", type: "text", rows: 2, group: "hero", initialValue: "Dervişoğlu Mimarlık'ın kurumsal vizyonu, değerleri ve uzman kadrosu.", description: "Sayfa üst kısmında duracak kısa açıklama yazısı." }),
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
    defineField({ name: "pageTitle", title: "Sayfa Başlığı", type: "string", group: "content", initialValue: "Dervişoğlu Mimarlık Hakkında", validation: (Rule) => Rule.required() }),
    defineField({ name: "pageSubtitle", title: "Giriş Alt Başlığı", type: "text", rows: 2, group: "content", initialValue: "Geleceğin mimarisini bugünden inşa ediyoruz." }),
    defineField({ name: "body", title: "Detaylı İçerik", type: "array", of: [{ type: "block" }], group: "content" }),
    defineField({
      name: "mainImage",
      title: "Ana Görsel (Yandaki Resim)",
      type: "image",
      group: "content",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt Metni", type: "string", validation: (Rule) => Rule.required() })],
    }),
    // Team Group
    defineField({
      name: "teamTitle",
      title: "Ekip Bölümü Başlığı",
      type: "string",
      group: "team",
      initialValue: "Ekibimiz",
    }),
    defineField({
      name: "teamSubtitle",
      title: "Ekip Bölümü Alt Başlığı",
      type: "text",
      rows: 2,
      group: "team",
      initialValue:
        "Projelerin tasarım, resmi süreç ve saha aşamalarını yürüten kadromuz.",
    }),
    defineField({
      name: "teamMembers",
      title: "Ekip Üyeleri",
      type: "array",
      group: "team",
      description:
        "Üye eklenmezse bu bölüm sayfada hiç gösterilmez. Sürükleyip bırakarak sıralayabilirsiniz.",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "name",
              title: "Ad Soyad",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "role",
              title: "Görev / Ünvan",
              type: "string",
              description: "Örn: Kurucu, Mimar, Şantiye Şefi",
            }),
            defineField({
              name: "bio",
              title: "Kısa Tanıtım",
              type: "text",
              rows: 3,
              description: "İsteğe bağlı. Boş bırakılırsa yalnızca ad ve görev gösterilir.",
            }),
            defineField({
              name: "photo",
              title: "Fotoğraf",
              type: "image",
              options: { hotspot: true },
              fields: [
                defineField({ name: "alt", title: "Alt Metni", type: "string" }),
              ],
            }),
          ],
          preview: {
            select: { title: "name", subtitle: "role", media: "photo" },
          },
        },
      ],
    }),

    // SEO Group
    defineField({ name: "seo", title: "SEO", type: "seo", group: "seo" }),
  ],
});

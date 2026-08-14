import { defineField, defineType } from "sanity";
import { turkishSlugify } from "../../lib/slugify";

export const serviceType = defineType({
  name: "service",
  title: "Hizmet",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Başlık", type: "string", validation: (Rule) => Rule.required() }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        slugify: turkishSlugify,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "summary",
      title: "Kısa Açıklama",
      type: "text",
      rows: 2,
      description:
        "Ana sayfada ve hizmetler listesinde başlığın hemen altında görünen tek cümlelik açıklama.",
      initialValue: "Bu hizmete ait kısa açıklama metnini buraya yazın.",
    }),
    defineField({
      name: "category",
      title: "Hizmet Kategorisi",
      type: "string",
      description: "Hizmetin ana sayfada ve hizmetler sayfasında hangi başlık altında listeleneceğini belirler.",
      options: {
        list: [
          { title: "Mimari & Tasarım Hizmetleri", value: "mimari-tasarim" },
          { title: "İnşaat & Uygulama Hizmetleri", value: "insaat-uygulama" },
        ],
        layout: "radio",
      },
      initialValue: "mimari-tasarim",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "order",
      title: "Sıralama",
      type: "number",
      description: "Küçük sayı önce gösterilir. Aynı kategori içindeki sırayı belirler.",
      initialValue: 0,
    }),
    defineField({
      name: "mainImage",
      title: "Ana Görsel",
      type: "image",
      description: "Zorunlu değildir. Yüklenmezse listelerde yalnızca metin gösterilir.",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt Metni", type: "string", validation: (Rule) => Rule.required() })],
    }),
    defineField({
      name: "body",
      title: "İçerik",
      type: "array",
      of: [
        { type: "block" },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({ name: "alt", title: "Alt Metni", type: "string", validation: (Rule) => Rule.required() }),
            defineField({
              name: "alignment",
              title: "Hizalama",
              type: "string",
              options: { list: [{ title: "Sol", value: "left" }, { title: "Orta", value: "center" }, { title: "Sağ", value: "right" }, { title: "Tam Genişlik", value: "full" }] },
              initialValue: "center",
            }),
            defineField({
              name: "size",
              title: "Boyut",
              type: "string",
              options: { 
                list: [
                  { title: "Çok Küçük (%25)", value: "25" },
                  { title: "Küçük (%33)", value: "33" },
                  { title: "Orta (%50)", value: "50" },
                  { title: "Geniş (%75)", value: "75" },
                  { title: "Tam Genişlik (%100)", value: "100" }
                ] 
              },
              initialValue: "100",
            }),
          ],
        },
        { type: "customHtml" },
      ],
    }),
    defineField({
      name: "faq",
      title: "Sıkça Sorulan Sorular (SSS)",
      type: "array",
      description: "Bu hizmete özel soru ve cevaplar. Boş bırakılırsa SSS bölümü gösterilmez.",
      of: [
        {
          type: "object",
          title: "Soru & Cevap",
          fields: [
            defineField({ name: "question", title: "Soru", type: "string", validation: (Rule) => Rule.required() }),
            defineField({ name: "answer", title: "Cevap", type: "text", rows: 3, validation: (Rule) => Rule.required() }),
          ],
          preview: {
            select: {
              title: "question",
              subtitle: "answer",
            },
          },
        },
      ],
    }),
    defineField({ name: "seo", title: "SEO", type: "seo" }),
  ],
});

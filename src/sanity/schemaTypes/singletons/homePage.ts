import { defineField, defineType } from "sanity";

export const homePageType = defineType({
  name: "homePage",
  title: "Ana Sayfa",
  type: "document",
  groups: [
    { name: "hero", title: "Hero Bölümü" },
    { name: "about", title: "Hakkımızda Önizleme" },
    { name: "services", title: "Hizmetler Önizleme" },
    { name: "process", title: "Süreç & SSS Yönlendirme" },
    { name: "projects", title: "Projeler Önizleme" },
    { name: "blog", title: "Blog Önizleme" },
    { name: "cta", title: "Kapanış (CTA) Bölümü" },
    { name: "seo", title: "SEO Ayarları" },
  ],
  fields: [
    // Hero Group
    defineField({
      name: "heroTitle",
      title: "Hero Başlık",
      type: "string",
      group: "hero",
      initialValue: "Mimarlık Ofisiyiz",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heroSubtitle",
      title: "Hero Alt Başlık",
      type: "text",
      rows: 3,
      group: "hero",
      initialValue: "Mimari proje, iç mimarlık ve uygulama süreçlerini bir arada yürütüyoruz.",
    }),
    defineField({
      name: "heroImage",
      title: "Hero Görseli",
      type: "image",
      group: "hero",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt Metni", type: "string", validation: (Rule) => Rule.required() })],
    }),
    defineField({
      name: "heroCtaLabel",
      title: "Hero Birincil Buton Metni",
      type: "string",
      group: "hero",
      description: "Bu buton hızlı teklif formunu açar.",
      initialValue: "Ön fizibilite talep edin",
    }),
    defineField({
      name: "heroCtaLink",
      title: "Hero Birincil Buton Linki",
      type: "object",
      group: "hero",
      fields: [
        defineField({
          name: "linkType",
          title: "Link Tipi",
          type: "string",
          options: {
            list: [
              { title: "İç Sayfa (Önerilen)", value: "internal" },
              { title: "Manuel Link", value: "manual" },
            ],
            layout: "radio",
          },
          initialValue: "internal",
        }),
        defineField({
          name: "internal",
          title: "İç Sayfa Seç",
          type: "reference",
          to: [
            { type: "service" },
            { type: "project" },
            { type: "blogPost" },
            { type: "aboutPage" },
            { type: "contactPage" },
          ],
          hidden: ({ parent }) => parent?.linkType !== "internal",
        }),
        defineField({
          name: "manual",
          title: "Manuel Link",
          type: "string",
          description: "Örn: /blog, /galeri veya https://google.com (Link başındaki / işaretini unutmayın)",
          hidden: ({ parent }) => parent?.linkType !== "manual",
        }),
      ],
    }),
    defineField({
      name: "heroSecondaryCtaLabel",
      title: "Hero İkincil Buton Metni",
      type: "string",
      group: "hero",
      description: "İkinci butonda görünecek metin.",
      initialValue: "Hizmetlerimizi İnceleyin",
    }),
    defineField({
      name: "heroSecondaryCtaLink",
      title: "Hero İkincil Buton Linki",
      type: "object",
      group: "hero",
      fields: [
        defineField({
          name: "linkType",
          title: "Link Tipi",
          type: "string",
          options: {
            list: [
              { title: "İç Sayfa (Önerilen)", value: "internal" },
              { title: "Manuel Link", value: "manual" },
            ],
            layout: "radio",
          },
          initialValue: "manual",
        }),
        defineField({
          name: "internal",
          title: "İç Sayfa Seç",
          type: "reference",
          to: [
            { type: "service" },
            { type: "project" },
            { type: "blogPost" },
            { type: "aboutPage" },
            { type: "contactPage" },
          ],
          hidden: ({ parent }) => parent?.linkType !== "internal",
        }),
        defineField({
          name: "manual",
          title: "Manuel Link",
          type: "string",
          initialValue: "/hizmetler",
          description: "Örn: /hizmetler, /projeler (Link başındaki / işaretini unutmayın)",
          hidden: ({ parent }) => parent?.linkType !== "manual",
        }),
      ],
    }),

    // About Preview Group
    defineField({ name: "aboutTitle", title: "Hakkımızda Bölüm Başlığı", type: "string", group: "about", initialValue: "Hakkımızda" }),
    defineField({
      name: "aboutSubtitle",
      title: "Hakkımızda Bölüm Alt Başlığı",
      type: "text",
      rows: 3,
      group: "about",
      initialValue: "2004'ten bu yana mimarlık ve iç mimarlık hizmeti veriyoruz.",
    }),
    defineField({
      name: "aboutText",
      title: "Hakkımızda Kısa Yazı",
      type: "array",
      of: [{ type: "block" }],
      group: "about",
      initialValue: [
        {
          _type: "block",
          style: "normal",
          children: [
            {
              _type: "span",
              text: "Mimari proje, iç mimarlık ve ruhsat süreçlerini kendi ekiplerimizle yürütür, uygulamayı sahada bizzat takip ederiz.",
            },
          ],
        },
      ],
    }),
    defineField({
      name: "aboutFacts",
      title: "Öne Çıkan Rakamlar",
      type: "array",
      group: "about",
      description: "Bölümde büyük punto ile görünen rakamlar. Boş bırakılırsa gösterilmez.",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "value", title: "Rakam", type: "string", description: "Örn: 2004, 50+", validation: (Rule) => Rule.required() }),
            defineField({ name: "label", title: "Açıklama", type: "string" }),
          ],
          preview: { select: { title: "value", subtitle: "label" } },
        },
      ],
      initialValue: [
        { value: "2004", label: "Mimarlık ve iç mimarlık tecrübesi" },
        { value: "50+", label: "Tamamlanmış proje" },
      ],
    }),
    defineField({
      name: "aboutImage",
      title: "Hakkımızda Görseli",
      type: "image",
      group: "about",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt Metni", type: "string" })],
    }),
    defineField({ name: "aboutCtaLabel", title: "Daha Fazla Buton Metni", type: "string", group: "about", initialValue: "Hakkımızda" }),
    defineField({ name: "aboutCtaLink", title: "Buton Linki", type: "string", group: "about", initialValue: "/hakkimizda" }),

    // Services Preview Group
    defineField({ name: "servicesTitle", title: "Hizmetler Bölüm Başlığı", type: "string", group: "services", initialValue: "Hizmetlerimiz" }),
    defineField({
      name: "servicesSubtitle",
      title: "Hizmetler Bölüm Alt Başlığı",
      type: "text",
      rows: 2,
      group: "services",
      initialValue: "Mimari projelendirmeden anahtar teslim uygulamaya kadar iki ana başlıkta hizmet verilmektedir.",
    }),
    defineField({
      name: "featuredServices",
      title: "Öne Çıkan Hizmetler",
      description: "Ana sayfada gösterilecek hizmetleri seçin ve sıralayın (Sürükleyip bırakarak sıralayabilirsiniz).",
      type: "array",
      group: "services",
      of: [{ type: "reference", to: [{ type: "service" }] }],
    }),
    defineField({
      name: "servicesCtaLabel",
      title: "\"Tüm Hizmetleri İncele\" Buton Metni",
      type: "string",
      group: "services",
      description: "Boş bırakılırsa buton gösterilmez.",
      initialValue: "Tüm Hizmetleri İncele",
    }),
    defineField({
      name: "servicesCtaLink",
      title: "Buton Linki",
      type: "string",
      group: "services",
      initialValue: "/hizmetler",
    }),

    // Process & FAQ Yönlendirme Group
    defineField({
      name: "processTeaserTitle",
      title: "Bölüm Başlığı",
      type: "string",
      group: "process",
      initialValue: "Çalışma Sürecimiz",
    }),
    defineField({
      name: "processTeaserText",
      title: "Bölüm Açıklaması",
      type: "text",
      rows: 3,
      group: "process",
      initialValue: "Tasarımdan uygulamaya kadar süreci nasıl yönettiğimizi ve sık sorulan soruları inceleyebilirsiniz.",
    }),
    defineField({
      name: "processCtaLabel",
      title: "\"Süreci İncele\" Buton Metni",
      type: "string",
      group: "process",
      initialValue: "Çalışma Sürecimizi İnceleyin",
    }),
    defineField({
      name: "faqCtaLabel",
      title: "\"SSS\" Buton Metni",
      type: "string",
      group: "process",
      initialValue: "Sıkça Sorulan Sorular",
    }),

    // Projects Preview Group
    defineField({ name: "projectsTitle", title: "Projeler Bölüm Başlığı", type: "string", group: "projects", initialValue: "Projelerimiz" }),
    defineField({
      name: "projectsSubtitle",
      title: "Projeler Bölüm Alt Başlığı",
      type: "text",
      rows: 2,
      group: "projects",
      initialValue: "Tamamladığımız ve devam eden nitelikli projelerimizden örnekler.",
    }),
    defineField({
      name: "featuredProjects",
      title: "Öne Çıkan Projeler",
      description: "Ana sayfada gösterilecek projeleri seçin ve sıralayın.",
      type: "array",
      group: "projects",
      of: [{ type: "reference", to: [{ type: "project" }] }],
    }),

    // Blog Preview Group
    defineField({ name: "blogTitle", title: "Blog Bölüm Başlığı", type: "string", group: "blog", initialValue: "Son Haberler & Blog" }),
    defineField({
      name: "blogSubtitle",
      title: "Blog Bölüm Alt Başlığı",
      type: "text",
      rows: 2,
      group: "blog",
      initialValue: "Mimari ve inşaat dünyasından güncel yazılar, ipuçları ve yenilikler.",
    }),
    defineField({
      name: "featuredPosts",
      title: "Öne Çıkan Blog Yazıları",
      description: "Ana sayfada gösterilecek blog yazılarını seçin ve sıralayın. Boş bırakılırsa en son eklenen blog yazıları otomatik gösterilir.",
      type: "array",
      group: "blog",
      of: [{ type: "reference", to: [{ type: "blogPost" }] }],
    }),

    // CTA Group
    defineField({
      name: "ctaTitle",
      title: "Kapanış Başlığı",
      type: "string",
      group: "cta",
      description: "Boş bırakılırsa kapanış bölümü gösterilmez.",
      initialValue: "Arsanız İçin Ön Fizibilite Çalışması",
    }),
    defineField({
      name: "ctaText",
      title: "Kapanış Açıklaması",
      type: "text",
      rows: 4,
      group: "cta",
      initialValue: "Adres veya ada/parsel bilgisini iletmeniz halinde arsanızın imar durumu çıkarılarak oluşabilecek bağımsız bölüm sayısı hesaplanır. Bu çalışma ücretsizdir.",
    }),
    defineField({
      name: "ctaButtonLabel",
      title: "Kapanış Buton Metni",
      type: "string",
      group: "cta",
      description: "Bu buton hızlı teklif formunu açar.",
      initialValue: "Ön fizibilite talep edin",
    }),
    defineField({
      name: "ctaScopeTitle",
      title: "Kapsam Listesi Başlığı",
      type: "string",
      group: "cta",
      initialValue: "Çalışma kapsamı",
    }),
    defineField({
      name: "ctaScopeItems",
      title: "Kapsam Maddeleri",
      type: "array",
      group: "cta",
      of: [{ type: "string" }],
      description: "Boş bırakılırsa kapsam listesi gösterilmez.",
      initialValue: [
        "Arsanın güncel imar durumu",
        "Yaklaşık inşaat alanı ve bağımsız bölüm sayısı",
        "Kaba maliyet aralığı ve süreç planı",
      ],
    }),

    // SEO Group
    defineField({ name: "seo", title: "SEO", type: "seo", group: "seo" }),
  ],
});

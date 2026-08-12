import { defineField, defineType } from "sanity";

export const homePageType = defineType({
  name: "homePage",
  title: "Ana Sayfa",
  type: "document",
  groups: [
    { name: "hero", title: "Hero Bölümü" },
    { name: "about", title: "Hakkımızda Önizleme" },
    { name: "services", title: "Hizmetler Önizleme" },
    { name: "process", title: "Proje Süreci Bölümü" },
    { name: "projects", title: "Projeler Önizleme" },
    { name: "blog", title: "Blog Önizleme" },
    { name: "faq", title: "Sıkça Sorulan Sorular" },
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
      initialValue: "Arsadan anahtara, tek çatı altında",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heroSubtitle",
      title: "Hero Alt Başlık",
      type: "text",
      rows: 3,
      group: "hero",
      initialValue: "Mimari proje, belediye ruhsatı, şantiye ve teslim süreçlerinin tamamı Dervişoğlu Mimarlık bünyesindeki ekipler tarafından yürütülür.",
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
      title: "Hero Buton Metni",
      type: "string",
      group: "hero",
      description: "Bu buton hızlı teklif formunu açar.",
      initialValue: "Ön fizibilite talep edin",
    }),
    defineField({
      name: "heroCtaLink",
      title: "Hero Buton Linki",
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

    // About Preview Group
    defineField({ name: "aboutTitle", title: "Hakkımızda Bölüm Başlığı", type: "string", group: "about", initialValue: "Proje ve Uygulama Tek Elden Yürütülür" }),
    defineField({
      name: "aboutSubtitle",
      title: "Hakkımızda Bölüm Alt Başlığı",
      type: "text",
      rows: 3,
      group: "about",
      initialValue: "Mimari projelendirme, resmi süreç takibi ve şantiye uygulaması firmamız bünyesindeki üç ayrı ekip tarafından yürütülmektedir. Süreç boyunca tek muhatap Dervişoğlu Mimarlık'tır.",
    }),
    defineField({ name: "aboutText", title: "Hakkımızda Kısa Yazı", type: "array", of: [{ type: "block" }], group: "about" }),
    defineField({
      name: "aboutTeams",
      title: "Ekipler Listesi",
      type: "array",
      group: "about",
      description: "Bölümde alt alta listelenen ekipler. Boş bırakılırsa liste gösterilmez.",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "name", title: "Ekip Adı", type: "string", validation: (Rule) => Rule.required() }),
            defineField({ name: "scope", title: "Sorumluluk Alanı", type: "text", rows: 2 }),
          ],
          preview: { select: { title: "name", subtitle: "scope" } },
        },
      ],
      initialValue: [
        {
          name: "Belediye & Resmi İş Takip Ekibi",
          scope: "İmar durumu, ruhsat başvurusu, revizyon takibi ve iskan süreçleri",
        },
        {
          name: "İç Mimari Tasarım Ekibi",
          scope: "Konsept, avan ve uygulama projeleri, 3D görselleştirme, malzeme kararları",
        },
        {
          name: "Şantiye & Saha Kontrol Ekibi",
          scope: "İmalat denetimi, malzeme kontrolü, ilerleme ve hakediş raporlaması",
        },
      ],
    }),
    defineField({
      name: "aboutFacts",
      title: "Öne Çıkan Rakamlar",
      type: "array",
      group: "about",
      description: "Ekipler listesinin altında büyük punto ile görünen rakamlar. Boş bırakılırsa gösterilmez.",
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
        { value: "2004", label: "Aileden gelen müteahhitlik tecrübesi" },
        { value: "50+", label: "Tamamlanmış bina projesi" },
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

    // Process Preview Group
    defineField({
      name: "processTitle",
      title: "Süreç Bölüm Başlığı",
      type: "string",
      group: "process",
      initialValue: "Proje Sürecimiz",
    }),
    defineField({
      name: "processSubtitle",
      title: "Süreç Bölüm Alt Başlığı",
      type: "text",
      rows: 3,
      group: "process",
      initialValue: "Arsanın imar durumunun çıkarılmasından yapı kullanma izninin alınmasına kadar yürütülen aşamalar, her aşamada görev alan ekip ve teslim edilen belgeler aşağıda yer almaktadır.",
    }),
    defineField({
      name: "processSteps",
      title: "Süreç Aşamaları",
      type: "array",
      group: "process",
      description: "Aşamalar hem bu bölümde hem de hero altındaki aşama şeridinde kullanılır.",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "stepNumber", title: "Aşama Numarası", type: "string", description: "Örn: 01" }),
            defineField({ name: "shortName", title: "Kısa Ad", type: "string", description: "Hero altındaki şeritte görünen tek kelimelik ad. Örn: Keşif" }),
            defineField({ name: "title", title: "Aşama Başlığı", type: "string" }),
            defineField({ name: "description", title: "Açıklama", type: "text", rows: 3 }),
            defineField({ name: "team", title: "Yürüten Ekip", type: "string" }),
            defineField({ name: "deliverable", title: "Teslim Edilen", type: "string" }),
            defineField({ name: "question", title: "Bu Aşamadaki Soru", type: "string" }),
            defineField({ name: "answer", title: "Sorunun Cevabı", type: "text", rows: 3 }),
          ],
          preview: { select: { title: "title", subtitle: "stepNumber" } },
        },
      ],
      initialValue: [
        {
          stepNumber: "01",
          shortName: "Keşif",
          title: "Arsa analizi ve ön fizibilite",
          description: "İmar durumu çıkarılır, arsada oluşabilecek inşaat alanı ve bağımsız bölüm sayısı hesaplanır. Kat karşılığı görüşülüyorsa oran bu aşamada değerlendirilir.",
          team: "İç Mimari Tasarım Ekibi",
          deliverable: "İmar durumu raporu ve ön yerleşim taslağı",
          question: "Ön fizibilite çalışması ücretli midir?",
          answer: "Hayır. Arsanın imar durumunun çıkarılması ve yaklaşık bağımsız bölüm sayısının hesaplanması ilk görüşmenin kapsamındadır.",
        },
        {
          stepNumber: "02",
          shortName: "Proje",
          title: "Konsept ve avan proje",
          description: "Mekân kurgusu, cephe kararları ve malzeme yönü belirlenir. Çalışma 3D görselleştirme ile sunulur; onay alınmadan bir sonraki aşamaya geçilmez.",
          team: "İç Mimari Tasarım Ekibi",
          deliverable: "Avan proje ve 3D görseller",
          question: "Mimari proje ve konsept tasarım süreci ne kadar sürer?",
          answer: "Projenin ölçeğine ve alan büyüklüğüne bağlı olarak konsept tasarım ve avan proje hazırlığı ortalama 2 ila 4 hafta içinde tamamlanır.",
        },
        {
          stepNumber: "03",
          shortName: "Ruhsat",
          title: "Uygulama projeleri ve yapı ruhsatı",
          description: "Mimari, statik, mekanik ve elektrik projeleri hazırlanarak belediyeye sunulur. Evrak takibi, revizyon ve onay süreçleri firmamız tarafından yürütülür.",
          team: "Belediye & Resmi İş Takip Ekibi",
          deliverable: "Onaylı projeler ve yapı ruhsatı",
          question: "Belediye ve ruhsat süreçlerini firmanız mı yürütüyor?",
          answer: "Evet. Projeler ilgili ilçe ve büyükşehir belediyesi yönetmeliklerine uygun hazırlanır, başvuru ve onay süreci uçtan uca firmamızca takip edilir. Ayrıca bir danışmanla çalışmanız gerekmez.",
        },
        {
          stepNumber: "04",
          shortName: "İnşaat",
          title: "Şantiye ve imalat",
          description: "Kaba yapıdan ince işçiliğe kadar tüm imalat yürütülür. Deprem yönetmeliğine uygunluk ve malzeme kalitesi saha ekibimiz tarafından denetlenir.",
          team: "Şantiye & Saha Kontrol Ekibi",
          deliverable: "Dönemsel ilerleme ve hakediş raporu",
          question: "Malzeme seçimleri ne zaman yapılır, sürpriz maliyet oluşur mu?",
          answer: "Seramik, parke, armatür ve cephe kaplaması dahil tüm malzemeler sözleşme öncesinde belirlenerek mahal listesine işlenir. Liste sözleşmenin eki olduğundan şantiye sürecinde sürpriz maliyet oluşmaz.",
        },
        {
          stepNumber: "05",
          shortName: "Teslim",
          title: "Yapı kullanma izni ve anahtar teslim",
          description: "Yapı denetim onayları, iskan başvurusu ve abonelik işlemleri tamamlanır. Teslim sonrası kullanım sürecinde de destek verilir.",
          team: "Belediye & Resmi İş Takip Ekibi",
          deliverable: "Yapı kullanma izni (iskan) ve anahtar teslimi",
          question: "Teslim sonrasında bir sorun oluşursa nasıl bir yol izleniyor?",
          answer: "İmalat kaynaklı sorunlar için teslim sonrası garanti süresi sözleşmede tanımlanır. Projeyi yürüten ekip bu süre boyunca aynı iletişim kanallarından ulaşılabilir durumdadır.",
        },
      ],
    }),
    defineField({
      name: "processTeamLabel",
      title: "\"Yürüten Ekip\" Etiketi",
      type: "string",
      group: "process",
      initialValue: "Yürüten ekip",
    }),
    defineField({
      name: "processDeliverableLabel",
      title: "\"Teslim Edilen\" Etiketi",
      type: "string",
      group: "process",
      initialValue: "Teslim edilen",
    }),
    defineField({
      name: "processFooterNote",
      title: "Süreç Bölümü Alt Notu",
      type: "text",
      rows: 3,
      group: "process",
      description: "Aşama listesinin altında görünen açıklama. Boş bırakılırsa gösterilmez.",
      initialValue: "Aşamaların tamamı Dervişoğlu Mimarlık bünyesindeki ekipler tarafından yürütülür. Süreler proje ölçeğine göre değişiklik gösterir ve sözleşmede tarihleriyle tanımlanır.",
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

    // FAQ Group
    defineField({
      name: "faqTitle",
      title: "SSS Bölüm Başlığı",
      type: "string",
      group: "faq",
      initialValue: "Sıkça Sorulan Sorular",
    }),
    defineField({
      name: "faqSubtitle",
      title: "SSS Bölüm Alt Başlığı",
      type: "text",
      rows: 2,
      group: "faq",
      initialValue: "Mimari proje, imar ve ruhsat süreçleri ile inşaat uygulamalarımız hakkında merak edilenler.",
    }),
    defineField({
      name: "faqItems",
      title: "Sorular",
      type: "array",
      group: "faq",
      description: "Belirli bir aşamaya ait sorular Proje Süreci bölümünde cevaplanır. Burada yalnızca genel sorular yer alır. Boş bırakılırsa bölüm gösterilmez.",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "question", title: "Soru", type: "string", validation: (Rule) => Rule.required() }),
            defineField({ name: "answer", title: "Cevap", type: "text", rows: 4, validation: (Rule) => Rule.required() }),
          ],
          preview: { select: { title: "question" } },
        },
      ],
      initialValue: [
        {
          question: "Mevcut yapılar için tadilat, güçlendirme ve iç mimari yenileme hizmeti veriyor musunuz?",
          answer: "Evet. Mevcut yapıların rölöve ve statik durum analizlerini yaparak iç mimari konsept tasarımı, tadilat uygulamaları ve şantiye yönetimi hizmeti sunmaktayız.",
        },
        {
          question: "Hangi bölgelerde hizmet veriyorsunuz?",
          answer: "Mimari ve tasarım hizmetlerinde merkezimiz Arnavutköy olmak üzere tüm Marmara Bölgesi'nde; inşaat ve uygulama işlerinde ise Marmara Bölgesi genelinde çalışmaktayız.",
        },
        {
          question: "Kat karşılığı anlaşmalarda oran nasıl belirleniyor?",
          answer: "Oran; arsanın imar durumuna, konumuna, oluşacak bağımsız bölüm sayısına ve inşaat maliyetine göre hesaplanır. İlk görüşmede yapılan ön fizibilite çalışmasının ardından somut bir oran değerlendirilebilir hale gelir.",
        },
        {
          question: "Deprem yönetmeliğine uygunluk nasıl güvence altına alınıyor?",
          answer: "Statik projeler güncel Türkiye Bina Deprem Yönetmeliği'ne göre hazırlanır, bağımsız yapı denetim kuruluşu tarafından onaylanır ve imalat aşamasında kendi saha ekibimiz tarafından ayrıca denetlenir.",
        },
      ],
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

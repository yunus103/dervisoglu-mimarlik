import { defineField, defineType } from "sanity";

export const surecPageType = defineType({
  name: "surecPage",
  title: "Çalışma Sürecimiz",
  type: "document",
  groups: [
    { name: "hero", title: "Page Hero Bölümü" },
    { name: "steps", title: "Süreç Aşamaları" },
    { name: "faq", title: "Sıkça Sorulan Sorular" },
    { name: "seo", title: "SEO Ayarları" },
  ],
  fields: [
    // Page Hero Group
    defineField({ name: "heroTitle", title: "Hero Başlık", type: "string", group: "hero", initialValue: "Çalışma Sürecimiz", description: "Sayfa üst kısmında duracak ana başlık." }),
    defineField({ name: "heroSubtitle", title: "Hero Alt Başlık / Kısa Açıklama", type: "text", rows: 2, group: "hero", initialValue: "İlk görüşmeden teslime kadar projenizi nasıl yönettiğimiz.", description: "Sayfa üst kısmında duracak kısa açıklama yazısı." }),
    defineField({
      name: "heroImage",
      title: "Hero Arka Plan Görseli",
      type: "image",
      group: "hero",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt Metni", type: "string" })],
      description: "Hero arka plan resmi. Yüklenmezse şık bir degrade renk arka planı kullanılır.",
    }),

    // Steps Group
    defineField({
      name: "stepsTitle",
      title: "Aşamalar Bölüm Başlığı",
      type: "string",
      group: "steps",
      initialValue: "Süreç Nasıl İşliyor?",
    }),
    defineField({
      name: "stepsSubtitle",
      title: "Aşamalar Bölüm Alt Başlığı",
      type: "text",
      rows: 3,
      group: "steps",
      initialValue: "İlk görüşmeden teslime kadar yürütülen aşamalar ve her aşamada teslim edilen belgeler aşağıda yer alıyor.",
    }),
    defineField({
      name: "steps",
      title: "Süreç Aşamaları",
      type: "array",
      group: "steps",
      description: "Kimin yürüttüğü bilgisi ayrı bir alan değil; gerekiyorsa açıklama metninin içine yazılır (örn. \"belediyedeki ilgili birimlerle birlikte\").",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "stepNumber", title: "Aşama Numarası", type: "string", description: "Örn: 01" }),
            defineField({ name: "title", title: "Aşama Başlığı", type: "string" }),
            defineField({ name: "description", title: "Açıklama", type: "text", rows: 3 }),
            defineField({ name: "deliverable", title: "Teslim Edilen", type: "string" }),
          ],
          preview: { select: { title: "title", subtitle: "stepNumber" } },
        },
      ],
      initialValue: [
        {
          stepNumber: "01",
          title: "İhtiyaç Analizi & Ön Görüşme",
          description: "Arsanın veya mevcut yapının imar durumu değerlendirilir, ihtiyaç ve hedefler netleştirilir.",
          deliverable: "Ön değerlendirme raporu",
        },
        {
          stepNumber: "02",
          title: "Konsept & Avan Proje",
          description: "Mekân kurgusu, cephe ve malzeme yönü belirlenir, çalışma 3D görsellerle sunulur.",
          deliverable: "Avan proje ve 3D görseller",
        },
        {
          stepNumber: "03",
          title: "Uygulama Projeleri & Ruhsat",
          description: "Mimari, statik, mekanik ve elektrik projelerini hazırlıyor, belediyedeki ilgili birimlerle birlikte ruhsat sürecini takip ediyoruz.",
          deliverable: "Onaylı projeler ve yapı ruhsatı",
        },
        {
          stepNumber: "04",
          title: "Uygulama & Saha Danışmanlığı",
          description: "Sahadaki uygulamayı, projeye ve deprem yönetmeliğine uygunluk açısından düzenli olarak denetliyoruz.",
          deliverable: "Dönemsel denetim raporu",
        },
        {
          stepNumber: "05",
          title: "Teslim",
          description: "Yapı kullanma izni sürecini ilgili belediye birimleriyle birlikte tamamlıyor, projeyi teslim ediyoruz.",
          deliverable: "Yapı kullanma izni ve teslim",
        },
      ],
    }),
    defineField({
      name: "deliverableLabel",
      title: "\"Teslim Edilen\" Etiketi",
      type: "string",
      group: "steps",
      initialValue: "Teslim edilen",
    }),
    defineField({
      name: "stepsFooterNote",
      title: "Aşamalar Bölümü Alt Notu",
      type: "text",
      rows: 3,
      group: "steps",
      description: "Aşama listesinin altında görünen açıklama. Boş bırakılırsa gösterilmez.",
      initialValue: "Süreler proje ölçeğine göre değişir, sözleşmede tarihleriyle birlikte belirtilir.",
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
      initialValue: "Süreç, ücretlendirme ve hizmetlerimiz hakkında merak edilenler.",
    }),
    defineField({
      name: "faqItems",
      title: "Sorular",
      type: "array",
      group: "faq",
      description: "Boş bırakılırsa bölüm gösterilmez.",
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
          question: "Sadece proje mi çiziyorsunuz, yoksa uygulamayı da mı takip ediyorsunuz?",
          answer: "Projeyi biz çiziyoruz, ruhsat sürecini biz yürütüyoruz ve uygulama aşamasında sahayı da düzenli olarak denetliyoruz.",
        },
        {
          question: "Sadece bir dairenin iç mekân tasarımı için de çalışıyor musunuz, yoksa yalnızca yeni bina projeleri mi?",
          answer: "Hayır, sadece iç mimari veya tadilat projeleri için de çalışıyoruz; kapsam yeni bina yapmakla sınırlı değil.",
        },
        {
          question: "Hangi bölgelerde hizmet veriyorsunuz?",
          answer: "Mimari ve tasarım hizmetlerinde merkezimiz Arnavutköy olmak üzere tüm Marmara Bölgesi'nde çalışıyoruz.",
        },
        {
          question: "Kentsel dönüşüm başvurularında da yardımcı oluyor musunuz?",
          answer: "Evet, riskli yapı tespiti, hak sahipliği ve başvuru sürecinde danışmanlık veriyoruz.",
        },
        {
          question: "Ücretlendirme nasıl belirleniyor?",
          answer: "Ücret; projenin ölçeğine ve kapsamına (sadece proje mi, uygulama takibi de dahil mi) göre değişir. İlk görüşmede netleştiriyoruz.",
        },
        {
          question: "İlk görüşmeye ne getirmeliyim?",
          answer: "Varsa tapu veya kroki bilgisi, arsanın veya yapının adresi ve aklınızdaki ihtiyaçların kısa bir listesi yeterli.",
        },
        {
          question: "Ruhsat süreci ne kadar sürer?",
          answer: "Belediyeye ve projenin kapsamına göre değişir; ortalama süreyi ilk değerlendirmeden sonra netleştiriyoruz.",
        },
        {
          question: "Deprem yönetmeliğine uygunluk nasıl sağlanıyor?",
          answer: "Statik projeler güncel Türkiye Bina Deprem Yönetmeliği'ne göre hazırlanır, bağımsız yapı denetim kuruluşu tarafından onaylanır.",
        },
      ],
    }),

    // SEO Group
    defineField({ name: "seo", title: "SEO", type: "seo", group: "seo" }),
  ],
});

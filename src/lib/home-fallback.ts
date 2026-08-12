import { AboutFact, AboutTeam, FaqItem, ProcessStep } from "@/types";

/**
 * Ana sayfa yedek (fallback) içeriği.
 *
 * Buradaki metinlerin tamamı `homePage` şemasındaki `initialValue` değerleriyle
 * BİREBİR aynıdır. Sanity'deki Ana Sayfa dokümanında ilgili alan boşsa sayfa
 * bu değerleri gösterir; alan doldurulduğu anda Sanity'deki içerik geçerli olur.
 *
 * Şemayı güncellerken burayı da güncelleyin — iki taraf aynı kalmalıdır.
 */

export const homeFallback = {
  heroTitle: "Arsadan anahtara, tek çatı altında",
  heroSubtitle:
    "Mimari proje, belediye ruhsatı, şantiye ve teslim süreçlerinin tamamı Dervişoğlu Mimarlık bünyesindeki ekipler tarafından yürütülür.",
  heroCtaLabel: "Ön fizibilite talep edin",

  aboutTitle: "Proje ve Uygulama Tek Elden Yürütülür",
  aboutSubtitle:
    "Mimari projelendirme, resmi süreç takibi ve şantiye uygulaması firmamız bünyesindeki üç ayrı ekip tarafından yürütülmektedir. Süreç boyunca tek muhatap Dervişoğlu Mimarlık'tır.",
  aboutCtaLabel: "Hakkımızda",
  aboutCtaLink: "/hakkimizda",

  servicesTitle: "Hizmetlerimiz",
  servicesSubtitle:
    "Mimari projelendirmeden anahtar teslim uygulamaya kadar iki ana başlıkta hizmet verilmektedir.",

  processTitle: "Proje Sürecimiz",
  processSubtitle:
    "Arsanın imar durumunun çıkarılmasından yapı kullanma izninin alınmasına kadar yürütülen aşamalar, her aşamada görev alan ekip ve teslim edilen belgeler aşağıda yer almaktadır.",
  processTeamLabel: "Yürüten ekip",
  processDeliverableLabel: "Teslim edilen",
  processFooterNote:
    "Aşamaların tamamı Dervişoğlu Mimarlık bünyesindeki ekipler tarafından yürütülür. Süreler proje ölçeğine göre değişiklik gösterir ve sözleşmede tarihleriyle tanımlanır.",

  faqTitle: "Sıkça Sorulan Sorular",
  faqSubtitle:
    "Mimari proje, imar ve ruhsat süreçleri ile inşaat uygulamalarımız hakkında merak edilenler.",

  ctaTitle: "Arsanız İçin Ön Fizibilite Çalışması",
  ctaText:
    "Adres veya ada/parsel bilgisini iletmeniz halinde arsanızın imar durumu çıkarılarak oluşabilecek bağımsız bölüm sayısı hesaplanır. Bu çalışma ücretsizdir.",
  ctaButtonLabel: "Ön fizibilite talep edin",
  ctaScopeTitle: "Çalışma kapsamı",
};

export const homeFallbackProcessSteps: ProcessStep[] = [
  {
    stepNumber: "01",
    shortName: "Keşif",
    title: "Arsa analizi ve ön fizibilite",
    description:
      "İmar durumu çıkarılır, arsada oluşabilecek inşaat alanı ve bağımsız bölüm sayısı hesaplanır. Kat karşılığı görüşülüyorsa oran bu aşamada değerlendirilir.",
    team: "İç Mimari Tasarım Ekibi",
    deliverable: "İmar durumu raporu ve ön yerleşim taslağı",
    question: "Ön fizibilite çalışması ücretli midir?",
    answer:
      "Hayır. Arsanın imar durumunun çıkarılması ve yaklaşık bağımsız bölüm sayısının hesaplanması ilk görüşmenin kapsamındadır.",
  },
  {
    stepNumber: "02",
    shortName: "Proje",
    title: "Konsept ve avan proje",
    description:
      "Mekân kurgusu, cephe kararları ve malzeme yönü belirlenir. Çalışma 3D görselleştirme ile sunulur; onay alınmadan bir sonraki aşamaya geçilmez.",
    team: "İç Mimari Tasarım Ekibi",
    deliverable: "Avan proje ve 3D görseller",
    question: "Mimari proje ve konsept tasarım süreci ne kadar sürer?",
    answer:
      "Projenin ölçeğine ve alan büyüklüğüne bağlı olarak konsept tasarım ve avan proje hazırlığı ortalama 2 ila 4 hafta içinde tamamlanır.",
  },
  {
    stepNumber: "03",
    shortName: "Ruhsat",
    title: "Uygulama projeleri ve yapı ruhsatı",
    description:
      "Mimari, statik, mekanik ve elektrik projeleri hazırlanarak belediyeye sunulur. Evrak takibi, revizyon ve onay süreçleri firmamız tarafından yürütülür.",
    team: "Belediye & Resmi İş Takip Ekibi",
    deliverable: "Onaylı projeler ve yapı ruhsatı",
    question: "Belediye ve ruhsat süreçlerini firmanız mı yürütüyor?",
    answer:
      "Evet. Projeler ilgili ilçe ve büyükşehir belediyesi yönetmeliklerine uygun hazırlanır, başvuru ve onay süreci uçtan uca firmamızca takip edilir. Ayrıca bir danışmanla çalışmanız gerekmez.",
  },
  {
    stepNumber: "04",
    shortName: "İnşaat",
    title: "Şantiye ve imalat",
    description:
      "Kaba yapıdan ince işçiliğe kadar tüm imalat yürütülür. Deprem yönetmeliğine uygunluk ve malzeme kalitesi saha ekibimiz tarafından denetlenir.",
    team: "Şantiye & Saha Kontrol Ekibi",
    deliverable: "Dönemsel ilerleme ve hakediş raporu",
    question: "Malzeme seçimleri ne zaman yapılır, sürpriz maliyet oluşur mu?",
    answer:
      "Seramik, parke, armatür ve cephe kaplaması dahil tüm malzemeler sözleşme öncesinde belirlenerek mahal listesine işlenir. Liste sözleşmenin eki olduğundan şantiye sürecinde sürpriz maliyet oluşmaz.",
  },
  {
    stepNumber: "05",
    shortName: "Teslim",
    title: "Yapı kullanma izni ve anahtar teslim",
    description:
      "Yapı denetim onayları, iskan başvurusu ve abonelik işlemleri tamamlanır. Teslim sonrası kullanım sürecinde de destek verilir.",
    team: "Belediye & Resmi İş Takip Ekibi",
    deliverable: "Yapı kullanma izni (iskan) ve anahtar teslimi",
    question: "Teslim sonrasında bir sorun oluşursa nasıl bir yol izleniyor?",
    answer:
      "İmalat kaynaklı sorunlar için teslim sonrası garanti süresi sözleşmede tanımlanır. Projeyi yürüten ekip bu süre boyunca aynı iletişim kanallarından ulaşılabilir durumdadır.",
  },
];

export const homeFallbackAboutTeams: AboutTeam[] = [
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
];

export const homeFallbackAboutFacts: AboutFact[] = [
  { value: "2004", label: "Aileden gelen müteahhitlik tecrübesi" },
  { value: "50+", label: "Tamamlanmış bina projesi" },
];

export const homeFallbackFaqItems: FaqItem[] = [
  {
    question:
      "Mevcut yapılar için tadilat, güçlendirme ve iç mimari yenileme hizmeti veriyor musunuz?",
    answer:
      "Evet. Mevcut yapıların rölöve ve statik durum analizlerini yaparak iç mimari konsept tasarımı, tadilat uygulamaları ve şantiye yönetimi hizmeti sunmaktayız.",
  },
  {
    question: "Hangi bölgelerde hizmet veriyorsunuz?",
    answer:
      "Mimari ve tasarım hizmetlerinde merkezimiz Arnavutköy olmak üzere tüm Marmara Bölgesi'nde; inşaat ve uygulama işlerinde ise Marmara Bölgesi genelinde çalışmaktayız.",
  },
  {
    question: "Kat karşılığı anlaşmalarda oran nasıl belirleniyor?",
    answer:
      "Oran; arsanın imar durumuna, konumuna, oluşacak bağımsız bölüm sayısına ve inşaat maliyetine göre hesaplanır. İlk görüşmede yapılan ön fizibilite çalışmasının ardından somut bir oran değerlendirilebilir hale gelir.",
  },
  {
    question: "Deprem yönetmeliğine uygunluk nasıl güvence altına alınıyor?",
    answer:
      "Statik projeler güncel Türkiye Bina Deprem Yönetmeliği'ne göre hazırlanır, bağımsız yapı denetim kuruluşu tarafından onaylanır ve imalat aşamasında kendi saha ekibimiz tarafından ayrıca denetlenir.",
  },
];

export const homeFallbackCtaScopeItems: string[] = [
  "Arsanın güncel imar durumu",
  "Yaklaşık inşaat alanı ve bağımsız bölüm sayısı",
  "Kaba maliyet aralığı ve süreç planı",
];

/**
 * Ana sayfanın omurgası: bir projenin arsadan yapı kullanma iznine kadar
 * geçtiği aşamalar.
 *
 * Süre (ay) bilgisi bilinçli olarak verilmez — süreler proje ölçeğine,
 * imar durumuna ve resmi kurum yoğunluğuna göre değiştiği için sözleşmede
 * net tarihlerle tanımlanır. Güven, süre iddiasıyla değil; her aşamada
 * görev alan ekibin ve teslim edilen belgenin açıkça yazılmasıyla kurulur.
 */
export interface TimelineStage {
  /** Sıra numarası, örn. "01" */
  number: string;
  /** Eksende görünen kısa ad */
  shortName: string;
  title: string;
  description: string;
  /** Dokümandaki 3 ekipten hangisi yürütüyor */
  team: string;
  /** Bu aşamanın sonunda müşteriye teslim edilen somut belge veya çıktı */
  deliverable: string;
  /** Tam bu aşamada akla gelen soru ve cevabı */
  question: string;
  answer: string;
}

export const timelineStages: TimelineStage[] = [
  {
    number: "01",
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
    number: "02",
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
    number: "03",
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
    number: "04",
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
    number: "05",
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

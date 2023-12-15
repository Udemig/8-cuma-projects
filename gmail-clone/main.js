import { ele, renderMails, toggleModal } from './scripts/ui.js';
import { getDate } from './scripts/helpers.js';

// *) Local storege'dan veileri al ve obje formatına çevir
// Projde mail verisi olarak hep bunu kullanıcaz. diziyi
// güncellendiğinde local-storege'ıda güncelle
const strMail = localStorage.getItem('mails') || [];
let mailData = JSON.parse(strMail);

// 1) Navbar için açılma ve kapanma özelliği
// hamburger iconuna tıklanma olayını izle
// tıklanınca nav menüsüne hide class'ı ekle
// zaten kapalıyken tıklarsa hide class'ını kaldır
ele.menu.addEventListener('click', () => {
  ele.nav.classList.toggle('hide');
});

// 2) Listeleme Özelliği
// kullanıcın projeye girme anında mailleri listele
// DOMContentLoaded > tarayıcaki html'in yüklenmesinin bitmesi
// ekran boyutu 1200 px altında ise navbar kapalı gelsin
document.addEventListener('DOMContentLoaded', () => {
  renderMails(mailData);

  if (window.innerWidth < 1200) {
    ele.nav.classList.add('hide');
  }
});

// 3) Modal Açma Kapama
// - Oluştur butonuna tıklanınca modal'ı göster (display:grid)
// - X butonuna veya dışarıya tıklanınca modal'ı kapat (display:none)
ele.createBtn.addEventListener('click', () => toggleModal(true));
ele.closeBtn.addEventListener('click', () => toggleModal(false));

ele.modal.addEventListener('click', (e) => {
  // eğerki tıklanılan elemanın class'ında modal-wrapper varsa
  if (e.target.classList.contains('modal-wrapper')) {
    toggleModal(false);
  }
});

// 4) Mail Atma Özelliği
// açılan modaldaki formun gönderilme olayını izlyicez
// eğer bütün inpular doluysa yeni mail oluştur
// değilse kullanıcıya uyarı ver
ele.modalForm.addEventListener('submit', (e) => {
  // sayfayı yenilemeyi engelle
  e.preventDefault();

  // formdaki inputların verilerine erişme
  const receiver = e.target[1].value;
  const title = e.target[2].value;
  const message = e.target[3].value;

  // eğerki inputlar boşsa uyarı gönder
  if (!receiver || !title || !message) {
    alert('Lütfen bütün alanları doldurun');
  } else {
    // diziye eklemek için mail objesi oluştur
    const newMail = {
      id: new Date().getTime(),
      sender: 'Furkan',
      receiver: receiver,
      title: title,
      message: message,
      date: getDate(),
    };

    // yeni maili mailler dizisine ekledik
    mailData.unshift(newMail);

    // mailler disinin son halini local-storege'a kaydettik
    localStorage.setItem('mails', JSON.stringify(mailData));

    // mailler disinin son halini ekrana bastık
    renderMails(mailData);

    // modalı kapat
    toggleModal(false);
  }
});

// 5) Mail Silme Özeilliği
const handleClick = (e) => {
  const mail = e.target.closest('.mail');
  const mailId = mail.dataset.id;

  // tıklanılan elemanın ids'si delete ise maili sil
  if (
    e.target.id === 'delete' &&
    confirm('Maili silmek istiyor musnuz ?')
  ) {
    // id'si siliceğimiz elemana eşit olamayan elemaları filtrele
    mailData = mailData.filter((mail) => mail.id !== Number(mailId));

    // lokali güncelle
    localStorage.setItem('mails', JSON.stringify(mailData));

    // mail'i html'den kaldır
    mail.remove();
  }

  // tıklanılan eleman yıldız ise maili like'la
  if (e.target.id === 'star') {
    // 1) id'sini bildiğimiz mail'in bütün bilgilerini al
    const found = mailData.find((item) => item.id === Number(mailId));

    // 2) objenin  is_stared "yıldızlı" değerini tersine çevir
    found.isStared = !found.isStared;

    // 4) local'storage'ı güncelle
    localStorage.setItem('mails', JSON.stringify(mailData));

    // 5) arayüzü güncelle
    renderMails(mailData);
  }
};

ele.mailsArea.addEventListener('click', handleClick);

// 6) Navigasyon Menüsü Aktifliği
ele.nav.addEventListener('click', (e) => {
  // eğerki ikinci categorye yani "yıldızlı" kategoorisine tıklanırsa
  if (e.target.id === 'cat2') {
    // dizi içerisnden sadece yıldı olanları al ve ekrana bas
    const filtred = mailData.filter((mail) => mail.isStared === true);
    renderMails(filtred);
  } else {
    // bütün diziyi ekrena bas
    renderMails(mailData);
  }
});

// 7) Aratma Özelliği
// Kullanıcın anlık olarak inputa her veri girdiğinde mailleri
// filtrele

// sayaç değişkeni
let timer;

ele.searchInp.addEventListener('input', (e) => {
  // yen ituş vuruşunda önceki ger sayımı sıfırla
  clearTimeout(timer);
  // fonksiyonu çalıştırmak için ger isayım başlat
  timer = setTimeout(() => searchMail(e), 1000);
});

function searchMail(e) {
  // arama terimine erişme
  const query = e.target.value;
  console.log('filtreleme yapıldı', query);

  // mail'in içerisndeki en az bir değer araattığımız terimi
  // içeriyorsa maili filtrele
  const filtred = mailData.filter((mail) =>
    // objeyi diziye çevir
    Object.values(mail)
      // dizinin ihityacımız olan elemanlarını al
      .slice(1, 6)
      // objenin değelerinden en az biri arattığımız terimi içeriyor mu?
      .some((value) => value.toLowerCase().includes(query))
  );

  if (filtred.length === 0) {
    // dizide eleman yoksa uyarı bas
    ele.mailsArea.innerHTML =
      '<div class="warn">Arattığınız terime uygun mail bulunamadı</div>';
  } else {
    // filtrelenenleri ekrana bas
    renderMails(filtred);
  }
}

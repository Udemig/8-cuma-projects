// Arayüz işlemlerini ve html'den aldığımız elemaları
// çağırıdğımız dosya

//! HTML'den çağrılan elemanlar
export const ele = {
  menu: document.querySelector('#menu'),
  nav: document.querySelector('nav'),
  mailsArea: document.querySelector('.mails'),
};

//! ekrana mailleri basar
// mailData: ekrana basılacak olan mailler
export const renderMails = (mailData) => {
  // mailData dizisidneki her bir mail için bir
  // mail html'i oluştur ve mail_html dizisine aktar
  const mail_html = mailData.map((mail) => {
    return `
          <div class="mail">
            <div class="info">
              <input type="checkbox" />
              <i class="bi bi-star-fill"></i>
              <b>${mail.sender}</b>
            </div>

            <div class="content">
              <p class="title">${mail.title}</p>
              <p class="desc">
                ${mail.message}
              </p>
            </div>

            <p class="time">${mail.date}</p>

            <button>Sil</button>
          </div>
  `;
  });

  // join > dizi olarak tanımlanmış olan
  // html değişkenini stringe çevirdi
  // html deki mail alanına oluştuduğumuz strngi gönderme
  ele.mailsArea.innerHTML = mail_html.join(' ');
};

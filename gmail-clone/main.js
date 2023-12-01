import { mailData } from './scripts/constants.js';
import { ele, renderMails } from './scripts/ui.js';

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
document.addEventListener('DOMContentLoaded', () => {
  renderMails(mailData);
});

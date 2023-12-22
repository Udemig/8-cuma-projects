import { getLocal } from './scripts/helpers.js';
import {
  ele,
  renderUserInfo,
  renderTimeline,
  renderLoader,
} from './scripts/ui.js';
import API from './scripts/api.js';

// lokal'den kullanıcı bilgilerini al
const user = getLocal('user');

// sayfa yüklenince kullanıcının bilgilerini ekrana bas
document.addEventListener('DOMContentLoaded', () => {
  if (user) {
    // kullanıcı oturum açtıysa bilgilerini ekrana bas
    renderUserInfo(user);
  } else {
    // oturum açmadıysa logine yönlendir (authorization)
    location = '/auth.html';
  }

  //1) ekrana yükleniyor bas
  renderLoader(ele.tweetsArea);

  // 2) Kullanıcın tweet'lerini al
  API.getData(`/timeline.php?screenname=${user.profile}`)
    // 3) tweet'leri ekrana bas
    .then((data) => renderTimeline(data, ele.tweetsArea));
});

// çıkış butonuna tıklanınca oturumu kapat
ele.logoutBtn.addEventListener('click', () => {
  console.log('tıklandır');

  // kullanıcı bilgilerini locak'den kaldır
  localStorage.removeItem('user');

  // logine yönlendit
  location = '/auth.html';
});

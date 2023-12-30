import API from './scripts/api.js';
import { getLocal } from './scripts/helpers.js';
import {
  ele,
  renderUserInfo,
  renderTimeline,
  renderLoader,
  renderDetailLoader,
  renderDetail,
  renderUser,
} from './scripts/ui.js';

// lokal'den kullanıcı bilgilerini al
const user = getLocal('user');

// kullanıcnı hangi sayfayı göreceğine karar veren fonksiyon
// ekranın orta kısmına yer alıcak html kodunu belirler
const router = () => {
  // url'deki arama paramtrelerine erişme
  const params = new URLSearchParams(location.search);
  const page = params.get('page');
  const query = params.get('q');

  //  page'İn değerine göre aryüze karar ver
  switch (page) {
    // tweet detay
    case 'status':
      // lodaingi ekrana bas
      renderDetailLoader('Gönderi');
      // tweet detaylarını api'dan
      API.getData(`/tweet.php?id=${query}`)
        // erkana detay sayfasını bas
        .then((data) => renderDetail(data, user));

      break;

    // arama sayfası
    case 'search':
      renderDetailLoader(`${query} için sonuçlar`);

      API.getData(`/search.php?query=${query}&search_type=top`)
        //
        .then((data) => renderTimeline(data, ele.main, 'user_info'));

      break;

    // kullnaıcı detay sayfası
    case 'user':
      // sayfanın yüklendiğini belirt
      renderDetailLoader(query);

      // kulalncın bilgilerini api'dan al
      API.getUser(query).then((user) => {
        // kullanıcn hesap bilgilerini ekrana bas
        renderUser(user);
        // tweet'lerin geliceği yeri seçme
        const outlet = document.querySelector('.page-bottom');
        // kullanıcn attığı tweetleri al
        API.getData(`/timeline.php?screenname=${query}`).then(
          (data) => renderTimeline(data, outlet, 'author')
        );
      });

      break;

    // varasayılan olaraka anasayfayı ekrana bas
    default:
      //1) ekrana yükleniyor bas
      renderLoader(ele.tweetsArea);

      // 2) Kullanıcın tweet'lerini al
      API.getData(`/timeline.php?screenname=${user.profile}`)
        // 3) tweet'leri ekrana bas
        .then((data) =>
          renderTimeline(data, ele.tweetsArea, 'author')
        );
  }
};

// sayfa yüklenince kullanıcının bilgilerini ekrana bas
document.addEventListener('DOMContentLoaded', () => {
  if (user) {
    // kullanıcı oturum açtıysa bilgilerini ekrana bas
    renderUserInfo(user);
  } else {
    // oturum açmadıysa logine yönlendir (authorization)
    location = '/auth.html';
  }

  // ekran basılcak sayfayı belirle
  router();
});

// çıkış butonuna tıklanınca oturumu kapat
ele.logoutBtn.addEventListener('click', () => {
  console.log('tıklandır');

  // kullanıcı bilgilerini locak'den kaldır
  localStorage.removeItem('user');

  // logine yönlendit
  location = '/auth.html';
});

// geri butona tıklanma olayını izle
ele.main.addEventListener('click', (e) => {
  if (e.target.id === 'back-btn') {
    // bir adım geriye git
    history.back();
  }
});

// arama formunun gönderilmesini izle
ele.searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  // formdaki veriye eriş
  const query = e.target[0].value;

  // sayfayı değiş
  location = `?page=search&q=${query}`;
});

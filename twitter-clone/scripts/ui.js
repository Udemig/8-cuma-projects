export const ele = {
  user_name: document.querySelector('#user-name'),
  user_tag: document.querySelector('#user-tag'),
  pics: document.querySelectorAll('#profile-pic'),
  tweetsArea: document.querySelector('.tweets-area'),
  logoutBtn: document.querySelector('#logout-btn'),
  main: document.querySelector('main'),
};

// kullanıcın bilgilerini ekrana basar
export const renderUserInfo = (user) => {
  // kullanıcı resimlerini ekrana bas
  ele.pics.forEach((img) => (img.src = user.avatar));

  // kullanıcı isimlerini ekrana bas
  ele.user_name.innerText = user.name;
  ele.user_tag.innerText = '@' + user.profile;
};

// tweetin medya içeriğini alıcak ve içerğe göre html oluşturucak
const getMedia = (media) => {
  // fotoğraf varsa
  if (media.photo) {
    return media.photo
      .map((img) => `<img src="${img.media_url_https}" />`)
      .join('');
  }

  // video varsa
  if (media.video) {
    const url = media.video[0].variants[0].url;
    return `<video controls src="${url}"/>`;
  }

  // media içeriği yoksa
  return '';
};

// tweetleri ekana basar
// 1) data:tweet'ler
// 2) outlet: hangi elementin içerisne göndericez
export const renderTimeline = (data, outlet) => {
  console.log(data.timeline[1]);

  // her bir tweet için outlet'e bir tweet divi bas
  outlet.innerHTML = data.timeline
    .map(
      (tweet) => `
        <div class="tweet">
          <img id="user-img" src="${
            tweet.author
              ? tweet.author.avatar
              : '/images/defaultt.png'
          }" />
          <div class="body">
            <div class="user">
            ${
              tweet.author
                ? `
               <a href="#">
                <img id="mobile-img" src="${tweet.author?.avatar}" />
                <b>${tweet.author?.name}</b>
                <p>@${tweet.author?.screen_name}</p>
                <p>${moment(tweet.created_at).fromNow()}</p>
              </a>
              `
                : `<p>Gönderiyi Yeniden yayınladı</p>`
            }
             

              <i class="bi bi-three-dots"></i>
            </div>

            <div class="content">
              <p>${tweet.text}</p>
              ${getMedia(tweet.media)}
            </div>

            <div class="buttons">
              <button>
                <i class="bi bi-chat"></i>
                <span>${tweet.replies}</span>
              </button>
              <button>
                <i class="bi bi-recycle"></i>
                <span>${tweet.retweets}</span>
              </button>
              <button>
                <i class="bi bi-heart"></i>
                <span>${tweet.favorites}</span>
              </button>
              <button>
                <i class="bi bi-bookmark"></i>
                <span>${tweet.bookmarks}</span>
              </button>
            </div>
          </div>
        </div> 
         `
    )
    .join('');
};

// parametre olarak aldığı alana yükleniyor basar
export const renderLoader = (outlet) => {
  outlet.innerHTML =
    '<div id="loader-wrapper"> <div aria-live="assertive" role="alert" class="loader"></div> </div>';
};

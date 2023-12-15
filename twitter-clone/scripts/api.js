// api'a zorunlu oalrak göndermemiz gerken
// ve api-key 'ini içeren  obje
const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key':
      '554b5c9a03msh4a008333f18e61ap1fb405jsnbaa4227abd20',
    'X-RapidAPI-Host': 'twitter-api45.p.rapidapi.com',
  },
};

export default class API {
  // kullancıı isminden hesap bilgilerine erişir
  static async getUser(username) {
    // 1) verileri al
    const res = await fetch(
      `https://twitter-api45.p.rapidapi.com/screenname.php?screenname=${username}`,
      options
    );

    // 2) json verisini javascript verisine çevir
    const data = await res.json();

    // 3) veriyi fonksiyonun çağrıldığı yere gönder
    return data;
  }

  // tweetleri alır
  static getTweets() {}
}

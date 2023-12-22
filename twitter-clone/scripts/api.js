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

  // parametre oalrak gönderdiğimiz endpoint'deki verileri alır
  static async getData(endpoint) {
    try {
      // parametre olarak gelen uçnoktaya istek at
      const res = await fetch(
        `https://twitter-api45.p.rapidapi.com${endpoint}`,
        options
      );

      // gelen veriyi işle ve döndür
      return await res.json();
    } catch (err) {
      console.log('veirleri alırken hata', err);
    }
  }
}

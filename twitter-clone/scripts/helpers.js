// local'e veri kaydeder
export const setLocal = (key, value) => {
  // string'e çevir
  const strData = JSON.stringify(value);

  // local'e kaydet
  localStorage.setItem(key, strData);
};

// lokal'den veri çeker
export const getLocal = (key) => {
  // local'den veriye eriş
  const strData = localStorage.getItem(key);

  //  stringi js verisine çevir ve döndür
  return JSON.parse(strData);
};

import API from './api.js';
import { setLocal } from './helpers.js';

const authEle = {
  loginForm: document.querySelector('#login'),
  nameInp: document.querySelector('#name'),
  passInp: document.querySelector('#pass'),
  nameWarn: document.querySelector('.name-warning'),
  passWarn: document.querySelector('.pass-warning'),
};

//  şifre kuralları için regex
// min 1 büyük ve küçük harf
// min 1 sayı
// min 1 özel karakter
// min 8 karakter
const regex =
  '(?=[A-Za-z0-9@#$%^&+!=]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+!=])(?=.{8,}).*$';

// isim ve şifreyi kontrol eder
// isim veya şifrede problem varsa uayrı olarak ekran basıcak ve false döndürücekl
// problem yoksa true döndürür
const checkValues = (name, pass) => {
  let isPassError = false;
  let isNameError = false;

  // 1) ismi kontrol eder ve hataları ekrana basar
  if (!name.trim()) {
    isNameError = true;
    authEle.nameWarn.innerHTML = '<p>Lütfen isim giriniz</p>';
  } else {
    isNameError = false;
    authEle.nameWarn.innerHTML = '';
  }

  // 2) şifre kontrol
  if (!pass.trim()) {
    isPassError = true;
    authEle.passWarn.innerHTML = '<p>Lütfen şifre giriniz</p>';
  } else if (pass.length < 8) {
    isPassError = true;
    authEle.passWarn.innerHTML = '<p>Şifre en az 8 haneli olmalı</p>';
  } else if (!pass.match(regex)) {
    isPassError = true;
    authEle.passWarn.innerHTML = '<p>Şifre yeterince güçlü değil</p>';
  } else {
    isPassError = false;
    authEle.passWarn.innerHTML = '';
  }

  // 3) Fonsiyonuun dödnürüceği değere karar ver
  if (isNameError || isPassError) {
    return false;
  } else {
    return true;
  }
};

// formun gönderilme olayını izle ve inputlardaki verilere eriş
authEle.loginForm.addEventListener('submit', (e) => {
  //1) sayfayı yenilemeyi engelle
  e.preventDefault();

  //2) değerlere erişme
  const name = authEle.nameInp.value;
  const pass = authEle.passInp.value;

  //3) değerler'de hata yoksa:
  if (checkValues(name, pass)) {
    // kullanıcı bilgilerini api'den al
    API.getUser(name)
      .then((data) => {
        if (data.status === 'error') {
          // eğerki kullanıcı bulunamadıysa uyarı ver
          authEle.nameWarn.innerHTML = '<p>Kullanıcı Bulunamadı</p>';
        } else {
          // kulalnıcı bulunduysa locale'e kaydet
          setLocal('user', data);
          // anaysayfaya yönlendir
          location = '/';
        }
      })
      .catch((err) => console.log(err));
  }
});

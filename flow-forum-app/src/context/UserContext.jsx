import axios from 'axios';
import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

axios.defaults.baseURL = 'http://localhost:3090';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // oturumu açık olan kullanıcnın bilgileri
  const [activeUser, setActiveUser] = useState();

  // yönlendirme methodnu tanımlama
  const navigate = useNavigate();

  //! sayfa her yenilindiğinde en son oturumu açan kişinin hesap bilgielni al
  useEffect(() => {
    // id'sini alma
    const id = localStorage.getItem('TOKEN');

    if (id) {
      // id'sine göre hesap bilgilerini al
      axios
        .get(`/users/${id}`)
        .then((res) => {
          setActiveUser(res.data);
        })
        .catch((err) => toast.error('Kullanıcı bilgier alınamadı'));
    } else {
      navigate('/login');
    }
  }, []);

  // hesap oluşturma
  const signup = (user) => {
    axios.post('/users', user).then(() => {
      // 1) oturumu açık olan kullanıcın id'sini local'e kayder
      localStorage.setItem('TOKEN', user.id);

      // 2) active kullanıcı state'ini güncelle
      setActiveUser(user);

      // 3) anasayfaya yönlendir
      navigate('/');

      // 4) bildirim ver
      toast.success('Hesabınız başarıyla oluşturuldu');
    });
  };

  // hesaba giriş yapma
  const login = (user) => {
    // veritabanından bu kullanıcı adı ve şifreyle eşeleşen kullanıcyı al
    axios
      .get(`/users?name=${user.name}&password=${user.password}`)
      .then((res) => {
        if (res.data.length === 0) {
          // kullanıcı gelmezse isim veya şifre yanlış bildirimi gönder
          toast.error('Bilgilerinizle eşleşen kullanıcı bulunamadı');
        } else {
          // kulalnıcı gelirse aktif kullanıcı olark belirle
          setActiveUser(res.data[0]);
          localStorage.setItem('TOKEN', res.data[0].id);
          navigate('/');
          toast.success('Hesaba giriş yapılıyor..');
        }
      })
      .catch((err) => console.log(err));
  };

  // hesaptan çıkma
  const logout = () => {
    //1) local storage'ı temizle
    localStorage.removeItem('TOKEN');

    //2) aktif kullanıcyı sıfırla
    setActiveUser(null);

    //3) logine yönlendir
    navigate('/login');
  };

  // hesabı sil
  const deleteAccount = () => {
    // aktif kullanıcı veritabanından sil
    axios.delete(`/users/${activeUser.id}`).then(() => {
      // kullanıcının oturumunu kapat
      logout();

      // bildirim ver
      toast.warning('Hesabınız kaldırldı');
    });
  };

  // hesabı güncelle
  const updatePassword = (newPass) => {
    axios
      .patch(`/users/${activeUser.id}`, { password: newPass })
      .then((res) => {
        // hesaba tekrar giriş yapılması zorunlu tutmak için
        // oturumu kapatıyoruz
        logout();

        // bildirim ver
        toast.success(
          'Şifreniz başarıyla güncellendi. Tekrar giriş yapın.'
        );
      });
  };

  return (
    <UserContext.Provider
      value={{
        activeUser,
        signup,
        login,
        logout,
        deleteAccount,
        updatePassword,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

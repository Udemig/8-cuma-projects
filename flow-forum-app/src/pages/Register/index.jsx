import { Link } from 'react-router-dom';
import InputField from '../../components/InputField';
import { upload } from '../../helpers';
import { v4 } from 'uuid';
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';

const Register = () => {
  // context yapısnda sağlanan veriler abone olma
  const { signup } = useContext(UserContext);

  // form gönderilince çalışır
  const handleSubmit = async (e) => {
    e.preventDefault();

    // inputlara girilen verilerden bir obje oluştur
    const form = new FormData(e.target);
    // form verisini objeye çevirme
    const formData = Object.fromEntries(form.entries());

    // resmin url'ini al
    const url = await upload(formData.image);

    if (url) {
      // kullanıcya resim ve id ekleme
      const newUser = { ...formData, id: v4(), image: url };

      // kullanıcyı veritabanına kaydet
      await signup(newUser);
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="h-screen flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img
            className="w-8 h-8 mr-2"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
            alt="logo"
          />
          Flow
        </div>

        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Yeni Hesap Oluştur
            </h1>
            <form
              onSubmit={handleSubmit}
              className="space-y-4 md:space-y-6"
            >
              {/* input alanı */}
              <InputField
                label={'İsim'}
                holder={'örn:Ahmet'}
                name={'name'}
                type={'text'}
              />

              <InputField
                label={'Email'}
                holder={'örn:deneme@şirket.com'}
                name={'email'}
                type={'email'}
              />

              <InputField
                label={'Şifre'}
                holder={'••••••••'}
                name={'password'}
                type={'password'}
              />

              <InputField
                label={'Profil Fotoğrafı'}
                name={'image'}
                type={'file'}
              />

              <button
                type="submit"
                className="mt-6 bg-blue-500 w-full text-white  hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Kaydol
              </button>

              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Hesabanız var mı?{' '}
                <Link
                  to="/login"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Giriş Yap
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;

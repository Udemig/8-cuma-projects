import { useContext, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import ConfirmModal from '../../components/ConfirmModal';
import ResetModal from './ResetModal';

const ProfilePage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isReset, setIsReset] = useState(false);

  // context yapısın aktif kullanıcnın bilgilerini al
  const { activeUser, deleteAccount, updatePassword } =
    useContext(UserContext);

  return (
    <div className="h-[85vh]">
      <div className="h-full grid place-items-center">
        <div className="flex flex-col gap-5 text-center">
          <img
            className="h-32 w-32 rounded-full mx-auto"
            src={activeUser?.image}
            alt={activeUser?.name}
          />

          <h2>
            <span className="font-bold">Kullanıcı İsmi: </span>
            <span className="text-xl">{activeUser?.name}</span>
          </h2>

          <p>
            <span className="font-bold">E-posta: </span>
            <span className="text-xl">{activeUser?.email}</span>
          </p>

          <button
            onClick={() => setIsReset(true)}
            className="bg-blue-600 rounded px-10 py-2 text-base font-normal hover:bg-blue-500"
          >
            Şifreyi Değiştir
          </button>

          <button
            onClick={() => setIsOpen(true)}
            className="bg-red-600 rounded px-10 py-2 text-base font-normal hover:bg-red-500"
          >
            Hesabı Sil
          </button>
        </div>
      </div>

      <ConfirmModal
        text={'Hesabını Sil'}
        isOpen={isOpen}
        close={() => setIsOpen(false)}
        confirm={deleteAccount}
      />

      <ResetModal
        isOpen={isReset}
        close={() => setIsReset(false)}
        confirm={updatePassword}
      />
    </div>
  );
};

export default ProfilePage;

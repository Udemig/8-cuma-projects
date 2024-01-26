import { useContext, useState } from 'react';
import { BiSolidDownArrowCircle } from 'react-icons/bi';
import { AiFillCloseCircle, AiFillCheckCircle } from 'react-icons/ai';
import { toast } from 'react-toastify';
import { categories } from '../../constant';
import { v4 } from 'uuid';
import { UserContext } from './../../context/UserContext';
import { PostContext } from '../../context/PostContext';

const Form = () => {
  const { activeUser } = useContext(UserContext);
  const { addPost } = useContext(PostContext);

  // gösterilcek input level'i state'isdfsdf
  const [inputLevel, setInputLevel] = useState(0);

  // input verileri state'i
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');

  // gönderme işleminde çalışıcak fonk.
  const handleSubmit = () => {
    // aktif kullanıcının şifresini objeden kaldır
    const author = { ...activeUser };

    delete author.password;

    // yeni gönderinin verisini hazırla
    const newPost = {
      id: v4(),
      title,
      content,
      category,
      date: new Date(),
      comments: [],
      author,
    };

    // gönderiyi oluştur
    addPost(newPost);
  };

  return (
    <div className="mt-5 flex flex-col gap-6">
      {/* 0. level */}
      <div className="grid grid-cols-5 gap-4 items-center">
        <input
          value={title}
          placeholder="Başlık...."
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded p-1 text-black shadow col-span-4"
          type="text"
        />
        <BiSolidDownArrowCircle
          onClick={() => {
            title
              ? setInputLevel(1)
              : toast.warning('inputu doldurunuz');
          }}
          className="text-2xl cursor-pointer hover:text-gray-400"
        />
      </div>

      {/* 1. level */}
      {inputLevel > 0 && (
        <div className="grid grid-cols-5 gap-4 items-center">
          <textarea
            value={content}
            placeholder="Konu içeriği giriniz..."
            onChange={(e) => setContent(e.target.value)}
            className="w-full rounded p-1 text-black shadow col-span-4 min-h-[200px] max-h-[400px]"
            type="text"
          />

          <div className="flex">
            <BiSolidDownArrowCircle
              onClick={() => {
                content
                  ? setInputLevel(2)
                  : toast.warning('inputu doldurunuz');
              }}
              className="text-2xl cursor-pointer hover:text-gray-400"
            />
            <AiFillCloseCircle
              onClick={() => {
                setInputLevel(0);
              }}
              className="text-2xl cursor-pointer hover:text-gray-400"
            />
          </div>
        </div>
      )}

      {/* 2. level */}
      {inputLevel > 1 && (
        <div className="grid grid-cols-5 gap-4 items-center">
          <select
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded p-1 text-black shadow col-span-4"
            type="text"
          >
            {categories.map((i) => (
              <option key={i.title}>{i.title}</option>
            ))}
          </select>

          <div className="flex">
            <AiFillCheckCircle
              onClick={handleSubmit}
              className="text-2xl cursor-pointer hover:text-gray-400"
            />

            <AiFillCloseCircle
              onClick={() => {
                setInputLevel(1);
              }}
              className="text-2xl cursor-pointer hover:text-gray-400"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Form;

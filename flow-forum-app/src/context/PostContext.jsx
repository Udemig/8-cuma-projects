import axios from 'axios';
import { createContext, useEffect, useState } from 'react';

export const PostContext = createContext();

export function PostProvider({ children }) {
  const [posts, setPosts] = useState([]);

  // kullanıc syafay girince veirleri al
  useEffect(() => {
    axios.get('/posts').then((res) => setPosts(res.data));
  }, []);

  // post gönderme
  const addPost = (newPost) => {
    // 1) veritabanına yeni postu ekle
    axios
      .post('/posts', newPost)
      // 2) state'in en başına yeni postu ekle
      .then((res) => {
        setPosts([newPost, ...posts]);
      });
  };

  // post silme

  // post güncelleme

  return (
    <PostContext.Provider value={{ posts, addPost }}>
      {children}
    </PostContext.Provider>
  );
}

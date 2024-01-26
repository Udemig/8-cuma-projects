import { Route, Routes } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import MainPage from './pages/MainPage';
import Layout from './pages/Layout';
import ProfilePage from './pages/Profile';

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route element={<Layout />}>
        <Route path="/" element={<MainPage />} />
        <Route path="/detay" element={<h1>Blog Detay Sayfası</h1>} />
        <Route path="/profile" element={<ProfilePage />} />
      </Route>

      <Route path="*" element={<h1>404</h1>} />
    </Routes>
  );
};

export default App;

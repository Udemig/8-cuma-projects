import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import MainPage from './pages/MainPage';
import Header from './components/Header';
import Layout from './pages/Layout';

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route element={<Layout />}>
        <Route path="/" element={<MainPage />} />
        <Route path="/detay" element={<h1>Blog Detay Sayfası</h1>} />
        <Route path="/profil" element={<h1>Profil Sayfası</h1>} />
      </Route>
    </Routes>
  );
};

export default App;

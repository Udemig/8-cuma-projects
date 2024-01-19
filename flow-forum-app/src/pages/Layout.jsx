import { Outlet } from 'react-router-dom';
import Header from '../components/Header';

const Layout = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <Header />

      <main className="grid grid-cols-4">
        <section></section>
        <section className="col-span-4 md:col-span-2 p-4">
          {/* alt route'un elementinin yerleşeceği konum */}
          <Outlet />
        </section>
        <section></section>
      </main>
    </div>
  );
};

export default Layout;

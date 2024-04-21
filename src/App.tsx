import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import './App.css';
// import { ProductListPage } from './pages/ProductListPage';
import { Outlet } from 'react-router-dom';

const App = () => {
  return (
    <div>
      <Header/>
      <Outlet/>
      <Footer />
    </div>
  );
};

export default App;

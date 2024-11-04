import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { HomePage } from './components/HomePage';
import { CartSummary } from './components/CartSummary';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from './components/Languages';

const App = () => {
  const { t } = useTranslation();

  return (
    <Router>
      <div className='container my-5'>
        <nav className='d-flex justify-content-between w-100'>
          <div className='px-3'>
            <Link to='/'>{t('menu.inicio')}</Link> |{' '}
            <Link to='/cart'>{t('menu.carrito')}</Link>
          </div>
          <LanguageSwitcher />
        </nav>

        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/cart' element={<CartSummary />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

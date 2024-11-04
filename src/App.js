import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { HomePage } from './components/HomePage';
import { CartSummary } from './components/CartSummary';
import { useTranslation } from 'react-i18next';

// Cargar LanguageSwitcher de manera diferida
const LanguageSwitcher = lazy(() => import('./components/Languages'));

const App = () => {
  const { t } = useTranslation();

  return (
    <Router>
      <div className='container my-5'>
        <nav className='d-flex justify-content-between'>
          <div className='px-3 w-100'>
            <Link to='/'>{t('menu.inicio')}</Link> |{' '}
            <Link to='/cart'>{t('menu.carrito')}</Link>
          </div>
          <Suspense fallback={<div>Cargando opciones de idioma...</div>}>
            <LanguageSwitcher />
          </Suspense>
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

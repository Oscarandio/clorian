import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { HomePage } from './components/HomePage';
import { CartSummary } from './components/CartSummary';

const App = () => {
  return (
    <Router>
      <div className='container my-5'>
        <nav>
          <Link to='/'>Inicio</Link> | <Link to='/cart'>Ver Carrito</Link>
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

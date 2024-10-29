import { useState } from 'react';
import { SearchBar } from './components/SearchBar';
import { SortSelector } from './components/SortSelector';
import products from './assets/products.json';
import { ProductCard } from './components/ProductCard';
import { AddTickets } from './components/AddTickets';
import { AddToCart } from './components/AddToCart';

const App = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
  };

  const handleSortChange = (order) => {
    setSortOrder(order);
  };

  const sortedProducts = [...products].sort((a, b) => {
    return sortOrder === 'asc'
      ? a.name.localeCompare(b.name)
      : b.name.localeCompare(a.name);
  });

  const filteredProducts = sortedProducts.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='container my-5'>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <header className='my-4'>
        <h2>Catálogo de Productos</h2>
      </header>
      <div className='row'>
        <div className='col-12 col-lg-5 '>
          <SortSelector sortOrder={sortOrder} onSortChange={handleSortChange} />
        </div>
      </div>
      <div className='row product-container'>
        <aside className='col-12 col-lg-5 overflow-y-scroll h-100'>
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              name={product.name}
              description={product.description}
              onClick={() => handleSelectProduct(product)}
            />
          ))}
        </aside>

        <section className='col-12 col-lg-7 px-4'>
          {selectedProduct ? (
            <div>
              <div className='mb-4'>
                <img
                  className='card-img-top rounded'
                  src={selectedProduct.img}
                  alt={selectedProduct.name}></img>
              </div>
              <h3>{selectedProduct.name}</h3>
              <p>{selectedProduct.description}</p>
              <div className='d-flex gap-3 align-items-center justify-content-between'>
                <div>
                  <span className='price'>{selectedProduct.price}€</span>
                  <p className='fst-italic'>
                    Entradas para el día: {selectedProduct.date}
                  </p>
                </div>

                <div className='d-flex align-items-center gap-3'>
                  <AddTickets />
                  <AddToCart />
                </div>
              </div>
            </div>
          ) : (
            <p>Selecciona un producto para ver más información</p>
          )}
        </section>
      </div>
    </div>
  );
};

export default App;

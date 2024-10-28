import React, { useState } from 'react';
import products from './assets/products.json';
import { ProductCard } from './components/ProductCard';
import { SearchBar } from './components/SearchBar';

const App = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
  };

  const filteredProducts = products.filter(
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
        <aside className='col-12 col-lg-5'>
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              name={product.name}
              description={product.description}
              date={product.date}
              price={product.price}
              onClick={() => handleSelectProduct(product)}
            />
          ))}
        </aside>

        <section className='col-12 col-lg-7'>
          {selectedProduct ? (
            <div>
              <h3>{selectedProduct.name}</h3>
              <p>{selectedProduct.description}</p>
              <p>{selectedProduct.details}</p> {/* Mostrar más detalles aquí */}
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

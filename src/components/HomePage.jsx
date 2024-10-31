// src/components/HomePage.jsx
import { useState } from 'react';
import { SearchBar } from './SearchBar';
import { SortSelector } from './SortSelector';
import products from '../assets/products.json';
import { ProductCard } from './ProductCard';
import { AddTickets } from './AddTickets';
import { AddToCart } from './AddToCart';

export const HomePage = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
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
      <header className='my-4'>
        <h2>Catálogo de Tickets</h2>
      </header>
      <div className='row'>
        <div className='col-12 col-xl-8'>
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>
        <div className='col-12 col-xl-4'>
          <SortSelector sortOrder={sortOrder} onSortChange={handleSortChange} />
        </div>
      </div>
      <div className='row product-container'>
        <aside className='col-12'>
          {filteredProducts.map((product) => (
            <div key={product.id}>
              <ProductCard
                name={product.name}
                description={product.description}
                onClick={() => handleSelectProduct(product)}
              />

              {selectedProduct && selectedProduct.id === product.id && (
                <section className='col-12 mt-3'>
                  <div className='mb-4'>
                    <img
                      className='card-img-top rounded'
                      src={selectedProduct.img}
                      alt={selectedProduct.name}
                    />
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
                      <AddTickets onSelectQuantity={setSelectedQuantity} />
                      <AddToCart
                        productId={selectedProduct.id}
                        quantity={selectedQuantity}
                        productName={selectedProduct.name}
                        productPrice={selectedProduct.price}
                      />
                    </div>
                  </div>
                </section>
              )}
            </div>
          ))}
        </aside>
      </div>
    </div>
  );
};

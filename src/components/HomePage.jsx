import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SearchBar } from './SearchBar';
import { SortSelector } from './SortSelector';
import products from '../assets/products.json';
import { ProductCard } from './ProductCard';
import { AddTickets } from './AddTickets';
import { AddToCart } from './AddToCart';

// Function to check if a given date is in the past
const isPastDate = (dateString) => {
  const [day, month, year] = dateString.split('/').map(Number); // Split the date string into day, month, year
  const fullYear = year + (year < 100 ? 2000 : 0); // Adjust year for two-digit representation
  const productDate = new Date(fullYear, month - 1, day); // Create a Date object for the product date
  const today = new Date(); // Get today's date

  today.setHours(0, 0, 0, 0); // Set today's hours, minutes, seconds, and milliseconds to zero
  productDate.setHours(0, 0, 0, 0); // Set product date to the start of the day

  return productDate < today; // Return true if the product date is in the past
};

export const HomePage = () => {
  const [selectedProduct, setSelectedProduct] = useState(null); // State for the currently selected product
  const [selectedQuantity, setSelectedQuantity] = useState(1); // State for the selected quantity of tickets
  const [searchTerm, setSearchTerm] = useState(''); // State for the search term
  const [sortOrder, setSortOrder] = useState('asc'); // State for the sort order of products

  const { t } = useTranslation(); // Hook to access the translation function

  // Function to handle selecting a product
  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
  };

  // Function to handle sorting changes
  const handleSortChange = (order) => {
    setSortOrder(order);
  };

  // Sort the products based on the selected sort order
  const sortedProducts = [...products].sort((a, b) => {
    return sortOrder === 'asc'
      ? a.name.localeCompare(b.name)
      : b.name.localeCompare(a.name);
  });

  // Filter products based on the search term
  const filteredProducts = sortedProducts.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t(`${product.name}.description`)
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  return (
    <div className='container mb-5'>
      <header className='my-4'>
        <h2>{t('catalogo')}</h2>
      </header>
      <div className='row gap-3 gap-md-0'>
        <div className='col-12 col-md-8'>
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />{' '}
        </div>
        <div className='col-12 col-md-4'>
          <SortSelector sortOrder={sortOrder} onSortChange={handleSortChange} />{' '}
        </div>
      </div>
      <div className='row product-container'>
        <aside className='col-12'>
          {filteredProducts.map((product) => {
            const isDisabled = isPastDate(product.date); // Determine if the product date is in the past

            return (
              <div key={product.id}>
                <ProductCard
                  name={t(`${product.name}.name`)}
                  description={t(`${product.name}.description`)}
                  onClick={() => handleSelectProduct(product)} // Handle product selection on click
                />

                {selectedProduct &&
                  selectedProduct.id === product.id && ( // Render details if the selected product matches
                    <section className='col-12 mt-3 px-2'>
                      <div className='mb-4'>
                        <img
                          className='card-img-top rounded'
                          src={selectedProduct.img}
                          alt={t(`${product.name}.name`)}
                        />
                      </div>
                      <h3>{t(`${product.name}.name`)}</h3>
                      <p>{t(`${selectedProduct.name}.description`)}</p>
                      <div className='d-flex flex-wrap flex-md-nowrap gap-3 align-items-lg-center justify-content-between my-3'>
                        <div>
                          <span className='price'>
                            {selectedProduct.price}€
                          </span>
                          <p className='fst-italic'>
                            {t('entradas_dia')}: {selectedProduct.date}
                          </p>
                        </div>
                        <div className='d-flex flex-wrap justify-content-end align-items-center gap-3'>
                          <AddTickets
                            onSelectQuantity={setSelectedQuantity} // Set selected quantity in state
                            disabled={isDisabled} // Disable if the product date is in the past
                          />
                          <AddToCart
                            productId={selectedProduct.id}
                            quantity={selectedQuantity}
                            productName={selectedProduct.name}
                            productPrice={selectedProduct.price}
                            disabled={isDisabled}
                          />
                        </div>
                      </div>
                    </section>
                  )}
              </div>
            );
          })}
        </aside>
      </div>
    </div>
  );
};

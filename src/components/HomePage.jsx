import React, { useState, Suspense, lazy } from 'react';
import { useTranslation } from 'react-i18next';
import products from '../assets/products.json';

// Importa componentes de manera diferida
const SearchBar = lazy(() => import('./SearchBar'));
const SortSelector = lazy(() => import('./SortSelector'));
const ProductCard = lazy(() => import('./ProductCard'));
const AddTickets = lazy(() => import('./AddTickets'));
const AddToCart = lazy(() => import('./AddToCart'));

// Función para verificar si una fecha dada está en el pasado
const isPastDate = (dateString) => {
  const [day, month, year] = dateString.split('/').map(Number);
  const fullYear = year + (year < 100 ? 2000 : 0);
  const productDate = new Date(fullYear, month - 1, day);
  const today = new Date();

  today.setHours(0, 0, 0, 0);
  productDate.setHours(0, 0, 0, 0);

  return productDate < today;
};

export const HomePage = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const { t } = useTranslation();

  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
  };

  const handleSortChange = (order) => {
    setSortOrder(order);
  };

  // Obtener las descripciones traducidas y crear un nuevo array
  const translatedProducts = products.map((product) => ({
    ...product,
    translatedDescription: t(`${product.name}.description`),
  }));

  // Ordenar productos
  const sortedProducts = [...translatedProducts].sort((a, b) => {
    switch (sortOrder) {
      case 'asc':
        return a.name.localeCompare(b.name);
      case 'desc':
        return b.name.localeCompare(a.name);
      case 'asc-description':
        return a.translatedDescription.localeCompare(b.translatedDescription);
      case 'desc-description':
        return b.translatedDescription.localeCompare(a.translatedDescription);
      default:
        return 0;
    }
  });

  // Filtrar productos
  const filteredProducts = sortedProducts.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.translatedDescription
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
          <Suspense fallback={<div>Cargando búsqueda...</div>}>
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          </Suspense>
        </div>
        <div className='col-12 col-md-4'>
          <Suspense fallback={<div>Cargando opciones de orden...</div>}>
            <SortSelector
              sortOrder={sortOrder}
              onSortChange={handleSortChange}
            />
          </Suspense>
        </div>
      </div>
      <div className='row product-container'>
        <aside className='col-12'>
          {filteredProducts.map((product) => {
            const isDisabled = isPastDate(product.date);

            return (
              <div key={product.id}>
                <Suspense fallback={<div>Cargando producto...</div>}>
                  <ProductCard
                    name={t(`${product.name}.name`)}
                    description={product.translatedDescription}
                    onClick={() => handleSelectProduct(product)}
                  />
                  {selectedProduct && selectedProduct.id === product.id && (
                    <section className='col-12 mt-3 px-2'>
                      <div className='mb-4'>
                        <img
                          className='card-img-top rounded'
                          src={selectedProduct.img}
                          alt={t(`${product.name}.name`)}
                        />
                      </div>
                      <h3>{t(`${product.name}.name`)}</h3>
                      <p>{product.translatedDescription}</p>
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
                          <Suspense fallback={<div>Cargando tickets...</div>}>
                            <AddTickets
                              onSelectQuantity={setSelectedQuantity}
                              disabled={isDisabled}
                            />
                            <AddToCart
                              productId={selectedProduct.id}
                              quantity={selectedQuantity}
                              productName={selectedProduct.name}
                              productPrice={selectedProduct.price}
                              disabled={isDisabled}
                            />
                          </Suspense>
                        </div>
                      </div>
                    </section>
                  )}
                </Suspense>
              </div>
            );
          })}
        </aside>
      </div>
    </div>
  );
};

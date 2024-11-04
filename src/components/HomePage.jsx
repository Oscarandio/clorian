// src/components/HomePage.jsx
import { useState } from "react";
import { SearchBar } from "./SearchBar";
import { SortSelector } from "./SortSelector";
import products from "../assets/products.json";
import { ProductCard } from "./ProductCard";
import { AddTickets } from "./AddTickets";
import { AddToCart } from "./AddToCart";

// Función para verificar si la fecha es pasada
const isPastDate = (dateString) => {
  // Convertir la fecha del producto de DD/MM/AA a un objeto Date
  const [day, month, year] = dateString.split("/").map(Number);
  const fullYear = year + (year < 100 ? 2000 : 0); // Convierte años de dos dígitos al rango 2000-2099

  const productDate = new Date(fullYear, month - 1, day); // Meses en Date van de 0 a 11
  const today = new Date();

  // Configurar la hora en ambos para comparar solo fechas, no tiempos
  today.setHours(0, 0, 0, 0);
  productDate.setHours(0, 0, 0, 0);

  return productDate < today;
};

export const HomePage = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
  };

  const handleSortChange = (order) => {
    setSortOrder(order);
  };

  const sortedProducts = [...products].sort((a, b) => {
    return sortOrder === "asc"
      ? a.name.localeCompare(b.name)
      : b.name.localeCompare(a.name);
  });

  const filteredProducts = sortedProducts.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='container mb-5'>
      <header className='my-4'>
        <h2>Catálogo de Tickets</h2>
      </header>
      <div className='row gap-3 gap-md-0'>
        <div className='col-12 col-md-8'>
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>
        <div className='col-12 col-md-4'>
          <SortSelector sortOrder={sortOrder} onSortChange={handleSortChange} />
        </div>
      </div>
      <div className='row product-container'>
        <aside className='col-12'>
          {filteredProducts.map((product) => {
            const isDisabled = isPastDate(product.date); // Verificar si la fecha es pasada

            return (
              <div key={product.id}>
                <ProductCard
                  name={product.name}
                  description={product.description}
                  onClick={() => handleSelectProduct(product)}
                />

                {selectedProduct && selectedProduct.id === product.id && (
                  <section className='col-12 mt-3 px-2'>
                    <div className='mb-4'>
                      <img
                        className='card-img-top rounded'
                        src={selectedProduct.img}
                        alt={selectedProduct.name}
                      />
                    </div>
                    <h3>{selectedProduct.name}</h3>
                    <p>{selectedProduct.description}</p>
                    <div className='d-flex flex-wrap flex-md-nowrap gap-3 align-items-lg-center justify-content-between my-3'>
                      <div>
                        <span className='price'>{selectedProduct.price}€</span>
                        <p className='fst-italic'>
                          Entradas para el día: {selectedProduct.date}
                        </p>
                      </div>
                      <div className='d-flex flex-wrap justify-content-end align-items-center gap-3'>
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

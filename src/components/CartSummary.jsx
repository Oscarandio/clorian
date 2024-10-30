// CartSummary.jsx
import { useSelector } from 'react-redux';

export const CartSummary = () => {
  const items = useSelector((state) => state.cart.items);

  return (
    <div>
      <h2>Resumen del Carrito</h2>
      {items.length > 0 ? (
        items.map((item, index) => (
          <div key={`${item.id}-${index}`}>
            <p>
              {item.name}: {item.quantity} entradas
            </p>
          </div>
        ))
      ) : (
        <p>El carrito está vacío</p>
      )}
    </div>
  );
};

// CartSummary.jsx
import { useSelector, useDispatch } from 'react-redux';
import { removeItemFromCart, clearCart } from '../redux/cartSlice';
import 'bootstrap/dist/css/bootstrap.min.css';

export const CartSummary = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);

  const totalGeneral = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleRemoveItem = (id) => {
    dispatch(removeItemFromCart(id));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className='container my-4'>
      <h2>Resumen del Carrito</h2>
      {items.length > 0 ? (
        <div className='list-group'>
          {items.map((item) => (
            <div
              key={item.id}
              className='list-group-item d-flex justify-content-between align-items-center py-2'>
              <div>
                <h5>{item.name}</h5>
                <p>
                  Precio por entrada: {item.price}€ <br />
                  Cantidad: {item.quantity}
                </p>
              </div>
              <div className='text-end'>
                <p className='fw-bold'>
                  Subtotal: {item.price * item.quantity}€
                </p>
                <button
                  className='btn btn-outline-danger btn-sm mb-2'
                  onClick={() => handleRemoveItem(item.id)}>
                  Eliminar producto
                </button>
              </div>
            </div>
          ))}
          <div className='list-group-item d-flex justify-content-between align-items-center mt-3'>
            <h4>Total General:</h4>
            <h4>{totalGeneral}€</h4>
          </div>
          <button className='btn btn-danger mt-3' onClick={handleClearCart}>
            Vaciar carrito
          </button>
        </div>
      ) : (
        <p>El carrito está vacío</p>
      )}
    </div>
  );
};

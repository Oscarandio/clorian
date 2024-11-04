// CartSummary.jsx
import { useSelector, useDispatch } from 'react-redux';
import { removeItemFromCart, clearCart } from '../redux/cartSlice';
import 'bootstrap/dist/css/bootstrap.min.css';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

export const CartSummary = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);

  // Calculate the total price of all items in the cart, formatted to two decimals
  const totalGeneral = items
    .reduce((acc, item) => acc + item.price * item.quantity, 0)
    .toFixed(2);

  // Function to handle removing an item from the cart
  const handleRemoveItem = (id) => {
    dispatch(removeItemFromCart(id));
    toast.success('Producto eliminado', {
      position: 'bottom-right',
    });
  };

  // Function to handle clearing the entire cart
  const handleClearCart = () => {
    dispatch(clearCart());
    toast.success('Carrito vaciado', {
      position: 'bottom-right',
    });
  };

  const { t } = useTranslation();

  return (
    <div className='container my-4'>
      <h2>{t('resumen_carrito')}</h2>{' '}
      {items.length > 0 ? ( // Check if there are items in the cart
        <div className='list-group my-3'>
          {items.map((item) => (
            <div
              key={item.id}
              className='list-group-item d-flex justify-content-between align-items-center py-2'>
              <div>
                <h5>{t(`${item.name}.name`)}</h5>{' '}
                <p>
                  {t('precio_entrada')}: {item.price.toFixed(2)}€ <br />{' '}
                  {t('cantidad')}: {item.quantity}{' '}
                </p>
              </div>
              <div className='text-end'>
                <p className='fw-bold'>
                  {t('subtotal')}: {(item.price * item.quantity).toFixed(2)}€{' '}
                  {/* Calculate and display subtotal */}
                </p>
                <button
                  className='btn btn-outline-danger btn-sm mb-2'
                  onClick={() => handleRemoveItem(item.id)}>
                  {t('eliminar_producto')}{' '}
                </button>
              </div>
            </div>
          ))}
          <div className='list-group-item d-flex justify-content-between align-items-center mt-3'>
            <h4>{t('total_general')}:</h4> <h4>{totalGeneral}€</h4>
          </div>
          <button className='btn btn-danger mt-3' onClick={handleClearCart}>
            {t('vaciar_carrito')}{' '}
          </button>
        </div>
      ) : (
        <p>{t('carrito_vacio')}</p>
      )}
    </div>
  );
};

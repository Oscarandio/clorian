// CartSummary.jsx
import { useSelector, useDispatch } from 'react-redux';
import { removeItemFromCart, clearCart } from '../redux/cartSlice';
import 'bootstrap/dist/css/bootstrap.min.css';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import CartItem from './CartItem'; // Importa el componente CartItem

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
      <h2>{t('resumen_carrito')}</h2>
      {items.length > 0 ? ( // Check if there are items in the cart
        <div className='list-group my-3'>
          {items.map((item) => (
            <CartItem key={item.id} item={item} onRemove={handleRemoveItem} />
          ))}
          <div className='list-group-item d-flex justify-content-between align-items-center mt-3'>
            <h4>{t('total_general')}:</h4> <h4>{totalGeneral}€</h4>
          </div>
          <button className='btn btn-danger mt-3' onClick={handleClearCart}>
            {t('vaciar_carrito')}
          </button>
        </div>
      ) : (
        <p>{t('carrito_vacio')}</p>
      )}
    </div>
  );
};

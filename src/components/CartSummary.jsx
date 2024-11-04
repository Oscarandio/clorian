import { useSelector, useDispatch } from 'react-redux';
import { removeItemFromCart, clearCart } from '../redux/cartSlice';
import 'bootstrap/dist/css/bootstrap.min.css';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import CartItem from './CartItem'; // Importa el componente CartItem

export const CartSummary = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);

  console.log('Items en el carrito:', items); // Verifica el contenido del carrito

  // Calcular el precio total de todos los artículos en el carrito, formateado a dos decimales
  const totalGeneral =
    items.length > 0
      ? items
          .reduce(
            (acc, item) => acc + (item.price || 0) * (item.quantity || 0),
            0
          )
          .toFixed(2)
      : '0.00'; // Valor por defecto si no hay elementos

  // Función para manejar la eliminación de un artículo del carrito
  const handleRemoveItem = (id) => {
    dispatch(removeItemFromCart(id));
    toast.success('Producto eliminado', {
      position: 'bottom-right',
    });
  };

  // Función para manejar el vaciado del carrito
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
      {items.length > 0 ? ( // Verifica si hay elementos en el carrito
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

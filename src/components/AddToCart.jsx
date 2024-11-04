import '@fortawesome/fontawesome-free/css/all.min.css';
import { useDispatch, useSelector } from 'react-redux'; // Importar useSelector
import { addItemToCart } from '../redux/cartSlice';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

const AddToCart = ({
  productId,
  quantity,
  productPrice,
  productName,
  disabled,
}) => {
  const dispatch = useDispatch(); // Initialize the dispatch function for Redux actions
  const cartItems = useSelector((state) => state.cart.items); // Obtener los items del carrito

  const { t } = useTranslation(); // Hook to access the translation function

  // Function to handle adding an item to the cart
  const handleAddToCart = () => {
    if (quantity > 0) {
      // Verificar cuántas entradas del producto ya están en el carrito
      const existingItem = cartItems.find((item) => item.id === productId);
      const currentQuantity = existingItem ? existingItem.quantity : 0;
      const totalQuantity = currentQuantity + quantity;

      // Check if number of tickets are more than 10
      if (totalQuantity > 10) {
        toast.error(`${t('exceso_entradas')}`, {
          position: 'bottom-right',
        });
        return;
      }

      // Dispatch action to add the selected product to the cart
      dispatch(
        addItemToCart({
          id: productId,
          name: productName,
          price: productPrice,
          quantity,
        })
      );

      // Dynamic message for the toast notification
      const message = `${
        quantity === 1 ? `${t('añadida')}` : `${t('añadidas')}`
      } ${quantity} ${quantity === 1 ? `${t('entrada')}` : `${t('entradas')}`}`;

      toast.success(message, {
        position: 'bottom-right',
      });
    }
  };

  return (
    <button
      className={`btn btn-danger ${disabled ? 'disabled' : ''}`} // Apply 'disabled' class if the button is disabled
      disabled={disabled} // Disable button functionality if the 'disabled' prop is true
      type='button'
      onClick={handleAddToCart}>
      {t('añadir')}
      <i className='fas fa-shopping-cart ps-1'></i>
    </button>
  );
};

export default AddToCart;

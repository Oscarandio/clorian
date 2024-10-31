import '@fortawesome/fontawesome-free/css/all.min.css';
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../redux/cartSlice';

export const AddToCart = ({
  productId,
  quantity,
  productPrice,
  productName,
}) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    if (quantity > 0) {
      dispatch(
        addItemToCart({
          id: productId,
          name: productName,
          price: productPrice,
          quantity,
        })
      );
    } else {
      alert('Por favor, selecciona una cantidad de entradas');
    }
  };

  return (
    <button className='btn btn-danger' type='button' onClick={handleAddToCart}>
      Añadir al carrito<i className='fas fa-shopping-cart ps-1'></i>
    </button>
  );
};

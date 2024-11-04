import "@fortawesome/fontawesome-free/css/all.min.css";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../redux/cartSlice";
import { toast } from "react-toastify";

export const AddToCart = ({
  productId,
  quantity,
  productPrice,
  productName,
  disabled
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

      // Mensaje dinámico para el toast
      const message = `Se ${
        quantity === 1 ? "ha añadido" : "han añadido"
      } ${quantity} ${quantity === 1 ? "entrada" : "entradas"}`;

      // Mostrar notificación con mensaje dinámico y posición ajustada
      toast.success(message, {
        position: "bottom-right", // Posición del toast
      });
    } else {
      alert("Por favor, selecciona una cantidad de entradas");
    }
  };

  return (
    <button
      className={`btn btn-danger ${disabled ? "disabled" : ""}`}
      disabled={disabled}
      type='button'
      onClick={handleAddToCart}
    >
      Añadir al carrito<i className='fas fa-shopping-cart ps-1'></i>
    </button>
  );
};

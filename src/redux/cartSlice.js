// cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
  },
  reducers: {
    addItemToCart: (state, action) => {
      const { id, name, price, quantity } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      const totalQuantity = existingItem
        ? existingItem.quantity + quantity
        : quantity;

      if (totalQuantity <= 10) {
        if (existingItem) {
          existingItem.quantity += quantity; 
        } else {
          state.items.push({ id, name, price, quantity }); 
        }
      } else {
        console.warn(`No se pueden añadir más de 10 entradas de ${name}.`);
      }
    },
    removeItemFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addItemToCart, removeItemFromCart, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;

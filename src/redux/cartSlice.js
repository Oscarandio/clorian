// cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
  },
  reducers: {
    addItemToCart: (state, action) => {

      const { id, name, quantity } = action.payload;

      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({ id, name, quantity });
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addItemToCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;

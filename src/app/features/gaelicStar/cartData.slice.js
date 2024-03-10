import { createSlice } from "@reduxjs/toolkit";

export const cartDataSlice = createSlice({
  name: "cartData",
  initialState: [],
  reducers: {
    cartDetails: (state, action) => {
      return action.payload;
    },

    incrementQuantity: (state, action) => {
      const productIndex = state.findIndex(
        (product) => product.id === action.payload
      );
      if (productIndex !== -1) {
        state[productIndex].quantity = Number(state[productIndex].quantity) + 1;
      }
    },
    decrementQuantity: (state, action) => {
      const productIndex = state.findIndex(
        (product) => product.id === action.payload
      );
      if (productIndex !== -1) {
        state[productIndex].quantity = Number(state[productIndex].quantity) - 1;
      }
    },
  },
});

export const { cartDetails, incrementQuantity, decrementQuantity } = cartDataSlice.actions;

export const cartData = (state) => state.cartData;
export default cartDataSlice.reducer;

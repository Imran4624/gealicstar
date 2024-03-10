import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import product from "./gaelicStart.service";

const initialState = {
  getProductsData: null,
};

export const getProducts = createAsyncThunk(
  "product/getProducts",
  async (thunkAPI) => {
    try {
      return await product.getProducts();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      Notification(message, false);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const gaelicStar = createSlice({
  name: "product",
  initialState,
  reducers: {
    clearData: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.statusMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.getProductsData = action.payload.data;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.statusMessage = action.payload;
      });
  },
});
export const { clearData } = gaelicStar.actions;

export default gaelicStar.reducer;

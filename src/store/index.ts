import { configureStore, createSlice } from "@reduxjs/toolkit";
import { Product } from "../types/product";
import { Comment } from "../types/comment";

const initialState = {
  products: [] as Product[],
  comments: [] as Comment[],
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    addProduct: (state, action) => {
      state.products.push(action.payload);
    },
    removeProduct: (state, action) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      );
    },
    updateProduct: (state, action) => {
      const index = state.products.findIndex(
        (product) => product.id === action.payload.id
      );
      if (index !== -1) {
        state.products[index] = action.payload;
      }
    },
  },
});

export const { setProducts, addProduct, removeProduct, updateProduct } =
  productSlice.actions;

const store = configureStore({
  reducer: {
    products: productSlice.reducer,
  },
});

export default store;

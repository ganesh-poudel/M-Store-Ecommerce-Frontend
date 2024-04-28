import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { InitialStateType, ProductType } from '../../redux/products/product';

const initialState: InitialStateType = {
  products: [],
  total: 0,
  favouriteList: [],
  shopingCart: [],
  searchString: '',
  loading: false,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    removeItemFromCart: (state, action: PayloadAction<ProductType>) => {
      const filteredCart = state.shopingCart.filter((item) => item._id !== action.payload._id);
      state.shopingCart = filteredCart;
      console.log(state.shopingCart);
    },

    cartCheckOut: (state) => {
      state.shopingCart = [];
    },
    searchProduct: (state, action: PayloadAction<string>) => {
      state.searchString = action.payload;
    },
  },
});

export const { removeItemFromCart, searchProduct } = productSlice.actions;

const productReducer = productSlice.reducer;
export default productReducer;

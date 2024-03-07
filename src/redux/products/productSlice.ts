import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { InitialStateType, ProductType } from "../../redux/products/product";

// let cart: ProductType[] | null = null;
// const dataShopingCart = localStorage.getItem("shopCart");
// if (dataShopingCart !== null) {
//   cart = JSON.parse(dataShopingCart);
// }

// let favourite: ProductType[] | null = null;
// const dataFavourite = localStorage.getItem("favItem");
// if (dataFavourite !== null) {
//   favourite = JSON.parse(dataFavourite);
// }

const initialState: InitialStateType = {
  products: [],
  favouriteList: [],
  shopingCart: [],
  searchString: "",
  loading: false,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    addFav: (state, action: PayloadAction<ProductType>) => {
      if (state.favouriteList.some((e) => e.id === action.payload.id)) {
        return;
      }
      state.favouriteList.push(action.payload);
      console.log("addfav", state.favouriteList);
    },
    addToCart: (state, action: PayloadAction<ProductType>) => {
      if (state.shopingCart.some((e) => e.id === action.payload.id)) {
        return;
      }
      state.shopingCart.push(action.payload);
    },
    resetProducts: (state) => {
      state.favouriteList = [];
      state.shopingCart = [];
      state.products = [];
    },
    removeItemFromCart: (state, action: PayloadAction<ProductType>) => {
      const filteredCart = state.shopingCart.filter((item) => item.id !== action.payload.id);
      state.shopingCart = filteredCart;
      console.log(state.shopingCart);
    },
    removeFavouriteItem: (state, action: PayloadAction<ProductType>) => {
      const filteredFavouriteItem = state.favouriteList.filter((item) => item.id !== action.payload.id);
      state.favouriteList = filteredFavouriteItem;
      console.log("removeFavourite", state.favouriteList);
    },
    cartCheckOut: (state) => {
      state.shopingCart = [];
    },
  },
});

export const { addFav, addToCart, resetProducts, removeItemFromCart, removeFavouriteItem, cartCheckOut } = productSlice.actions;

const productReducer = productSlice.reducer;
export default productReducer;

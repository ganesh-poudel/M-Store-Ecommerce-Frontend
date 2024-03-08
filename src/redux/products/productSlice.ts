import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CartType, InitialStateType, ProductType } from "../../redux/products/product";

const initialState: InitialStateType = {
  products: [],
  favouriteList: [],
  shopingCart: [],
  searchString: "",
  loading: false,
  categoryId: 0,
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
    addToCart: (state, action: PayloadAction<CartType>) => {
      if (state.shopingCart.some((e) => e.id === action.payload.id)) {
        return;
      }
      state.shopingCart.push(action.payload);
      console.log("cart state", state.shopingCart);
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
    },
    cartCheckOut: (state) => {
      state.shopingCart = [];
    },
    searchProduct: (state, action: PayloadAction<string>) => {
      state.searchString = action.payload;
    },
    addCartItemQuantity: (state, action: PayloadAction<number>) => {
      const cart = state.shopingCart[action.payload];
      cart.quantity++;
      cart.totalPrice = cart.quantity * cart.price;
    },
    removeCartItemQuantity: (state, action: PayloadAction<number>) => {
      const cart = state.shopingCart[action.payload];
      if (cart.quantity > 1) {
        cart.quantity--;
        cart.totalPrice = cart.quantity * cart.price;
      }
    },
    addCategoryId: (state, action: PayloadAction<number>) => {
      if (action.payload === 0) {
        state.categoryId = 0
      }
      state.categoryId = action.payload;
      console.log("cat id " , state.categoryId)
    },
  },
});

export const {
  addFav,
  addToCart,
  resetProducts,
  removeItemFromCart,
  removeFavouriteItem,
  cartCheckOut,
  searchProduct,
  addCartItemQuantity,
  removeCartItemQuantity,
  addCategoryId,
} = productSlice.actions;

const productReducer = productSlice.reducer;
export default productReducer;

import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { Cart, CartInitialState } from './cart';

const initialState: CartInitialState = {
  shoppingList: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Cart>) => {
      const existingItem = state.shoppingList.find((item) => item.product._id === action.payload.product._id);
      if (existingItem) {
        //   item already exist, update quantity property
        if (existingItem.quantity !== undefined) {
          existingItem.quantity += 1;
        }
      } else {
        // Item doesn't exist in the cart, add it
        state.shoppingList.push({ product: action.payload.product, quantity: action.payload.quantity });
      }
    },

    addCartItemQuantity: (state, action: PayloadAction<number>) => {
      const cart = state.shoppingList[action.payload];
      cart.quantity++;
      //   cart.totalPrice = cart.quantity * cart.price;
    },
    removeCartItemQuantity: (state, action: PayloadAction<number>) => {
      const cart = state.shoppingList[action.payload];
      if (cart.quantity > 1) {
        cart.quantity--;
        // cart.totalPrice = cart.quantity * cart.price;
      }
    },
    removeItemFromCart: (state, action: PayloadAction<Cart>) => {
      const filteredCart = state.shoppingList.filter((item) => item.product._id !== action.payload.product._id);
      state.shoppingList = filteredCart;
      console.log(state.shoppingList);
    },
    resetCart: (state) => {
      state.shoppingList = [];
    },
  },
});

export const { addToCart, addCartItemQuantity, removeCartItemQuantity, removeItemFromCart, resetCart } =
  cartSlice.actions;

const cartReducer = cartSlice.reducer;
export default cartReducer;

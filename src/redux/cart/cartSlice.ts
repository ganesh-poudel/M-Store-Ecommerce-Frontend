import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { CartInitialState } from './cart';
import { ProductType } from '../products/product';

const initialState: CartInitialState = {
  shoppingList: [],
  quantity: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<ProductType>) => {
      const existingItem = state.shoppingList.find((item) => item._id === action.payload._id);
      if (existingItem) {
        //   item already exist, update quantity property
        if (existingItem.quantity !== undefined) {
          existingItem.quantity += 1;
          state.quantity += 1;
          state.totalPrice += action.payload.price;
        }
      } else {
        // Item doesn't exist in the cart, add it
        state.shoppingList.push({ ...action.payload, quantity: 1 });
        state.quantity += 1;
        state.totalPrice += action.payload.price; // Assuming price is available in the payload
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
    removeItemFromCart: (state, action: PayloadAction<ProductType>) => {
      const filteredCart = state.shoppingList.filter((item) => item._id !== action.payload._id);
      state.shoppingList = filteredCart;
      console.log(state.shoppingList);
    },
  },
});

export const { addToCart, addCartItemQuantity, removeCartItemQuantity, removeItemFromCart } = cartSlice.actions;

const cartReducer = cartSlice.reducer;
export default cartReducer;

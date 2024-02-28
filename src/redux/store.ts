import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./products/productSlice";
import { useDispatch } from "react-redux";
import { usersApi } from "./users/userApi";
import { productsApi } from "./products/product.api";
import { authApi } from "./auth/authApi";

// stores all states
const store = configureStore({
  reducer: {
    productReducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([usersApi.middleware, productsApi.middleware, authApi.middleware]),
});
export type AppState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch<typeof store.dispatch>();
export default store;

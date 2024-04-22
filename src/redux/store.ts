import { combineReducers, configureStore } from '@reduxjs/toolkit';
import productReducer from './products/productSlice';
import { useDispatch } from 'react-redux';
import { usersApi } from './users/userApi';
import { productsApi } from './products/product.api';
import { authApi } from './auth/authApi';
import userReducer from './users/userSlice';
import authReducer from './auth/authSlice';
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { categoryApi } from './category/categoryApi';
import cartReducer from './cart/cartSlice';

const rootReducer = combineReducers({
  productReducer,
  userReducer,
  authReducer,
  cartReducer,
  [usersApi.reducerPath]: usersApi.reducer,
  [productsApi.reducerPath]: productsApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [categoryApi.reducerPath]: categoryApi.reducer,
});

const persistConfig = {
  key: 'root',
  storage,
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// stores all states
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat([usersApi.middleware, productsApi.middleware, authApi.middleware, categoryApi.middleware]),
});
export type AppState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch<typeof store.dispatch>();

// store.subscribe(() => {
//   // get the states of all slices
//   const currentState = store.getState();
//   // need to get userSlice state only
//   // const userInformation = currentState.userReducer.user;
//   // // save user state in local storage
//   // localStorage.setItem("userInformation", JSON.stringify(userInformation));
//   // need to get authSlice state only
//   const loginToken = currentState.authReducer.accessToken;
//   localStorage.setItem("accessToken", JSON.stringify(loginToken));

//   const user = currentState.authReducer.user;
//   localStorage.setItem("currentUser", JSON.stringify(user));

//   const favItem = currentState.productReducer.favouriteList;
//   localStorage.setItem("favItem", JSON.stringify(favItem));

//   const shopingCart = currentState.productReducer.shopingCart;
//   localStorage.setItem("shopCart", JSON.stringify(shopingCart));
// });

export default store;
export const persistor = persistStore(store);

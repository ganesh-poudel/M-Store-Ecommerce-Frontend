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
import { ordersApi } from './order/OrderApi';

const rootReducer = combineReducers({
  productReducer,
  userReducer,
  authReducer,
  cartReducer,
  [usersApi.reducerPath]: usersApi.reducer,
  [productsApi.reducerPath]: productsApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [categoryApi.reducerPath]: categoryApi.reducer,
  [ordersApi.reducerPath]: ordersApi.reducer,
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
    }).concat([usersApi.middleware, productsApi.middleware, authApi.middleware, categoryApi.middleware, ordersApi.middleware]),
});
export type AppState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch<typeof store.dispatch>();

export default store;
export const persistor = persistStore(store);

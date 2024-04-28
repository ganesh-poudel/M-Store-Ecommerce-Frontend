import { createBrowserRouter } from 'react-router-dom';

import App from '../App';
import ProductsPage from '../pages/ProductsPage';
import HomePage from '../pages/HomePage';
import ProductDetailPage from '../pages/ProductDetailPage';
import ShoppingCartPage from '../pages/ShoppingCartPage';
import { UserLoginPage } from '../pages/UserLoginPage';
import UserProfilePage from '../pages/UserProfilePage';
import ProtectedRoute from './PrivateRoutes';
import { AdminPage } from '../pages/AdminPage';
import UpdateProductPage from '../pages/UpdateProductPage';
import { UserRegisterPage } from '../pages/UserRegisterPage';
import OrderPage from '../pages/OrderPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '', element: <HomePage /> },
      { path: 'products', element: <ProductsPage /> },
      { path: 'products/:id', element: <ProductDetailPage /> },
      { path: 'login', element: <UserLoginPage /> },
      { path: 'shoppingcart', element: <ShoppingCartPage /> },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: 'users/profile',
            element: <UserProfilePage />,
          },
          {
            path: 'users/orders',
            element: <OrderPage />,
          },
          {
            path: 'admin',
            element: <AdminPage />,
          },
          {
            path: 'admin/update-product/:id',
            element: <UpdateProductPage />,
          },
        ],
      },
      { path: 'register', element: <UserRegisterPage /> },
    ],
  },
]);

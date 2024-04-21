import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import ProductsPage from '../pages/ProductsPage';
import HomePage from '../pages/HomePage';
import ProductDetailPage from '../pages/ProductDetailPage';
import CartPage from '../pages/CartPage';
import ShoppingCartPage from '../pages/ShoppingCartPage';

// import SignUp, { UserRegisterPage } from "../pages/UserRegisterPage";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '', element: <HomePage /> },
      { path: 'products', element: <ProductsPage /> },
      { path: 'products/:id', element: <ProductDetailPage /> },
      // { path: "contact", element: <ContactPage /> },
      // { path: "favourites", element: <FavouritePage /> },
      // { path: "login", element: <UserLoginPage /> },
      { path: 'cart', element: <CartPage /> },
      { path: 'shoppingcart', element: <ShoppingCartPage /> },
      // { path: "checkout", element: <CheckOutMesage /> },

      // // { path: "login/profile", element: <ProtectedRoute component={UserProfilePage} /> },
      // // { path: "profile", element: <UserProfilePage /> },
      // {
      //   element: <ProtectedRoute />,
      //   children: [
      //     {
      //       path: "login/profile",
      //       element: <UserProfilePage />,
      //     },
      //     {
      //       path: "admin",
      //       element: <AdminPage />,
      //     },
      //   ],
      // },

      // // { path: "admin", element: <AdminPage /> },
      // { path: "addProduct", element: <CreateProductModal /> },

      // { path: "registration", element: <UserRegisterPage /> },
      // { path: "about", element: <AboutPage /> },
    ],
  },
]);

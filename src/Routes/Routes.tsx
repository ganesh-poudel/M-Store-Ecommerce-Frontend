import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { HomePage } from "../pages/HomePage";
import { ProductListPage } from "../pages/ProductListPage";
import { FavouritePage } from "../pages/FavouritePage";

import { UserRegisterPage } from "../pages/UserRegisterPage";
import { ContactPage } from "../pages/ContactPage";
// import { AboutPage } from "../pages/AboutPage";
import { ProductDetailPage } from "../pages/ProductDetailPage";
import { Login } from "../components/login/Login";
import { UserLoginPage } from "../pages/UserLoginPage";
import UserProfilePage from "../pages/UserProfilePage";
import ProtectedRoute from "./PrivateRoutes";
import { AdminPage } from "../pages/AdminPage";
import { CreateProductModal } from "../components/modal/CreateProductModal";
import { CartPage } from "../pages/CartPage";
import { AboutPage } from "../pages/AboutPage";
import { CheckOutMesage } from "../pages/CheckOutMesage";
// import SignUp, { UserRegisterPage } from "../pages/UserRegisterPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "products", element: <ProductListPage /> },
      { path: "products/:id", element: <ProductDetailPage /> },
      { path: "contact", element: <ContactPage /> },
      { path: "favourites", element: <FavouritePage /> },
      { path: "login", element: <UserLoginPage /> },
      { path: "cart", element: <CartPage /> },
      { path: "checkout", element: <CheckOutMesage /> },

      // { path: "login/profile", element: <ProtectedRoute component={UserProfilePage} /> },
      // { path: "profile", element: <UserProfilePage /> },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "login/profile",
            element: <UserProfilePage />,
          },
          {
            path: "admin",
            element: <AdminPage />,
          },
        ],
      },

      // { path: "admin", element: <AdminPage /> },
      { path: "addProduct", element: <CreateProductModal /> },

      { path: "registration", element: <UserRegisterPage /> },
      { path: "about", element: <AboutPage /> },
    ],
  },
]);

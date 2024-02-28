import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { HomePage } from "../pages/HomePage";
import { ProductListPage } from "../pages/ProductListPage";
import { FavouritePage } from "../pages/FavouritePage";
import { UserTestPage } from "../pages/UserTestPage";

import { UserRegisterPage } from "../pages/UserRegisterPage";
import { ContactPage } from "../pages/ContactPage";
// import { AboutPage } from "../pages/AboutPage";
import { ProductDetailPage } from "../pages/ProductDetailPage";
import { Login } from "../components/login/Login";
import { UserLoginPage } from "../pages/UserLoginPage";
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
      { path: "users", element: <UserTestPage /> },
      { path: "registration", element: <UserRegisterPage /> },
      { path: "login", element: <UserLoginPage /> },
      { path: "about", element: <UserTestPage /> },
    ],
  },
]);


import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { HomePage } from "../pages/HomePage";
import { ProductListPage } from "../pages/ProductListPage";
import { FavouritePage } from "../pages/FavouritePage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "products", element: <ProductListPage /> },
      { path: "favourites", element: <FavouritePage /> },
    ],
  },
]);

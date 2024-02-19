// import React from "react";
// import "./navbar.css";
// import { useSelector } from "react-redux";
// import { AppState } from "../../redux/store";
// import FavoriteIcon from "@mui/icons-material/Favorite";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
// // import { Search } from "../search/Search";
// import { Link } from "react-router-dom";

// export const Navbar = () => {
//   // const favItems = useSelector((state: AppState) => state.productReducer.favItem);
//   return (
//     <div className="navbar">
//       <Link to="">
//         <div>Logo</div>
//       </Link>

//       <Link to="/products">
//         <div>Products</div>
//       </Link>
//       <div>Menu</div>
//       {/* <Search /> */}
//       <div className="cart-section">
//         <Link to="/favourites">
//           <div className="favourite">
//             <FavoriteIcon sx={{ color: "red" }} />
//             <p className="numDisplay">{favItems.length}</p>
//           </div>
//         </Link>
//         <div className="favourite">
//           <ShoppingCartIcon />
//           <p className="numDisplay">{favItems.length}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

import React from 'react'

export const Navbar = () => {
  return (
    <div>Navbar</div>
  )
}

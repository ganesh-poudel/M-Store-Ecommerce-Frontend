import { Favorite, FavoriteBorder, Mail, Notifications, Pets } from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Button,
  Checkbox,
  InputBase,
  Menu,
  MenuItem,
  styled,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MuseumOutlinedIcon from "@mui/icons-material/MuseumOutlined";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../redux/store";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import profileIcon from "../../assets/6170186.png";
import { logout } from "../../redux/auth/authSlice";
import { resetProducts } from "../../redux/products/productSlice";
import { resetUsers } from "../../redux/users/userSlice";

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
  height: "70px",
});

const Search = styled("div")(({ theme }) => ({
  backgroundColor: "white",
  padding: "0 10px",
  borderRadius: theme.shape.borderRadius,
  width: "30%",
}));

const Icons = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "20px",
}));

const UserBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  // [theme.breakpoints.up("sm")]: {
  //   display: "none",
  // },
}));

const LogoBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "5px",
  // [theme.breakpoints.up("sm")]: {
  //   display: "flex",
  // },
}));

const Navbar = () => {
  const [open, setOpen] = React.useState(false);
  const data = useSelector((state: AppState) => state.productReducer);
  console.log("fav item ", data?.shopingCart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: AppState) => state.authReducer.user);
  const isLogin = useSelector((state: AppState) => state.authReducer.isAuthenticated);

  const logoutHandler = () => {
    if (isLogin) {
      dispatch(logout());
      dispatch(resetProducts());
      dispatch(resetUsers());
    }
  };

  return (
    <AppBar position="sticky">
      <StyledToolbar color="#90a4ae">
        <LogoBox onClick={() => navigate("/")} sx={{ cursor: "pointer" }}>
          <MuseumOutlinedIcon />
          <Typography sx={{ display: { xs: "none", sm: "block" } }}>STORE</Typography>
        </LogoBox>

        <Box sx={{ display: "flex", gap: "20px" }}>
          <Typography
            sx={{ display: { xs: "none", sm: "block", cursor: "pointer" } }}
            onClick={() => navigate("products")}
          >
            Products
          </Typography>

          <Typography
            sx={{ display: { xs: "none", sm: "none", md: "block", cursor: "pointer" } }}
            onClick={() => navigate("contact")}
          >
            contact
          </Typography>

          <Typography
            sx={{ display: { xs: "none", sm: "none", md: "block", cursor: "pointer" } }}
            onClick={() => navigate("about")}
          >
            About
          </Typography>
        </Box>

        {/* <MuseumOutlinedIcon sx={{ display: { xs: "block", sm: "none" } }} /> */}
        <Search>
          <InputBase placeholder="search..." />
        </Search>

        <Icons>
          <Badge
            badgeContent={data.favouriteList?.length}
            color="error"
            sx={{ cursor: "pointer" }}
            onClick={() => navigate("favourites")}
          >
            <FavoriteBorderIcon />
          </Badge>

          <Badge
            badgeContent={data.shopingCart?.length}
            color="error"
            sx={{ cursor: "pointer" }}
            onClick={() => navigate("cart")}
          >
            <ShoppingCartIcon />
          </Badge>
        </Icons>
        {isLogin && user?.role === "admin" && (
          <Button variant="contained" sx={{ height: "30px", background: "#009688" }} onClick={() => navigate("/admin")}>
            Admin
          </Button>
        )}

        <UserBox sx={{ cursor: "pointer" }}>
          {!user?.avatar && (
            <LoginRoundedIcon
              onClick={() => {
                navigate("login");
                setOpen(true);
              }}
            />
          )}

          {/* <Avatar sx={{ width: 30, height: 30 }} src={profileIcon} onClick={(e) => setOpen(true)} /> */}
          <Avatar sx={{ width: 30, height: 30 }} src={user?.avatar} onClick={(e) => setOpen(true)} />
          {/* <Typography>John</Typography> */}
        </UserBox>
      </StyledToolbar>
      {user && (
        <Menu
          id="demo-positioned-menu"
          aria-labelledby="demo-positioned-button"
          open={open}
          onClose={(e) => setOpen(false)}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <MenuItem onClick={() => navigate("login/profile")}>Profile</MenuItem>
          <MenuItem>My account</MenuItem>
          <MenuItem onClick={logoutHandler}>Logout</MenuItem>
        </Menu>
      )}
    </AppBar>
  );
};

export default Navbar;

import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Button,
  InputBase,
  Menu,
  MenuItem,
  styled,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useCallback } from "react";
import debounce from "lodash/debounce";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MuseumOutlinedIcon from "@mui/icons-material/MuseumOutlined";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../redux/store";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import { logout } from "../../redux/auth/authSlice";
import { addCategoryId, resetProducts, searchProduct } from "../../redux/products/productSlice";
import { resetUsers } from "../../redux/users/userSlice";
import { useGetAllCategoryQuery } from "../../redux/products/product.api";
import { idText } from "typescript";

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
  const { data: categories } = useGetAllCategoryQuery();

  const logoutHandler = () => {
    if (isLogin) {
      dispatch(logout());
      dispatch(resetProducts());
      dispatch(resetUsers());
    }
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(searchProduct(e.target.value));
  };

  const debouncedHandleSearch = useCallback(debounce(onChange, 1000), []);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openCat = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickCategory = (id: number) => {
    dispatch(addCategoryId(id));
    handleClose();
  };

  const handleProduct = () => {
    dispatch(addCategoryId(0));
    navigate("/products");
  };

  return (
    <AppBar position="sticky">
      <StyledToolbar color="#90a4ae">
        <LogoBox onClick={() => navigate("/")} sx={{ cursor: "pointer" }}>
          <MuseumOutlinedIcon />
          <Typography sx={{ display: { xs: "none", sm: "block" } }}>STORE</Typography>
        </LogoBox>

        <Box sx={{ display: "flex", gap: "20px" }}>
          <Typography sx={{ display: { xs: "none", sm: "block", cursor: "pointer" } }} onClick={handleProduct}>
            Products
          </Typography>

          {/* <Typography
            sx={{ display: { xs: "none", sm: "none", md: "block", cursor: "pointer" } }}
            onClick={() => navigate("contact")}
          >
            contact
          </Typography> */}
          <div>
            <Button
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              sx={{ color: "white" }}
              onClick={handleClick}
            >
              <Typography>Category</Typography>
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={openCat}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={() => handleClickCategory(0)}>All Products</MenuItem>
              {categories?.map((item) => (
                <MenuItem onClick={() => handleClickCategory(item.id)}>{item.name}</MenuItem>
              ))}
            </Menu>
          </div>

          <Typography
            sx={{ display: { xs: "none", sm: "none", md: "block", cursor: "pointer" } }}
            onClick={() => navigate("about")}
          >
            About
          </Typography>
        </Box>
        <Search>
          <InputBase placeholder="search..." type="text" onChange={debouncedHandleSearch} />
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

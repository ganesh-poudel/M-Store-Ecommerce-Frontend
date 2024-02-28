import { Favorite, FavoriteBorder, Mail, Notifications, Pets } from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  Badge,
  Box,
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
import profileIcon from '../../assets/6170186.png'

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
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
  const [open, setOpen] = useState(false);
  const favItem = useSelector((state: AppState) => state.productReducer.favouriteList);
  console.log(favItem);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <AppBar position="sticky" color="secondary">
      <StyledToolbar>
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
            badgeContent={favItem.length}
            color="error"
            sx={{ cursor: "pointer" }}
            onClick={() => navigate("favourites")}
          >
            <FavoriteBorderIcon />
          </Badge>
          <Badge badgeContent={2} color="error">
            <ShoppingCartIcon />
          </Badge>
          {/* <Avatar
            sx={{ width: 30, height: 30 }}
            src="https://images.pexels.com/photos/846741/pexels-photo-846741.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            onClick={(e) => setOpen(true)}
          /> */}
        </Icons>

        <UserBox sx={{cursor:"pointer"}}>
          <LoginRoundedIcon onClick={() => navigate("login")} />
          <Avatar
            sx={{ width: 30, height: 30 }}
            src={profileIcon}
            onClick={(e) => setOpen(true)}
          />
          {/* <Typography>John</Typography> */}
        </UserBox>
      </StyledToolbar>
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
        <MenuItem>Profile</MenuItem>
        <MenuItem>My account</MenuItem>
        <MenuItem>Logout</MenuItem>
      </Menu>
    </AppBar>
  );
};

export default Navbar;

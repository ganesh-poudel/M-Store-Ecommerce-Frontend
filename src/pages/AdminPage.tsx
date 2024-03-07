import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";

import { ProductList } from "../components/productsList/ProductList";
import { UserList } from "../components/userList/UserList";

import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Typography from "@mui/material/Typography";
import ContentCut from "@mui/icons-material/ContentCut";
import ContentCopy from "@mui/icons-material/ContentCopy";
import ContentPaste from "@mui/icons-material/ContentPaste";
import Cloud from "@mui/icons-material/Cloud";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { CreateProductModal } from "../components/modal/CreateProductModal";
import { Navigate, useNavigate } from "react-router";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  height: "70vh",
}));

const StyledAddIcon = styled(AddCircleIcon)(({ theme }) => ({
  color: "red",
  fontSize: "40px",
}));

export const AdminPage = () => {
  const navigate = useNavigate();
  const addProductHandler = () => {
    console.log("Product");
  };
  return (
    <Box sx={{ width: 1, background: "#607d8b" }}>
      <Typography variant="h4" sx={{ height: "60px", color: "white", paddingTop: "25px" }}>
        ADMIN DASHBOARD
      </Typography>
      <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={3} sx={{ ml: "10px", mr: "10px" }}>
        <Box gridColumn="span 2 ">
          <Item sx={{ background: "#ffab91" }}>
            <Paper sx={{ width: 320, maxWidth: "100%" }}>
              <MenuList>
                <MenuItem>
                  <ListItemIcon>
                    <StyledAddIcon></StyledAddIcon>
                  </ListItemIcon>
                  <ListItemText primary="Add New User" />
                </MenuItem>
                <MenuItem>
              
                  <CreateProductModal />
                </MenuItem>
              </MenuList>
            </Paper>
          </Item>
        </Box>
        <Box gridColumn="span 5 ">
          <Item>
            <UserList />
          </Item>
        </Box>
        <Box gridColumn="span 5">
          <Item>
            <ProductList />
          </Item>
        </Box>
      </Box>
    </Box>
  );
};

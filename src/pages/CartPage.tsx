import { Box, Button, Card, Grid, IconButton, Step, StepButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../redux/store";
import { Cart } from "../components/cart/Cart";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import styled from "@emotion/styled";
import { cartCheckOut, removeItemFromCart } from "../redux/products/productSlice";
import { ProductType } from "../redux/products/product";
import { useNavigate } from "react-router";

const StyledStepper = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  border: "1px solid black",
  borderRadius: "5px",
  background: "gray",
  height: "30px",
});

export const CartPage = () => {
  const cartItems = useSelector((state: AppState) => state.productReducer.shopingCart);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const removeFromCartHandler = () => {
    console.log("clicked");
    // dispatch(removeItemFromCart(item));
  };

  const prices = cartItems.map((product) => product.price);
  const total = prices.reduce((acc, curr) => acc + curr, 0);
  console.log("price", prices);

  const checkOutHandler = () => {
    dispatch(cartCheckOut());
    navigate("/checkout");
  };

  return (
    <Box mt="70px">
      <Grid container justifyContent="center" spacing={6}>
        {!cartItems?.length && <h1> Cart Is Empty</h1>}
        <Card sx={{ width: "800px" }}>
          <List sx={{ width: "100%", maxWidth: 800, bgcolor: "background.paper" }}>
            {cartItems?.map((item) => (
              <ListItem alignItems="flex-start" key={item.id}>
                <ListItemAvatar>
                  <Avatar alt="Cindy Baker" src={item.images[0]} />
                </ListItemAvatar>
                <ListItemText>{item.title}</ListItemText>

                <ListItemText>{item.price}€</ListItemText>
                <StyledStepper>
                  <IconButton>
                    <AddIcon />
                  </IconButton>
                  <Typography>1</Typography>
                  <IconButton>
                    <RemoveIcon />
                  </IconButton>
                </StyledStepper>

                <IconButton onClick={() => dispatch(removeItemFromCart(item))}>
                  <DeleteForeverIcon sx={{ color: "red", ml: "20px" }} />
                </IconButton>
              </ListItem>
            ))}
          </List>
        </Card>
      </Grid>
      <Box display="flex" gap={3} justifyContent="center">
        <Typography>Total Amount</Typography>
        <Typography>{total}</Typography>
      </Box>
      <Button onClick={checkOutHandler}>checkout</Button>
    </Box>
  );
};

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CardMedia, Checkbox, makeStyles } from "@mui/material";
import { ProductType } from "../../redux/products/product";
import styled from "@emotion/styled";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { useAppDispatch } from "../../redux/store";
import { addFav } from "../../redux/products/productSlice";
import { useNavigate } from "react-router-dom";

export const ProductCart = ({ product }: { product: ProductType }) => {
  const { id, title, description, price, images, category } = product;

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
    display: "block",
    height: "15rem",
    // border: "1px solid black",
    marginLeft: "auto",
    marginRight: "auto",
    minWidth: "100px",
    maxWidth: "300px",
    borderRadius: "10px 10px 0 0",
  }));

  const addToFavHandler = (item: ProductType) => {
    dispatch(addFav(item));
  };
  return (
    <Card sx={{ minWidth: "300", height: "100%" }}>
      <CardContent>
        <StyledCardMedia image={category.image} />
        <Typography
          sx={{ fontSize: 16, fontWeight: "600", color: "#263238", marginTop: "15px" }}
          color="text.secondary"
          gutterBottom
        >
          {title}
        </Typography>
        <Typography sx={{ mb: 1.5, fontWeight: "600" }} color="text.secondary">
          {price} $
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "center" }}>
        <Button
          size="small"
          onClick={() => {
            addToFavHandler(product);
          }}
        >
          <Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} />
        </Button>
        <Button size="small">
          <AddShoppingCartIcon />
        </Button>
        <Button size="small" onClick={() => navigate(`/products/${id}`)}>
          View Details
        </Button>
      </CardActions>
    </Card>
  );
};

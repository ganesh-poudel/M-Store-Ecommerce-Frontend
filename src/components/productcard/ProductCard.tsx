import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CardMedia, Checkbox } from "@mui/material";
import { CartType, ProductType } from "../../redux/products/product";
import styled from "@emotion/styled";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { addFav, addToCart, removeFavouriteItem } from "../../redux/products/productSlice";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export const ProductCart = ({ product }: { product: ProductType }) => {
  const [pic, setPic] = useState<string[]>([]);
  const [isFavourite, setIsFavourite] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id, title, price, images } = product;
  const cart = { ...product, quantity: 1, totalPrice: product.price };

  const MyRegex = /[()[\]{}*+?^$|#,\\\\-]/gi;

  useEffect(() => {
    if (images && images.length > 0) {
      const processedImages = images.map((entry) => entry.replace(MyRegex, "").replace(/\"/gi, ""));
      setPic(processedImages);
    }
  }, []);

  const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
    display: "block",
    height: "15rem",
    marginLeft: "auto",
    marginRight: "auto",
    minWidth: "100px",
    maxWidth: "300px",
    borderRadius: "10px 10px 0 0",
  }));

  const addToFavHandler = (item: ProductType) => {
    if (!isFavourite) {
      dispatch(addFav(item));
      setIsFavourite(true);
    }
    if (isFavourite) {
      dispatch(removeFavouriteItem(item));
      setIsFavourite(true);
    }
  };
  const addToCartHandler = (item: CartType) => {
    dispatch(addToCart(item));
  };

  return (
    <Card sx={{ minWidth: "300", height: "100%" }}>
      <CardContent>
        {!pic.length && <h2>Pic not found</h2>}
        <StyledCardMedia image={`${pic[0]}`} />
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
        <Typography>{id}</Typography>
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
        <Button
          size="small"
          onClick={() => {
            addToCartHandler(cart);
          }}
        >
          <AddShoppingCartIcon />
        </Button>
        <Button size="small" onClick={() => navigate(`/products/${id}`)}>
          View Details
        </Button>
      </CardActions>
    </Card>
  );
};

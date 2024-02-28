import React from "react";
import { useSelector } from "react-redux";
import { AppState } from "../redux/store";
import { ProductCart } from "../components/productcard/ProductCart";
import { Box, Grid } from "@mui/material";

export const FavouritePage = () => {
  const favList = useSelector((state: AppState) => state.productReducer.favouriteList);
  return (
    <Box mt="70px">
      <Grid container justifyContent="center" spacing={6}>
        {!favList.length && <h1> Favourite List Is Empty</h1>}
        {favList.map((item) => (
          <Grid key={item.id} item sx={{ display: { xs: "12", sm: "6" } }}>
            <ProductCart product={item} />;
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};


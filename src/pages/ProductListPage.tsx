import { AppState, useAppDispatch } from "../redux/store";
import { useSelector } from "react-redux";
import { useAddSingleProductMutation, useGetAllProductsQuery } from "../redux/products/product.api";
import { useState } from "react";
import { ProductAddType } from "../redux/products/product";
import { ProductCart } from "../components/productcard/ProductCard";
// import { Box, Grid } from "@mui/material";
// import styled from "@emotion/styled";
// import Paper from "@mui/material/Paper";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Loading } from "../components/loading/Loading";

export const ProductListPage = () => {
  const { data, isLoading, isFetching, isError } = useGetAllProductsQuery();
  const [createProduct] = useAddSingleProductMutation();

  // const CustomizeGrid = styled(Box)(({ theme }) => ({
  //   display: "grid",
  //   gridColumn: "auto",
  // }));

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  const type1: ProductAddType = {
    title: "New Product GP2",
    price: 120,
    description: "A description...",
    categoryId: 2,
    images: ["https://placeimg.com/640/480/any"],
  };

  const addHandaler = async () => {
    const isFound = data?.some((ele) => ele.title === type1.title);
    if (!isFound) {
      await createProduct(type1);
      console.log(JSON.stringify(type1));
    } else {
      alert("item product already exist");
    }
  };

  return (
    <Box sx={{ mt: "30px", background: "radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,230,233,1) 98%)" }}>
      <Grid container justifyContent="center" spacing={6}>
        {/* <button onClick={() => addHandaler()}> Add Product</button> */}
        {isLoading && <Loading />}
        {/* {isFetching && <h3> fetching data ......</h3>} */}
        {isError && <h3>Error data ......</h3>}
        {data?.map((product) => (
          <Grid key={product.id} item sx={{ display: { xs: "12", sm: "6" } }}>
            {/* <HeroCard districts={card.districts} source={card.source} date={card.date} /> */}
            <ProductCart product={product} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

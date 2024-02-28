import React from "react";
import { useParams } from "react-router";
import { useGetSingleProductQuery } from "../redux/products/product.api";

export const ProductDetailPage = () => {
  const { id } = useParams();
  console.log(id);
  const { data } = useGetSingleProductQuery(Number(id));
  console.log("data =>", data);

  return <div>ProductDetailPage</div>;
};

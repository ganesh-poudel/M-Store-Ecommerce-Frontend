import React, { useEffect } from "react";
import { AppState, useAppDispatch } from "../redux/store";
import { useSelector } from "react-redux";
import { stat } from "fs";
import { fetchAllProductsAsync } from "../redux/slices/productSlice";

export const ProductListPage = () => {
  const dispatch = useAppDispatch();
  const productList = useSelector((state: AppState) => state.productReducer.products);
  useEffect(() => {
    dispatch(fetchAllProductsAsync());
  }, []);

  return (
    <div>
      {productList.map((product) => {
        return <div>{product.title}</div>;
      })}
    </div>
  );
};

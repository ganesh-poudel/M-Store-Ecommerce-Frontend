import { AppState } from "../redux/store";
import { useSelector } from "react-redux";
import { useFilterByTitleQuery, useGetProductByCategoryQuery } from "../redux/products/product.api";
import { ProductCart } from "../components/productcard/ProductCard";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Loading } from "../components/loading/Loading";

export const ProductListPage = () => {
  const searchWord = useSelector((state: AppState) => state.productReducer.searchString);
  const categoryId = useSelector((state: AppState) => state.productReducer.categoryId);
  let { data, isLoading, isError } = useFilterByTitleQuery(searchWord);
  const { data: productByCategory } = useGetProductByCategoryQuery(categoryId);
  if (categoryId !== 0) {
    data = productByCategory
  }

  return (
    <div>
      <Box sx={{ mt: "30px", background: "radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,230,233,1) 98%)" }}>
        <Grid container justifyContent="center" spacing={6}>
          {isLoading && <Loading />}
          {isError && <h3>Error data ......</h3>}
          {data?.map((product) => (
            <Grid key={product.id} item sx={{ display: { xs: "12", sm: "6" } }}>
              <ProductCart product={product} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
};

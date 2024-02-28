import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { InitialStateType, ProductType } from "../../type";

const initialState: InitialStateType = {
  products: [],
  favouriteList: [],
  searchString: "",
  loading: false,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    // setProducts: (state, action: PayloadAction<ProductType[]>) => {
    //   state.products = action.payload;
    //   console.log("product from slice", action.payload);
    // },
    addFav: (state, action: PayloadAction<ProductType>) => {
      if (state.favouriteList.some((e) => e.id === action.payload.id)) {
        return;
      }
      state.favouriteList.push(action.payload);
    },
  },
});

export const { addFav } = productSlice.actions;

const productReducer = productSlice.reducer;
export default productReducer;

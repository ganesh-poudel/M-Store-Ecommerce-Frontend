import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { InitialStateType } from "../../type";

const initialState: InitialStateType = {
  products: [],
  favouriteList: [],
  searchString: "",
  loading: false,
};

// fetch Data
const url = "https://api.escuelajs.co/api/v1/products";

export const fetchAllProductsAsync = createAsyncThunk("fetchAllProductsAsync", async () => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (e) {
    const error = e as Error;
    return error;
  }
});

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers(builder) {
    // async
    //3 state
    builder.addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
      if (!(action.payload instanceof Error)) {
        return {
          ...state,
          products: action.payload,
        };
      }
    });

    builder.addCase(fetchAllProductsAsync.pending, (state, action) => {
      return {
        ...state,
        loading: true,
      };
    });
    builder.addCase(fetchAllProductsAsync.rejected, (state, action) => {
      if (action.payload instanceof Error) {
        return {
          ...state,
          loading: false,
          error: action.payload.message,
        };
      }
    });
  },
});

const productReducer = productSlice.reducer;
export default productReducer;

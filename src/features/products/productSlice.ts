import { RootState } from "./../../app/store";
import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  PayloadAction,
  isAnyOf,
} from "@reduxjs/toolkit";
import Axios from "../../helpers/axios";

import { Product } from "./../../types";
import { compareDesc } from "date-fns";

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (_, thunkAPI) => {
    try {
      let { data } = await Axios.get("products/list");
      return data.docs;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (body: {}, thunkAPI) => {
    try {
      let { data } = await Axios.post("products/create", body, {});
      return data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const editProduct = createAsyncThunk(
  "products/editProduct",
  async (params: { id: string; newObj: {} }, thunkAPI) => {
    try {
      await Axios.put(`products/update/${params.id}`, params.newObj, {});
      return {
        id: params.id,
        changes: params.newObj,
      };
    } catch (error) {
      console.log(error.message);
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id: string, thunkAPI) => {
    try {
      await Axios.delete(`products/${id}`, {});

      return {
        id,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const getProductsByCategory = createAsyncThunk(
  "products/getProducts",
  async (categoryId: string, thunkAPI) => {
    try {
      let { data } = await Axios.get(`products/list?category=${categoryId}`);
      return data.docs;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

const productsAdapter = createEntityAdapter<Product>({
  selectId: (product) => product._id,
  sortComparer: (a, b) =>
    compareDesc(new Date(a.createdAt), new Date(b.createdAt)),
});

const productSlice = createSlice({
  name: "products",
  initialState: productsAdapter.getInitialState({ status: "" }),
  reducers: {},
  extraReducers: (builder) => {
    // ADD PRODUCT
    builder.addCase(createProduct.pending, (state, _) => {
      state.status = "loading";
    });

    builder.addCase(
      createProduct.fulfilled,
      (state, { payload }: PayloadAction<Product>) => {
        productsAdapter.setOne(state, payload);
        state.status = "success";
      }
    );
    builder.addCase(createProduct.rejected, (state, action) => {
      state.status = action.error.message as string;
    });

    // Edit PRODUCT
    builder.addCase(editProduct.pending, (state, _) => {
      state.status = "loading";
    });
    builder.addCase(editProduct.fulfilled, (state, { payload }) => {
      state.status = "success";
      productsAdapter.updateOne(state, {
        id: payload.id,
        changes: payload.changes,
      });
    });
    builder.addCase(editProduct.rejected, (state, action) => {
      state.status = action.error.message as string;
    });
    // DELETE PRODUCT
    builder.addCase(deleteProduct.pending, (state, _) => {
      state.status = "loading";
    });
    builder.addCase(deleteProduct.fulfilled, (state, { payload }) => {
      state.status = "success";
      productsAdapter.removeOne(state, payload.id);
    });
    builder.addCase(deleteProduct.rejected, (state, action) => {
      state.status = action.error.message as string;
    });

    // GET PRODUCT
    builder.addMatcher(
      isAnyOf(getProducts.pending, getProductsByCategory.pending),
      (state, { payload }) => {
        productsAdapter.removeAll(state);
        state.status = "loading";
      }
    );

    builder.addMatcher(
      isAnyOf(getProducts.fulfilled, getProductsByCategory.fulfilled),
      (state, { payload }) => {
        productsAdapter.setAll(state, payload);
        state.status = "success";
      }
    );
    builder.addMatcher(
      isAnyOf(getProducts.rejected, getProductsByCategory.rejected),
      (state, action) => {
        state.status = action.error.message as string;
      }
    );
  },
});

export const productSelectors = productsAdapter.getSelectors<RootState>(
  (state) => state.products
);

export default productSlice.reducer;

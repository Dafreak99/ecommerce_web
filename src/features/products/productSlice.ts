import { RootState } from "./../../app/store";
import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  PayloadAction,
} from "@reduxjs/toolkit";
import Axios from "../../helpers/axios";

import { Product } from "./../../types";
import { compareDesc } from "date-fns";

const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjoiNjBiZWY0MTg0NTNmMjVjM2I0OGRjY2Y4IiwiZW1haWwiOiJhZG1pbkBhcHBjb3JlLmNvbSIsInJvbGUiOjF9LCJpYXQiOjE2MjM5MTc4NDksImV4cCI6MTYyNDAwNDI0OX0.lgJhoMaFwksCeauAgWw2hHtROFSDf42AjhzDguQRbTg";

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (_, thunkAPI) => {
    try {
      let { data } = await Axios.get("products/list");
      return data.docs;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (body: {}, thunkAPI) => {
    try {
      let { data } = await Axios.post("products/create", body, {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      });
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const editProduct = createAsyncThunk(
  "products/editProduct",
  async (params: { id: string; newObj: {} }, thunkAPI) => {
    try {
      await Axios.put(`products/update/${params.id}`, params.newObj, {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      });
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
      await Axios.delete(`products/${id}`, {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      });

      return {
        id,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

const productsAdapter = createEntityAdapter<Product>({
  selectId: (product) => product._id,
  sortComparer: (a, b) =>
    compareDesc(new Date(a.createdAt), new Date(b.createdAt)), // compare by createDate
});

const postSlice = createSlice({
  name: "products",
  initialState: productsAdapter.getInitialState({ status: "" }),
  reducers: {},
  extraReducers: (builder) => {
    // GET PRODUCT
    builder.addCase(getProducts.pending, (state, _) => {
      state.status = "loading";
    });
    builder.addCase(getProducts.fulfilled, (state, { payload }) => {
      productsAdapter.setAll(state, payload);
      state.status = "success";
    });
    builder.addCase(getProducts.rejected, (state, action) => {
      state.status = action.error.message as string;
    });
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
  },
});

export const productSelectors = productsAdapter.getSelectors<RootState>(
  (state) => state.products
);

export default postSlice.reducer;

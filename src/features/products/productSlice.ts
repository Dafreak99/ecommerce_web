import { RootState } from "./../../app/store";
import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  PayloadAction,
  isAnyOf,
} from "@reduxjs/toolkit";
import Axios from "../../helpers/axios";
import AdAxios from "../../helpers/adminAxios";

import { ExtraState, Product } from "./../../types";
import { compareDesc } from "date-fns";

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (
    params: {
      condition: string;
      limit?: number;
    },
    thunkAPI
  ) => {
    try {
      const { limit = 5, condition } = params;

      let { data } = await Axios.get(
        `/api/v1/products/list?limit=${limit}&${condition}`
      );
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (body: {}, thunkAPI) => {
    try {
      let { data } = await AdAxios.post("/api/v1/products/create", body, {});
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue({
        error: error.response.data.message[0].msg,
      });
    }
  }
);

export const editProduct = createAsyncThunk(
  "products/editProduct",
  async (params: { id: string; newObj: {} }, thunkAPI) => {
    try {
      await AdAxios.put(
        `/api/v1/products/update/${params.id}`,
        params.newObj,
        {}
      );
      return {
        id: params.id,
        changes: params.newObj,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id: string, thunkAPI) => {
    try {
      await AdAxios.delete(`/api/v1/products/${id}`, {});

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
  async (
    params: {
      categoryId: string;
      condition?: string;
    },
    thunkAPI
  ) => {
    try {
      const { data } = await Axios.get(
        `/api/v1/products/list?category=${params.categoryId}&limit=4&${params.condition}`
      );
      return data;
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
  initialState: productsAdapter.getInitialState({
    status: "idle",
    error: null,
  } as ExtraState),
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
        state.status = "succeeded";
      }
    );

    builder.addCase(createProduct.rejected, (state, { payload }: any) => {
      state.status = "failed";
      console.log(payload);
      state.error = payload.error;
    });

    // Edit PRODUCT
    builder.addCase(editProduct.pending, (state, _) => {
      state.status = "loading";
    });
    builder.addCase(
      editProduct.fulfilled,
      (state, { payload }: PayloadAction<{ id: string; changes: {} }>) => {
        productsAdapter.updateOne(state, {
          id: payload.id,
          changes: payload.changes,
        });
        state.status = "succeeded";
      }
    );
    builder.addCase(editProduct.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message as string;
    });
    // DELETE PRODUCT
    builder.addCase(deleteProduct.pending, (state, _) => {
      state.status = "loading";
    });
    builder.addCase(
      deleteProduct.fulfilled,
      (state, { payload }: PayloadAction<{ id: string }>) => {
        state.status = "succeeded";
        productsAdapter.removeOne(state, payload.id);
      }
    );
    builder.addCase(deleteProduct.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message as string;
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
        productsAdapter.setAll(state, payload.docs);

        const {
          hasNextPage,
          hasPrevPage,
          nextPage,
          page,
          prevPage,
          totalPages,
          totalDocs,
          limit,
        } = payload;

        state.hasNextPage = hasNextPage;
        state.hasPrevPage = hasPrevPage;
        state.nextPage = nextPage;
        state.page = page;
        state.prevPage = prevPage;
        state.totalPages = totalPages;
        state.totalDocs = totalDocs;
        state.limit = limit;

        state.status = "succeeded";
      }
    );
    builder.addMatcher(
      isAnyOf(getProducts.rejected, getProductsByCategory.rejected),
      (state, action) => {
        state.status = "failed";
        state.error = action.error.message as string;
      }
    );
  },
});

export const productSelectors = productsAdapter.getSelectors<RootState>(
  (state) => state.products
);

export default productSlice.reducer;

// Todo: Try to prevent re-fetching using status
// https://redux.js.org/tutorials/essentials/part-5-async-logic

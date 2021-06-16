import { RootState } from "./../../app/store";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import Axios from "../../helpers/axios";
import { Product } from "../../types";

interface State {
  list: Product[];
  status: any;
}

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
      let { data } = await Axios.post("products/create", body, {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjoiNjBiZWY0MTg0NTNmMjVjM2I0OGRjY2Y4IiwiZW1haWwiOiJhZG1pbkBhcHBjb3JlLmNvbSIsInJvbGUiOjF9LCJpYXQiOjE2MjM4Mzc2NjMsImV4cCI6MTYyMzkyNDA2M30.-0YLctRkAssLcVV89cEhwtG_M2Cj4xF6OM0-EkrqWDw",
        },
      });
      return data;
    } catch (error) {
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
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjoiNjBiZWY0MTg0NTNmMjVjM2I0OGRjY2Y4IiwiZW1haWwiOiJhZG1pbkBhcHBjb3JlLmNvbSIsInJvbGUiOjF9LCJpYXQiOjE2MjM4Mzc2NjMsImV4cCI6MTYyMzkyNDA2M30.-0YLctRkAssLcVV89cEhwtG_M2Cj4xF6OM0-EkrqWDw",
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

const initialState: State = { list: [], status: null };

const postSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // GET PRODUCT
    builder.addCase(getProducts.pending, (state, _) => {
      state.status = "loading";
    });
    builder.addCase(getProducts.fulfilled, (state, { payload }) => {
      state.list = payload;
      state.status = "success";
    });
    builder.addCase(getProducts.rejected, (state, action) => {
      state.status = action.error.message;
    });
    // ADD PRODUCT
    builder.addCase(createProduct.pending, (state, _) => {
      state.status = "loading";
    });
    builder.addCase(
      createProduct.fulfilled,
      (state, { payload }: PayloadAction<Product>) => {
        state.list.unshift(payload);
        state.status = "success";
      }
    );
    builder.addCase(createProduct.rejected, (state, action) => {
      state.status = action.error.message;
    });

    // DELETE PRODUCT
    builder.addCase(deleteProduct.pending, (state, _) => {
      state.status = "loading";
    });
    builder.addCase(deleteProduct.fulfilled, (state, { payload }) => {
      const index = state.list.findIndex(
        (product) => product._id === payload.id
      );
      if (index !== -1) {
        state.list.splice(index, 1);
      }
    });
    builder.addCase(deleteProduct.rejected, (state, action) => {
      state.status = action.error.message;
    });
  },
});

export const selectProducts = (state: RootState) => state.products.list;

export default postSlice.reducer;

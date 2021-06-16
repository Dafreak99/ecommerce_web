import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import Axios from "../../helpers/axios";
import { Category } from "../../types";

interface State {
  categories: Category[];
  status: null | string | undefined;
}

export const getCategories = createAsyncThunk(
  "categories/getCategories",
  async (_, thunkAPI) => {
    try {
      let { data } = await Axios.get("categories/list");
      return data.docs;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const createCategory = createAsyncThunk(
  "categories/createCategory",
  async (body: {}, thunkAPI) => {
    try {
      let { data } = await Axios.post("categories/create", body, {
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

export const deleteCategory = createAsyncThunk(
  "categories/deleteCategory",
  async (id: string, thunkAPI) => {
    try {
      await Axios.delete(`categories/${id}`, {
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

const initialState: State = {
  categories: [],
  status: null,
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCategories.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(getCategories.fulfilled, (state, { payload }) => {
      state.categories = payload;
      state.status = "success";
    });
    builder.addCase(getCategories.rejected, (state, action) => {
      state.status = action.error.message;
    });

    // ADD PRODUCT
    builder.addCase(createCategory.pending, (state, _) => {
      state.status = "loading";
    });
    builder.addCase(
      createCategory.fulfilled,
      (state, { payload }: PayloadAction<Category>) => {
        state.categories.unshift(payload);
        state.status = "success";
      }
    );
    builder.addCase(createCategory.rejected, (state, action) => {
      state.status = action.error.message;
    });

    // DELETE PRODUCT
    builder.addCase(deleteCategory.pending, (state, _) => {
      state.status = "loading";
    });
    builder.addCase(deleteCategory.fulfilled, (state, { payload }) => {
      const index = state.categories.findIndex(
        (product) => product._id === payload.id
      );
      if (index !== -1) {
        state.categories.splice(index, 1);
      }
    });
    builder.addCase(deleteCategory.rejected, (state, action) => {
      state.status = action.error.message;
    });
  },
});

export default categoriesSlice.reducer;

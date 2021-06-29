import { AdditionalState, Category } from "./../../types";
import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import Axios from "../../helpers/axios";
import { RootState } from "../../app/store";
import { compareDesc } from "date-fns";
import AdAxios from "../../helpers/adminAxios";

export const getCategories = createAsyncThunk(
  "categories/getCategories",
  async (_, thunkAPI) => {
    try {
      let { data } = await Axios.get("/api/v1/categories/list");
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
      let { data } = await AdAxios.post("/api/v1/categories/create", body, {});
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const editCategory = createAsyncThunk(
  "categories/editCategories",
  async (params: { id: string; newObj: {} }, thunkAPI) => {
    try {
      await AdAxios.put(
        `/api/v1/categories/update/${params.id}`,
        params.newObj,
        {}
      );
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

export const deleteCategory = createAsyncThunk(
  "categories/deleteCategory",
  async (id: string, thunkAPI) => {
    try {
      await AdAxios.delete(`/api/v1/categories/${id}`, {});

      return {
        id,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

const categoriesAdapter = createEntityAdapter<Category>({
  selectId: (category) => category._id,
  sortComparer: (a, b) =>
    compareDesc(new Date(a.createdAt), new Date(b.createdAt)),
});

const categoriesSlice = createSlice({
  name: "categories",
  initialState: categoriesAdapter.getInitialState({
    status: "idle",
    error: null,
  } as AdditionalState),
  reducers: {},
  extraReducers: (builder) => {
    // GET CATEGORIES
    builder.addCase(getCategories.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(getCategories.fulfilled, (state, { payload }) => {
      categoriesAdapter.setAll(state, payload);
      state.status = "succeeded";
    });
    builder.addCase(getCategories.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message as string;
    });

    // ADD CATEGORY
    builder.addCase(createCategory.pending, (state, _) => {
      state.status = "loading";
    });
    builder.addCase(createCategory.fulfilled, (state, { payload }) => {
      categoriesAdapter.setOne(state, payload);
      state.status = "succeeded";
    });
    builder.addCase(createCategory.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message as string;
    });

    // EDIT CATEGORY
    builder.addCase(editCategory.pending, (state, _) => {
      state.status = "loading";
    });
    builder.addCase(editCategory.fulfilled, (state, { payload }) => {
      categoriesAdapter.updateOne(state, {
        id: payload.id,
        changes: payload.changes,
      });
      state.status = "success";
    });
    builder.addCase(editCategory.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message as string;
    });

    // DELETE CATEGORY
    builder.addCase(deleteCategory.pending, (state, _) => {
      state.status = "loading";
    });
    builder.addCase(deleteCategory.fulfilled, (state, { payload }) => {
      categoriesAdapter.removeOne(state, payload.id);
    });
    builder.addCase(deleteCategory.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message as string;
    });
  },
});

export const categorySelectors = categoriesAdapter.getSelectors<RootState>(
  (state) => state.categories
);

export default categoriesSlice.reducer;

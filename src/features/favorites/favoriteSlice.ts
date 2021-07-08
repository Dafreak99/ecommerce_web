import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import Axios from "../../helpers/axios";
import { Product } from "../../types";

const favoriteAdapter = createEntityAdapter<Product>({
  selectId: (product) => product._id,
});

export const getFavorite = createAsyncThunk(
  "favorite/getFavorite",
  async (_, thunkAPI) => {
    try {
      let { data } = await Axios(`http://45.118.134.105:3000/api/v2/favorite`);
      return data.docs;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const addToFavorite = createAsyncThunk(
  "favorite/addToFavorite",
  async (product: Product, thunkAPI) => {
    try {
      let { data } = await Axios.post(`/api/v2/favorite/${product._id}`);

      return {
        product,
        message: data.message,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const removeFromFavorite = createAsyncThunk(
  "favorite/removeFromFavorite",
  async (id: string, thunkAPI) => {
    try {
      await Axios.delete(`/api/v2/favorite/${id}`);

      return {
        id,
      };
    } catch (error) {
      console.log(error.response);
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

const favoriteSlice = createSlice({
  name: "favorite",
  initialState: favoriteAdapter.getInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    // GET FAVORITE
    builder.addCase(getFavorite.pending, (_state, _action) => {});
    builder.addCase(getFavorite.fulfilled, (state, action) => {
      favoriteAdapter.setAll(state, action.payload);
    });
    builder.addCase(getFavorite.rejected, (_state, _action) => {});

    // ADD TO FAVORITE
    builder.addCase(addToFavorite.pending, (_state, _action) => {});
    builder.addCase(addToFavorite.fulfilled, (state, action) => {
      favoriteAdapter.setOne(state, action.payload.product);
    });
    builder.addCase(addToFavorite.rejected, (_state, _action) => {});

    // REMOVE FROM FAVORITE
    builder.addCase(removeFromFavorite.pending, (_state, _action) => {});
    builder.addCase(removeFromFavorite.fulfilled, (state, action) => {
      favoriteAdapter.removeOne(state, action.payload.id);
    });
    builder.addCase(removeFromFavorite.rejected, (_state, _action) => {});
  },
});

export const favoriteSelector = favoriteAdapter.getSelectors<RootState>(
  (state) => state.favorite
);

export default favoriteSlice.reducer;

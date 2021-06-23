import { AdditionalState } from "./../../types";
import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { compareDesc } from "date-fns";
import AdAxios from "../../helpers/adminAxios";

export const getOrders = createAsyncThunk(
  "orders/getOrders",
  async (_, thunkAPI) => {
    try {
      let { data } = await AdAxios.get("/api/v1/orders/list");
      return data.docs;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

const ordersAdapter = createEntityAdapter({
  selectId: (order: any) => order._id,
  sortComparer: (a, b) =>
    compareDesc(new Date(a.createdAt), new Date(b.createdAt)),
});

const orderSlice = createSlice({
  name: "categories",
  initialState: ordersAdapter.getInitialState({
    status: "idle",
    error: null,
  } as AdditionalState),
  reducers: {},
  extraReducers: (builder) => {
    // GET ORDERS
    builder.addCase(getOrders.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(getOrders.fulfilled, (state, { payload }) => {
      ordersAdapter.setAll(state, payload);
      state.status = "succeeded";
    });
    builder.addCase(getOrders.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message as string;
    });
  },
});

export const orderSelectors = ordersAdapter.getSelectors<RootState>(
  (state) => state.orders
);

export default orderSlice.reducer;

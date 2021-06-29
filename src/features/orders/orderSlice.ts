import { AdditionalState, Order } from "./../../types";
import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { compareDesc } from "date-fns";
import AdAxios from "../../helpers/adminAxios";
import Axios from "../../helpers/axios";

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

// export const getOrderDetail = createAsyncThunk(
//   "orders/getOrderDetail",
//   async (id: string, thunkAPI) => {
//     try {
//       let { data } = await AdAxios.get(`/api/v1/orders/details/${id}`);
//       return data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue({ error: error.message });
//     }
//   }
// );

export const getOrdersFromCustomerSide = createAsyncThunk(
  "orders/getOrdersFromCustomerSide",
  async (_, thunkAPI) => {
    try {
      let { data } = await Axios.get("/api/v2/public/customer/order");
      return data;
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

    // GET ORDERS FROM CUSTOMER SIDE
    builder.addCase(getOrdersFromCustomerSide.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(
      getOrdersFromCustomerSide.fulfilled,
      (state, { payload }) => {
        ordersAdapter.setAll(state, payload);
        state.status = "succeeded";
      }
    );
    builder.addCase(getOrdersFromCustomerSide.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message as string;
    });
  },
});

export const orderSelectors = ordersAdapter.getSelectors<RootState>(
  (state) => state.orders
);

export default orderSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AdAxios from "../../helpers/adminAxios";

interface OrderOverview {
  month: string;
  total_orders: number;
}

interface PaymentOverview {
  month: string;
  total_amount: number;
}

interface InitialState {
  ordersOverview: OrderOverview[];
  paymentsOverview: PaymentOverview[];
  status: string;
  error: string | null;
}

export const getOverview = createAsyncThunk(
  "overview/orders",
  async (_, thunkAPI) => {
    try {
      const promise1 = AdAxios("/api/v2/overview/chart/order");
      const promise2 = AdAxios("/api/v2/overview/chart/payment");

      const [orders, payments] = await Promise.all([promise1, promise2]);
      return {
        orders: orders.data,
        payments: payments.data,
      };
    } catch (error) {
      thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
const initialState: InitialState = {
  ordersOverview: [],
  paymentsOverview: [],
  status: "idle",
  error: null,
};

const overviewSlice = createSlice({
  name: "overview",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getOverview.pending, (state, action) => {
      state.status = "pending";
    });
    builder.addCase(getOverview.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.ordersOverview = action.payload?.orders;
      state.paymentsOverview = action.payload?.payments;
    });
    builder.addCase(getOverview.rejected, (state, action) => {});
  },
});

export default overviewSlice.reducer;

import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { compareDesc } from "date-fns";
import { RootState } from "../../app/store";
import AdAxios from "../../helpers/adminAxios";
import Axios from "../../helpers/axios";
import { ExtraState } from "./../../types";

export const getOrders = createAsyncThunk(
  "orders/getOrders",
  async (condition: string, thunkAPI) => {
    try {
      let { data } = await AdAxios.get(
        `/api/v1/orders/list?limit=6&${condition}`
      );
      return data;
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

export const checkOrderStatus = createAsyncThunk(
  "orders/checkOrderStatus",
  async (id: string, thunkAPI) => {
    try {
      let { data } = await AdAxios.post(`/api/v1/orders/check-status/${id}`, {
        status: "success",
      });

      return {
        message: data.message,
        id,
      };
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
  } as ExtraState),
  reducers: {},
  extraReducers: (builder) => {
    // GET ORDERS
    builder.addCase(getOrders.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(getOrders.fulfilled, (state, { payload }) => {
      const {
        hasNextPage,
        hasPrevPage,
        nextPage,
        page,
        prevPage,
        totalPages,
        totalDocs,
        docs,
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

      ordersAdapter.setAll(state, docs);
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

    // CHECK ORDER STATUS
    builder.addCase(checkOrderStatus.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(checkOrderStatus.fulfilled, (state, { payload }) => {
      ordersAdapter.updateOne(state, {
        id: payload.id,
        changes: { status: "SUCCESS" },
      });
      state.status = "succeeded";
    });
    builder.addCase(checkOrderStatus.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message as string;
    });
  },
});

export const orderSelectors = ordersAdapter.getSelectors<RootState>(
  (state) => state.orders
);

export default orderSlice.reducer;

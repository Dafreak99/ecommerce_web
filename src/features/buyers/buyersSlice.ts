import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AdAxios from "../../helpers/adminAxios";
import { Buyer, ExtraState } from "../../types";

interface InitialState {
  allBuyers: Buyer[];
  buyerDetail: Buyer;
  nextPage: number | null;
  page: number;
  prevPage: number | null;
  totalPages: number;
  limit: number;
  status: string;
}

const initialState: InitialState | ExtraState = {
  allBuyers: [],
  buyerDetail: {} as Buyer,
  nextPage: null,
  page: 1,
  prevPage: null,
  totalPages: 1,
  limit: 1,
  status: "idle",
};

export const getBuyers = createAsyncThunk(
  "buyers/getBuyers",
  async (condition: string, ThunkAPI) => {
    try {
      const { data } = await AdAxios(
        `/api/v1/payments/buyers?limit=6&${condition}`
      );
      return data;
    } catch (error) {
      return ThunkAPI.rejectWithValue({ error: error.response.data });
    }
  }
);

export const getBuyerDetail = createAsyncThunk(
  "buyers/getBuyerDetail",
  async (id: string, ThunkAPI) => {
    try {
      const { data } = await AdAxios(`/api/v1/payments/buyers/${id}`);
      return data;
    } catch (error) {
      return ThunkAPI.rejectWithValue({ error: error.response.data });
    }
  }
);

const buyersSlice = createSlice({
  name: "buyers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // GET BUYERS

    builder.addCase(getBuyers.pending, (state, _) => {
      state.status = "pending";
    });

    builder.addCase(getBuyers.fulfilled, (state, { payload }) => {
      const { docs, nextPage, prevPage, totalPages, page, limit } = payload;

      state.status = "succeeded";

      state.allBuyers = docs;
      state.nextPage = nextPage;
      state.prevPage = prevPage;
      state.totalPages = totalPages;
      state.page = page;
      state.limit = limit;
    });

    // GET BUYER DETAIL
    builder.addCase(getBuyerDetail.fulfilled, (state, { payload }) => {
      state.buyerDetail = payload;
    });
  },
});

export default buyersSlice.reducer;

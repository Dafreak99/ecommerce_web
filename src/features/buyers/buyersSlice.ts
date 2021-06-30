import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AdAxios from "../../helpers/adminAxios";
import { Buyer } from "../../types";

interface InitialState {
  allBuyers: Buyer[];
  buyerDetail: Buyer;
}

const initialState: InitialState = {
  allBuyers: [],
  buyerDetail: {} as Buyer,
};

export const getBuyers = createAsyncThunk(
  "buyers/getBuyers",
  async (_, ThunkAPI) => {
    try {
      const { data } = await AdAxios("/api/v1/payments/buyers");
      return data.docs;
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
    builder.addCase(getBuyers.fulfilled, (state, { payload }) => {
      state.allBuyers = payload;
    });

    // GET BUYER DETAIL
    builder.addCase(getBuyerDetail.fulfilled, (state, { payload }) => {
      state.buyerDetail = payload;
    });
  },
});

export default buyersSlice.reducer;

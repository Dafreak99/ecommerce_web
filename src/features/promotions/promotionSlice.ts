import { Promotion } from "./../../types";
import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  PayloadAction,
  ThunkAction,
} from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { compareDesc } from "date-fns";
import AdAxios from "../../helpers/adminAxios";

export const getPromotions = createAsyncThunk(
  "promotions/getPromotions",
  async (_, thunkAPI) => {
    try {
      let { data } = await AdAxios.get("/api/v1/promotion/list");
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const createPromotion = createAsyncThunk(
  "promotions/createPromotion",
  async (
    body: {
      title: string;
      desciption: string;
      value: number;
      start: string;
      end: string;
    },
    thunkAPI
  ) => {
    try {
      let { data } = await AdAxios.post("/api/v1/promotion/create", body);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue({
        error: error.response.data.message[0].msg,
      });
    }
  }
);

export const editPromotion = createAsyncThunk(
  "promotions/editPromotion",
  async (
    body: {
      title: string;
      desciption: string;
      value: number;
      start: string;
      end: string;
      id: string;
    },
    thunkAPI
  ) => {
    try {
      await AdAxios.put(`/api/v1/promotion/update/${body.id}`, body);

      return { body };
    } catch (error) {
      return thunkAPI.rejectWithValue({
        error: error.response.data.message[0].msg,
      });
    }
  }
);

export const removePromotion = createAsyncThunk(
  "promotions/removePromotion",
  async (id: string, thunkAPI) => {
    try {
      await AdAxios.post(`/api/v1/promotion/${id}`);
      return {
        id,
      };
    } catch (error) {
      console.log(error.response.data.message);
      return thunkAPI.rejectWithValue({
        error: error.response.data.message[0].msg,
      });
    }
  }
);

const promotionsAdapter = createEntityAdapter({
  selectId: (promotion: Promotion) => promotion._id,
  sortComparer: (a, b) =>
    compareDesc(new Date(a.createdAt), new Date(b.createdAt)),
});

const promotionSlice = createSlice({
  name: "promotions",
  initialState: promotionsAdapter.getInitialState({ status: "", error: "" }),
  reducers: {},
  extraReducers: (builder) => {
    // GET PROMOTIONS
    builder.addCase(getPromotions.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(getPromotions.fulfilled, (state, { payload }) => {
      promotionsAdapter.setAll(state, payload);
      state.status = "success";
    });
    builder.addCase(getPromotions.rejected, (state, action) => {
      state.status = action.error.message as string;
    });

    // CREATE PROMOTION
    builder.addCase(createPromotion.pending, (state, action) => {
      state.status = "loading";
      state.error = "";
    });
    builder.addCase(createPromotion.fulfilled, (state, { payload }) => {
      promotionsAdapter.setOne(state, payload);
      state.status = "success";
    });
    builder.addCase(createPromotion.rejected, (state, { payload }: any) => {
      state.error = payload.error;
      state.status = "";
    });

    // EDIT PROMOTION
    builder.addCase(editPromotion.pending, (state, action) => {
      state.status = "loading";
      state.error = "";
    });
    builder.addCase(editPromotion.fulfilled, (state, { payload }) => {
      promotionsAdapter.updateOne(state, {
        id: payload.body.id,
        changes: payload.body,
      });
      state.status = "success";
    });
    builder.addCase(editPromotion.rejected, (state, { payload }: any) => {
      state.error = payload.error;
      state.status = "";
    });

    // REMOVE PROMOTION
    builder.addCase(removePromotion.pending, (state, action) => {
      state.status = "loading";
      state.error = "";
    });
    builder.addCase(removePromotion.fulfilled, (state, { payload }) => {
      promotionsAdapter.removeOne(state, payload.id);
      state.status = "success";
    });
    builder.addCase(removePromotion.rejected, (state, { payload }: any) => {
      state.error = payload.error;
      state.status = "";
    });
  },
});

export const promotionSelector = promotionsAdapter.getSelectors<RootState>(
  (state) => state.promotions
);

export default promotionSlice.reducer;

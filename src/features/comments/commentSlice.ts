import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import Axios from "../../helpers/axios";
import { Comment } from "../../types";

interface InitialState {
  comments: Comment[];
  status: string;
  error: string | null;
}

export const getComments = createAsyncThunk(
  "comments/getComments",
  async (id: string, thunkAPI) => {
    try {
      let { data } = await Axios(`/api/v2/public/comment/product/${id}`);
      return { data };
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const createComment = createAsyncThunk(
  "comments/createComment",
  async (
    body: { product_id: string; content: string; rate: number },
    thunkAPI
  ) => {
    try {
      await Axios.post(`/api/v2/public/comment`, body);
    } catch (error) {
      return thunkAPI.rejectWithValue({
        error: error.response.data.message[0].msg,
      });
    }
  }
);

const state: InitialState = {
  comments: [],
  status: "idle",
  error: null,
};

const commentSlice = createSlice({
  name: "comments",
  initialState: state,
  reducers: {},
  extraReducers: (builder) => {
    // GET COMMENT
    builder.addCase(getComments.pending, (state, _) => {
      state.status = "loading";
    });
    builder.addCase(
      getComments.fulfilled,
      (state, action: PayloadAction<{ data: Comment[] }>) => {
        state.status = "succeeded";
        state.comments = action.payload.data;
      }
    );
    builder.addCase(getComments.rejected, (state, action) => {
      state.status = "failed";
    });

    // CREATE COMMENT
    builder.addCase(createComment.pending, (state, _) => {
      state.status = "loading";
    });
    builder.addCase(createComment.fulfilled, (state, action) => {
      state.status = "succeeded";
    });
    builder.addCase(createComment.rejected, (state, action) => {
      state.status = "failed";
    });
  },
});

export default commentSlice.reducer;

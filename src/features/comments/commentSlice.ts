import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

interface Comment {
  postId: string;
  id: string;
  name: string;
  email: string;
  body: string;
}

export const fetchComments = createAsyncThunk(
  "comments/fetchComments",
  async () => {
    const data = await (
      await fetch("https://jsonplaceholder.typicode.com/comments?_limit=10")
    ).json();

    return data;
  }
);

const commentsAdapter = createEntityAdapter<Comment>({
  selectId: (comment) => comment.id,
});

const commentSlice = createSlice({
  name: "comments",
  initialState: commentsAdapter.getInitialState({ loading: false }),
  reducers: {},
  extraReducers: (builder) => {
    // GET PRODUCT
    builder.addCase(fetchComments.pending, (state, _) => {
      state.loading = true;
    });
    builder.addCase(fetchComments.fulfilled, (state, { payload }) => {
      state.loading = false;
      commentsAdapter.setAll(state, payload);
    });
    builder.addCase(fetchComments.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

export const commentSelectors = commentsAdapter.getSelectors<RootState>(
  (state) => state.comments
);

export default commentSlice.reducer;

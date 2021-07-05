import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from "../../helpers/axios";
import { FormValues } from "../../pages/Order/EditProfileModal";
import { Profile } from "../../types";

export const getProfile = createAsyncThunk(
  "profile/getProfile",
  async (_, thunkAPI) => {
    try {
      let { data } = await Axios.get("/api/v2/public/auth/profile");
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const updateProfile = createAsyncThunk(
  "profile/updateProfile",
  async (body: FormValues, thunkAPI) => {
    try {
      let { data } = await Axios.put("/api/v2/public/auth/profile", body);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

interface InitialState {
  profile: Profile;
  status: string;
  updateStatus: string;
  error: string | null;
}

const initialState: InitialState = {
  profile: {} as Profile,
  status: "idle",
  updateStatus: "idle",
  error: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // GET PROFILE
    builder.addCase(getProfile.pending, (state, action) => {
      state.status = "pending";
    });
    builder.addCase(getProfile.fulfilled, (state, action) => {
      state.profile = action.payload;
      state.status = "succeeded";
    });
    builder.addCase(getProfile.rejected, (state, action) => {
      state.error = action.error.message as string;
    });

    // UPDATE PROFILE

    builder.addCase(updateProfile.pending, (state, action) => {
      state.updateStatus = "pending";
    });

    builder.addCase(updateProfile.fulfilled, (state, action) => {
      state.profile = action.payload;
      state.updateStatus = "succeeded";
    });
    builder.addCase(updateProfile.rejected, (state, action) => {
      state.error = action.error.message as string;
    });
  },
});

export default profileSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
  return await axios
    .get("http://localhost:3001/user/")
    .then((res) => res.data)
    .catch((err) => console.log(err));
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: [],
    loading: false,
    error: "",
  },
  reducers: {},
  extraReducers: {
    [fetchUser.pending]: (state) => {
      state.loading = true;
      state.user = [];
      state.error = "";
    },
    [fetchUser.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.error = "";
    },
    [fetchUser.rejected]: (state, action) => {
      state.user = [];
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default userSlice.reducer;

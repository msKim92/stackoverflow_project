import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
  return axios
    .get("http://localhost:3001/memo/")
    .then((res) => console.log(res).catch((err) => console.log(err)));
});

const commentsSlice = createSlice({
  name: "comments",
  initialState: {
    user: [],
    loading: false,
    error: "",
  },
  reducers: {},
  extraReducers: {
    [fetchUser.pending]: (state) => {
      state.comments = [];
      state.loading = true;
      state.error = "";
    },
    [fetchUser.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.error = "";
    },
    [fetchUser.rejected]: (state, action) => {
      state.comments = [];
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default commentsSlice.reducer;

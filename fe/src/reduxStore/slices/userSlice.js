import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
  return axios
    .get("http://localhost:3001/user/")
    .then((res) => res.data)
    .catch((err) => console.log(err));
});

export const addUser = createAsyncThunk("user/addUser", async (addData) => {
  return axios
    .post("http://localhost:3001/user/", addData)
    .then((res) => res.data)
    .catch((err) => console.log(err));
});

const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    loading: false,
    error: "",
  },
  reducers: {},
  extraReducers: {
    [fetchUser.pending]: (state) => {
      state.users = [];
      state.loading = true;
      state.error = "";
    },
    [fetchUser.fulfilled]: (state, action) => {
      state.users = action.payload;
      state.loading = false;
      state.error = "";
    },
    [fetchUser.rejected]: (state, action) => {
      state.users = [];
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default userSlice.reducer;

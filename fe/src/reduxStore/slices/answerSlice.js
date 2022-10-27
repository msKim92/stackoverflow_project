import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAnswer = createAsyncThunk(
  "questions/fetchAnswer",
  async () => {
    return axios
      .get("http://localhost:3001/answer/")
      .then((res) => res.data)
      .catch((err) => console.log(err));
  }
);

export const addAnswer = createAsyncThunk(
  "questions/addAnswer",
  async (answerData) => {
    return axios
      .post(`http://localhost:3001/answer/`, answerData)
      .then((res) => res.data)
      .catch((err) => console.log(err));
  }
);

const answerSlice = createSlice({
  name: "questions",
  initialState: {
    answers: [],
    loading: false,
    error: "",
  },
  reducers: {},
  extraReducers: {
    [fetchAnswer.pending]: (state) => {
      state.answers = [];
      state.loading = true;
      state.error = "";
    },
    [fetchAnswer.fulfilled]: (state, action) => {
      state.answers = action.payload;
      state.loading = false;
      state.error = "";
    },
    [fetchAnswer.rejected]: (state, action) => {
      state.answers = [];
      state.loading = false;
      state.error = action.payload;
    },
    [addAnswer.pending]: (state) => {
      state.answers = [];
      state.loading = true;
      state.error = "";
    },
    [addAnswer.fulfilled]: (state, action) => {
      state.answers = [action.payload];
      state.loading = false;
      state.error = "";
    },
    [addAnswer.rejected]: (state, action) => {
      state.answers = [];
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export default answerSlice.reducer;

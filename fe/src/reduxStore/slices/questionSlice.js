import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchQuestion = createAsyncThunk("questions/", async () => {
  return await axios
    .get("/v1/questions?page=1&size=10", {
      headers: {
        "ngrok-skip-browser-warning": "111",
      },
    })
    .then((res) => res.data)
    .catch((err) => console.log(err));
});

export const askQuestion = createAsyncThunk("askQuestion", async () => {
  return await axios
    .post(
      "https://5c0b-14-52-189-10.jp.ngrok.io/v1/questions/createQuestion",
      body,
      {
        headers: { "ngrok-skip-browser-warning": "111" },
      }
    )
    .then((res) => console.log("success:", res))
    .catch((err) => console.error("error:", err));
});

const questionsSlice = createSlice({
  name: "questions",
  initialState: {
    questions: [],
    loading: false,
    error: "",
  },
  reducers: {},
  extraReducers: {
    [fetchQuestion.pending]: (state) => {
      state.questions = [];
      state.loading = true;
      state.error = "";
    },
    [fetchQuestion.fulfilled]: (state, action) => {
      state.questions = action.payload;
      state.loading = false;
      state.error = "";
    },
    [fetchQuestion.rejected]: (state, action) => {
      state.questions = [];
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default questionsSlice.reducer;

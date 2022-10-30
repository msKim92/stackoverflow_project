import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// export const fetchQuestion = createAsyncThunk("questions/", async () => {
//   return axios
//     .get("/v1/questions?page=1&size=10")
//     .then((res) => res.data)
//     .catch((err) => console.log(err));
// });

export const fetchQuestion = createAsyncThunk("questions/", async () => {
  return axios
    .get("http://localhost:3001/questions/")
    .then((res) => res.data)
    .catch((err) => console.log(err));
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

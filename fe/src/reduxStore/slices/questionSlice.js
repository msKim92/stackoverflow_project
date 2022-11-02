import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
let jwtToken = localStorage.getItem("Authorization");

const BASEURL =
  "http://ec2-54-180-147-29.ap-northeast-2.compute.amazonaws.com/";

export const fetchQuestion1 = createAsyncThunk("questions/", async () => {
  return await axios
    .get(`${BASEURL}v1/questions?page=1&size=10`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
});
export const fetchQuestion2 = createAsyncThunk("questions/", async () => {
  return await axios
    .get(`${BASEURL}v1/questions?page=2&size=10`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
});
export const fetchQuestion3 = createAsyncThunk("questions/", async () => {
  return await axios
    .get(`${BASEURL}v1/questions?page=3&size=10`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
});

export const filterFetchQuestion = createAsyncThunk("filterqe/", async (id) => {
  return axios
    .get(`${BASEURL}v1/questions/${id}`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
});

const questionsSlice = createSlice({
  name: "questions",
  initialState: {
    questions: [],
    selectQuestions: [],
    loading: false,
    error: "",
  },
  reducers: {},
  extraReducers: {
    [fetchQuestion1.pending]: (state) => {
      state.questions = [];
      state.selectQuestions = [];
      state.loading = true;
      state.error = "";
    },
    [fetchQuestion1.fulfilled]: (state, action) => {
      state.questions = action.payload;
      state.selectQuestions = [];
      state.loading = false;
      state.error = "";
    },
    [fetchQuestion1.rejected]: (state, action) => {
      state.questions = [];
      state.selectQuestions = [];
      state.loading = false;
      state.error = action.payload;
    },
    [fetchQuestion2.pending]: (state) => {
      state.questions = [];
      state.selectQuestions = [];
      state.loading = true;
      state.error = "";
    },
    [fetchQuestion2.fulfilled]: (state, action) => {
      state.questions = action.payload;
      state.selectQuestions = [];
      state.loading = false;
      state.error = "";
    },
    [fetchQuestion2.rejected]: (state, action) => {
      state.questions = [];
      state.loading = false;
      state.selectQuestions = [];
      state.error = action.payload;
    },
    [fetchQuestion3.pending]: (state) => {
      state.questions = [];
      state.selectQuestions = [];
      state.loading = true;
      state.error = "";
    },
    [fetchQuestion3.fulfilled]: (state, action) => {
      state.questions = action.payload;
      state.selectQuestions = [];
      state.loading = false;
      state.error = "";
    },
    [fetchQuestion3.rejected]: (state, action) => {
      state.questions = [];
      state.selectQuestions = [];
      state.loading = false;
      state.error = action.payload;
    },
    [filterFetchQuestion.pending]: (state) => {
      state.questions = [];
      state.selectQuestions = [];
      state.loading = true;
      state.error = "";
    },
    [filterFetchQuestion.fulfilled]: (state, action) => {
      state.questions = [];
      state.selectQuestions = action.payload;
      state.loading = false;
      state.error = "";
    },
    [filterFetchQuestion.rejected]: (state, action) => {
      state.questions = [];
      state.selectQuestions = [];
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default questionsSlice.reducer;

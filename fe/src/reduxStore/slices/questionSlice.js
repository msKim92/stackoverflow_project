import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Apis from "../../api/api";
let jwtToken = localStorage.getItem("access_token");
let token = "";

if (jwtToken) {
  token = jwtToken.split(" ").pop();
}
console.log(jwtToken);

const BASEURL =
  "http://ec2-54-180-147-29.ap-northeast-2.compute.amazonaws.com/";

export const fetchQuestion1 = createAsyncThunk("questions/", async () => {
  return await Apis.get(`${BASEURL}v1/questions?page=1&size=10`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
});

export const fetchQuestion2 = createAsyncThunk("questions/", async () => {
  return await Apis.get(`${BASEURL}v1/questions?page=2&size=10`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
});

export const fetchQuestion3 = createAsyncThunk("questions/", async () => {
  return await Apis.get(`${BASEURL}v1/questions?page=3&size=10`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
});

export const filterFetchQuestion = createAsyncThunk("filterqe/", async (id) => {
  console.log(id);
  return Apis.get(`${BASEURL}v1/questions/${id}`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
});
export const filterFetchAnswer = createAsyncThunk("filterqe/", async (id) => {
  console.log(id);
  return Apis.get(`questions/${id}`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
});

export const askQuestion = createAsyncThunk("askQuestion", async (body) => {
  return await axios
    .post(`v1/questions/createQuestion`, body, {
      headers: { Authorization: `${jwtToken}` },
    })
    .then((res) => console.log("success:", res))
    .catch((err) => console.error("error:", err));
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
    [askQuestion.pending]: (state) => {
      state.questions = [];
      state.selectQuestions = [];
      state.loading = true;
      state.error = "";
    },
    [askQuestion.fulfilled]: (state, action) => {
      state.questions = [];
      state.selectQuestions = action.payload;
      state.loading = false;
      state.error = "";
    },
    [askQuestion.rejected]: (state, action) => {
      state.questions = [];
      state.selectQuestions = [];
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default questionsSlice.reducer;

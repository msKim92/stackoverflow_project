import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Apis from "../../api/api";
let jwtToken = localStorage.getItem("access_token");
let token = "";

if (jwtToken) {
  token = jwtToken.split(" ").pop();
}
console.log("jwtToken:", jwtToken);

const BASEURL =
  "http://ec2-54-180-147-29.ap-northeast-2.compute.amazonaws.com/";

export const fetchQuestion1 = createAsyncThunk("questions/", async () => {
  return await Apis.get(`v1/questions?page=1&size=10`, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "ngrok-skip-browser-warning": "111",
    },
  })
    .then((res) => res.data)
    .catch((err) => console.log(err));
});

export const fetchQuestion2 = createAsyncThunk("questions/", async () => {
  return await Apis.get(`v1/questions?page=2&size=10`, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "ngrok-skip-browser-warning": "111",
    },
  })
    .then((res) => res.data)
    .catch((err) => console.log(err));
});

export const fetchQuestion3 = createAsyncThunk("questions/", async () => {
  return await Apis.get(`v1/questions?page=3&size=10`, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "ngrok-skip-browser-warning": "111",
    },
  })
    .then((res) => res.data)
    .catch((err) => console.log(err));
});

export const filterFetchQuestion = createAsyncThunk("filterqe/", async (id) => {
  console.log(id);
  return Apis.get(`v1/questions/${id}`, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "ngrok-skip-browser-warning": "111",
    },
  })
    .then((res) => res.data)
    .catch((err) => console.log(err));
});
export const searchQuestion = createAsyncThunk(
  "searchrqe/",
  async (searchName) => {
    console.log(searchName);
    return Apis.get(`v1/questions/search?title=${searchName}&page=1&size=10`, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "ngrok-skip-browser-warning": "111",
      },
    })
      .then((res) => res.data)
      .catch((err) => console.log(err));
  }
);
export const filterFetchAnswer = createAsyncThunk("filterqe/", async (id) => {
  console.log(id);
  return Apis.get(`questions/${id}`, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "ngrok-skip-browser-warning": "111",
    },
  })
    .then((res) => res.data)
    .catch((err) => console.log(err));
});

export const askQuestion = createAsyncThunk("askQuestion", async (body) => {
  return await Apis.post(`v1/questions/createQuestion`, body, {
    headers: {
      Authorization: `${jwtToken}`,
      "ngrok-skip-browser-warning": "111",
    },
  })
    .then((res) => console.log("success:", res))
    .catch((err) => console.error("error:", err));
});

const questionsSlice = createSlice({
  name: "questions",
  initialState: {
    questions: [],
    selectQuestions: [],
    searchQuestions: [],
    loading: false,
    error: "",
  },
  reducers: {},
  extraReducers: {
    [fetchQuestion1.fulfilled]: (state, action) => {
      state.questions = action.payload;
      state.selectQuestions = [];
      state.searchQuestions = [];
      state.loading = false;
      state.error = "";
    },

    [fetchQuestion2.fulfilled]: (state, action) => {
      state.questions = action.payload;
      state.selectQuestions = [];
      state.searchQuestions = [];
      state.loading = false;
      state.error = "";
    },

    [fetchQuestion3.fulfilled]: (state, action) => {
      state.questions = action.payload;
      state.selectQuestions = [];
      state.searchQuestions = [];
      state.loading = false;
      state.error = "";
    },

    [filterFetchQuestion.fulfilled]: (state, action) => {
      state.questions = [];
      state.selectQuestions = action.payload;
      state.searchQuestions = [];
      state.loading = false;
      state.error = "";
    },
    [searchQuestion.fulfilled]: (state, action) => {
      console.log(action);
      state.questions = [];
      state.selectQuestions = [];
      state.searchQuestions = action.payload;
      state.loading = false;
      state.error = "";
    },

    [askQuestion.fulfilled]: (state, action) => {
      state.questions = [];
      state.selectQuestions = action.payload;
      state.searchQuestions = [];
      state.loading = false;
      state.error = "";
    },
  },
});

export default questionsSlice.reducer;

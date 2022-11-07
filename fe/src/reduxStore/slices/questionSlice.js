import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Apis from "../../api/api";
const jwtToken = localStorage.getItem("Authorization");
let token = "";

if (jwtToken) {
  token = jwtToken.split(" ").pop();
}

export const fetchQuestion = createAsyncThunk(
  "questions/",
  async (clickNumber) => {
    return await Apis.get(`v1/questions?page=${clickNumber}&size=10`)
      .then((res) => {
        return res.data;
      })
      .catch((err) => console.log(err));
  }
);

export const filterFetchQuestion = createAsyncThunk("filterqe/", async (id) => {
  return Apis.get(`v1/questions/${id}`, {
    headers: {
      Authorization: `${jwtToken}`,
    },
  })
    .then((res) => res.data)
    .catch((err) => console.log(err));
});
export const searchQuestion = createAsyncThunk(
  "searchrqe/",
  async (searchName) => {
    return Apis.get(`v1/questions/search?title=${searchName}&page=1&size=10`, {
      headers: {
        Authorization: `${jwtToken}`,
      },
    })
      .then((res) => {
        return res.data;
      })
      .catch((err) => console.log(err));
  }
);
export const filterFetchAnswer = createAsyncThunk("filterqe/", async (id) => {
  return Apis.get(`v1/questions/${id}`, {
    headers: {
      Authorization: `${jwtToken}`,
    },
  })
    .then((res) => res.data)
    .catch((err) => console.log(err));
});

export const askQuestion = createAsyncThunk("askQuestion", async (body) => {
  return await Apis.post(`v1/questions/createQuestion`, body, {
    headers: {
      Authorization: `${jwtToken}`,
    },
  })
    .then(() => window.location.replace("/"))

    .catch((err) => console.error("error:", err));
});
export const voteUpQuestion = createAsyncThunk("askQuestion", async (qeId) => {
  return await Apis.post(`v1/vote/like/question/${qeId}`, qeId, {
    headers: {
      Authorization: `${jwtToken}`,
    },
  })
    .then((res) => window.location.reload())
    .catch((err) => console.error("error:", err));
});
export const voteDownQuestion = createAsyncThunk(
  "askQuestion",
  async (qeId) => {
    return await Apis.post(`v1/vote/dislike/question/${qeId}`, qeId, {
      headers: {
        Authorization: `${jwtToken}`,
      },
    })
      .then((res) => window.location.reload())
      .catch((err) => console.error("error:", err));
  }
);

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
    [fetchQuestion.fulfilled]: (state, action) => {
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

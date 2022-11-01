import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

let jwtToken = localStorage.getItem("access_token");
let token = jwtToken.split(" ").pop();
console.log(token);

export const fetchAnswer = createAsyncThunk(
  "questions/fetchAnswer",
  async () => {
    return axios
      .get("/v1/answer/", {
        headers: {
          // "Content-Length": 0,
          "ngrok-skip-browser-warning": "111",
        },
      })
      .then((res) => res.data)
      .catch((err) => console.log(err));
  }
);

export const addAnswer = createAsyncThunk(
  "answers/addAnswer",
  async (answerData) => {
    return axios
      .post(`/v1/answer/`, answerData, {
        headers: { Authorization: `${token}` },
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }
);

export const updateAnswer = createAsyncThunk(
  "answers/updateAnswer",
  async (oj) => {
    return axios
      .patch(`/v1/answer/${oj.id}`, oj.upData, {
        headers: { Authorization: `${token}` },
      })
      .then((res) => res.data)
      .catch((err) => console.log(err));
  }
);
// 성공
export const deleteAnswer = createAsyncThunk(
  "answers/deleteAnswer",
  async (id) => {
    return axios
      .delete(`/v1/answer/${id}`, {
        headers: { Authorization: `${token}` },
      })
      .then((res) => res.data)
      .catch((err) => console.log(err));
  }
);

const answerSlice = createSlice({
  name: "answers",
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
    [deleteAnswer.pending]: (state) => {
      state.answers = [];
      state.loading = true;
      state.error = "";
    },
    [deleteAnswer.fulfilled]: (state, action) => {
      state.answers = [action.payload];
      state.loading = false;
      state.error = "";
    },
    [deleteAnswer.rejected]: (state, action) => {
      state.answers = [];
      state.loading = false;
      state.error = action.payload.message;
    },
    [updateAnswer.pending]: (state) => {
      state.loading = true;
    },
    [updateAnswer.fulfilled]: (state, action) => {
      const {
        arg: { id },
      } = action.meta;
      state.loading = false;
      state.answers = [action.payload];
    },
    [updateAnswer.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export default answerSlice.reducer;

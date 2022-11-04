import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Apis from "../../api/api";
let jwtToken = localStorage.getItem("access_token");
console.log(jwtToken);
let token = "";

if (jwtToken) {
  token = jwtToken.split(" ").pop();
}

const BASEURL =
  "http://ec2-54-180-147-29.ap-northeast-2.compute.amazonaws.com/";

export const fetchAnswer = createAsyncThunk(
  "questions/fetchAnswer",
  async (id) => {
    return Apis.get(`v1/answer/${id}`, {
      headers: { Authorization: `${jwtToken}` },
    })
      .then((res) => res.data)
      .catch((err) => console.log(err));
  }
);

export const addAnswer = createAsyncThunk(
  "answers/addAnswer",
  async (answerData) => {
    return Apis.post(`v1/answer`, answerData, {
      headers: { Authorization: `${jwtToken}` },
    })
      .then((res) => res.data)
      .catch((err) => console.log(err));
  }
);
export const addVoteAnswer = createAsyncThunk(
  "answers/addAnswer",
  async (like) => {
    return Apis.post(`v1/answer${like}`, {
      headers: { Authorization: `${jwtToken}` },
    })
      .then((res) => res.data)
      .catch((err) => console.log(err));
  }
);

export const updateAnswer = createAsyncThunk(
  "answers/updateAnswer",
  async ({ upData, navigate }) => {
    console.log({ upData, navigate });
    return Apis.patch(`v1/answer/${upData.id}`, upData.answerBody, {
      headers: { Authorization: `${jwtToken}` },
    })
      .then((res) => {
        // navigate(`/${upData.id}`);
        return res.data;
      })
      .catch((err) => console.log(err));
  }
);

// 성공
export const deleteAnswer = createAsyncThunk(
  "answers/deleteAnswer",
  async (id) => {
    return Apis.delete(`v1/answer/${id}`, {
      headers: { Authorization: `${jwtToken}` },
    })
      .then((res) => res.data)
      .catch((err) => console.log(err));
  }
);

const answerSlice = createSlice({
  name: "answers",
  initialState: {
    answers: [],
    filterAnswer: [],
    loading: false,
    error: "",
  },
  reducers: {},
  extraReducers: {
    [fetchAnswer.pending]: (state) => {
      state.answers = [];
      state.filterAnswer = [];
      state.loading = true;
      state.error = "";
    },
    [fetchAnswer.fulfilled]: (state, action) => {
      state.answers = [];
      state.filterAnswer = action.payload;
      state.loading = false;
      state.error = "";
    },
    [fetchAnswer.rejected]: (state, action) => {
      state.answers = [];
      state.filterAnswer = [];
      state.loading = false;
      state.error = action.payload;
    },
    [addAnswer.pending]: (state) => {
      state.answers = [];
      state.filterAnswer = [];
      state.loading = true;
      state.error = "";
    },
    [addAnswer.fulfilled]: (state, action) => {
      state.answers = [action.payload];
      state.filterAnswer = [];
      state.loading = false;
      state.error = "";
    },
    [addAnswer.rejected]: (state, action) => {
      state.answers = [];
      state.filterAnswer = [];
      state.loading = false;
      state.error = action.payload.message;
    },
    [addVoteAnswer.pending]: (state) => {
      state.answers = [];
      state.filterAnswer = [];
      state.loading = true;
      state.error = "";
    },
    [addVoteAnswer.fulfilled]: (state, action) => {
      state.answers = [action.payload];
      state.filterAnswer = [];
      state.loading = false;
      state.error = "";
    },
    [addVoteAnswer.rejected]: (state, action) => {
      state.answers = [];
      state.filterAnswer = [];
      state.loading = false;
      state.error = action.payload.message;
    },
    [deleteAnswer.pending]: (state) => {
      state.answers = [];
      state.filterAnswer = [];
      state.loading = true;
      state.error = "";
    },

    [deleteAnswer.fulfilled]: (state, action) => {
      state.answers = [action.payload];
      state.filterAnswer = [];
      state.loading = false;
      state.error = "";
    },
    [deleteAnswer.rejected]: (state, action) => {
      state.answers = [];
      state.filterAnswer = [];
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
      state.filterAnswer = [];
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

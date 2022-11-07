import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Apis from "../../api/api";
let jwtToken = localStorage.getItem("access_token");

const BASEURL =
  "http://ec2-54-180-147-29.ap-northeast-2.compute.amazonaws.com/";

export const fetchAnswer = createAsyncThunk(
  "questions/fetchAnswer",
  async (id) => {
    return Apis.get(`v1/answer/${id}`, {
      headers: {
        Authorization: `${jwtToken}`,
      },
    })
      .then((res) => {
        window.location.reload();
        return res.data;
      })
      .catch((err) => console.log(err));
  }
);

export const addAnswer = createAsyncThunk(
  "answers/addAnswer",
  async (answerData) => {
    console.log(123, jwtToken);
    return Apis.post(`v1/answer`, answerData, {
      headers: {
        Authorization: `${jwtToken}`,
      },
    })
      .then((res) => {
        window.location.reload();
        return res.data;
      })
      .catch((err) => console.log(err));
  }
);

export const updateAnswer = createAsyncThunk(
  "answers/updateAnswer",
  async ({ upData, navigate }) => {
    return Apis.patch(`v1/answer/${upData.id}`, upData.answerBody, {
      headers: {
        Authorization: `${jwtToken}`,
      },
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
      .then((res) => {
        window.location.reload();
        return res.data;
      })
      .catch((err) => console.log(err));
  }
);
export const voteUpAnswer = createAsyncThunk("askQuestion", async (anId) => {
  return await Apis.post(
    `v1/vote/like/answer/${anId}`,
    {},
    {
      headers: {
        Authorization: `${jwtToken}`,
      },
    }
  )
    .then((res) => window.location.reload())
    .catch((err) => console.error("error:", err));
});
export const voteDownAnswer = createAsyncThunk("askQuestion", async (anId) => {
  console.log(anId);
  return await Apis.post(
    `v1/vote/dislike/answer/${anId}`,
    {},
    {
      headers: {
        Authorization: `${jwtToken}`,
      },
    }
  )
    .then((res) => window.location.reload())
    .catch((err) => console.error("error:", err));
});

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
    [fetchAnswer.fulfilled]: (state, action) => {
      state.answers = [];
      state.filterAnswer = action.payload;
      state.loading = false;
      state.error = "";
    },

    [addAnswer.fulfilled]: (state, action) => {
      state.answers = [action.payload];
      state.filterAnswer = [];
      state.loading = false;
      state.error = "";
    },

    [deleteAnswer.fulfilled]: (state, action) => {
      state.answers = [action.payload];
      state.filterAnswer = [];
      state.loading = false;
      state.error = "";
    },

    [updateAnswer.fulfilled]: (state, action) => {
      const {
        arg: { id },
      } = action.meta;
      state.filterAnswer = [];
      state.loading = false;
      state.answers = [action.payload];
    },
  },
});

export default answerSlice.reducer;

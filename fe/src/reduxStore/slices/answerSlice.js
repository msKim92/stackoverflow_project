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
  "answers/addAnswer",
  async (answerData) => {
    return axios
      .post(`http://localhost:3001/answer/`, answerData)
      .then((res) => res.data)
      .catch((err) => console.log(err));
  }
);

export const updateAnswer = createAsyncThunk(
  "answers/updateAnswer",
  async (filterData) => {
    console.log(filterData);
    return axios
      .put(`http://localhost:3001/answer/${id}`, filterData)
      .then((res) => res.data)
      .catch((err) => console.log(err));
  }
);

export const deleteAnswer = createAsyncThunk(
  "answers/deleteAnswer",
  async (id) => {
    return axios
      .delete(`http://localhost:3001/answer/${id}`)
      .then((res) => res.data)
      .catch((err) => console.log(err));
  }
);

// export const updatePost = createAsyncThunk('posts/updatePost', async (initialPost) => {
//   const { id } = initialPost;
//   try {
//       const response = await axios.put(`${POSTS_URL}/${id}`, initialPost)
//       return response.data
//   } catch (err) {
//       //return err.message;
//       return initialPost; // only for testing Redux!
//   }
// })

// .addCase(updatePost.fulfilled, (state, action) => {
//   if (!action.payload?.id) {
//       console.log('Update could not complete')
//       console.log(action.payload)
//       return;
//   }
//   const { id } = action.payload;
//   action.payload.date = new Date().toISOString();
//   const posts = state.posts.filter(post => post.id !== id);
//   state.posts = [...posts, action.payload];
// })

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
      const id = action.meta.arg;
      // console.log(id);
      if (id) {
        // console.log(state.answers);
        // state.answer = state.answer.filter((item) => item._id !== id);
        // state.answer = state.answer.filter((item) => item._id !== id);
      }
      state.answers = [action.payload];
      state.loading = false;
      state.error = "";
    },
    [deleteAnswer.rejected]: (state, action) => {
      console.log(action.payload);
      state.answers = [];
      state.loading = false;
      state.error = action.payload.message;
    },
    [updateAnswer.pending]: (state) => {
      state.loading = true;
    },
    [updateAnswer.fulfilled]: (state, action) => {
      console.log(state, 11, action, 33);
      state.loading = false;
      const {
        arg: { id },
      } = action.meta;
      if (id) {
        state.answer = state.answer.map((item) =>
          item._id === id ? action.payload : item
        );
      }
      console.log(state);
    },
    [updateAnswer.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export default answerSlice.reducer;

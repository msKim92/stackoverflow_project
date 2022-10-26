import { combineReducers, configureStore } from "@reduxjs/toolkit";
import questionSlice from "./slices/questionSlice";
import userSlice from "./slices/userSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    questions: questionSlice,
  },
});

export default store;

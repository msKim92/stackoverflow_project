import { configureStore } from "@reduxjs/toolkit";
import answersSlice from "./slices/answerSlice";
import questionSlice from "./slices/questionSlice";
import userSlice from "./slices/userSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    questions: questionSlice,
    answers: answersSlice,
  },
});

export default store;

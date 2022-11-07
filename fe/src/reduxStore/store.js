import { combineReducers, createStore, configureStore } from "@reduxjs/toolkit";
import answerSlice from "./slices/answerSlice";

import answerReducer from "./slices/answerSlice";
import questionSlice from "./slices/questionSlice";
import questionReducer from "./slices/questionSlice";
import userSlice from "./slices/userSlice";
import userReducer from "./slices/userSlice";

const rootReducer = combineReducers({
  user: userSlice,
  questions: questionSlice,
  answers: answerSlice,
});

const store = configureStore({ reducer: rootReducer });

export default store;

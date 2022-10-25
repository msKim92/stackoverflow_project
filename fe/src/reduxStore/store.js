import { combineReducers, configureStore } from "@reduxjs/toolkit";
import commentSlice from "./slices/commentSlice";
import questionSlice from "./slices/questionSlice";
import userSlice from "./slices/userSlice";

// const rootReducer = combineReducers({
//   user: userSlice.reducer,
//   question: questionSlice.reducer,
//   comment: commentSlice.reducer,
// });

const store = configureStore({
  reducer: {
    user: userSlice,
    question: questionSlice,
    comment: commentSlice,
  },
});

export default store;

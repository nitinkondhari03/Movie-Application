import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Slice/authSlice";
import moviesReducer from "./Slice/movieSlice"
const store = configureStore({
  reducer: {
    auth: authReducer,
    movies: moviesReducer,
  },
});

export default store;

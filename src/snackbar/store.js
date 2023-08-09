// store.js
import { configureStore } from "@reduxjs/toolkit";
import snackbarReducer from "./snackbarSlice";

const store = configureStore({
  reducer: {
    snackbar: snackbarReducer
    // other reducers...
  }
});

export default store;

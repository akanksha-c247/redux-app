// import counterReducer from './Reducer';
import userReducer from "./Reducer/UserReducer";
import { applyMiddleware, configureStore } from "@reduxjs/toolkit";
import { useReducer } from "react";
import thunkMiddleware from "redux-thunk";
// const store = createStore(counterReducer);
const store = configureStore(
  {
    reducer: {
      // users: userSlice,
      USERS:userReducer
    },
  },
  applyMiddleware(thunkMiddleware)
);
export default store;

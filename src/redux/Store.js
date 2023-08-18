import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Reducer/UserReducer";

const store = configureStore({
 reducer: {
 USERS: userReducer,
 },
});
export default store;

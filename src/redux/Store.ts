import { configureStore } from '@reduxjs/toolkit';
import userReducer from './Reducer/UserReducer';

const store = configureStore({
  reducer: {
    USERS: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

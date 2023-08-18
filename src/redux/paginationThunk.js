import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchPaginationAPi } from "../api/PaginationApi";
import { fetchTodos } from "./Reducer/UserReducer"; 

export const fetchPaginationData = createAsyncThunk(
  "pagination/fetchData", 
  async (_, thunkAPI) => {
    try {
      const response = await fetchPaginationAPi(); 
      return response; 
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message); 
    }
  }
);

// import { createAsyncThunk } from "@reduxjs/toolkit";
// import { FetchPaginationResponse, Todo } from "../utils/types";
// import { fetchPaginationAPI } from "../api/PaginationApi";

// export const fetchPaginationData = createAsyncThunk<
//   Todo[],
//   void,
//   { rejectValue: RTCError }
// >(
//   "pagination/fetchData",
//   async (_, thunkAPI) => {
//     try {
//       const response: Todo = await fetchPaginationAPI();
//       return response.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue({ message: error.message } as RTCError);
//     }
//   }
// );
// thunks.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Todo } from "../utils/types";
import { fetchPaginationAPI } from "../api/PaginationApi";

export const fetchPaginationData = createAsyncThunk<Todo[], void, { rejectValue: string }>(
  "data/fetch",
  async (_, thunkAPI) => {
    try {
      const response = await fetchPaginationAPI();
      return response;
    } catch (error:any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

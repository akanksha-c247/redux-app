import { createAsyncThunk } from '@reduxjs/toolkit';

interface RejectedValue {
  message: string;
}

export function createGenericAsyncThunk<ReturnedData, Arg>(
  actionType: string,
  apiFunction: (arg: Arg) => Promise<ReturnedData>
) {
  return createAsyncThunk<ReturnedData, Arg, { rejectValue: RejectedValue }>(
    actionType,
    async (arg, thunkAPI) => {
      try {
        const response = await apiFunction(arg);
        return response;
      } catch (error:any) {
        return thunkAPI.rejectWithValue({ message: error.message });
      }
    }
  );
}

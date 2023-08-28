import { createAsyncThunk, AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { createGenericAsyncThunk } from '../../redux/services/thunk';

// Mock Redux toolkit's ThunkDispatch type
type MockThunkDispatch = ThunkDispatch<object, object, AnyAction>;

describe('createGenericAsyncThunk', () => {
  it('should return an async thunk that dispatches the correct actions on success', async () => {
    const returnedData = { key: 'value' };
    const apiFunction = jest.fn().mockResolvedValue(returnedData);
    const actionType = 'TEST_ACTION';

    const genericAsyncThunk = createGenericAsyncThunk(actionType, apiFunction);

    const dispatch = jest.fn();
    const getState = jest.fn();

    await (genericAsyncThunk as any)(null)(dispatch, getState, undefined);

    expect(dispatch).toHaveBeenCalledWith({ type: `${actionType}/pending` });
    expect(dispatch).toHaveBeenCalledWith({
      type: `${actionType}/fulfilled`,
      payload: returnedData,
    });
  });

  it('should return an async thunk that dispatches the correct actions on failure', async () => {
    const errorMessage = 'Failed to fetch data';
    const apiFunction = jest.fn().mockRejectedValue(new Error(errorMessage));
    const actionType = 'TEST_ACTION';

    const genericAsyncThunk = createGenericAsyncThunk(actionType, apiFunction);

    const dispatch = jest.fn();
    const getState = jest.fn();

    await (genericAsyncThunk as any)(null)(dispatch, getState, undefined);

    expect(dispatch).toHaveBeenCalledWith({ type: `${actionType}/pending` });
    expect(dispatch).toHaveBeenCalledWith({
      type: `${actionType}/rejected`,
      payload: { message: errorMessage },
      error: true,
    });
  });
});

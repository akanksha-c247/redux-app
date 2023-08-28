import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { Todo } from '../../utils/types';
import { fetchTodosThunk } from '../../redux/services/todosThunk';
import { genericApiCall } from '../../redux/services/pagnitionApi';

// Mock Redux toolkit's ThunkDispatch type
type MockThunkDispatch = ThunkDispatch<{}, {}, AnyAction>;

// Mock the dependencies
jest.mock('./pagnitionApi', () => ({
  genericApiCall: jest.fn(),
}));

describe('fetchTodosThunk', () => {
  const dispatch = jest.fn();
  const getState = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should dispatch the correct actions on successful API call', async () => {
    const returnedData: Todo[] = [{ id: 1, title: 'Todo 1', completed: false, userId: 1 }];
    (genericApiCall as jest.Mock).mockResolvedValue(returnedData);

    await fetchTodosThunk('testArg')(dispatch, getState, undefined);

    expect(dispatch).toHaveBeenCalledWith({ type: 'todos/fetch/pending' });
    expect(dispatch).toHaveBeenCalledWith({
      type: 'todos/fetch/fulfilled',
      payload: returnedData,
    });
  });

  it('should dispatch the correct actions on failed API call', async () => {
    const errorMessage = 'Failed to fetch todos';
    (genericApiCall as jest.Mock).mockRejectedValue(new Error(errorMessage));

    await fetchTodosThunk('testArg')(dispatch, getState, undefined);

    expect(dispatch).toHaveBeenCalledWith({ type: 'todos/fetch/pending' });
    expect(dispatch).toHaveBeenCalledWith({
      type: 'todos/fetch/rejected',
      payload: { message: errorMessage },
      error: true,
    });
  });
});

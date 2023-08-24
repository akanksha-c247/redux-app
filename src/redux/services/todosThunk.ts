import { Todo } from '../../utils/types';
import { genericApiCall } from './pagnitionApi';
import { createGenericAsyncThunk } from './thunk';

// Create a specific thunk using the generic thunk function
export const fetchTodosThunk = createGenericAsyncThunk<Todo[], string>(
  'todos/fetch',
  genericApiCall
);

import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../redux/Store';
import App from '../../App';
import { RootState } from '../../utils/types';
import React from 'react';

describe('Redux Store Configuration', () => {
  it('renders the app with the Redux store', () => {
    const { container } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(container).toBeInTheDocument();
  });

  it('initial state should match the shape defined in the reducer', () => {
    const initialState: RootState = store.getState();
    const expectedInitialState = {
      USERS: {
        userList: [],
        todos: [],
        currentPage: 1,
        isAuthenticated: false,
        loading: false,
        loggedInUser: [],
        originalTodos: [],
        todosPerPage: 20,
      },
    };

    expect(initialState).toEqual(expect.objectContaining(expectedInitialState));
  });

});

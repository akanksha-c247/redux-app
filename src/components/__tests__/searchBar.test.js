import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import userEvent from '@testing-library/user-event';
import SearchAppBar from '../SearchBar';

const mockStore = configureStore([]);

describe('SearchAppBar', () => {
  it('dispatches filterUsers action when input value changes', () => {
    const store = mockStore({});

    render(
      <Provider store={store}>
        <SearchAppBar />
      </Provider>
    );

    const input = screen.getByTestId('inputBox');

    userEvent.type(input, 'n');

    const actions = store.getActions();
    expect(actions).toEqual([{ type: 'users/filterUsers', payload: 'n' }]);
  });
});

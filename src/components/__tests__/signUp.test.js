import React, { useState } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useAppDispatch } from '../../redux/reduxHooks'; 
import { SignUp } from '../../pages/authentication/SignUp';
import { useAppNavigate } from "../../redux/reduxHooks";
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import userEvent from '@testing-library/user-event';

const mockStore = configureStore([]);
jest.mock('../../redux/reduxHooks');

jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useState: (initialState) => [initialState, jest.fn()],
  }));

describe('SignUp Component', () => {
  const mockDispatch = jest.fn();
  const navigateMock = jest.fn();

  beforeEach(() => {
    useAppDispatch.mockReturnValue(mockDispatch);
    useAppNavigate.mockReturnValue(navigateMock);
  });

  it('submits form data on button click', () => {
    const store = mockStore({});
    const setFormDataMock = jest.fn();
    useState[1]?.mockReturnValue(setFormDataMock);
    render(
      <Provider store={store}>
        <SignUp />
      </Provider>
    );
    const firstNameTest = screen.getByTestId('firstNameTest');
    userEvent.type(firstNameTest, 'n');
    const lastName=screen.getByTestId('LastName');
    userEvent.type(lastName, 'n');

   const email = screen.getAllByTestId('email')
    userEvent.type(email, 'n');

    const password =screen.getByText('password');
    userEvent.type(password, 'n');


    fireEvent.click(screen.getByRole('button', { name: /sign up/i }));
    expect(setFormDataMock).toHaveBeenCalledTimes(4);
   expect(mockDispatch).toHaveBeenCalledWith(expect.any(Function)); 
   const actions = store.getActions();
   expect(actions).toEqual([{ type: 'users/addSignupReducer', payload: [{"customId": 1, "email": "", "firstName": "", "lastName": "", "password": ""}] }]);
  });

});

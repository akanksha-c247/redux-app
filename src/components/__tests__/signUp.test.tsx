import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import {render ,screen, waitFor } from '@testing-library/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { useAppDispatch } from '../../redux/reduxHooks';
import { addSignupReducer } from '../../redux/Reducer/UserReducer';
import { Todo } from '../../utils/types';
import SignUp from '../../pages/authentication/SignUp';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(), // Mock the useNavigate function
}));

// Mock useDispatch to capture dispatched actions
jest.mock('../../redux/reduxHooks', () => ({
  useAppDispatch: jest.fn(),
}));

describe('SignUp Component', () => {
  let mockDispatch: jest.Mock;
  let mockStore: any; 
  let mockNavigate: jest.Mock;
  beforeEach(() => {
    mockDispatch = jest.fn();
    mockNavigate = jest.fn();

    (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    mockStore = configureMockStore(); // Create a mock store
    const mockReduxStore = mockStore({}); // Initialize the mock store

    render(
      <Provider store={mockReduxStore}>
        <SignUp />
      </Provider>
    );
  });

  afterEach(() => {
    jest.clearAllMocks(); // Clear mock calls after each test
  });

  it('submits the form with correct data', async () => {
    // Simulate user input
    const firstNameInput = screen.getByRole('textbox', { name: 'First Name' });
    const LastNameInput = screen.getByRole('textbox', { name: 'Last Name' });
    const emailNameInput = screen.getByRole('textbox', { name: 'Email Address' });
    const passwordInput = screen.getByLabelText(/password/i) as HTMLInputElement;
    const checkbox = screen.getByRole('checkbox', { name: 'I want to receive inspiration, marketing promotions and updates via email.' });
    userEvent.type(firstNameInput, 'John');
    userEvent.type(LastNameInput, 'akk');
    userEvent.type(emailNameInput, 'akk@g.com');
    userEvent.type(passwordInput, 'John@123');
    userEvent.click(checkbox); // Check the checkbox
    userEvent.click(screen.getByRole('button', { name: 'Sign up' }));
    expect(useAppDispatch).toHaveBeenCalled();
    
    await waitFor(() => {
      // Verify that the correct action was dispatched
      const expectedTodo: Todo = {
        customId: 1,
        firstName: 'John',
        lastName: 'akk',
        email: 'akk@g.com',
        password: 'John@123',
        id: 0,
        userId: 0,
        title: '',
        completed: false,
        data: [],
        error: '',
      };
      expect(mockDispatch).toHaveBeenCalledWith(addSignupReducer(expectedTodo));
    });
  });

  it('Test case for required fields of signup', async () => {
    userEvent.click(screen.getByRole('button', { name: 'Sign up' }));
    // Check for validation error messages
    expect(await screen.findByText('First name is required.')).toBeInTheDocument();
    expect(await screen.findByText('Last name is required.')).toBeInTheDocument();
    expect(await screen.findByText('Email is required.')).toBeInTheDocument();
    expect(await screen.findByText('Password is required.')).toBeInTheDocument();
    expect(await screen.findByText('You must agree to the terms.')).toBeInTheDocument();
    expect(mockDispatch).not.toHaveBeenCalled();
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it('Test case for Email and Password fields regix validat of signup', async () => {
    // Simulate user input
    const emailNameInput = screen.getByRole('textbox', { name: 'Email Address' });
    const passwordInput = screen.getByLabelText(/password/i) as HTMLInputElement;
    userEvent.type(emailNameInput, 'akk5555');
    userEvent.type(passwordInput, 'fgdfgfgfgf');
    userEvent.click(screen.getByRole('button', { name: 'Sign up' }));

    // Check for validation error messages
    expect(await screen.findByText('Invalid email format.')).toBeInTheDocument();
    expect(await screen.findByText('You must agree to the terms.')).toBeInTheDocument();
    expect(await screen.findByText('Password must be at least 8 characters and contain a letter and a number.')).toBeInTheDocument();
    expect(mockDispatch).not.toHaveBeenCalled();
    expect(mockNavigate).not.toHaveBeenCalled();
  });
});

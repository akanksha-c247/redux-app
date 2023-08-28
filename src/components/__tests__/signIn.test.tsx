import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { act, fireEvent,render ,screen, waitFor } from '@testing-library/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { useAppDispatch, useAppSelector } from '../../redux/reduxHooks';
import { addSignReducer } from '../../redux/Reducer/UserReducer';
import { SignIn } from '../../pages/authentication/SignIn';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(), // Mock the useNavigate function
}));

// Mock useDispatch to capture dispatched actions
jest.mock('../../redux/reduxHooks', () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}));

describe('SignIn Component', () => {
  let mockDispatch: jest.Mock;
  let mockStore: any; 
  let mockNavigate: jest.Mock;
  beforeEach(() => {
    mockDispatch = jest.fn();
    mockNavigate = jest.fn();
   
    mockStore = configureMockStore(); // Create a mock store
    const initialState = {
      USERS: {
        userList: [
          // Your mock user data
          { email: 'test@example.com', password: 'John@123' },
        ],
      },
    };
    (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    (useAppSelector as jest.Mock).mockImplementation((selector) => selector(initialState));
    const mockReduxStore = mockStore(initialState); // Initialize the mock store

    render(
      <Provider store={mockReduxStore}>
        <SignIn />
      </Provider>
    );
  });
  afterEach(() => {
    jest.clearAllMocks(); // Clear mock calls after each test
  });

  it('should render the sign-in form correctly', async () => {

    // Simulate user input
    const emailNameInput = screen.getByRole('textbox', { name: 'Email Address' });
    const passwordInput = screen.getByLabelText(/password/i) as HTMLInputElement;
    const checkbox = screen.getByRole('checkbox', { name: 'Remember me' });
    const signInButton = screen.getByText(/Sign In/i);
    
    //Assert to check form renderning correct
    expect(emailNameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(checkbox).toBeInTheDocument();
    expect(signInButton).toBeInTheDocument();
    
  });

  it('should handle sign-in with valid credentials', async () => {
    
    // Simulate user input
    const emailNameInput = screen.getByRole('textbox', { name: 'Email Address' });
    const passwordInput = screen.getByLabelText(/password/i) as HTMLInputElement;
    const checkbox = screen.getByRole('checkbox', { name: 'Remember me' });
   
    
    act(() => {
      userEvent.type(emailNameInput, 'test@example.com');
      fireEvent.change(passwordInput, { target: { value: 'John@123' } });
      userEvent.click(checkbox); // Check the checkbox
      //userEvent.type(screen.getByLabelText('Password'), 'John@123');
    });
    fireEvent.submit(screen.getByTestId('handleSubmit')); 
    //Below line to check dispatch is called from test or not after calling above line 
    expect(mockDispatch).toHaveBeenCalledTimes(1);
    //Log to check
    console.log('Sign in mockDispatch calls:', mockDispatch.mock.calls);
    const dispatchedAction = mockDispatch.mock.calls[0][0];
    console.log('Dispatched action payload:', dispatchedAction.payload);

    // You can write assertions based on your use case
    expect(useAppDispatch).toHaveBeenCalled();

    await waitFor(() => {
      // Verify that the correct action was dispatched
      // Check if the mock action was dispatched
      expect(mockDispatch).toHaveBeenCalledWith(
        addSignReducer({
          email: 'test@example.com',
          password: 'John@123',
        })
      );
    });

  });


  it('Test case for required fields of signIn', async () => {
     
    // Simulate user input
    act(() => {
      fireEvent.submit(screen.getByTestId('handleSubmit'));
    });
    // Check for validation error messages
    expect(await screen.findByText('Email is required.')).toBeInTheDocument();
    expect(await screen.findByText('Password is required.')).toBeInTheDocument();
    //expect(await screen.findByText('You must agree to the terms.')).toBeInTheDocument();

    expect(mockDispatch).not.toHaveBeenCalled();
    expect(mockNavigate).not.toHaveBeenCalled();

  });

  it('Test case for Email and Password fields regix validat of signIn', async () => {
    // Simulate user input
    const emailNameInput = screen.getByRole('textbox', { name: 'Email Address' });
    const passwordInput = screen.getByLabelText(/password/i) as HTMLInputElement;
 
    //Act 
    act(() => {
      userEvent.type(emailNameInput, 'akk5555');
      fireEvent.change(passwordInput, { target: { value: 'fgdfgfgfgf' } });
      //userEvent.type(screen.getByLabelText('Password'), 'John@123');
    });
    // Simulate user input
    act(() => {
      fireEvent.submit(screen.getByTestId('handleSubmit'));
    });
    // Check for validation error messages
    expect(await screen.findByText('Invalid email format.')).toBeInTheDocument();
    //expect(await screen.findByText('You must agree to the terms.')).toBeInTheDocument();
    expect(await screen.findByText('Password must be at least 8 characters and contain a letter and a number.')).toBeInTheDocument();
    expect(mockDispatch).not.toHaveBeenCalled();
    expect(mockNavigate).not.toHaveBeenCalled();

  });

});

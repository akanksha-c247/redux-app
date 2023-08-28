import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import Header from '../header/Header';
import { useAppDispatch, useAppSelector } from '../../redux/reduxHooks';

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
        <Header />
      </Provider>
    );
  });
  afterEach(() => {
    jest.clearAllMocks(); // Clear mock calls after each test
  });

  it('renders the header components', () => {
    // Test the presence of different UI elements
    expect(screen.getByTestId('inputBox')).toBeInTheDocument();
    expect(screen.getByText('Language')).toBeInTheDocument();
    expect(screen.getByText('Logout')).toBeInTheDocument();
    // Add more assertions as needed
  });

  it('filters users on input change', async () => {
    // Simulate user typing
    const inputBox = screen.getByTestId('inputBox');
    userEvent.type(inputBox, 'searchValue');

    // Verify that the filterUsers action was dispatched with the correct payload
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'FILTER_USERS',
      payload: 'searchValue',
    });
  });

  it('logs out when logout button is clicked', async () => {
    // Click the logout button
    const logoutButton = screen.getByText('logout');
    fireEvent.click(logoutButton);

    // Verify that the logOutReducer action was dispatched
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'LOGOUT_REDUCER',
    });

    // Verify that navigation to '/' occurred
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  // Add more test cases as needed
});

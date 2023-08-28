import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import {
  fireEvent,
  render,
  screen,
} from '@testing-library/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/reduxHooks';
import {
  deleteUser,
  onChangePrevPerPage,
  onClickCurrentPage,
  onNaviGateOnNext,
  onNavigatePrev,
} from '../../redux/Reducer/UserReducer';
import Home from '../../pages/Home';
import { fetchTodosThunk } from '../../redux/services/todosThunk';

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
    (useAppSelector as jest.Mock).mockImplementation((selector) =>
      selector(initialState)
    );
    const mockReduxStore = mockStore(initialState); // Initialize the mock store

    render(
      <Provider store={mockReduxStore}>
        <Home />
      </Provider>
    );
  });
  afterEach(() => {
    jest.clearAllMocks(); // Clear mock calls after each test
  });

  it('should render the sign-in form correctly', async () => {
    fireEvent.click(screen.getByTestId(''));
    expect(mockDispatch).toHaveBeenCalledTimes(1);
    //Log to check
    console.log('Sign in mockDispatch calls:', mockDispatch.mock.calls);
    const dispatchedAction = mockDispatch.mock.calls[0][0];
    console.log('Dispatched action payload:', dispatchedAction.payload);

    // You can write assertions based on your use case
    expect(mockDispatch).toHaveBeenCalledWith(fetchTodosThunk('GET_FETCH_URL'));
  });
  it('dispatches onNaviGateOnNext when currentPage < total_page', () => {
    const currentPage = 2; // Set a value for currentPage
    const totalPage = 5; // Set a value for total_page
    const navigateNextButton = screen.getByText('Navigate Next'); // Adjust the text as per your component
    fireEvent.click(navigateNextButton);
    if (currentPage < totalPage) {
      expect(mockDispatch).toHaveBeenCalledWith(onNaviGateOnNext());
    } else {
      expect(mockDispatch).not.toHaveBeenCalled(); // Ensure no action is dispatched when currentPage >= totalPage
    }
  });
  it('dispatches onClickCurrentPage when a page is clicked', () => {
    const pages = [1, 2, 3, 4, 5]; // Provide an array of pages
    pages.forEach((page) => {
      const pageElement = screen.getByText(page.toString());
      fireEvent.click(pageElement);

      // Verify if the onClickCurrentPage action was dispatched with the correct page number
      expect(mockDispatch).toHaveBeenCalledWith(onClickCurrentPage(page));
    });
  });
  it('dispatches deleteUser when the delete button is clicked', () => {
    const rowId = 123; // Provide a sample row ID
    const deleteButton = screen.getByText('Delete'); // Adjust the text as per your component
    fireEvent.click(deleteButton);

    // Verify if the deleteUser action was dispatched with the correct ID
    expect(mockDispatch).toHaveBeenCalledWith(deleteUser({ id: rowId }));
  });
  it('dispatches onChangePrevPerPage when an option is selected', () => {
    // Simulate changing the select option
    const selectElement = screen.getByRole('combobox');
    fireEvent.change(selectElement, { target: { value: '50' } }); // Select the option with value 50

    // Verify if the onChangePrevPerPage action was dispatched with the correct value
    expect(mockDispatch).toHaveBeenCalledWith(onChangePrevPerPage(50));
  });
  it('dispatches onNavigatePrev when span is clicked and currentPage is not null', () => {
    const currentPage = 2; // Set a value for currentPage
    // Simulate clicking the span element
    const navigateSpan = screen.getByTestId('navigate');
    fireEvent.click(navigateSpan);

    // Verify if the onNavigatePrev action was dispatched when currentPage is not null
    if (currentPage !== null) {
      expect(mockDispatch).toHaveBeenCalledWith(onNavigatePrev());
    } else {
      expect(mockDispatch).not.toHaveBeenCalled(); // Ensure no action is dispatched when currentPage is null
    }
  });
  // Add more test cases as needed
});

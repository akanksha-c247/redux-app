import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { BrowserRouter, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/reduxHooks';
import Home from '../../pages/Home';
import userEvent from '@testing-library/user-event';
import {
  deleteUser,
  onChangePrevPerPage,
  onClickCurrentPage,
  onNaviGateOnNext,
  onNavigatePrev,
} from '../../redux/Reducer/UserReducer';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(), // Mock the useNavigate function
}));

// Mock useDispatch to capture dispatched actions
jest.mock('../../redux/reduxHooks', () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}));

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: any) => key }),
}));

describe('SignIn Component', () => {
  let mockDispatch: jest.Mock;
  let mockStore: any;
  let mockNavigate: jest.Mock;

  beforeEach(() => {
    mockDispatch = jest.fn();
    mockNavigate = jest.fn();

    const mockStore = configureMockStore();
    const initialState = {
      USERS: {
        todos: [{ id: 1, title: 'Learn React', completed: false }],
        todosPerPage: 10,
        currentPage: 1,
      },
    };

    const mockReduxStore = mockStore(initialState);  // Initialize mockReduxStore here

    (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    (useAppSelector as jest.Mock).mockImplementation((selector) => selector(initialState));
    
    render(
      <Provider store={mockReduxStore}>
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </Provider>
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the Home page correctly and navigate to previous page when Prev is clicked', async () => {
    // Test for heading
    expect(
      screen.getByRole('heading', { name: /home:Home/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/ID/)).toBeInTheDocument();
    expect(screen.getByText(/Title/)).toBeInTheDocument();
    expect(screen.getByText(/Completed/)).toBeInTheDocument();
    expect(screen.getByText(/Action/)).toBeInTheDocument();
    const prevSpan = screen.getByText(/Prev/i); // Replace this with the actual text or use the most appropriate query
    userEvent.click(prevSpan);
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('Learn React')).toBeInTheDocument();
    expect(screen.getByText('No')).toBeInTheDocument();
    // Test if the dispatch was called
    expect(mockDispatch).toHaveBeenCalled();
    expect(mockDispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'users/onNavigatePrev',
      })
    );
  });

  it('renders page numbers correctly', () => {
    // Assuming page 1 is displayed as initial page
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('changes page when a page number is clicked', async () => {
    const pageNumber = screen.getByText('2'); // Assuming that page 2 is available
    userEvent.click(pageNumber);

    await waitFor(() => {expect(mockDispatch).toHaveBeenCalledWith(
      onClickCurrentPage(2)); // Assuming onClickCurrentPage is your action creator
    });
  });

  it('navigates to the previous page when "Prev" is clicked', async () => {
    const prevButton = screen.getByText('Prev'); 
    userEvent.click(prevButton);

    await waitFor(() => {expect(mockDispatch).toHaveBeenCalledWith(
      (onNavigatePrev())); // Assuming onNavigatePrev is your action creator
    });
  });

  it('navigates to the next page when "Next" is clicked', async () => {
    const nextButton = screen.getByText(/Next/);
    userEvent.click(nextButton);
    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith(onNaviGateOnNext());
    });
  });    

  it('deletes a user when the delete button is clicked', async () => {
    const deleteButton = screen.getByText(/Delete/);
    userEvent.click(deleteButton);

    await waitFor(() => {expect(mockDispatch).toHaveBeenCalledWith(
      deleteUser({ id: 1 }));
    });
  });
  it('changes todosPerPage when a new option is selected', async () => {
    const selectElement = screen.getByRole('combobox');
    userEvent.selectOptions(selectElement, ['50']);
    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith(onChangePrevPerPage(50));
    });
  });
});

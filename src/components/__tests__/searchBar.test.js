import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useAppDispatch } from '../../redux/reduxHooks';
import { filterUsers } from '../Filter';
import SearchAppBar from '../SearchBar';

jest.mock('../../redux/reduxHooks');

describe('SearchAppBar', () => {
  const mockDispatch = jest.fn();

  beforeEach(() => {
    useAppDispatch.mockReturnValue(mockDispatch);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the search bar', () => {
    render(<SearchAppBar />);
    const searchInput = screen.getByPlaceholderText('Search…');
    expect(searchInput).toBeInTheDocument();
  });

  it('dispatches filter action on search input change', () => {
    render(<SearchAppBar />);
    const searchInput = screen.getByPlaceholderText('Search…');

    // Simulate user entering text in the search input
    userEvent.type(searchInput, 'search term');

    // Assert that the dispatch function was called with the correct action
    expect(mockDispatch).toHaveBeenCalledWith(filterUsers('search term'));
  });

  it('clears input on clear button click', async () => {
    render(<SearchAppBar />);
    const searchInput = screen.getByPlaceholderText('Search…');

    // Simulate user entering text in the search input
    userEvent.type(searchInput, 'search term');

    // Get the clear button
    const clearButton = screen.getByRole('button', { name: /clear/i });

    // Simulate user clicking the clear button
    fireEvent.click(clearButton);

    // Wait for the input value to be cleared
    await waitFor(() => expect(searchInput).toHaveValue(''));
  });
});

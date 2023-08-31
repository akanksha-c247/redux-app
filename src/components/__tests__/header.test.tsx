import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { BrowserRouter, useNavigate } from 'react-router-dom';
import Header from '../header/Header';
import { useAppDispatch } from '../../redux/reduxHooks';
import i18n from '../../i18next';
import userEvent from '@testing-library/user-event';
import i18next from 'i18next';
import { logOutReducer } from '../../redux/Reducer/UserReducer';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(), // Mock the useNavigate function
}));
  
// Mock useDispatch to capture dispatched action
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
    (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    mockStore = configureMockStore(); // Create a mock store
    const mockReduxStore = mockStore(); // Initialize the mock store
  
    render(
      <Provider store={mockReduxStore}>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </Provider>
    );
  });
  
  afterEach(() => {
    jest.clearAllMocks(); // Clear mock calls after each test
  });

  it('renders the header components', async () => {
    // Test the presence of different UI elements
    await waitFor(() => {
      const inputBox = screen.getByTestId('inputBox');  
      expect(inputBox).toBeInTheDocument();
    });
    const languageButton = screen.getByRole('button', { name: /language/i });
    expect(languageButton).toBeInTheDocument();
    const logoutButton = screen.getByRole('button', { name: /logout/i });
    expect(logoutButton).toBeInTheDocument();
    const createButton = screen.getByRole('button', { name: /create\+/i });
    expect(createButton).toBeInTheDocument();
    const welcomeText = screen.getByText(i18n.t('welcome'));
    expect(welcomeText).toBeInTheDocument();
  });

  it('filters users on input change', async () => {
    // Simulate typing into the input box
    const inputBox = screen.getByRole('textbox', { name: /search/i });
    expect(inputBox).toBeInTheDocument();
    userEvent.type(inputBox,'John');
    expect(mockDispatch).toHaveBeenNthCalledWith(1, { type: 'users/filterUsers', payload: 'J' });
    expect(mockDispatch).toHaveBeenNthCalledWith(2, { type: 'users/filterUsers', payload: 'Jo' });
    expect(mockDispatch).toHaveBeenNthCalledWith(3, { type: 'users/filterUsers', payload: 'Joh' });
    expect(mockDispatch).toHaveBeenNthCalledWith(4, { type: 'users/filterUsers', payload: 'John' });   
  });
  
  it('should change language to English when English is selected', async () => {
    const languageButton = screen.getByRole('button', { name: /language/i });
    userEvent.click(languageButton);

    const englishMenuItem = await screen.findByRole('menuitem', { name: /english/i });
    userEvent.click(englishMenuItem);

    i18next.changeLanguage('en');

    await waitFor(() => {
      expect(i18next.language).toBe('en');
    });
  });

  it('should change language to French when French is selected', async () => {
    const languageButton = screen.getByRole('button', { name: /language/i });
    userEvent.click(languageButton);

    const frenchMenuItem = await screen.findByRole('menuitem', { name: /french/i });
    expect(frenchMenuItem).toBeInTheDocument();
    i18next.changeLanguage('fr');
    await waitFor(() => {
      expect(i18next.language).toBe('fr');
    });
  });

  it('logs out when logout button is clicked', async () => {
    const logoutButton = screen.getByRole('button', { name: /logout/i });
    userEvent.click(logoutButton);
    expect(useAppDispatch).toHaveBeenCalled();
  });
});

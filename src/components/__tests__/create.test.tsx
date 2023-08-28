import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import { Create } from '../../pages/Create';
import { addUser } from '../../redux/Reducer/UserReducer';
import { useAppDispatch, useAppSelector } from '../../redux/reduxHooks';
import { Todo } from '../../utils/types';

// Mock the Redux store
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(), // Mock the useNavigate function
}));
  
// Mock useDispatch to capture dispatched actions
jest.mock('../../redux/reduxHooks', () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}));
describe('Create Component', async () => {
  let mockDispatch: jest.Mock;
  let mockStore: any; 
  let mockNavigate: jest.Mock;
  beforeEach(() => {
    mockDispatch = jest.fn();
    mockNavigate = jest.fn();
    mockStore = configureMockStore(); // Create a mock store
    const initialState = {
      USERS: {
        todos: [{
          id:'1',
          title:'akakka',
          userId:'1',
          completed:'yes',
        }], // Provide your initial state here
      }};
    (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    (useAppSelector as jest.Mock).mockImplementation((selector) => selector(initialState));
    const mockReduxStore = mockStore(initialState); // Initialize the mock store  
    render(
      <Provider store={mockReduxStore}>
        <MemoryRouter>
          <Create />
        </MemoryRouter>
      </Provider>
    );  
    afterEach(() => {
      jest.clearAllMocks(); // Clear mock calls after each test
    });
  });
  it('renders correctly for adding a new user', () => {
    // Add assertions to check if the required elements are rendered
    expect(screen.getByText('Add New User')).toBeInTheDocument();
    // ... add more assertions as needed
  });

  it('renders correctly for editing an existing user', () => {
    // Add assertions to check if the required elements are rendered
    expect(screen.getByText('Edit User')).toBeInTheDocument();
    // ... add more assertions as needed
  });
  // Simulate user interactions
  fireEvent.click(screen.getByLabelText('Yes'));
  fireEvent.change(screen.getByLabelText('Title'), {
    target: { value: 'Sample Title' },
  });

  // Simulate form submission
  fireEvent.submit(screen.getByRole('button', { name: 'Submit' }));
  expect(useAppDispatch).toHaveBeenCalled();
  // Verify if the required actions were dispatched
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
    
    expect(mockDispatch).toHaveBeenCalledWith(addUser(expectedTodo));
  });
});
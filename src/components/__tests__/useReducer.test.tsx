import userReducer, {
  addUser,
  updateUser,
  deleteUser,
  setOriginalTodos,
  filterUsers,
  logOutReducer,
  onNaviGateOnNext,
  onNavigatePrev,
  onChangePrevPerPage,
  onClickCurrentPage,
} from '../../redux/Reducer/UserReducer';
  
describe('userSlice', () => {
  const initialState = {
    userList: [],
    todos: [],
    originalTodos: [],
    todosPerPage: 20,
    currentPage: 1,
    loading: false,
    loggedInUser: [],
    isAuthenticated: false,
  };
  
  it('should add a user to todos array when addUser is dispatched', () => {
    const user = {
      id: 1,
      title: 'New User',
      completed: false,
      userId: 1,
      data: [],
      password: '',
      email: '',
      lastName: '',
      firstName: '', 
      customId: 0,
      error: '',
    };
    const nextState = userReducer(initialState, addUser(user));
    expect(nextState.todos).toHaveLength(1);
    expect(nextState.todos[0]).toEqual(user);
  });
  
  it('should update a user in todos array when updateUser is dispatched', () => {
    const initialStateWithUser = { ...initialState, todos: [{ id: 1, title: 'Old Title', completed: false, userId: 1 }] };
    const updatedUser = {
      id: 1,
      title: 'Updated Title',
      completed: true,
      userId: 1,
      data: [], // Add the missing properties required by the Todo type
      password: '',
      email: '',
      lastName: '',
      // Add any other properties required by the Todo type
    };
    const nextState = userReducer(initialStateWithUser, updateUser(updatedUser));
    expect(nextState.todos).toHaveLength(1);
    expect(nextState.todos[0]).toEqual(updatedUser);
  });
  
  
  it('should delete a user from todos array when deleteUser is dispatched', () => {
    const initialStateWithUsers = { ...initialState, todos: [{ id: 1, title: 'User 1', completed: false, userId: 1 }, { id: 2, title: 'User 2', completed: true, userId: 2 }] };
    const nextState = userReducer(initialStateWithUsers, deleteUser({ id: 1 }));
    expect(nextState.todos).toHaveLength(1);
    expect(nextState.todos[0].id).toBe(2);
  });
  
  it('should update originalTodos when setOriginalTodos is dispatched', () => {
    const newOriginalTodos = [{ id: 3, title: 'New Todo', completed: false, userId: 3 }];
    const nextState = userReducer(initialState, setOriginalTodos(newOriginalTodos));
    expect(nextState.originalTodos).toEqual(newOriginalTodos);
  });
  
  it('should filter todos based on searchText when filterUsers is dispatched', () => {
    const initialStateWithTodos = { ...initialState, originalTodos: [{ id: 1, title: 'User 1', completed: false, userId: 1 }, { id: 2, title: 'User 2', completed: true, userId: 2 }] };
    const nextState = userReducer(initialStateWithTodos, filterUsers('User 1'));
    expect(nextState.todos).toHaveLength(1);
    expect(nextState.todos[0].id).toBe(1);
  });
  
  it('should update currentPage when onNaviGateOnNext is dispatched', () => {
    const nextState = userReducer(initialState, onNaviGateOnNext());
    expect(nextState.currentPage).toBe(2);
  });
  
  it('should update currentPage when onNavigatePrev is dispatched', () => {
    const initialStateWithPage = { ...initialState, currentPage: 2 };
    const nextState = userReducer(initialStateWithPage, onNavigatePrev());
    expect(nextState.currentPage).toBe(1);
  });
  
  it('should update todosPerPage when onChangePrevPerPage is dispatched', () => {
    const nextState = userReducer(initialState, onChangePrevPerPage(50));
    expect(nextState.todosPerPage).toBe(50);
  });
  
  it('should update currentPage when onClickCurrentPage is dispatched', () => {
    const nextState = userReducer(initialState, onClickCurrentPage(3));
    expect(nextState.currentPage).toBe(3);
  });
  
  it('should update isAuthenticated and loggedInUser when logOutReducer is dispatched', () => {
    const initialStateWithAuth = { ...initialState, isAuthenticated: true, loggedInUser: [{ id: 1, username: 'user' }] };
    const nextState = userReducer(initialStateWithAuth, logOutReducer());
    expect(nextState.isAuthenticated).toBe(false);
    expect(nextState.loggedInUser).toHaveLength(0);
  });
});
  
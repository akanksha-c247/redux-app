import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Todo, User, Users, UserState } from "../../utils/types";
import { ActionTypes } from "../../utils/constant";
import { fetchPaginationData } from "../paginationThunk";

const initialState: UserState = {
  userList: [],
  todos: [],
  originalTodos: [],
  todosPerPage: 20,
  currentPage: 1,
  loading: false,
  loggedInUser: [],
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: ActionTypes.USERS,
  initialState,
  reducers: {
    fetchTodos: (state, action: PayloadAction<Todo[]>) => {
      state.todos = action.payload;
    },
    setOriginalTodos: (state, action: PayloadAction<Todo[]>) => {
      state.originalTodos = action.payload;
    },
    onNaviGateOnNext: (state) => {
      state.currentPage++;
    },
    onNavigatePrev: (state) => {
      state.currentPage--;
    },
    onChangePrevPerPage: (state, action: PayloadAction<number>) => {
      state.todosPerPage = action.payload;
    },
    onClickCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    addUser: (state, action: PayloadAction<Todo>) => {
      state.todos.push(action.payload);
    },
    updateUser: (state, action: PayloadAction<Todo>) => {
      const { id, title, completed, userId } = action.payload;
      state.todos = state.todos.map((user) =>
        user.id === id ? { ...user, title, completed, userId } : user
      );
    },
    deleteUser: (state, action: PayloadAction<{ id: number }>) => {
      const { id } = action.payload;
      state.todos = state.todos.filter((user) => user.id !== id);
    },
    addSignupReducer: (state, action: PayloadAction<Todo>) => {
      state.userList.push(action.payload);
    },
    addSignReducer: (state, action: PayloadAction<User>) => {
      state.loggedInUser.push(action.payload);
    },
    logOutReducer: (state) => {
      state.isAuthenticated = false;
      state.loggedInUser = [];
    },
    filterUsers: (state, action: PayloadAction<string>) => {
      const searchText = action.payload.toLowerCase();
      if (state.originalTodos.length === 0) {
        state.originalTodos = state.todos;
      }
      state.todos = state.originalTodos.filter((user) =>
        user.title?.toLowerCase()?.includes(searchText)
      );
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchPaginationData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPaginationData.fulfilled, (state, action) => {
        state.loading = false;
        if (state.todos.length === 0) state.todos = action.payload;
        state.originalTodos = action.payload;
      })
      .addCase(fetchPaginationData.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const {
  logOutReducer,
  setOriginalTodos,
  filterUsers,
  addUser,
  updateUser,
  deleteUser,
  addSignupReducer,
  addSignReducer,
  fetchTodos,
  onNaviGateOnNext,
  onNavigatePrev,
  onChangePrevPerPage,
  onClickCurrentPage,
} = userSlice.actions;

export default userSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { USERS } from "../../utils/constant";
import { fetchPaginationData } from "../paginationThunk";

const userSlice = createSlice({
  name: USERS,
  initialState:{
    userList: [],
    todos: [],
    originalTodos:[],
    todosPerPage: 11,
    currentPage: 1,
    loading:false,
    loggedInUser:[],
    isAuthenticated: false,

  }, 
  reducers: {
    fetchTodos:async(state,action)=>{
      state.todos = action.payload;
    },
    setOriginalTodos: (state, action) => {
      state.originalTodos = action.payload;
    },

    onNaviGateOnNext:(state)=>{
      state.currentPage++
    },

    onNavigatePrev:(state)=>{
      state.currentPage--
    },

    onChangePrevPerPage:(state,action)=>{
      state.todosPerPage=action.payload
    },

    onClickCurrentPage:(state,action)=>{
      state.currentPage=action.payload
    },

    addUser: (state, action) => {
      const newDataList =[...state.todos, action.payload]
      state.todos = newDataList;
    },

    updateUser: (state, action) => {
      const { id, title, completed,userId } = action?.payload;
      return {
        ...state,
        todos: state.todos.map(user =>
          user.id === parseInt(id) ? { ...user, title, completed, userId } : user
        )
      };
    },

    deleteUser: (state, action) => {
      const { id } = action.payload;
      state.todos=state.todos.filter(user => user?.id !== parseInt(id));
    },

    addSignupReducer: (state,action)=>{
      state.userList.push(action.payload);
    },

    addSignReducer:(state,action)=>{
    state?.loggedInUser.push(action.payload);  
    }, 
    logOutReducer:(state)=>{
    state.isAuthenticated=false;
    state.loggedInUser=[]
    }, 
    filterUsers: (state, action) => {
      const searchText = action.payload.toLowerCase();
      if (state.originalTodos.length === 0) {
        state.originalTodos = state.todos;
      }

      state.todos = state.originalTodos.filter(user =>
        user.title?.toLowerCase()?.includes(searchText)
      );

    },    
    
  },

  extraReducers: {
    [fetchPaginationData.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchPaginationData.fulfilled]: (state, action) => {
      state.loading = false;
      if(state.todos.length === 0)
      state.todos = action.payload; 

      state.originalTodos=action.payload
    },
    [fetchPaginationData.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});

export const {logOutReducer,setOriginalTodos,filterUsers, addUser, updateUser, deleteUser, addSignupReducer, addSignReducer, fetchTodos, onNaviGateOnNext, onNavigatePrev,onChangePrevPerPage,onClickCurrentPage} = userSlice.actions;
export default userSlice.reducer;
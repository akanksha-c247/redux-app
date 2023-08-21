import { createSlice } from "@reduxjs/toolkit";
import { USERS,SET_USERS } from "../../utils/constant";
import { fetchPaginationData } from "../paginationThunk";
// import { userList } from "../../utils/data";

const userSlice = createSlice({
  name: USERS,
  initialState:{
    userList: [],
    todos: [],
    originalTodos:[],
    todosPerPage: 11,
    currentPage: 1,
    loading:false,
    loggedInUser:[]
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
      debugger;
      const newDatwaList =[...state.todos]
      newDatwaList.push(action.payload)
      state.todos = newDatwaList;
    },

    updateUser: (state, action) => {
      debugger
      const { id, title, completed,userId } = action?.payload;
      return {
        ...state,
        todos: state.todos.map(user =>
          user.id === parseInt(id) ? { ...user, title, completed, userId } : user
        )
      };
    },

    deleteUser: (state, action) => {
      debugger
      const { id } = action.payload;
      state.todos=state.todos.filter(user => user?.id !== parseInt(id));
    },

    addSignupReducer: (state,action)=>{
      state.userList.push(action.payload);
    console.log('action: ', action);
    },

    addSignReducer:(state,action)=>{
    console.log('action: ', action);
    state?.loggedInUser.push(action.payload);  
    },  
    filterUsers: (state, action) => {
      debugger;
      const searchText = action.payload.toLowerCase();

      // Set the originalTodos if it's empty (first time filtering)
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
debugger;
      if(state.todos.length === 0)
      state.todos = action.payload; 

      state.originalTodos=action.payload
    },
    [fetchPaginationData.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});

export const {setOriginalTodos,filterUsers, addUser, updateUser, deleteUser, addSignupReducer, addSignReducer, fetchTodos, onNaviGateOnNext, onNavigatePrev,onChangePrevPerPage,onClickCurrentPage} = userSlice.actions;
export default userSlice.reducer;
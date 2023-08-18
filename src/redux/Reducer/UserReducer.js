import { createSlice } from "@reduxjs/toolkit";
import { USERS,SET_USERS } from "../../utils/constant";
import { fetchPaginationData } from "../paginationThunk";
// import { userList } from "../../utils/data";

const userSlice = createSlice({
  name: USERS,
  initialState:{
    userList: [],
    todos: [],
    todosPerPage: 10,
    currentPage: 1,
    loading:false
  }, 
  reducers: {
    fetchTodos:async(state,action)=>{
      state.todos = action.payload;
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
      state.userList =action.payload;
    },

    updateUser: (state, action) => {
      const { id, name, email } = action?.payload;
      return state?.map((user) =>
        user?.id === parseInt(id) ? { ...user, name, email } : user
      );
    },

    deleteUser: (state, action) => {
      const { id } = action.payload;
      return state.filter(user => user.id !== parseInt(id));
    },

    addSignupReducer: (state,action)=>{
      state.push(action.payload);
    console.log('action: ', action);
    },

    addSignReducer:(state,action)=>{
    console.log('action: ', action);
    state?.push(action.payload);  
    },  
  },

  extraReducers: {
    [fetchPaginationData.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchPaginationData.fulfilled]: (state, action) => {
      state.loading = false;
      state.todos = action.payload; 
      console.log('action.payload: ', action.payload);
    },
    [fetchPaginationData.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});

export const { addUser, updateUser, deleteUser, addSignupReducer, addSignReducer, fetchTodos, onNaviGateOnNext, onNavigatePrev,onChangePrevPerPage,onClickCurrentPage} = userSlice.actions;
export default userSlice.reducer;
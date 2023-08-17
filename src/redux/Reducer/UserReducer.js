import { createSlice } from "@reduxjs/toolkit";
import { USERS,SET_USERS } from "../../utils/constant";
import { setUsers } from "../Action";
// import { userList } from "../../utils/data";
const userSlice = createSlice({
  name: USERS,
  initialState:{
    userList: [],
    todos: [],
    todosPerPage: 10,
    currentPage: 1
  }, 
  reducers: {
    onNaviGateOnNext:()=>{},
    onNavigatePrev:()=>{},
    onChangePrevPerPage:()=>{},
    onClickCurrentPage:()=>{},

    addUser : (state, action) => {
      debugger
      switch (action.type) {
        case SET_USERS:
          return {
            ...state,
            users: action.payload,
          };
        default:
          return state;
      }
    },

    updateUser: (state, action) => {
      debugger;
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
    state.push(action.payload);  
    }

  }
});

export const { addUser, updateUser, deleteUser, addSignupReducer, addSignReducer } = userSlice.actions;
export default userSlice.reducer;

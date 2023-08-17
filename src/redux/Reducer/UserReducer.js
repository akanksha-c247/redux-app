import { createSlice } from "@reduxjs/toolkit";
import { USERS } from "../../utils/constant";
import { userList } from "../../utils/data";

const userSlice = createSlice({
  name: USERS,
  initialState: userList,
  reducers: {
    addUser: (state, action) => {
      state.push(action.payload);
    },
    updateUser: (state, action) => {
      const { id, name, email } = action.payload;
      return state.map(user =>
        user.id === parseInt(id) ? { ...user, name, email } : user
      );
    },
    deleteUser: (state, action) => {
      const { id } = action.payload;
      return state.filter(user => user.id !== parseInt(id));
    },
  }
});

export const { addUser, updateUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;

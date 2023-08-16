import { createSlice } from "@reduxjs/toolkit";
import { USERS } from "../../utils/constant";
import { userList } from "../../utils/data";
const userSlice =createSlice({
    name:USERS,
    initialState:userList,
    reducers:{
        addUser:(state,action)=>{
        state.push(action.payload)
        },
        updateUser:(state,action)=>{
        console.log('action: ', action);
    }
}
})
export const {addUser,updateUser} = userSlice.actions
export default userSlice.reducer;
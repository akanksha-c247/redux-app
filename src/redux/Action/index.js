import { DECREMENT, INCREMENT, SET_USERS } from '../../utils/constant';
export const increment = () => ({
  type: INCREMENT,
});
  
export const decrement = () => ({
  type: DECREMENT,
});
  
export const setUsers = (users) => ({
  type: SET_USERS,
  payload: users,
});
  
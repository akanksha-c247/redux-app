// import counterReducer from './Reducer';
import UserReducer from './Reducer/UserReducer';
import { configureStore } from '@reduxjs/toolkit';
// const store = createStore(counterReducer);
const store = configureStore({
    reducer:{
        users:UserReducer,
        
    }
})
export default store;

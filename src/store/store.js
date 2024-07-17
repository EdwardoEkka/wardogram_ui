import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authReducer'
import dark_Mode_Reducer from './reducers/mode_switch_Reducer';
import {thunk} from 'redux-thunk';

const store = configureStore({
  reducer: {
    auth: authReducer,
    mode: dark_Mode_Reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;

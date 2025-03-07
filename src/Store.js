import { thunk } from 'redux-thunk';
import rootReducer from './reducers/RootReducer';
import {configureStore} from "@reduxjs/toolkit";

const store = configureStore({ 
    reducer : rootReducer, 
    middleware : (getDefaultMiddleware) => getDefaultMiddleware(thunk)
});

export default store;
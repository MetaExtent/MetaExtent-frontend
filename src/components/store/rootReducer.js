import { combineReducers } from '@reduxjs/toolkit';
import { tokenSlice } from '../redux/slice';

export const rootReducer = combineReducers({
    token: tokenSlice.reducer
})
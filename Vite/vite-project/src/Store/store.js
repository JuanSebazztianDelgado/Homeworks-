import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './Slices/counterSlice.js';
import stackReducer from './Slices/stackSlice.js';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    stack: stackReducer,
  },
});
import { createSlice } from '@reduxjs/toolkit';

export const stackSlice = createSlice({
  name: 'stack',
  initialState: {
    stack: [],
  },
  reducers: {
    push: (state, action) => {
      state.stack.push(action.payload);
    },
    pop: (state) => {
      state.stack.pop();
    },
    clear: (state) => {
      state.stack = [];
    },
  },
});

export const { push, pop, clear } = stackSlice.actions;
export default stackSlice.reducer;
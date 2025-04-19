import { createSlice } from "@reduxjs/toolkit";

const firebaseSlice = createSlice({
  name: "firebase",
  initialState: {
    data: [],
    loading: false,
  },
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    setData: (state, action) => {
      state.data = action.payload;
      state.loading = false;
    },
  },
});

export const { setLoading, setData } = firebaseSlice.actions;
export default firebaseSlice.reducer;
import { createSlice } from '@reduxjs/toolkit';
import { db, ref, set, push, onValue } from '../../firebase/config';

const realtimeDatabaseSlice = createSlice({
  name: 'realtimeDatabase',
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    setData: (state, action) => {
      state.data = action.payload;
      state.loading = false;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setLoading, setData, setError } = realtimeDatabaseSlice.actions;

// Thunk para obtener datos de Firebase Realtime Database
export const fetchFirebaseData = () => (dispatch) => {
  dispatch(setLoading());
  const dbRef = ref(db, 'datos');
  onValue(
    dbRef,
    (snapshot) => {
      const data = snapshot.val();
      dispatch(setData(data ? Object.values(data) : []));
    },
    (error) => {
      dispatch(setError(error.message));
    }
  );
};

// Thunk para agregar datos a Firebase Realtime Database
export const addDataToFirebase = (newData) => (dispatch) => {
  const dbRef = ref(db, 'datos');
  const newEntry = push(dbRef);
  set(newEntry, newData).catch((error) => {
    dispatch(setError(error.message));
  });
};

export default realtimeDatabaseSlice.reducer;
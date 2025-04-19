import { createSlice } from '@reduxjs/toolkit';
import { db, ref, push, set, onValue } from '../../firebase/config';

const messagesSlice = createSlice({
  name: 'messages',
  initialState: {
    messages: [],
    loading: false,
    error: null,
  },
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    setMessages: (state, action) => {
      state.messages = action.payload;
      state.loading = false;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setLoading, setMessages, setError } = messagesSlice.actions;

// Thunk para obtener mensajes en tiempo real
export const fetchMessages = () => (dispatch) => {
  dispatch(setLoading());
  const messagesRef = ref(db, 'messages');
  onValue(
    messagesRef,
    (snapshot) => {
      const data = snapshot.val();
      dispatch(setMessages(data ? Object.values(data) : []));
    },
    (error) => {
      dispatch(setError(error.message));
    }
  );
};

// Thunk para enviar un mensaje
export const sendMessage = (message) => (dispatch) => {
  const messagesRef = ref(db, 'messages');
  const newMessageRef = push(messagesRef);
  set(newMessageRef, message).catch((error) => {
    dispatch(setError(error.message));
  });
};

export default messagesSlice.reducer;
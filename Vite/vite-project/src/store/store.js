import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import firebaseReducer from './store/slices/firebaseSlice';
import realtimeDatabaseReducer from './store/slices/realtimeDatabaseSlice';
import messagesReducer from './store/slices/messagesSlice'; // Importar el nuevo slice

const store = configureStore({
  reducer: {
    auth: authReducer,
    firebase: firebaseReducer,
    realtimeDatabase: realtimeDatabaseReducer,
    messages: messagesReducer, // Agregar el slice al store
  },
});

export default store;
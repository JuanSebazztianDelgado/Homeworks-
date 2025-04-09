import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { doSignInEmailAndPassword, doSignInWithGoogle, doSignOut } from '../../firebase/auth';

export const signInWithEmail = createAsyncThunk(
  'auth/signInWithEmail',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const userCredential = await doSignInEmailAndPassword(email, password);
      return userCredential.user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const signInWithGoogle = createAsyncThunk(
  'auth/signInWithGoogle',
  async (_, { rejectWithValue }) => {
    try {
      const userCredential = await doSignInWithGoogle();
      return userCredential.user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const signOut = createAsyncThunk('auth/signOut', async (_, { rejectWithValue }) => {
  try {
    await doSignOut();
    return null;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signInWithEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signInWithEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(signInWithEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(signInWithGoogle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signInWithGoogle.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(signInWithGoogle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(signOut.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export default authSlice.reducer;
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const login = createAsyncThunk(
  'auth/loginStatus',
  async (userData, thunkAPI) => {
    const { email, password } = userData;
    const response = await axios.post('/auth/login', { email, password });
    return response.data;
  },
);

export const register = createAsyncThunk(
  'auth/registerStatus',
  async (userData, thunkAPI) => {
    const { firstName, lastName, email, password, street, city, state, zip } =
      userData;

    const response = await axios.post('/auth/signup', {
      firstName,
      lastName,
      email,
      password,
      street,
      city,
      state,
      zip,
    });
    return response.data;
  },
);

export const me = createAsyncThunk('auth/meStatus', async (_, thunkAPI) => {
  const token = window.localStorage.getItem('token');
  if (token) {
    const { data } = await axios.get('/auth/me', {
      headers: {
        authorization: token,
      },
    });
    return data;
  }
});

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: {},
    loading: 'idle',
    currentRequestId: undefined,
    error: null,
  },
  reducers: {
    logout: (state) => {
      const navigate = useNavigate();
      window.localStorage.removeItem('token');
      state.auth = {};
      navigate('/');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(me.pending, (state, action) => {
        if (state.loading === 'idle') {
          state.loading = 'pending';
          state.currentRequestId = action.meta.requestId;
        }
      })
      .addCase(me.fulfilled, (state, action) => {
        const { requestId } = action.meta;
        if (
          state.loading === 'pending' &&
          state.currentRequestId === requestId
        ) {
          state.loading = 'idle';
          state.user = action.payload;
          state.currentRequestId = undefined;
        }
      })
      .addCase(me.rejected, (state, action) => {
        const { requestId } = action.meta;
        if (
          state.loading === 'pending' &&
          state.currentRequestId === requestId
        ) {
          state.loading = 'idle';
          state.error = action.error;
          state.currentRequestId = undefined;
        }
      })
      .addCase(login.pending, (state, action) => {
        if (state.loading === 'idle') {
          state.loading = 'pending';
          state.currentRequestId = action.meta.requestId;
        }
      })
      .addCase(login.fulfilled, (state, action) => {
        const { requestId } = action.meta;
        if (
          state.loading === 'pending' &&
          state.currentRequestId === requestId
        ) {
          state.loading = 'idle';
          state.user = action.payload;
          state.currentRequestId = undefined;
        }
      })
      .addCase(login.rejected, (state, action) => {
        const { requestId } = action.meta;
        if (
          state.loading === 'pending' &&
          state.currentRequestId === requestId
        ) {
          state.loading = 'idle';
          state.error = action.error;
          state.currentRequestId = undefined;
        }
      })
      .addCase(register.pending, (state, action) => {
        if (state.loading === 'idle') {
          state.loading = 'pending';
          state.currentRequestId = action.meta.requestId;
        }
      })
      .addCase(register.fulfilled, (state, action) => {
        const { requestId } = action.meta;
        if (
          state.loading === 'pending' &&
          state.currentRequestId === requestId
        ) {
          state.loading = 'idle';
          state.user = action.payload;
          state.currentRequestId = undefined;
        }
      })
      .addCase(register.rejected, (state, action) => {
        const { requestId } = action.meta;
        if (
          state.loading === 'pending' &&
          state.currentRequestId === requestId
        ) {
          state.loading = 'idle';
          state.error = action.error;
          state.currentRequestId = undefined;
        }
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;

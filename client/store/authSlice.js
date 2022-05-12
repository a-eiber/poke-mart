import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const login = createAsyncThunk(
  'auth/loginStatus',
  async (userData, thunkAPI) => {
    const { email, password } = userData;
    const response = await axios.post('/auth/login', { email, password });
    window.localStorage.setItem('token', response.data[1]);
    return response.data[0];
  },
);

export const register = createAsyncThunk(
  'auth/registerStatus',
  async (userData, thunkAPI) => {
    try {
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
      window.localStorage.setItem('token', response.data[1]);
      return response.data[0];
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
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
    error: null,
  },
  reducers: {
    logout: (state) => {
      window.localStorage.removeItem('token');
      state.auth.user = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(me.pending, (state, action) => {
        if (state.loading === 'idle') {
          state.loading = 'pending';
        }
      })
      .addCase(me.fulfilled, (state, action) => {
        if (state.loading === 'pending') {
          state.loading = 'idle';
          state.user = action.payload;
        }
      })
      .addCase(me.rejected, (state, action) => {
        if (state.loading === 'pending') {
          state.loading = 'idle';
          state.error = action.error;
        }
      })
      .addCase(login.pending, (state, action) => {
        if (state.loading === 'idle') {
          state.loading = 'pending';
        }
      })
      .addCase(login.fulfilled, (state, action) => {
        if (state.loading === 'pending') {
          state.loading = 'idle';
          state.user = action.payload;
        }
      })
      .addCase(login.rejected, (state, action) => {
        if (state.loading === 'pending') {
          state.loading = 'idle';
          state.error = action.error;
        }
      })
      .addCase(register.pending, (state, action) => {
        if (state.loading === 'idle') {
          state.loading = 'pending';
        }
      })
      .addCase(register.fulfilled, (state, action) => {
        if (state.loading === 'pending') {
          state.loading = 'idle';
          state.user = action.payload;
        }
      })
      .addCase(register.rejected, (state, action) => {
        if (state.loading === 'pending') {
          state.loading = 'idle';
          state.error = action.error;
        }
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;

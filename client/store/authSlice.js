import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Get user from localStorage
const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
};

// Login user
export const login = createAsyncThunk(
  'auth/login',
  async (userData, thunkAPI) => {
    try {
      const { email, password } = userData;
      const response = await axios.post('/auth/login', { email, password });
      const token = response.data.token;
      if (token) {
        const res = await axios.get('/auth/me', {
          headers: {
            authorization: token,
          },
        });
        localStorage.setItem('user', JSON.stringify(res.data));
        localStorage.setItem('token', token);
        return res.data;
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.toString());
    }
  },
);

// Register user
export const register = createAsyncThunk(
  'auth/register',
  async (userData, thunkAPI) => {
    try {
      const { username, password } = userData;
      const adminToken = localStorage.getItem('token');
      const response = await axios.post(
        '/auth/signup',
        { username, password },
        {
          headers: {
            authorization: adminToken,
          },
        },
      );
      const token = response.data.token;
      if (token) {
        const res = await axios.get('/auth/me', {
          headers: {
            authorization: token,
          },
        });
        return res.data;
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.toString());
    }
  },
);

export const logout = createAsyncThunk('auth/logout', () => {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;

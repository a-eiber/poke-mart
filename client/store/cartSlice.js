import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getCart = createAsyncThunk(
  'cart/getCartStatus',
  async (_, thunkAPI) => {
    const token = window.localStorage.getItem('token');
    if (token) {
      const response = await axios.get('/api/cart', {
        headers: {
          authorization: token,
        },
      });
      return response.data;
    }
  },
);

export const updateCart = createAsyncThunk(
  'cart/updateCartStatus',
  async ({ productId, updatedQuantity, unitPrice }, thunkAPI) => {
    const token = window.localStorage.getItem('token');
    if (token) {
      const response = await axios.post(
        '/api/cart/edit',
        {
          productId,
          updatedQuantity,
          unitPrice,
        },
        {
          headers: {
            authorization: token,
          },
        },
      );
      return response.data;
    }
  },
);

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: [],
    loading: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCart.pending, (state) => {
        if (state.loading === 'idle') {
          state.loading = 'pending';
        }
      })
      .addCase(getCart.fulfilled, (state, action) => {
        if (state.loading === 'pending') {
          state.loading = 'idle';
          state.cartItems = action.payload;
        }
      })
      .addCase(getCart.rejected, (state, action) => {
        if (state.loading === 'pending') {
          state.loading = 'idle';
          state.error = action.error;
        }
      })
      .addCase(updateCart.pending, (state) => {
        if (state.loading === 'idle') {
          state.loading = 'pending';
        }
      })
      .addCase(updateCart.fulfilled, (state, action) => {
        if (state.loading === 'pending') {
          state.loading = 'idle';
          state.cartItems = action.payload;
        }
      })
      .addCase(updateCart.rejected, (state, action) => {
        if (state.loading === 'pending') {
          state.loading = 'idle';
          state.error = action.error;
        }
      });
  },
});

export default cartSlice.reducer;

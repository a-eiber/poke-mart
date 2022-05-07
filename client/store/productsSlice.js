import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getProducts = createAsyncThunk(
  'products/getProductsStatus',
  async (_, { getState, requestId }) => {
    const { currentRequestId, loading } = getState().products;
    if (loading !== 'pending' || requestId !== currentRequestId) {
      return;
    }
    const response = await axios.get('/api/products');
    return response.data;
  },
);

export const productSlice = createSlice({
  name: 'products',
  initialState: {
    entities: [],
    loading: 'idle',
    currentRequestId: undefined,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state, action) => {
        if (state.loading === 'idle') {
          state.loading = 'pending';
          state.currentRequestId = action.meta.requestId;
        }
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        const { requestId } = action.meta;
        if (
          state.loading === 'pending' &&
          state.currentRequestId === requestId
        ) {
          state.loading = 'idle';
          state.entities = action.payload;
          state.currentRequestId = undefined;
        }
      })
      .addCase(getProducts.rejected, (state, action) => {
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

export default productSlice.reducer;

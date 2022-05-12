import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getProducts = createAsyncThunk(
  'products/getProductsStatus',
  async (_, thunkAPI) => {
    const response = await axios.get('/api/products');
    return response.data;
  },
);

// Add single product thunk
export const getSingleProduct = createAsyncThunk(
  'products/getSingleProductStatus',
  async (id, thunkAPI) => {
    const response = await axios.get(`/api/products/${id}`);
    return response.data;
  },
);

export const productSlice = createSlice({
  name: 'products',
  initialState: {
    entities: [],
    singleProduct: {},
    loading: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        if (state.loading === 'idle') {
          state.loading = 'pending';
        }
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        if (state.loading === 'pending') {
          state.loading = 'idle';
          state.entities = action.payload;
        }
      })
      .addCase(getProducts.rejected, (state, action) => {
        if (state.loading === 'pending') {
          state.loading = 'idle';
          state.error = action.error;
        }
      })
      .addCase(getSingleProduct.pending, (state) => {
        if (state.loading === 'idle') {
          state.loading = 'pending';
        }
      })
      .addCase(getSingleProduct.fulfilled, (state, action) => {
        if (state.loading === 'pending') {
          state.loading = 'idle';
          state.singleProduct = action.payload;
        }
      })
      .addCase(getSingleProduct.rejected, (state, action) => {
        if (state.loading === 'pending') {
          state.loading = 'idle';
          state.error = action.error;
        }
      });
  },
});

export default productSlice.reducer;

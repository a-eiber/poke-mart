import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getProducts = createAsyncThunk(
  'products/getProductsStatus',
  async (_, thunkAPI) => {
    const response = await axios.get('/api/products');
    return response.data;
  },
);

export const getSingleProduct = createAsyncThunk(
  'products/getSingleProductStatus',
  async (id, thunkAPI) => {
    const response = await axios.get(`/api/products/${id}`);
    return response.data;
  },
);

export const createProduct = createAsyncThunk(
  'products/createProductStatus',
  async (productData, thunkAPI) => {
    const token = window.localStorage.getItem('token');
    const { name, price, description, imageUrl, category, quantity } =
      productData;
    const response = await axios.post(
      '/api/products',
      {
        name,
        price,
        description,
        imageUrl,
        category,
        quantity,
      },
      {
        headers: {
          authorization: token,
        },
      },
    );
    return response.data;
  },
);

export const updateProduct = createAsyncThunk(
  'products/updateProductStatus',
  async (productData, thunkAPI) => {
    const token = window.localStorage.getItem('token');
    const { id, name, price, description, imageUrl, category, quantity } =
      productData;
    const response = await axios.put(
      `/api/products/${id}`,
      {
        name,
        price,
        description,
        imageUrl,
        category,
        quantity,
      },
      {
        headers: {
          authorization: token,
        },
      },
    );
    return response.data;
  },
);

export const deleteProduct = createAsyncThunk(
  'products/deleteProductStatus',
  async ({ id }, thunkAPI) => {
    console.log(id);
    const token = window.localStorage.getItem('token');
    const response = await axios.delete(`/api/products/${id}`, {
      headers: {
        authorization: token,
      },
    });
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
      })
      .addCase(createProduct.pending, (state) => {
        if (state.loading === 'idle') {
          state.loading = 'pending';
        }
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        if (state.loading === 'pending') {
          state.loading = 'idle';
          state.singleProduct = action.payload;
        }
      })
      .addCase(createProduct.rejected, (state, action) => {
        if (state.loading === 'pending') {
          state.loading = 'idle';
          state.error = action.error;
        }
      })
      .addCase(updateProduct.pending, (state) => {
        if (state.loading === 'idle') {
          state.loading = 'pending';
        }
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        if (state.loading === 'pending') {
          state.loading = 'idle';
          state.singleProduct = action.payload;
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        if (state.loading === 'pending') {
          state.loading = 'idle';
          state.error = action.error;
        }
      })
      .addCase(deleteProduct.pending, (state) => {
        if (state.loading === 'idle') {
          state.loading = 'pending';
        }
      })
      .addCase(deleteProduct.fulfilled, (state) => {
        if (state.loading === 'pending') {
          state.loading = 'idle';
          state.singleProduct = {};
        }
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        if (state.loading === 'pending') {
          state.loading = 'idle';
          state.error = action.error;
        }
      });
  },
});

export default productSlice.reducer;

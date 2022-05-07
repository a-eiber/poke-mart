import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../store/productsSlice';

export default configureStore({
  reducer: {
    products: productsReducer,
  },
});

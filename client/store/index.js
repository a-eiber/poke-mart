import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../store/productsSlice';
import authReducer from '../store/authSlice';

export default configureStore({
  reducer: {
    products: productsReducer,
    auth: authReducer,
  },
});

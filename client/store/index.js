import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../store/productsSlice';
import authReducer from '../store/authSlice';
import cartReducer from '../store/cartSlice';

export default configureStore({
  reducer: {
    products: productsReducer,
    auth: authReducer,
    cart: cartReducer,
  },
});

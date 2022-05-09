import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { me } from './store/authSlice';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Login from './components/Login';
import CartPage from './components/CartPage';
import Confirmation from './components/Confirmation';
import Signup from './components/Signup';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(me());
  });

  return (
    <div>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/confirmation" element={<Confirmation />} />
      </Routes>
      <Footer />
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default App;

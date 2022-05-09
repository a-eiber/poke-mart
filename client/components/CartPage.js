import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Cart from './Cart';
import GuestCart from './GuestCart';

const CartPage = () => {
  const { user } = useSelector((state) => {
    return state.auth;
  });

  return (
    <div>
      {user && <Cart />} {!user && <GuestCart />}
    </div>
  );
};

export default CartPage;

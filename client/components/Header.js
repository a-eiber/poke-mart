import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header = () => {
  const { auth } = useSelector((state) => state);
  return (
    <nav>
      <Link to="/" style={{ textDecoration: 'none', color: 'black' }}>
        <img id="logo" src="../images/pokemart.png" />
      </Link>
      <Outlet />
    </nav>
  );
};

export default Header;

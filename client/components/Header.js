import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { logout } from '../store/authSlice';

const Header = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <Navbar bg="light">
      <Link to="/" style={{ textDecoration: 'none', color: 'black' }}>
        <img id="logo" src="../images/pokemart.png" />
      </Link>
      <Container className="navbar-right">
        {user ? (
          <Nav>
            <Navbar.Text style={{ fontSize: '1.5rem' }}>
              Welcome {user.firstName}!
            </Navbar.Text>
            <Link
              to="/"
              onClick={() => dispatch(logout())}
              className="navbar-links">
              Sign Out
            </Link>
          </Nav>
        ) : (
          <Nav>
            <Link to="/login" className="navbar-links">
              Login
            </Link>
            <Link to="/signup" className="navbar-links">
              Sign Up
            </Link>
          </Nav>
        )}
        <Nav>
          <Link to="/cart" className="navbar-links">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1.5rem"
              height="1.5rem"
              fill="currentColor"
              className="bi bi-cart-fill"
              viewBox="0 0 16 16">
              <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
            </svg>
            Cart
          </Link>
        </Nav>
      </Container>
      <Outlet />
    </Navbar>
  );
};

export default Header;

import React from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';

const ErrorPage = () => {
  return (
    <Container className="d-flex flex-column flex-wrap justify-content-center align-items-center">
      <h1>Page Not Found</h1>
      <img
        width="500"
        height="500"
        src="https://cdn.vox-cdn.com/thumbor/He_VVk5IhW5UI0w8RciuhRgIfjc=/0x15:500x348/1400x1400/filters:focal(0x15:500x348):format(gif)/cdn.vox-cdn.com/uploads/chorus_image/image/36992002/tumblr_lmwsamrrxT1qagx30.0.0.gif"
        className="mb-5"
      />
      <Link to="/" className="mb-3">
        <h3>Click here to return to the Home Page</h3>
      </Link>
    </Container>
  );
};

export default ErrorPage;

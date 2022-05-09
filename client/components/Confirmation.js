import React from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';

const Confirmation = () => {
  return (
    <Container className="text-center">
      <div>
        <h1>CONFIRMATION</h1>
        <h2>PURCHASE SUCCESSFUL!</h2>
        <img src="https://perdidointranslation.files.wordpress.com/2016/07/pokemon-happy.gif" />
        <br />
        <Link to="/">
          <h3 className="my-5">Back to Home Page</h3>
        </Link>
      </div>
    </Container>
  );
};

export default Confirmation;

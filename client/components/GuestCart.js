import React, { useState } from 'react';
import { Col, Container, Row, Button } from 'react-bootstrap';
import CheckoutForm from './CheckoutForm';

const GuestCart = () => {
  const [toggle, setToggle] = useState(false);
  const cart = JSON.parse(window.localStorage.getItem('guestCart'));

  const minus = (item) => {
    const itemAlreadyAdded = cart.find((cartItem) => cartItem.id === item.id);
    const updatedCart = cart.filter((cartItem) => cartItem.id !== item.id);
    itemAlreadyAdded.quantity = itemAlreadyAdded.quantity - 1;
    if (itemAlreadyAdded.quantity > 0) {
      updatedCart.push(itemAlreadyAdded);
    }
    window.localStorage.setItem('guestCart', JSON.stringify(updatedCart));
    if (!updatedCart.length) {
      window.localStorage.removeItem('guestCart');
    }
    setToggle(!toggle);
  };

  const add = (item) => {
    const itemAlreadyAdded = cart.find((cartItem) => cartItem.id === item.id);
    const updatedCart = cart.filter((cartItem) => cartItem.id !== item.id);
    itemAlreadyAdded.quantity = itemAlreadyAdded.quantity + 1;
    updatedCart.push(itemAlreadyAdded);
    window.localStorage.setItem('guestCart', JSON.stringify(updatedCart));
    setToggle(!toggle);
  };

  const deleteAll = (item) => {
    const updatedCart = cart.filter((cartItem) => cartItem.id !== item.id);
    window.localStorage.setItem('guestCart', JSON.stringify(updatedCart));
    if (!updatedCart.length) {
      window.localStorage.removeItem('guestCart');
    }
    setToggle(!toggle);
  };

  return (
    <Container>
      <h1>Checkout</h1>
      <Row>
        <Col xs={3}>Items</Col>
        <Col xs={2}>Unit Price</Col>
        <Col xs={1} />
        <Col xs={3}>Quantity</Col>
        <Col xs={1}>Price</Col>
      </Row>
      <hr />
      {cart && cart.length ? (
        cart
          .sort((a, b) => a.id - b.id)
          .map((item) => {
            return (
              <Row key={item.id} className="d-flex align-items-center mb-3">
                <Col xs={3}>{item.name}</Col>
                <Col xs={2}>${(item.price / 100).toFixed(2)}</Col>
                <Col xs={1}>
                  <Button variant="outline-primary" onClick={() => minus(item)}>
                    -
                  </Button>
                </Col>
                <Col xs={1}>{item.quantity}</Col>
                <Col xs={1}>
                  <Button variant="outline-primary" onClick={() => add(item)}>
                    +
                  </Button>
                </Col>
                <Col xs={1}>
                  <Button
                    variant="outline-primary"
                    onClick={() => deleteAll(item)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-trash"
                      viewBox="0 0 16 16">
                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                      <path
                        filule="evenodd"
                        d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                      />
                    </svg>
                  </Button>
                </Col>
                <Col xs={1}>
                  ${((item.price * item.quantity) / 100).toFixed(2)}
                </Col>
              </Row>
            );
          })
      ) : (
        <h3 className="text-center">There aren't any items in your cart</h3>
      )}
      <hr />
      {cart && cart.length > 0 && (
        <div>
          <Row>
            <Col xs={9}>Subtotal:</Col>
            <Col xs={1}>
              $
              {cart &&
                cart.length &&
                cart
                  .reduce((previousValue, currentValue) => {
                    return (
                      previousValue +
                      (currentValue.price * currentValue.quantity) / 100
                    );
                  }, 0)
                  .toFixed(2)}
            </Col>
          </Row>
          <hr />
          <CheckoutForm />
        </div>
      )}
    </Container>
  );
};

export default GuestCart;

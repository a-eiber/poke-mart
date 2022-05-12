import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { completePurchase } from '../store/cartSlice';

const CheckoutForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);

  const [formData, setFormData] = useState({
    ccNumber: '',
    expDate: '',
    pin: '',
    street: '',
    city: '',
    state: '',
    zip: '',
  });

  const { ccNumber, expDate, pin, street, city, state, zip } = formData;

  useEffect(() => {
    if (user && user.id) {
      setFormData({
        ccNumber: '',
        expDate: '',
        pin: '',
        street: user.street,
        city: user.city,
        state: user.state,
        zip: user.zip,
      });
    }
  }, [user]);

  const onChange = (e) => {
    e.persist();
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(completePurchase());
    navigate('/confirmation');
  };

  return (
    <Form onSubmit={onSubmit}>
      <Row>
        <Col>
          <Form.Group className="mb-2 w-100">
            <Form.Label>Credit Card Number</Form.Label>
            <Form.Control
              required
              name="ccNumber"
              value={ccNumber}
              onChange={onChange}
              placeholder="Credit Card Number"
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-2 w-100">
            <Form.Label>Expiration Date</Form.Label>
            <Form.Control
              required
              name="expDate"
              value={expDate}
              onChange={onChange}
              type="date"
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-2 w-100">
            <Form.Label>Pin Code</Form.Label>
            <Form.Control
              required
              type="number"
              min="0000"
              max="9999"
              name="pin"
              value={pin}
              onChange={onChange}
              placeholder="Pin Code"
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Group className="mb-2 w-100">
            <Form.Label>Street Address</Form.Label>
            <Form.Control
              required
              name="street"
              value={street}
              onChange={onChange}
              placeholder="Street Address"
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-2 w-100">
            <Form.Label>City</Form.Label>
            <Form.Control
              required
              name="city"
              value={city}
              onChange={onChange}
              placeholder="City"
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Group className="mb-2 w-100">
            <Form.Label>State</Form.Label>
            <Form.Control
              required
              name="state"
              value={state}
              onChange={onChange}
              placeholder="State"
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-2 w-100">
            <Form.Label>Zip Code</Form.Label>
            <Form.Control
              required
              name="zip"
              value={zip}
              onChange={onChange}
              placeholder="Zip Code"
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Button type="submit">Complete Purchase</Button>
      </Row>
    </Form>
  );
};

export default CheckoutForm;

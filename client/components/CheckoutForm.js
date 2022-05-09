import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { completePurchase } from '../store/cartSlice';

const CheckoutForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
            <Form.Control required placeholder="Credit Card Number" />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-2 w-100">
            <Form.Label>Expiration Date</Form.Label>
            <Form.Control required type="date" />
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
              placeholder="Code"
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Group className="mb-2 w-100">
            <Form.Label>Street Address</Form.Label>
            <Form.Control required placeholder="Street Address" />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-2 w-100">
            <Form.Label>City</Form.Label>
            <Form.Control required placeholder="City" />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Group className="mb-2 w-100">
            <Form.Label>State</Form.Label>
            <Form.Control required placeholder="State" />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-2 w-100">
            <Form.Label>Zip Code</Form.Label>
            <Form.Control required placeholder="Zip Code" />
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

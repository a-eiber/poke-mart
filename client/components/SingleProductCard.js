import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';
import { injectStyle } from 'react-toastify/dist/inject-style';

const SingleProductCard = ({ product }) => {
  const { imageUrl, name, price, category } = product;

  const added = () => {
    injectStyle();
    toast.success('Added to Cart!');
  };

  return (
    <Card className="singleProductCard">
      <Card.Img
        variant="top"
        src={imageUrl}
        className="singleProductCardImage"
      />
      <Card.Body style={{ textAlign: 'center' }}>
        <Card.Title>{name}</Card.Title>
        <Card.Subtitle>Category: {category}</Card.Subtitle>
        <Card.Text>{`Price: ${(price / 100).toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD',
        })}`}</Card.Text>
        <Button variant="primary" onClick={added}>
          Add to Cart
        </Button>
      </Card.Body>
    </Card>
  );
};

export default SingleProductCard;

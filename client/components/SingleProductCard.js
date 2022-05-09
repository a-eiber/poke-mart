import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';
import { injectStyle } from 'react-toastify/dist/inject-style';
import { useDispatch } from 'react-redux';
import { updateCart } from '../store/cartSlice';

const SingleProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const { id, imageUrl, name, price, category } = product;

  const added = () => {
    const token = window.localStorage.getItem('token');
    const cart = window.localStorage.getItem('guestCart');

    if (token) {
      dispatch(
        updateCart({
          productId: id,
          updatedQuantity: 1,
          unitPrice: price,
        }),
      );
    }

    if (!token && !cart) {
      const guestCart = [{ id, name, price, quantity: 1 }];
      window.localStorage.setItem('guestCart', JSON.stringify(guestCart));
    }

    if (!token && cart) {
      const oldCart = JSON.parse(cart);
      const itemAlreadyAdded = oldCart.find((item) => item.id === id);

      if (itemAlreadyAdded) {
        const updatedCart = oldCart.filter((item) => item.id !== id);
        itemAlreadyAdded.quantity = itemAlreadyAdded.quantity + 1;
        updatedCart.push(itemAlreadyAdded);
        window.localStorage.setItem('guestCart', JSON.stringify(updatedCart));
      } else {
        oldCart.push({ id, name, price, quantity: 1 });
        window.localStorage.setItem('guestCart', JSON.stringify(oldCart));
      }
    }

    injectStyle();
    toast.success('Added to Cart!');
  };

  return (
    <Card className="singleProductCard d-flex justify-self-center">
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

import React, { useEffect } from 'react';
import {
  Spinner,
  Figure,
  Button,
  Container,
  Stack,
  Col,
  Row,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getSingleProduct } from '../store/productsSlice';
import { updateCart } from '../store/cartSlice';
import { toast } from 'react-toastify';
import { injectStyle } from 'react-toastify/dist/inject-style';
import SingleProductCard from './SingleProductCard';

const SingleProductPage = () => {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.products.singleProduct.product);
  const similarProducts = useSelector(
    (state) => state.products.singleProduct.similar,
  );
  let { productId } = useParams();

  useEffect(() => {
    dispatch(getSingleProduct(productId));
  }, []);

  if (product && similarProducts) {
    const { id, imageUrl, name, price, category, description } = product;

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
      <Container
        fluid
        className="d-flex flex-column flex-wrap justify-content-center align-items-center">
        <h1>{name}</h1>
        <h5 className="mb-3">Category: {category}</h5>
        <Figure className="d-flex flex-column flex-wrap justify-content-center align-items-center">
          <Figure.Image width={150} height={150} alt={name} src={imageUrl} />
          <Figure.Caption>{description}</Figure.Caption>
        </Figure>
        <h5>${price / 100}</h5>
        <Button
          className="mb-5"
          variant="primary"
          onClick={() => added(product)}>
          Add To Cart
        </Button>
        <h3>Other Great Products</h3>
        <div className="d-flex flex-wrap justify-content-center align-items-center">
          {similarProducts.map((product) => {
            if (id !== product.id) {
              return (
                <div key={product.id}>
                  <SingleProductCard product={product} />
                </div>
              );
            }
          })}
        </div>
      </Container>
    );
  }

  return <div>SingleProductPage</div>;
};

export default SingleProductPage;

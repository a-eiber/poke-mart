import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Container from 'react-bootstrap/Container';
import { getProducts } from '../store/productsSlice';
import SingleProductCard from './SingleProductCard';

const Home = () => {
  const products = useSelector((state) => state.products.entities);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [user]);

  return (
    <Container fluid className="d-flex flex-wrap justify-content-center">
      {products.map((product) => (
        <SingleProductCard key={product.id} product={product} />
      ))}
    </Container>
  );
};

export default Home;

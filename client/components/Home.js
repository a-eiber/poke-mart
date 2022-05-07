import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { getProducts } from '../store/productsSlice';
import SingleProductCard from './SingleProductCard';

const Home = () => {
  const products = useSelector((state) => state.products.entities);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  return (
    <Container fluid>
      <Row xs={1} sm={1} md={2} lg={3} xl={4}>
        {products.map((product) => (
          <Col key={product.id}>
            <SingleProductCard product={product} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Home;

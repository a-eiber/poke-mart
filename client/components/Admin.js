import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  createProduct,
  getProducts,
  deleteProduct,
  updateProduct,
} from '../store/productsSlice';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Admin = () => {
  const user = useSelector((state) => state.auth.user);
  const products = useSelector((state) => state.products.entities);
  const singleProduct = useSelector((state) => state.products.singleProduct);

  const [formData, setFormData] = useState({
    name: '',
    price: 0,
    description: '',
    imageUrl: '',
    quantity: 0,
    category: '',
  });

  const { name, price, description, imageUrl, quantity, category } = formData;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [singleProduct]);

  const deleteProductFunc = async (id) => {
    await dispatch(
      deleteProduct({
        id,
      }),
    );
  };

  const onChange = (e) => {
    e.persist();
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const productData = {
      name,
      price,
      description,
      imageUrl,
      quantity,
      category,
    };

    dispatch(createProduct(productData));
    setFormData({
      name: '',
      price: 0,
      description: '',
      imageUrl: '',
      quantity: 0,
      category: '',
    });
  };

  if (user.isAdmin === false) {
    return <h1 className="text-center">User Not Authorized!</h1>;
  }

  return (
    <Container className="d-flex flex-column flex-wrap justify-content-center align-items-center">
      <h1>Admin Page</h1>
      <h3>Create new product</h3>
      <Form onSubmit={onSubmit}>
        <Row>
          <Col>
            <Form.Group className="mb-2 w-100">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                required
                placeholder="Product name"
                name="name"
                value={name}
                onChange={onChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-2 w-100">
              <Form.Label>Price</Form.Label>
              <Form.Control
                required
                placeholder={999}
                type="number"
                name="price"
                value={price}
                onChange={onChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-2 w-100">
              <Form.Label>Description</Form.Label>
              <Form.Control
                required
                name="description"
                value={description}
                onChange={onChange}
                placeholder="Description"
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group className="mb-2 w-100">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                placeholder="Leave Blank For Default"
                name="imageUrl"
                value={imageUrl}
                onChange={onChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-2 w-100">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                required
                placeholder={999}
                type="number"
                name="quantity"
                value={quantity}
                onChange={onChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-2 w-100">
              <Form.Label>Category</Form.Label>
              <Form.Control
                required
                name="category"
                value={category}
                onChange={onChange}
                placeholder="Category"
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Button type="submit">Create Product</Button>
        </Row>
      </Form>
      <hr />
      <div>
        <Row>
          <Col xs={3}>Name</Col>
          <Col xs={2}>Price</Col>
          <Col>Description</Col>
          <Col xs={1}>Quantity</Col>
          <Col xs={1}>Delete Product</Col>
        </Row>
        <hr />
        {products && products.length ? (
          products.map((item) => {
            return (
              <Row key={item.id}>
                <Col xs={3}>{item && item.name ? item.name : 'no name'}</Col>
                <Col xs={2}>${(item.price / 100).toFixed(2)}</Col>
                <Col>{item.description}</Col>
                <Col xs={1}>{item.quantity}</Col>

                <Col xs={1} className="d-flex">
                  <Button
                    variant="outline-primary"
                    onClick={() => deleteProductFunc(item.id)}>
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
              </Row>
            );
          })
        ) : (
          <h3>There aren't any products</h3>
        )}
      </div>
    </Container>
  );
};

export default Admin;

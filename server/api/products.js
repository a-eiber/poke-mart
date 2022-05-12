const router = require('express').Router();
const jwt = require('jsonwebtoken');
const {
  models: { Product, User },
} = require('../db');
const { requireToken, isAdmin } = require('./gatekeepingMiddleware');
module.exports = router;

// URL Path: /api/products

// Description: Create a product
// Route: POST api/products
// Access: Private (admin only)
router.post('/', requireToken, isAdmin, async (req, res, next) => {
  try {
    const { name, price, description, imageUrl, category, quantity } = req.body;
    const product = await Product.create({
      name,
      price,
      description,
      imageUrl,
      category,
      quantity,
    });
    res.status(201).send(product);
  } catch (err) {
    next(err);
  }
});

// Description: Get all products
// Route: GET api/products
// Access: Public
router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.status(200).json(products);
  } catch (err) {
    next(err);
  }
});

// Description: Get single product by id
// Route: GET api/products/:id
// Access: Public
router.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    const similar = await Product.findAll({
      where: { category: product.category },
    });
    res.status(200).json({ product, similar });
  } catch (err) {
    next(err);
  }
});

// Description: Update a product
// Route: PUT api/products/:id
// Access: Private (admin only)
router.put('/:id', requireToken, isAdmin, async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      res.status(400).send('Product Not Found');
    }
    const { name, price, description, imageUrl, quantity, category } = req.body;
    const updatedProduct = await product.update({
      name,
      price,
      description,
      imageUrl,
      quantity,
      category,
    });
    res.status(200).send(updatedProduct);
  } catch (err) {
    next(err);
  }
});

// Description: Delete a product
// Route: DELETE api/products/:id
// Access: Private (admin only)
router.delete('/:id', requireToken, isAdmin, async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    await product.destroy();
    res.status(200).send(product);
  } catch (err) {
    next(err);
  }
});

module.exports = router;

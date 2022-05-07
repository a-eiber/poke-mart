const router = require('express').Router();
const jwt = require('jsonwebtoken');
const {
  models: { User, Order, Product, OrderProducts },
} = require('../db');
const { requireToken } = require('./gatekeepingMiddleware');
module.exports = router;

// URL Path: /api/cart

// Description: Get all items in a cart
// Route: POST /api/cart
// Access: Private (user only)
router.get('/', requireToken, async (req, res, next) => {
  try {
    const { id } = await Order.findOne({
      where: { userId: req.user.id, isComplete: false },
    });
    if (!id) {
      return res.send({});
    }

    const cart = await OrderProducts.findAll({
      where: { orderId: id },
      include: { model: Product },
    });
    if (!cart) {
      return res.send('No cart items');
    }
    res.json(cart);
  } catch (error) {
    next(error);
  }
});

// Description: Add/delete item to cart
// Route: POST /api/cart/edit
// Access: Private (user only)
router.post('/edit', requireToken, async (req, res, next) => {
  try {
    const { productId, updatedQuantity, unitPrice } = req.body;
    const [order, created] = await Order.findOrCreate({
      where: { userId: req.user.id, isComplete: false },
      defaults: {
        userId: req.user.id,
        isComplete: false,
      },
    });

    let updatedTotalPrice;
    if (updatedQuantity && unitPrice) {
      updatedTotalPrice = updatedQuantity * unitPrice;
    }

    const cartItem = await OrderProducts.findOne({
      where: { orderId: order.id, productId: Number(productId) },
      include: [
        {
          model: Product,
        },
      ],
    });

    if (cartItem) {
      const { quantity, unitPrice, totalPrice } = cartItem;
      const existingQuantity = quantity;
      const existingTotalPrice = totalPrice;

      if (existingQuantity + Number(updatedQuantity) < 1) {
        await OrderProducts.destroy({
          where: { orderId: order.id, productId },
        });
        return res.send('Item deleted');
      }

      const updatedCartItem = await OrderProducts.update(
        {
          quantity: existingQuantity + Number(updatedQuantity),
          unitPrice: Number(unitPrice),
          totalPrice: existingTotalPrice + updatedTotalPrice,
        },
        {
          where: {
            orderId: order.id,
            productId,
          },
          include: [
            {
              model: Product,
            },
          ],
        },
      );
      return res.json(updatedCartItem);
    }

    if (!cartItem && updatedQuantity > 0) {
      const order = await OrderProducts.create({
        orderId: order.id,
        productId: Number(productId),
        quantity: Number(updatedQuantity),
        unitPrice: Number(unitPrice),
        totalPrice: updatedTotalPrice,
      });
      res.json(order);
    } else {
      return res.send('Item not found');
    }
  } catch (err) {
    next(error);
  }
});

// Description: Complete purchase
// Route: PUT /api/cart/complete
// Access: Private (user only)
router.put('/complete', requireToken, async (req, res, next) => {
  try {
    let order = await Order.findOne({
      where: { userId: req.user.id, isComplete: false },
      attributes: ['id'],
    });
    const completedOrder = await order.update({
      isComplete: true,
    });
    return res.json(completedOrder);
  } catch (error) {
    console.log(error);
  }
});

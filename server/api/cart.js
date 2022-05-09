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
    const order = await Order.findOne({
      where: { userId: req.user.id, isComplete: false },
    });
    if (!order) {
      return res.send({});
    }

    const cart = await OrderProducts.findAll({
      where: { orderId: order.id },
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
        userId: Number(req.user.id),
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
        const newCart = await OrderProducts.findAll({
          where: { orderId: order.id },
          include: { model: Product },
        });
        if (!newCart) {
          return res.send([]);
        }
        return res.json(newCart);
      }

      await OrderProducts.update(
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

      const newCart = await OrderProducts.findAll({
        where: { orderId: order.id },
        include: { model: Product },
      });
      if (!newCart) {
        return res.send('No cart items');
      }
      return res.json(newCart);
    }

    if (!cartItem && updatedQuantity > 0) {
      const createdOrder = await OrderProducts.create({
        orderId: order.id,
        productId: Number(productId),
        quantity: Number(updatedQuantity),
        unitPrice: Number(unitPrice),
        totalPrice: updatedTotalPrice,
      });
      res.json(createdOrder);
    } else {
      return res.send('Item not found');
    }
  } catch (error) {
    next(error);
  }
});

// Description: Complete purchase
// Route: POST /api/cart/complete
// Access: Private (user only)
router.post('/complete', requireToken, async (req, res, next) => {
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
    next(error);
  }
});

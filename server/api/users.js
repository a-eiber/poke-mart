const router = require('express').Router();
const {
  models: { User },
} = require('../db');
const { requireToken, isAdmin } = require('./gatekeepingMiddleware');
module.exports = router;

// URL Path: /api/users

// Description: Find all users
// Route: GET api/users
// Access: Private (admin only)
router.get('/', requireToken, isAdmin, async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'email'],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

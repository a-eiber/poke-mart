const router = require('express').Router();
const {
  models: { User },
} = require('../db');
module.exports = router;

// URL Path: /auth

// Description: Login
// Route: POST auth/login
// Access: Public
router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const token = await User.authenticate({ email, password });

    window.localStorage.setItem('token', token);

    res.send(await User.findByToken(token));
  } catch (err) {
    next(err);
  }
});

// Description: Signup
// Route: POST auth/signup
// Access: Public
router.post('/signup', async (req, res, next) => {
  try {
    const { firstName, lastName, email, password, street, city, state, zip } =
      req.body;

    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
      street,
      city,
      state,
      zip,
    });
    const token = await user.generateToken();

    window.localStorage.setItem('token', token);
    
    res.send(await User.findByToken(token));
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists');
    } else {
      next(err);
    }
  }
});

// Description: Get user information by token
// Route: GET auth/me
// Access: Private (token required in headers)
router.get('/me', async (req, res, next) => {
  try {
    res.send(await User.findByToken(req.headers.authorization));
  } catch (ex) {
    next(ex);
  }
});

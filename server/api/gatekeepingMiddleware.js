const {
  models: { User },
} = require('../db');

// store all of our functions that will act as middleware between our request and our response

const requireToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const user = await User.findByToken(token);
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

const isAdmin = (req, res, next) => {
  if (!req.user.isAdmin) {
    return res.status(403).send('You shall not pass!');
  } else {
    // if my user IS an admin, pass them forward!
    next();
  }
};

module.exports = {
  requireToken,
  isAdmin,
};

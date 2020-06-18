const bcrypt = require('bcryptjs');
const config = require('config');
const express = require('express');
const {check, validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');

const auth = require('../middlewares/auth');

const User = require('../models/User');

const router = express.Router();

router.get('/', auth, async (request, response) => {
  try {
    const user = await User.findById(request.user.id).select('-password');

    response.json(user);
  } catch (error) {
    console.error(error.message);

    response.status(500).json({message: '500 Internal Server Error'});
  }
});

router.post(
  '/',
  [
    check('emailAddress', 'Please enter a valid email address.').isEmail(),
    check('password', 'Please enter your password.').notEmpty()
  ],
  async (request, response) => {
    const errors = validationResult(request);

    if (!errors.isEmpty())
      return response.status(400).json({errors: errors.array()});

    const {emailAddress, password} = request.body;

    try {
      let user = await User.findOne({emailAddress});

      if (!user)
        return response
          .status(400)
          .json({message: 'The email address or password is incorrect.'});

      if (!(await bcrypt.compare(password, user.password)))
        return response
          .status(400)
          .json({message: 'The email address or password is incorrect.'});

      jwt.sign(
        {user: {id: user.id}},
        config.get('privateKey'),
        {
          expiresIn: 3600
        },
        (error, token) => {
          if (error) throw error;

          response.json({token});
        }
      );
    } catch (error) {
      console.error(error.message);

      response.status(500).json({message: '500 Internal Server Error'});
    }
  }
);

module.exports = router;

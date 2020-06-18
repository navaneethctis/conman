const bcrypt = require('bcryptjs');
const config = require('config');
const express = require('express');
const {check, validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

const router = express.Router();

router.post(
  '/',
  [
    check('name', 'Please enter your name.').notEmpty(),
    check('emailAddress', 'Please enter a valid email address.').isEmail(),
    check(
      'password',
      'Please enter a password with 8 or more characters.'
    ).isLength({min: 8})
  ],
  async (request, response) => {
    const errors = validationResult(request);

    if (!errors.isEmpty())
      return response.status(400).json({errors: errors.array()});

    const {name, emailAddress, password} = request.body;

    try {
      let user = await User.findOne({emailAddress});

      if (user)
        return response.status(400).json({
          message: 'An account with that email address already exists.'
        });

      user = new User({name, emailAddress, password});

      user.password = await bcrypt.hash(password, await bcrypt.genSalt());

      await user.save();

      jwt.sign(
        {user: {id: user.id}},
        config.get('privateKey'),
        {expiresIn: 3600},
        (error, token) => {
          if (error) throw error;

          response.status(201).json({token});
        }
      );
    } catch (error) {
      console.error(error.message);

      response.status(500).json({message: '500 Internal Server Error'});
    }
  }
);

module.exports = router;

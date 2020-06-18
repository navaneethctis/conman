const mongoose = require('mongoose');

const User = mongoose.model(
  'User',
  mongoose.Schema({
    name: {
      required: true,
      type: String
    },
    emailAddress: {
      required: true,
      type: String,
      unique: true
    },
    password: {
      required: true,
      type: String
    },
    createdAt: {
      default: Date.now,
      type: Date
    }
  })
);

module.exports = User;

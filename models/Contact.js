const mongoose = require('mongoose');

const Contact = mongoose.model(
  'Contact',
  mongoose.Schema({
    user: {
      ref: 'users',
      type: mongoose.Schema.Types.ObjectId
    },
    name: {
      required: true,
      type: String
    },
    emailAddress: {
      required: true,
      type: String,
      unique: true
    },
    phoneNumber: {
      type: String
    },
    type: {
      default: 'Personal',
      type: String
    },
    createdAt: {
      default: Date.now,
      type: Date
    }
  })
);

module.exports = Contact;

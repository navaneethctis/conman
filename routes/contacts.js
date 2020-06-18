const express = require('express');
const {check, validationResult} = require('express-validator');

const auth = require('../middlewares/auth');

const Contact = require('../models/Contact');

const router = express.Router();

router.get('/', auth, async (request, response) => {
  try {
    const contacts = await Contact.find({user: request.user.id}).sort({
      createdAt: -1
    });

    response.json(contacts);
  } catch (error) {
    console.error(error.message);

    response.status(500).json({message: '500 Internal Server Error'});
  }
});

router.post(
  '/',
  [
    auth,
    [
      check('name', 'Please enter a name.').notEmpty(),
      check('emailAddress', 'Please enter a valid email address.').isEmail(),
      check('phoneNumber', 'Please enter a valid phone number')
        .optional()
        .isMobilePhone('en-IN')
    ]
  ],
  async (request, response) => {
    const errors = validationResult(request);

    if (!errors.isEmpty())
      return response.status(400).json({errors: errors.array()});

    const {name, emailAddress, phoneNumber, type} = request.body;

    try {
      const contact = new Contact({
        user: request.user.id,
        name,
        emailAddress,
        phoneNumber,
        type
      });

      await contact.save();

      response.status(201).json(contact);
    } catch (error) {
      console.error(error.message);

      response.status(500).json({message: '500 Internal Server Error'});
    }
  }
);

router.put('/:id', auth, async (request, response) => {
  const {name, emailAddress, phoneNumber, type} = request.body;

  let contactUpdates = {};

  if (name) contactUpdates.name = name;
  if (emailAddress) contactUpdates.emailAddress = emailAddress;
  if (phoneNumber) contactUpdates.phoneNumber = phoneNumber;
  if (type) contactUpdates.type = type;

  try {
    let contact = await Contact.findById(request.params.id);

    if (!contact)
      return response.status(400).json({message: '400 Bad Request'});

    if (String(contact.user) !== request.user.id)
      return response.status(401).json('401 Unauthorized');

    contact = await Contact.findByIdAndUpdate(
      request.params.id,
      {$set: contactUpdates},
      {new: true}
    );

    response.json(contact);
  } catch (error) {
    console.error(error.message);

    response.status(500).json({message: '500 Internal Server Error'});
  }
});

router.delete('/:id', auth, async (request, response) => {
  try {
    const contact = await Contact.findById(request.params.id);

    if (!contact)
      return response.status(400).json({message: '400 Bad Request'});

    if (String(contact.user) !== request.user.id)
      return response.status(401).json({message: '401 Unauthorized'});

    await Contact.findByIdAndRemove(request.params.id);

    response.json({message: 'Contact has been deleted.'});
  } catch (error) {
    console.error(error.message);

    response.status(500).json({message: '500 Internal Server Error'});
  }
});

module.exports = router;

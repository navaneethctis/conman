import React, {useContext, useEffect, useState} from 'react';

import ContactContext from '../../contexts/contact/ContactContext';

const ContactsForm = () => {
  const {
    state: {editContact},
    createContact,
    clearEditContact,
    updateContact
  } = useContext(ContactContext);

  const emptyContact = {
    name: '',
    emailAddress: '',
    type: 'Personal'
  };

  const [contact, setContact] = useState(emptyContact);

  useEffect(() => {
    if (editContact) setContact(editContact);
    else setContact(emptyContact);

    // eslint-disable-next-line
  }, [editContact]);

  const handleSubmit = event => {
    event.preventDefault();

    if (editContact) {
      updateContact(contact);

      return clearEditContact();
    }

    createContact(contact);

    setContact(emptyContact);
  };

  const handleChange = event =>
    setContact({...contact, [event.target.name]: event.target.value});

  const {name, emailAddress, type} = contact;

  return (
    <div className='column is-two-fifths'>
      <h2 className='title has-text-white-bis has-text-right'>
        {editContact ? 'Edit Contact' : 'Create Contact'}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className='field'>
          <div className='control'>
            <label className='radio'>
              <input
                type='radio'
                name='type'
                value='Personal'
                checked={type === 'Personal'}
                onChange={handleChange}
              />{' '}
              Personal
            </label>
            <label className='radio'>
              <input
                type='radio'
                name='type'
                value='Professional'
                checked={type === 'Professional'}
                onChange={handleChange}
              />{' '}
              Professional
            </label>
          </div>
        </div>
        <div className='field'>
          <div className='control'>
            <label htmlFor='name' className='label has-text-white-bis'>
              Name
            </label>
            <input
              type='text'
              name='name'
              value={name}
              onChange={handleChange}
              id='name'
              className='input'
            />
          </div>
        </div>
        <div className='field'>
          <div className='control'>
            <label htmlFor='emailAddress' className='label has-text-white-bis'>
              Email Address
            </label>
            <input
              type='text'
              name='emailAddress'
              value={emailAddress}
              onChange={handleChange}
              id='emailAddress'
              className='input'
            />
          </div>
        </div>
        <div className='field is-grouped'>
          <div className='control'>
            <button className='button is-primary'>
              {editContact ? 'Update' : 'Create'}
            </button>
          </div>
          {editContact && (
            <div className='control'>
              <button
                type='button'
                onClick={clearEditContact}
                className='button has-background-white-bis'
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default ContactsForm;

import React, {useContext} from 'react';
import PropTypes from 'prop-types';

import ContactContext from '../../contexts/contact/ContactContext';

const ContactCard = ({contact}) => {
  const {_id, type, name, emailAddress} = contact;

  const {
    deleteContact: deleteContactGlobal,
    setEditContact: setEditContactGlobal
  } = useContext(ContactContext);

  const setEditContact = event => {
    event.preventDefault();

    setEditContactGlobal(contact);
  };

  const deleteContact = event => {
    event.preventDefault();

    deleteContactGlobal(_id);
  };

  return (
    <div className='column is-half'>
      <div className='card'>
        <div className='card-header'>
          <p className='card-header-title'>{type}</p>
        </div>
        <div className='card-content'>
          <div className='media'>
            <div className='media-left'>
              <span className='icon is-large'>
                <i className='fas fa-user-circle fa-2x'></i>
              </span>
            </div>
            <div className='media-content'>
              <p className='title is-5'>{name}</p>
              <p className='subtitle is-6'>{emailAddress}</p>
            </div>
          </div>
        </div>
        <div className='card-footer'>
          <a
            onClick={setEditContact}
            className='card-footer-item has-text-dark'
            href='/'
          >
            Edit
          </a>
          <a
            onClick={deleteContact}
            className='card-footer-item has-text-dark'
            href='/'
          >
            Delete
          </a>
        </div>
      </div>
    </div>
  );
};

ContactCard.propTypes = {
  contact: PropTypes.object.isRequired
};

export default ContactCard;

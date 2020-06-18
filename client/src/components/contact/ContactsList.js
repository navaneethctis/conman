import React, {useContext, useEffect} from 'react';
import {CSSTransition, TransitionGroup} from 'react-transition-group';

import AuthContext from '../../contexts/auth/AuthContext';
import ContactContext from '../../contexts/contact/ContactContext';

import ContactCard from './ContactCard';
import ContactsFilter from './ContactsFilter';
import Spinner from '../layout/Spinner';

const ContactsList = () => {
  const {
    state: {isAuthenticated}
  } = useContext(AuthContext);
  const {
    state: {isLoading, contacts, filteredContacts},
    getContacts
  } = useContext(ContactContext);

  useEffect(() => {
    getContacts();

    // eslint-disable-next-line
  }, [isAuthenticated]);

  return (
    <div className='column'>
      <h2 className='title has-text-white-bis has-text-right'>Contacts</h2>
      <ContactsFilter />
      {contacts && !isLoading ? (
        <TransitionGroup className='columns is-multiline'>
          {filteredContacts
            ? filteredContacts.map(contact => (
                <CSSTransition
                  key={contact._id}
                  timeout={250}
                  classNames='item'
                >
                  <ContactCard contact={contact} />
                </CSSTransition>
              ))
            : contacts.map(contact => (
                <CSSTransition
                  key={contact._id}
                  timeout={250}
                  classNames='item'
                >
                  <ContactCard contact={contact} />
                </CSSTransition>
              ))}
        </TransitionGroup>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default ContactsList;

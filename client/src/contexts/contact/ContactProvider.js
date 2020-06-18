import React, {useReducer} from 'react';
import axios from 'axios';

import ContactContext from './ContactContext';
import contactReducer from './contactReducer';
import {
  SET_CONTACTS,
  CREATE_CONTACT,
  DELETE_CONTACT,
  SET_EDIT_CONTACT,
  CLEAR_EDIT_CONTACT,
  UPDATE_CONTACT,
  CONTACTS_ERROR,
  CLEAR_CONTACTS,
  FILTER_CONTACTS,
  CLEAR_FILTER
} from '../types';

const ContactProvider = ({children}) => {
  const [state, dispatch] = useReducer(contactReducer, {
    isLoading: true,
    error: null,
    contacts: null,
    editContact: null,
    filteredContacts: null
  });

  const getContacts = async () => {
    try {
      const {data} = await axios.get('/api/contacts');

      dispatch({type: SET_CONTACTS, payload: data});
    } catch (error) {
      dispatch({type: CONTACTS_ERROR, payload: error.response.data.message});
    }
  };

  const createContact = async contact => {
    try {
      const {data} = await axios.post('/api/contacts', contact, {
        headers: {'Content-Type': 'application/json'}
      });

      dispatch({type: CREATE_CONTACT, payload: data});
    } catch (error) {
      dispatch({type: CONTACTS_ERROR, payload: error.response.data.message});
    }
  };

  const setEditContact = contact =>
    dispatch({type: SET_EDIT_CONTACT, payload: contact});

  const clearEditContact = () => dispatch({type: CLEAR_EDIT_CONTACT});

  const deleteContact = async id => {
    try {
      await axios.delete(`/api/contacts/${id}`);

      dispatch({type: DELETE_CONTACT, payload: id});
    } catch (error) {
      dispatch({type: CONTACTS_ERROR, payload: error.response.data.message});
    }

    clearEditContact();
  };

  const updateContact = async contact => {
    try {
      const {data} = await axios.put(`/api/contacts/${contact._id}`, contact, {
        headers: {'Content-Type': 'application/json'}
      });

      dispatch({type: UPDATE_CONTACT, payload: data});
    } catch (error) {
      dispatch({type: CONTACTS_ERROR, payload: error.response.data.message});
    }
  };

  const clearContacts = () => {
    dispatch({type: CLEAR_CONTACTS});
  };

  const filterContacts = filterText =>
    dispatch({type: FILTER_CONTACTS, payload: filterText});

  const clearFilter = () => dispatch({type: CLEAR_FILTER});

  return (
    <ContactContext.Provider
      value={{
        state,
        getContacts,
        createContact,
        setEditContact,
        clearEditContact,
        deleteContact,
        updateContact,
        clearContacts,
        filterContacts,
        clearFilter
      }}
    >
      {children}
    </ContactContext.Provider>
  );
};

export default ContactProvider;

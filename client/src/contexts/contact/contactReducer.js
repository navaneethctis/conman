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

const contactReducer = (state, {type, payload}) => {
  switch (type) {
    case SET_CONTACTS:
      return {...state, isLoading: false, error: null, contacts: payload};
    case CREATE_CONTACT:
      return {...state, contacts: [...state.contacts, payload]};
    case DELETE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.filter(contact => contact._id !== payload)
      };
    case SET_EDIT_CONTACT:
      return {...state, editContact: payload};
    case CLEAR_EDIT_CONTACT:
      return {...state, editContact: null};
    case UPDATE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.map(contact =>
          contact._id === payload._id ? payload : contact
        )
      };
    case CONTACTS_ERROR:
      return {...state, isLoading: false, error: payload};
    case CLEAR_CONTACTS:
      return {
        ...state,
        isLoading: true,
        error: null,
        contacts: null,
        editContact: null,
        filteredContacts: null
      };
    case FILTER_CONTACTS:
      return {
        ...state,
        filteredContacts: state.contacts.filter(
          contact =>
            contact.name.toLowerCase().includes(payload.toLowerCase()) ||
            contact.emailAddress.toLowerCase().includes(payload.toLowerCase())
        )
      };
    case CLEAR_FILTER:
      return {...state, filteredContacts: null};
    default:
      return state;
  }
};

export default contactReducer;

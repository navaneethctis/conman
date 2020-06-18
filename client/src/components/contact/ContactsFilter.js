import React, {useContext, useEffect, useRef} from 'react';

import ContactContext from '../../contexts/contact/ContactContext';

const ContactsFilter = () => {
  const {
    state: {filteredContacts},
    filterContacts: filterContactsGlobal,
    clearFilter
  } = useContext(ContactContext);

  const filterText = useRef(null);

  useEffect(() => {
    if (!filteredContacts) filterText.current.value = '';
  });

  const filterContacts = event => {
    filterText.current.value
      ? filterContactsGlobal(event.target.value)
      : clearFilter();
  };

  return (
    <div className='field is-horizontal'>
      <div className='field-label is-normal'>
        <label htmlFor='filterText' className='label has-text-white-bis'>
          Filter
        </label>
      </div>
      <div className='field-body'>
        <div className='field'>
          <div className='control'>
            <input
              ref={filterText}
              type='text'
              onChange={filterContacts}
              className='input mb-4'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactsFilter;

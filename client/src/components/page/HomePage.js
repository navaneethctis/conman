import React, {useContext, useEffect} from 'react';

import AuthContext from '../../contexts/auth/AuthContext';

import ContactsForm from '../contact/ContactsForm';
import ContactsList from '../contact/ContactsList';

const Home = () => {
  const {getUser} = useContext(AuthContext);

  useEffect(() => {
    getUser();

    // eslint-disable-next-line
  }, []);

  return (
    <section className='section'>
      <div className='container'>
        <div className='columns'>
          <ContactsForm />
          <ContactsList />
        </div>
      </div>
    </section>
  );
};

export default Home;

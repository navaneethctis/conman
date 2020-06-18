import React, {Fragment, useContext} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import AuthContext from '../../contexts/auth/AuthContext';
import ContactContext from '../../contexts/contact/ContactContext';

import NavbarSpinner from '../layout/NavbarSpinner';

const Navbar = ({icon, title}) => {
  const {
    state: {isLoading, isAuthenticated},
    logOutUser: logOutUserGlobal
  } = useContext(AuthContext);
  const {clearContacts} = useContext(ContactContext);

  const logOutUser = () => {
    logOutUserGlobal();

    clearContacts();
  };

  const guestLinks = (
    <Fragment>
      <Link to='/register' className='navbar-item'>
        Register
      </Link>
      <Link to='/login' className='navbar-item'>
        Login
      </Link>
    </Fragment>
  );

  const userLinks = (
    <div className='navbar-item'>
      <button onClick={logOutUser} className='button'>
        Log out
      </button>
    </div>
  );

  return (
    <nav className='navbar has-background-white-bis'>
      <div className='container is-fluid'>
        <div className='navbar-brand'>
          <a href='/' className='navbar-item'>
            <span className='icon is-large'>
              <i className={icon}></i>
            </span>
            <h1 className='title' style={{display: 'none'}}>
              {title}
            </h1>
          </a>
        </div>
        <div className='navbar-menu is-active'>
          <div className='navbar-end'>
            {isLoading ? (
              <NavbarSpinner />
            ) : isAuthenticated ? (
              userLinks
            ) : (
              guestLinks
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

Navbar.defaultProps = {
  icon: 'fa fa-address-card fa-2x',
  title: 'ConMan'
};

Navbar.propTypes = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};

export default Navbar;

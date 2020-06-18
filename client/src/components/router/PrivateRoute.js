import React, {useContext, useEffect} from 'react';
import {Redirect, Route} from 'react-router-dom';

import AuthContext from '../../contexts/auth/AuthContext';

import Spinner from '../layout/Spinner';

const PrivateRoute = ({component: Component, ...rest}) => {
  const {
    state: {isLoading, isAuthenticated},
    getUser
  } = useContext(AuthContext);

  useEffect(() => {
    getUser();

    // eslint-disable-next-line
  }, []);

  return (
    <Route
      {...rest}
      render={props =>
        !isLoading && !isAuthenticated ? (
          <Redirect to='/login' />
        ) : isLoading ? (
          <div className='section'>
            <Spinner />
          </div>
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PrivateRoute;

import React, {useContext, useEffect, useState} from 'react';

import AlertContext from '../../contexts/alert/AlertContext';
import AuthContext from '../../contexts/auth/AuthContext';

import Spinner from '../layout/Spinner';

const LoginPage = ({history}) => {
  const {setAlert} = useContext(AlertContext);
  const {
    state: {isLoading, error, isAuthenticated},
    getUser,
    logInUser,
    clearError
  } = useContext(AuthContext);

  const [user, setUser] = useState({
    emailAddress: '',
    password: ''
  });

  useEffect(() => {
    getUser();

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (isAuthenticated) history.push('/');

    if (error) {
      setAlert('danger', error);

      clearError();
    }

    // eslint-disable-next-line
  }, [error, isAuthenticated, history]);

  const handleChange = event =>
    setUser({...user, [event.target.name]: event.target.value});

  const handleSubmit = event => {
    event.preventDefault();

    logInUser({emailAddress, password});
  };

  const {emailAddress, password} = user;

  if (isLoading || isAuthenticated)
    return (
      <div className='section'>
        <Spinner />
      </div>
    );

  return (
    <section className='section'>
      <div className='container'>
        <div className='columns'>
          <div className='column is-one-third is-offset-one-third'>
            <h2 className='title has-text-white-bis has-text-right'>Login</h2>
            <form onSubmit={handleSubmit}>
              <div className='field'>
                <div className='control'>
                  <label
                    htmlFor='emailAddress'
                    className='label has-text-white-bis'
                  >
                    Email Address
                  </label>
                  <input
                    type='email'
                    name='emailAddress'
                    value={emailAddress}
                    onChange={handleChange}
                    required
                    id='emailAddress'
                    className='input'
                  />
                </div>
              </div>
              <div className='field'>
                <div className='control'>
                  <label
                    htmlFor='password'
                    className='label has-text-white-bis'
                  >
                    Password
                  </label>
                  <input
                    type='password'
                    name='password'
                    value={password}
                    onChange={handleChange}
                    required
                    minLength='8'
                    id='password'
                    className='input'
                  />
                </div>
              </div>
              <div className='field'>
                <div className='control'>
                  <button className='button is-primary'>Log in</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;

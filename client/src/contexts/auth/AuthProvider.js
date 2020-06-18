import React, {useReducer} from 'react';
import axios from 'axios';

import AuthContext from './AuthContext';
import authReducer from './authReducer';
import {
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  CLEAR_ERROR,
  SET_USER,
  SET_USER_ERROR,
  LOG_OUT
} from '../types';

import setXAuthToken from '../../utilities/setXAuthToken';

const AuthProvider = ({children}) => {
  const [state, dispatch] = useReducer(authReducer, {
    isLoading: true,
    error: null,
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    user: null
  });

  const getUser = async () => {
    setXAuthToken();

    try {
      const {data} = await axios.get('/api/auth');

      dispatch({type: SET_USER, payload: data});
    } catch ({response}) {
      dispatch({type: SET_USER_ERROR});
    }
  };

  const registerUser = async user => {
    try {
      const {data} = await axios.post('/api/users', user, {
        headers: {'Content-Type': 'application/json'}
      });

      dispatch({type: REGISTER_SUCCESS, payload: data});

      getUser();
    } catch ({response}) {
      dispatch({type: REGISTER_FAILURE, payload: response.data.message});
    }
  };

  const logInUser = async user => {
    try {
      const {data} = await axios.post('/api/auth', user, {
        headers: {'Content-Type': 'application/json'}
      });

      dispatch({type: LOG_IN_SUCCESS, payload: data});

      getUser();
    } catch ({response}) {
      dispatch({type: LOG_IN_FAILURE, payload: response.data.message});
    }
  };

  const clearError = () => dispatch({type: CLEAR_ERROR});

  const logOutUser = () => dispatch({type: LOG_OUT});

  return (
    <AuthContext.Provider
      value={{state, getUser, registerUser, logInUser, logOutUser, clearError}}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

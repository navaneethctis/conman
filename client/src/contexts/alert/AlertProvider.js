import React, {useReducer} from 'react';
import {v4} from 'uuid';

import AlertContext from './AlertContext';
import alertReducer from './alertReducer';
import {SET_ALERT, CLEAR_ALERT} from '../types';

const AlertProvider = ({children}) => {
  const [state, dispatch] = useReducer(alertReducer, []);

  const setAlert = (type, message) => {
    const id = v4();

    dispatch({type: SET_ALERT, payload: {id, type, message}});
  };

  const clearAlert = id => dispatch({type: CLEAR_ALERT, payload: id});
  return (
    <AlertContext.Provider value={{state, setAlert, clearAlert}}>
      {children}
    </AlertContext.Provider>
  );
};

export default AlertProvider;

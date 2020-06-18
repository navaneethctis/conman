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

const authReducer = (state, {type, payload}) => {
  switch (type) {
    case REGISTER_SUCCESS:
    case LOG_IN_SUCCESS:
      localStorage.setItem('token', payload.token);

      return {...state, ...payload};
    case REGISTER_FAILURE:
    case LOG_IN_FAILURE:
    case SET_USER_ERROR:
    case LOG_OUT:
      localStorage.removeItem('token');

      return {
        ...state,
        isLoading: false,
        error: payload,
        token: null,
        isAuthenticated: false,
        user: null
      };
    case CLEAR_ERROR:
      return {...state, error: null};
    case SET_USER:
      return {...state, isLoading: false, user: payload, isAuthenticated: true};
    default:
      return state;
  }
};

export default authReducer;

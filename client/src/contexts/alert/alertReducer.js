import {SET_ALERT, CLEAR_ALERT} from '../types';

const alertReducer = (state, {type, payload}) => {
  switch (type) {
    case SET_ALERT:
      return [payload];
    case CLEAR_ALERT:
      return [];
    default:
      return state;
  }
};

export default alertReducer;

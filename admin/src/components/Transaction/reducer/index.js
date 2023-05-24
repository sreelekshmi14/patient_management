import { combineReducers } from 'redux';

const initialState = {
  trans: [],
};

export const transReducer = (state = initialState, action) => {
  // console.log('first', action);
  switch (action.type) {
    case 'GET_TRANS':
      return {
        ...state,
        trans: action.payload,
      };
    default:
      return state;
  }
};

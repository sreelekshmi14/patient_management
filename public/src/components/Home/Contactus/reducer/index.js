import { combineReducers } from 'redux';

const initialState = {
  contactdata: [],
  contactAll: [],
};

export const contactReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CONTACT_DATA':
      return {
        ...state,
        contactdata: action.payload,
      };
    case 'GET_CONTACT_DATA':
      return {
        ...state,
        contactAll: action.payload,
      };
    default:
      return state;
  }
};

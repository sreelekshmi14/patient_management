import { combineReducers } from 'redux';

const initialState = {
  contactAll: [],
  contactView: [],
};

export const contactReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_CONTACT_DATA':
      return {
        ...state,
        contactAll: action.payload,
      };
    case 'CONTACT_BY_ID':
      return {
        ...state,
        contactView: action.payload,
      };
    default:
      return state;
  }
};

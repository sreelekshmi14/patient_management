import { combineReducers } from 'redux';

const initialState = {
  logindata: [],
  role: '',
};

export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_DATA':
      return {
        ...state,
        logindata: action.payload,
        role: action.payload,
      };
    default:
      return state;
  }
};

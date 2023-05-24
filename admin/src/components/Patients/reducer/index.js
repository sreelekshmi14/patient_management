import { combineReducers } from 'redux';

const initialState = {
  patients: [],
};

export const patientReducer = (state = initialState, action) => {
  // console.log('first', action);
  switch (action.type) {
    case 'GET_PATIENT':
      return {
        ...state,
        patients: action.payload,
      };
    default:
      return state;
  }
};

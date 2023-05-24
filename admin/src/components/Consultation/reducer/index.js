import { combineReducers } from 'redux';

const initialState = {
  departments: [],
  hospitals: [],
  doctors: [],
  truckData: [],
  consultations: [],
  truckId: [],
  blockTruck: [],
  Times: [],
};

export const consultationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_DEPARTMENT':
      return {
        ...state,
        departments: action.payload,
      };
    case 'GET_HOSPITAL':
      return {
        ...state,
        hospitals: action.payload,
      };
    case 'GET_DOCTORS':
      return {
        ...state,
        doctors: action.payload,
      };

    case 'GET_CONSULTATION':
      return {
        ...state,
        consultations: action.payload,
      };
    case 'UPDATE_CONSULT':
      return {
        ...state,
        consultations: action.payload,
      };
    case 'GET_TIME':
      return {
        ...state,
        Times: action.payload,
      };

    default:
      return state;
  }
};

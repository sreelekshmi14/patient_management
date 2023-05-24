import { combineReducers } from 'redux';

const initialState = {
  profile: [],
  healthData: [],
  healthView: [],
  profileView: [],
  diseaseNames: [],
  diseases: [],
  diseaseView: [],
};

export const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_PROFILE_DATA':
      return {
        ...state,
        profile: action.payload,
      };
    case 'GET_HEALTH_DATA':
      return {
        ...state,
        healthData: action.payload,
      };
    case 'HEALTH_BY_ID':
      return {
        ...state,
        healthView: action.payload,
      };
    case 'PROFILE_BY_ID':
      return {
        ...state,
        profileView: action.payload,
      };
    case 'GET_DISEASE_NAMES':
      return {
        ...state,
        diseaseNames: action.payload,
      };
    case 'GET_DISEASE':
      return {
        ...state,
        diseases: action.payload,
      };
    case 'DISEASE_BY_ID':
      return {
        ...state,
        diseaseView: action.payload,
      };
    default:
      return state;
  }
};

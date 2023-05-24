import { combineReducers } from 'redux';

const initialState = {
  models: [],
  brands: [],
  variants: [],
  truckData: [],
  trucks: [],
  truckId: [],
  blockTruck: [],
  user: [],
};

export const signupReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_BRANDS':
      return {
        ...state,
        brands: action.payload,
      };
    case 'GET_MODELS':
      return {
        ...state,
        models: action.payload,
      };
    case 'GET_VARIANTS':
      return {
        ...state,
        variants: action.payload,
      };
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
      };
    case 'GET_TRUCK':
      return {
        ...state,
        trucks: action.payload,
      };
    case 'TRUCK_BY_ID':
      return {
        ...state,
        truckId: action.payload,
      };
    case 'TRUCK_BY_ID_BLOCK':
      return {
        ...state,
        blockTruck: action.payload,
      };
    default:
      return state;
  }
};

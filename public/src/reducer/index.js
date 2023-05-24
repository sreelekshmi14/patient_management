import { combineReducers } from 'redux';
import { contactReducer } from '../components/Home/Contactus/reducer';


const initialState = {
  errorMessage: null,
  successMessage: null,
};

const Reducers = (state = initialState, action) => {
  switch (action.type) {
    case 'SUCCESS_MESSAGE':
      return {
        ...state,
        successMessage: action.payload,
      };
    case 'ERROR_MESSAGE':
      return {
        ...state,
        errorMessage: action.payload,
      };
    case 'RESET_SUCCESS_MESSAGE':
      return {
        ...state,
        successMessage: null,
      };
    case 'RESET_ERROR_MESSAGE':
      return {
        ...state,
        errorMessage: null,
      };
    default:
      return state;
  }
};

export default combineReducers({
  Reducers,
  contactReducer,

});

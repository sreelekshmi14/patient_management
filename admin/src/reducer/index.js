import { combineReducers } from 'redux';
import { signupReducer } from '../components/Signup/reducer';
import { loginReducer } from '../components/Login/reducer';
import { profileReducer } from '../components/Profile/reducer';
import { consultationReducer } from '../components/Consultation/reducer';
import { contactReducer } from '../components/Feedback/reducer';
import { vaccineReducers } from '../components/Vaccination/reducer/vaccinereducer';
import { transReducer } from '../components/Transaction/reducer';
import { patientReducer } from '../components/Patients/reducer';

const initialState = {
  errorMessage: null,
  successMessage: null,
  loader: false,
  islogin: localStorage.getItem('login') ? localStorage.getItem('login') : null,
  role: '',
  profileData: [],
};

const Reducers = (state = initialState, action) => {
  switch (action.type) {
    // case 'IS LOGIN':
    //   return {
    //     ...state,
    //     role: action.payload,
    //   };
    case 'profile':
      return {
        ...state,
        profileData: action.payload,
        role: action.payload,
      };
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
    case 'LOADER_TRUE':
      return {
        ...state,
        loader: true,
      };
    case 'LOADER_FALSE':
      return {
        ...state,
        loader: false,
      };
    case 'LOGOUT':
      return {
        ...state,
        islogin: action.payload,
      };
    default:
      return state;
  }
};

export default combineReducers({
  Reducers,
  signupReducer,
  loginReducer,
  profileReducer,
  consultationReducer,
  contactReducer,
  vaccineReducers,
  transReducer,
  patientReducer,
});

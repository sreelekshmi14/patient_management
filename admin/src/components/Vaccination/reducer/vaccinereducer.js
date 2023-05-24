const initialState = {
  vaccinedata: [],
  departments: [],
  hospitals: [],
  vaccine: [],
  time: [],
};

export const vaccineReducers = (state = initialState, action) => {
  switch (action.type) {
    case 'VACCINE_DATA':
      return {
        ...state,
        vaccinedata: action.payload,
      };
    case 'GET_HOSPITAL':
      return {
        ...state,
        hospitals: action.payload,
      };
    case 'GET_DEPARTMENT':
      return {
        ...state,
        departments: action.payload,
      };
    case 'GET_VACCINE':
      return {
        ...state,
        vaccines: action.payload,
      };
    case 'GET_TIME':
      return {
        ...state,
        time: action.payload,
      };
    case 'UPDATE_VACCINE':
      return {
        ...state,
        vaccinedata: action.payload,
      };

    default:
      return state;
  }
};

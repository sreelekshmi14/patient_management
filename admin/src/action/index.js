import { getUserData, getdataById } from '../api/service';
//common actions

// toaster for success messsage
export const setSuccessMessage = (data) => (dispatch) => {
  dispatch({
    type: 'SUCCESS_MESSAGE',
    payload: data,
  });
};

// toaster for error message
export const setErrorMessage = (data) => (dispatch) => {
  dispatch({
    type: 'ERROR_MESSAGE',
    payload: data,
  });
};

// reset  success message toaster
export const resetSuccessMessage = () => (dispatch) => {
  dispatch({
    type: 'RESET_SUCCESS_MESSAGE',
  });
};

// reset error message toaster
export const resetErrorMessage = () => (dispatch) => {
  dispatch({
    type: 'RESET_ERROR_MESSAGE',
  });
};
//loader

export const loaderTrue = () => (dispatch) => {
  dispatch({
    type: 'LOADER_TRUE',
  });
};

export const loaderFalse = () => (dispatch) => {
  dispatch({
    type: 'LOADER_FALSE',
  });
};
// Logout
export const logout = (navigate) => (dispatch) => {
  localStorage.removeItem('token');
  localStorage.removeItem('role');
  dispatch({
    type: 'LOGOUT',
    payload: null,
  });
  navigate('/');
};

// =========================profile=================
// export const setProfile = () => async (dispatch) => {
//   let tocken = localStorage.getItem('token');
//   let { data } = await getUserData('auth/profile', { accessTocken: tocken });

//   if (data.statusCode === 200) {
//     // dispatch({
//     //   type: 'IS LOGIN',
//     //   payload: data.profile?.role,
//     // });
//     // } else {
//     //   dispatch({
//     //     type: 'IS LOGIN',
//     //     payload: data.profile?.role,
//     //   });
//     // }
//     dispatch({
//       type: 'profile',
//       payload: data.profile,
//       payload: data.profile?.role,
//     });
//   } else {
//     console.log(data.message);
//   }
// };

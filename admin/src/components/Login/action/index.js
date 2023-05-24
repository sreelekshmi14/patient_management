import { postdata } from '../../../api/service';
import {
  setErrorMessage,
  setSuccessMessage,
  loaderTrue,
  loaderFalse,
} from '../../../action';

export const loginall = (data, navigate) => async (dispatch) => {
  dispatch(loaderTrue());
  await postdata('/auth/login', data).then((e) => {
    if (e.data.isError === true) {
      dispatch(setErrorMessage(`${e.data.message}`));
      dispatch(loaderFalse());
    } else {
      localStorage.setItem('token', e.data.data.accessToken);
      localStorage.setItem('role', e.data.data.role);
      dispatch({
        type: 'LOGIN_DATA',
        payload: e.data.data.role,
        // permission: e.data.data.permission,
      });
      dispatch(setSuccessMessage('Successfully Login'));
      dispatch(loaderFalse());
      navigate('/dashboard');
    }
  });

  //navigate('/dashboard');
};

export const setProfile = () => async (dispatch) => {
  let tocken = localStorage.getItem('token');

  let { data } = await postdata('/permission/profile', {
    accessTocken: tocken,
  });
  // console.log('jj', data.data.role);
  dispatch({
    type: 'LOGIN_DATA',
    // permission: data.data.permission,
    payload: data.data.role,
  });
};

// export const setProfile = () => async (dispatch) => {
//   let tocken = localStorage.getItem('accessTocken');
//   let { data } = await getData('auth/profile', { accessTocken: tocken });
//   console.log(data);
//   if (data.statusCode === 200  ) {
//     if(data.profile?.login?.role==='patient'){
//     dispatch({
//       type: 'IS LOGIN',
//       payload: data.profile?.login?.role,
//     });
//   }else{
//     dispatch({
//       type: 'IS LOGIN',
//       payload: data.profile?.role,
//     });
//   }
//     dispatch({
//       type: 'profile',
//       payload: data.profile,
//     });
//   } else {
//     console.log(data.message);
//   }
// };

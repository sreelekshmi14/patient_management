// import { getUserData } from '../../../api/service';
// import { setErrorMessage, setSuccessMessage } from '../../../action';

// //List
// export const profileList = () => async (dispatch) => {
  
//   let { data } = await getUserData('/profile');
//   if (data.isError === false) {
//     dispatch({
//       type: 'GET_PROFILE_DATA',
//       payload: data.profile,
//     });
//   } else {
//     dispatch(setErrorMessage(`${data.msg}`));
//   }
// };

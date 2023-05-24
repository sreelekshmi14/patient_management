import { postdata, getUserData, getdataById } from '../../../api/service';
import { logout, setErrorMessage, setSuccessMessage } from '../../../action';

//Add
export const updatePassword = (data) => async (dispatch) => {
  await postdata('/password', data).then((e) => {
    console.log('ee', e);
    if (e.data.success === false) {
      dispatch(setErrorMessage(`${e.data.message}`));
    } else {
      dispatch({
        type: 'Driver_Data',
      });
      dispatch(setSuccessMessage('Password Changed ,please login '));
      dispatch(logout());
    }
  });
};

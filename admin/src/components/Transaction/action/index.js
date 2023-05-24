import { getUserData } from '../../../api/service';
import { setErrorMessage, setSuccessMessage } from '../../../action';

//List Truck
export const transList = (datas) => async (dispatch) => {
  try {
    const { data } = await getUserData('/transaction', datas);

    if (data.isError === false) {
      dispatch({
        type: 'GET_TRANS',
        payload: data.translist,
      });
    } else {
      dispatch(setErrorMessage(`${data.message}`));
    }
  } catch (e) {
    dispatch(setErrorMessage(`${e.message}`));
  }
};

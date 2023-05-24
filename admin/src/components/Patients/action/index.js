import { getUserData } from '../../../api/service';
import { setErrorMessage, setSuccessMessage } from '../../../action';

//List Patients
export const patientsList = (datas) => async (dispatch) => {
  try {
    const { data } = await getUserData('/patients', datas);
    console.log(data);
    if (data.isError === false) {
      dispatch({
        type: 'GET_PATIENT',
        payload: data.Patients,
      });
    } else {
      dispatch(setErrorMessage(`${data.message}`));
    }
  } catch (e) {
    dispatch(setErrorMessage(`${e.message}`));
  }
};

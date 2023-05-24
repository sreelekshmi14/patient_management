import {
  setErrorMessage,
  setSuccessMessage,
  loaderTrue,
  loaderFalse,
} from '../../../action';
import { editdata, getUserData, getData, postdata } from '../../../api/service';

// list vaccine
export const listvaccine = () => async (dispatch) => {
  const { data } = await getUserData('/vaccination/vaccine');
  try {
    if (data.isError === false) {
      dispatch({
        type: 'GET_VACCINE',
        payload: data.vaccines,
      });
    }
  } catch {
    dispatch(setErrorMessage(`${data.message}`));
  }
};

//Add vaccination

export const createvaccination = (formData, navigate) => async (dispatch) => {
  const { data } = await postdata('/vaccination/add', formData);
  try {
    if (data.isError === false) {
      dispatch(setSuccessMessage(`${data.message}`));
      dispatch(loaderFalse());
      navigate('/vaccination');
    } else {
      dispatch(setErrorMessage(`${data.message}`));
      dispatch(loaderFalse());
    }
  } catch {
    dispatch(setErrorMessage(`${data.message}`));
    dispatch(loaderFalse());
  }
};

// list vaccinations details
export const listvaccination = () => async (dispatch) => {
  const { data } = await getUserData('/vaccination');
  try {
    if (data.isError === false) {
      dispatch({
        type: 'VACCINE_DATA',
        payload: data.vaccinations,
      });
    }
  } catch {
    dispatch(setErrorMessage(`${data.message}`));
  }
};

export const CertificateCreation = (data, navigate) => async (dispatch) => {
  await postdata('/certificate/vaccine', data).then((e) => {
    if (e.data.isError === true) {
      dispatch(setErrorMessage(`${e.data.message}`));
      dispatch(loaderFalse());
    } else {
      // dispatch(healthList());
      dispatch(setSuccessMessage('Added Successfully'));
      dispatch(loaderFalse());
      navigate('/vaccination');
    }
  });
};

//List DATE
export const timeList = (datas) => async (dispatch) => {
  const { data } = await getData('/getdate', datas);
  try {
    if (data.isError === false) {
      dispatch({
        type: 'GET_TIME',
        payload: data.times,
      });
    }
  } catch {
    dispatch(setErrorMessage(`${data.message}`));
  }
};

//cancel vaccination
export const cancelvaccination = (id, datas) => async (dispatch) => {
  const { data } = await editdata('/vaccination', id, datas);
  try {
    if (data.isError === false) {
      dispatch(listvaccination());
      dispatch({
        type: 'UPDATE_VACCINE',
        payload: data.updatevaccine,
      });

      dispatch(setSuccessMessage(`${data.message}`));
    }
  } catch {
    dispatch(setErrorMessage(`${data.message}`));
  }
};

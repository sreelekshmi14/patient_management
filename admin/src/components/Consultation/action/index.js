import {
  postdata,
  getUserData,
  getData,
  getdataById,
  editdata,
} from '../../../api/service';
import {
  setErrorMessage,
  setSuccessMessage,
  loaderTrue,
  loaderFalse,
} from '../../../action';

//Add Consultation

export const consultationAdd = (data, navigate) => async (dispatch) => {
  await postdata('/consultation/add', data).then((e) => {
    if (e.data.isError === true) {
      dispatch(setErrorMessage(`${e.data.message}`));
      dispatch(loaderFalse());
    } else {
      // dispatch(healthList());
      dispatch(setSuccessMessage('Added Successfully'));
      dispatch(loaderFalse());
      navigate('/consultation');
    }
  });
};
//certificate
export const CertificateCreation = (data, navigate) => async (dispatch) => {
  await postdata('/certificate/consult', data).then((e) => {
    if (e.data.isError === true) {
      dispatch(setErrorMessage(`${e.data.message}`));
      dispatch(loaderFalse());
    } else {
      // dispatch(healthList());
      dispatch(setSuccessMessage('Added Successfully'));
      dispatch(loaderFalse());
      navigate('/consultation');
    }
  });
};

//List Hospitals
export const hospitalList = (data) => async (dispatch) => {
  await getUserData('/hospital', data).then((e) => {
    console.log(e.data);
    if (e.data.isError === false) {
      dispatch({
        type: 'GET_HOSPITAL',
        payload: e.data.hospitalList,
      });
    } else {
      dispatch(setErrorMessage(`${e.data.msg}`));
    }
  });
};
//List department
export const departmentList = (data) => async (dispatch) => {
  await getUserData('/department', data).then((e) => {
    if (e.data.isError === false) {
      dispatch({
        type: 'GET_DEPARTMENT',
        payload: e.data.departmentList,
      });
    } else {
      dispatch(setErrorMessage(`${e.data.msg}`));
    }
  });
};
//List doctors
export const doctorsList = (data) => async (dispatch) => {
  await getData('/doctor', data).then((e) => {
    if (e.data.isError === false) {
      dispatch({
        type: 'GET_DOCTORS',
        payload: e.data.doctorsList,
      });
    } else {
      dispatch(setErrorMessage(`${e.data.msg}`));
    }
  });
};
//List doctors
export const timesList = (data) => async (dispatch) => {
  await getData('/consultation/time', data).then((e) => {
    if (e.data.isError === false) {
      dispatch({
        type: 'GET_TIME',
        payload: e.data.times,
      });
    } else {
      dispatch(setErrorMessage(`${e.data.msg}`));
    }
  });
};

//List consulatation
export const consultationList = (data) => async (dispatch) => {
  await getUserData('/consultation', data).then((e) => {
    if (e.data.isError === false) {
      dispatch({
        type: 'GET_CONSULTATION',
        payload: e.data.consult,
      });
    } else {
      dispatch(setErrorMessage(`${e.data.msg}`));
    }
  });
};

// update consultation
export const cancelconsultation = (id, datas) => async (dispatch) => {
  const { data } = await editdata('/consultation', id, datas);
  console.log(data);
  try {
    if (data.isError === false) {
      dispatch({
        type: 'UPDATE_CONSULT',
        payload: data.updateconsult,
      });
      dispatch(consultationList());
      dispatch(setSuccessMessage(`${data.message}`));
    }
  } catch {
    dispatch(setErrorMessage(`${data.message}`));
  }
};

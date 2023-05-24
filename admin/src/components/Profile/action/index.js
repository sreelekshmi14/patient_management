import { getUserData, postdata, getdataById } from '../../../api/service';
import { setErrorMessage, setSuccessMessage } from '../../../action';

//List
export const profileList = () => async (dispatch) => {
  let { data } = await getUserData('/profile');
  if (data.isError === false) {
    dispatch({
      type: 'GET_PROFILE_DATA',
      payload: data.profile,
    });
  } else {
    dispatch(setErrorMessage(`${data.msg}`));
  }
};

//Add health Info

export const healthInfoAdd = (data, navigate) => async (dispatch) => {
  await postdata('/health/add', data).then((e) => {
    if (e.data.isError === true) {
      dispatch(setErrorMessage(`${e.data.message}`));
    } else {
      dispatch(healthList());
      dispatch(setSuccessMessage('Added Successfully'));
      navigate('/profile');
    }
  });
};

//Listhealth
export const healthList = () => async (dispatch) => {
  let { data } = await getUserData('/health');
  if (data.isError === false) {
    dispatch({
      type: 'GET_HEALTH_DATA',
      payload: data.health,
    });
  } else {
    dispatch(setErrorMessage(`${data.msg}`));
  }
};

//view Health Details
export const getById = (id) => async (dispatch) => {
  const { data } = await getdataById('/health', id);

  dispatch({
    type: 'HEALTH_BY_ID',
    payload: data.Healthinfos,
  });
};

//view Profile Details
export const getProfileById = (id) => async (dispatch) => {
  const { data } = await getdataById('/profile', id);

  dispatch({
    type: 'PROFILE_BY_ID',
    payload: data.SignupInfo,
  });
};

//Listdisease names
export const diseaseNameList = () => async (dispatch) => {
  let { data } = await getUserData('/diseasenames');

  if (data.isError === false) {
    dispatch({
      type: 'GET_DISEASE_NAMES',
      payload: data.diseasesNamesList,
    });
  } else {
    dispatch(setErrorMessage(`${data.msg}`));
  }
};

//Add Diseases

export const diseaseAdd = (data, navigate) => async (dispatch) => {
  await postdata('/disease/add', data).then((e) => {
    if (e.data.isError === true) {
      dispatch(setErrorMessage(`${e.data.message}`));
    } else {
      // dispatch(healthList());
      dispatch(setSuccessMessage('Added Successfully'));
      dispatch(diseaseList());
    }
  });
};
//Listdisease
export const diseaseList = () => async (dispatch) => {
  let { data } = await getUserData('/disease');

  if (data.isError === false) {
    dispatch({
      type: 'GET_DISEASE',
      payload: data.diseasesList,
    });
  } else {
    dispatch(setErrorMessage(`${data.msg}`));
  }
};

//view
export const diseaseById = (id) => async (dispatch) => {
  const { data } = await getdataById('/disease', id);
  console.log(data);

  dispatch({
    type: 'DISEASE_BY_ID',
    payload: data.Diseaseinfos,
  });
};

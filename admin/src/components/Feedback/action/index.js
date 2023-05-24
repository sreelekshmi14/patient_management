import { getUserData, getdataById } from '../../../api/service';
import { setErrorMessage, setSuccessMessage } from '../../../action';

//List
export const contactList = (data) => async (dispatch) => {
  await getUserData('/contact', data).then((e) => {
    if (e.data.isError === false) {
      dispatch({
        type: 'GET_CONTACT_DATA',
        payload: e.data.contactlist,
      });
    } else {
      dispatch(setErrorMessage(`${e.data.msg}`));
    }
  });
};

//view
export const getById = (id) => async (dispatch) => {
  const { data } = await getdataById('/contact', id);

  dispatch({
    type: 'CONTACT_BY_ID',
    payload: data.feedback,
  });
};

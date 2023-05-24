import { postdata, getUserData } from '../../../../api/service';
import { setErrorMessage, setSuccessMessage } from '../../../../action';

//Add
export const contactAdd = (data, navigate) => async (dispatch) => {
  await postdata('/contact/add', data).then((e) => {
    if (e.data.success === false) {
      dispatch(setErrorMessage(`${e.data.message}`));
    } else {
      dispatch({
        type: 'Contact_Data',
      });
      dispatch(setSuccessMessage('Added Successfully'));
      navigate('/testimonial');
    }
  });
};

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

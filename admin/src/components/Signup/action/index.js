import {
  postdata,
  getUserData,
  getData,
  getdataById,
} from '../../../api/service';
import { setErrorMessage, setSuccessMessage } from '../../../action';

//Add
export const patientAdd = (data, navigate) => async (dispatch) => {
  await postdata('/auth/signup', data).then((e) => {
    if (e.data.isError === true) {
      dispatch(setErrorMessage(`${e.data.message}`));
    } else {
      dispatch({
        type: 'SET_USER',
      });
      dispatch(setSuccessMessage('Registered Successfully please login'));
      navigate('/auth/login');
    }
  });
};
//Add By Driver
// export const TruckAddDriver = (data, navigate) => async (dispatch) => {
//   await postdata('/auth/addtruck', data).then((e) => {
//     if (e.data.success === false) {
//     } else {
//       dispatch({
//         type: 'SET_TRUCK',
//       });
//       dispatch(setSuccessMessage('Added Successfully'));
//     }
//   });
// };
// //List models
// export const modelsList = (data) => async (dispatch) => {
//   console.log(data);
//   await getData('/model', { bId: data }).then((e) => {
//     if (e.data.success === true) {
//       dispatch({
//         type: 'GET_MODELS',
//         payload: e.data.data,
//       });
//     } else {
//       dispatch(setErrorMessage(`${e.data.msg}`));
//     }
//   });
// };
// //List brands
// export const brandList = (data) => async (dispatch) => {
//   await getUserData('/brand', data).then((e) => {
//     if (e.data.success === true) {
//       dispatch({
//         type: 'GET_BRANDS',
//         payload: e.data.data,
//       });
//     } else {
//       dispatch(setErrorMessage(`${e.data.msg}`));
//     }
//   });
// };
// //List variants
// export const variantList = (data) => async (dispatch) => {
//   await getData('/variant', { mId: data }).then((e) => {
//     if (e.data.success === true) {
//       dispatch({
//         type: 'GET_VARIANTS',
//         payload: e.data.data,
//       });
//     } else {
//       dispatch(setErrorMessage(`${e.data.msg}`));
//     }
//   });
// };

// //List Truck
// export const truckList = (data) => async (dispatch) => {
//   await getUserData('/truck', data).then((e) => {
//     if (e.data.success === true) {
//       dispatch({
//         type: 'GET_TRUCK',
//         payload: e.data.data,
//       });
//     } else {
//       dispatch(setErrorMessage(`${e.data.msg}`));
//     }
//   });
// };

// //view
// export const getById = (id) => async (dispatch) => {
//   const { data } = await getdataById('/truck', id);
//   // console.log('data5465656', data);
//   dispatch({
//     type: 'TRUCK_BY_ID',
//     payload: data.data,
//   });
// };
// //Block
// export const getBlockById = (id) => async (dispatch) => {
//   const { data } = await getdataById('/truck/block', id);
//   // console.log('data5465656', data);
//   dispatch({
//     type: 'TRUCK_BY_ID_BLOCK',
//     payload: data.data,
//   });
// };

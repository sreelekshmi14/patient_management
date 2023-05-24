import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { resetErrorMessage, resetSuccessMessage } from '../action/index';
import { profileList } from '../components/Profile/action';
import SignUp from './Signup/signup';
import Login from './Login/login';
import Dashboard from './Dashboard/main';
import Profile from './Profile/common';
import DiseaseView from './Profile/Disease/diseaseView';
import ConsultationAdd from './Consultation/consultation';
import Consultation from './Consultation/consultationList';
import Enquiry from '../components/Feedback/list';
import EnquiryView from '../components/Feedback/view';
import Changepassword from '../components/Changepassword/change password';
import { PrivateRoute } from './PrivateRouting';
import { setProfile } from '../action/index';
import VaccineList from '../components/Vaccination/ListVaccine';
import VaccineAdd from '../components/Vaccination/VaccineForm';
import TransactionList from './Transaction/list';
import Patients from './Patients/list';
import '../css/style.css';

// toaster
const toastConfig = {
  position: 'top-right',
  autoClose: 4000,
  hideProgressBar: false,
  newestOnTop: false,
  closeOnClick: true,
  rtl: false,
  pauseOnFocusLoss: true,
  draggable: true,
  pauseOnHover: true,
  theme: 'colored',
};

const App = () => {
  const dispatch = useDispatch();

  const { successMessage, errorMessage, profileData, role } = useSelector(
    (state) => state.Reducers
  );

  // useEffect(() => {
  //   if (localStorage.getItem('token')) {
  //     dispatch(setProfile());
  //   }
  // }, [role]);

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage, toastConfig);
      dispatch(resetSuccessMessage());
    } else if (errorMessage) {
      toast.error(errorMessage, toastConfig);
      dispatch(resetErrorMessage());
    }
  }, [successMessage, errorMessage]);
 

  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path="/auth/login" exact element={<Login />} />
        <Route path="/signUp" exact element={<SignUp />} />
        <Route
          path="/dashboard"
          exact
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          exact
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/disease/:id"
          exact
          element={
            <PrivateRoute>
              <DiseaseView />
            </PrivateRoute>
          }
        />
        <Route
          path="/enquiry/:id"
          exact
          element={
            <PrivateRoute>
              <EnquiryView />
            </PrivateRoute>
          }
        />
        <Route
          path="/consultation/add"
          exact
          element={
            <PrivateRoute>
              <ConsultationAdd />
            </PrivateRoute>
          }
        />
        <Route
          path="/consultation"
          exact
          element={
            <PrivateRoute>
              <Consultation />
            </PrivateRoute>
          }
        />
        <Route
          path="/enquiry"
          exact
          element={
            <PrivateRoute>
              <Enquiry />
            </PrivateRoute>
          }
        />
        <Route
          path="/vaccination"
          exact
          element={
            <PrivateRoute>
              <VaccineList />
            </PrivateRoute>
          }
        />
        <Route
          path="/vaccination/add"
          exact
          element={
            <PrivateRoute>
              <VaccineAdd />
            </PrivateRoute>
          }
        />
        <Route
          path="/transaction"
          exact
          element={
            <PrivateRoute>
              <TransactionList />
            </PrivateRoute>
          }
        />
        <Route
          path="/patients"
          exact
          element={
            <PrivateRoute>
              <Patients />
            </PrivateRoute>
          }
        />
        <Route
          path="/changepassword"
          exact
          element={
            <PrivateRoute>
              <Changepassword />
            </PrivateRoute>
          }
        />

        {/* <Route
          path="/gallery/add/:id"
          exact
          element={
            <PrivateRoute>
              <GalleryAdd />
            </PrivateRoute>
          }
        /> */}
      </Routes>
    </div>
  );
};

export default App;

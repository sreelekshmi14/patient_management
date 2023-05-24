import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { resetErrorMessage, resetSuccessMessage } from '../action/index';
import Home from '../components/Home/home';
import Header from '../components/Home/header';
import Gallery from '../components/Home/Gallery/gallery';
import Contactus from './Home/Contactus/contactus';
import Testimonial from './Home/testimonial';
import '../css/style.css';

// import io from 'socket.io-client';
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
// const socket = io.connect('http://localhost:3002');

const App = () => {
  const dispatch = useDispatch();

  const { successMessage, errorMessage } = useSelector(
    (state) => state.Reducers
  );

  //   useEffect(() => {
  //     socket.on('GetPermissions', (data) => dispatch(setPermission(role, data)));
  //     socket.on('event', (data) => dispatch(setEvents(data)));
  //   }, [socket]);
  //   useEffect(() => {
  //     if (localStorage.getItem('token')) {
  //       dispatch(setProfile());
  //     }
  //   }, []);

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
      <Header />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/gallery" exact element={<Gallery />} />
        <Route path="/contactus" exact element={<Contactus />} />
        <Route path="/testimonial" exact element={<Testimonial />} />

        {/* <Route path="/map" exact element={<GoogleApiWrapper />}></Route> */}
      </Routes>
    </div>
  );
};

export default App;

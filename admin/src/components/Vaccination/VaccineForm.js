import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { loaderTrue, setErrorMessage, loaderFalse } from '../../action';
import { ThreeDots } from 'react-loader-spinner';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Web3 from 'web3';
import moment from 'moment';

import { createvaccination, listvaccine, timeList } from './action';
import { hospitalList } from '../Consultation/action';

const VaccineForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [timeset, setTimeset] = useState([]);

  useEffect(() => {
    dispatch(listvaccine());
    dispatch(hospitalList());
  }, []);

  const { vaccines, time } = useSelector((state) => state.vaccineReducers);
  const { hospitals } = useSelector((state) => state.consultationReducer);
  const { loader } = useSelector((state) => state.Reducers);

  const formik = useFormik({
    initialValues: {
      hospital: '',
      vaccine: '',
      date: '',
      time: '',
    },
    validationSchema: Yup.object({
      hospital: Yup.string().required('Hospital is required'),
      vaccine: Yup.string().required('Vaccine is required'),
      date: Yup.date().required('Date is required'),
      time: Yup.string().required('Time is required'),
    }),
    onSubmit: async (values) => {
      try {
        dispatch(loaderTrue());
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const web3 = new Web3(window.ethereum);
        const accounts = await web3.eth.getAccounts();
        const netVer = await web3.eth.net.getId();
        localStorage.setItem('walletAddress', accounts[0]);
        // const wrapper = await wrappedTokenDeposit({
        //   web3,
        //   address: accounts[0],
        //   netVer,
        // });
        const tokenAddress = '0x0972E20313E96Fa2c0078f7341A4353847641ED6';
        const toWei = async (web3, amount, decimals) => {
          return await web3.utils.toWei(
            parseFloat(amount).toFixed(decimals).toString(),
            'ether'
          );
        };
        const getGasPrice = async (web3) => {
          const gasPrice = await web3.eth.getGasPrice();
          return web3.utils.toBN(gasPrice).add(web3.utils.toBN('20000000000'));
        };
        const AmountInWei = await toWei(web3, 0.001, 18);
        const GetGasPricesss = await getGasPrice(web3);
        const result = await web3.eth.sendTransaction({
          from: accounts[0],
          to: tokenAddress,
          value: AmountInWei,
          GetGasPricesss,
        });
        if (result) {
          const finalvalues = {
            ...values,
            transactionHash: result.transactionHash,
          };
          dispatch(createvaccination(finalvalues, navigate));
        } else {
          dispatch(loaderFalse());
          console.log('error');
        }
        // Handle success case
      } catch (error) {
        // Handle error case
        console.log('error', error);
      }

      // Perform any necessary actions with the form values
      // and navigate to the next page or perform other operations
    },
  });

  //   useEffect(() => {
  //     if (formik.values.date) {
  //       dispatch(timeList(formik.values.date));
  //     }
  //   }, [formik.values.date]);

  useEffect(() => {
    generateTimeSlots(formik.values.date);
  }, [formik.values.date]);
  console.log('time', time);
  useEffect(() => {
    if (time) {
      const timer = timeset?.filter(
        (eachTime) => !time?.some((e) => e.time === eachTime)
      );

      setTimeset(timer);
    }
  }, [vaccines]);

  const generateTimeSlots = (date) => {
    const currentTime = moment();
    const eveningTime = moment()
      .endOf('day')
      .set({ hour: 17, minute: 0, second: 0 });
    const timeSlots = [];

    const selectedDate = moment(date);
    const isToday = selectedDate.isSame(currentTime, 'day');

    if (isToday) {
      currentTime.startOf('hour').add(1, 'hour'); // Start from the next hour
    } else {
      currentTime.set({ hour: 10, minute: 0, second: 0 });
    }

    while (currentTime.isBefore(eveningTime)) {
      const formattedTime = currentTime.format('hh:mmA');
      if (
        formattedTime !== '01:00PM' &&
        formattedTime !== '01:15PM' &&
        formattedTime !== '01:30PM' &&
        formattedTime !== '01:45PM'
      ) {
        timeSlots.push(formattedTime);
      }
      currentTime.add(15, 'minutes').startOf('minutes');
    }

    setTimeset(timeSlots);
    return timeSlots;
  };

  return (
    <React.Fragment>
      <div className="container mb-6 headd">
        {/* <div
          style={{
            maxWidth: '600px',
            margin: '0 auto',
            marginTop: '5rem',
          }}
        >
          <img
            src="https://cdni.iconscout.com/illustration/premium/thumb/doctor-injecting-vaccine-shot-in-boy-5066997-4226659.png?f=webp"
            alt="..."
            className="img-fluid"
          /> */}
        <h2 className="mt-3">Book an Vaccination</h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="form-group">
            <label htmlFor="vaccine">Vaccine</label>
            <select
              id="vaccine"
              name="vaccine"
              className="form-control"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.vaccine}
            >
              <option value="">Select a vaccine</option>
              {vaccines?.map((data) => (
                <option key={data.id} value={data.id}>
                  {data.name}
                </option>
              ))}
            </select>
            {formik.touched.vaccine && formik.errors.vaccine && (
              <div className="error text-danger">{formik.errors.vaccine}</div>
            )}
          </div>
          <div className="form-group">
            <label>Hospital</label>
            <select
              id="hospital"
              name="hospital"
              className="form-control"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.hospital}
            >
              <option value="">Select a hospital</option>
              {hospitals?.map((data) => (
                <option key={data.id} value={data.id}>
                  {data.name}
                </option>
              ))}
            </select>
            {formik.touched.hospital && formik.errors.hospital && (
              <div className="error text-danger">{formik.errors.hospital}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="date">Date</label>
            <input
              id="date"
              name="date"
              type="date"
              className="form-control"
              min={new Date().toISOString()?.split('T')[0]}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.date}
            />
            {formik.touched.date && formik.errors.date && (
              <div className="error text-danger">{formik.errors.date}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="time">Time</label>
            <select
              id="time"
              name="time"
              className="form-control"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.time}
            >
              <option value="">Select a time slot</option>
              {timeset.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
            {formik.touched.time && formik.errors.time && (
              <div className="error text-danger">{formik.errors.time}</div>
            )}
          </div>
          <div className="col-md-12">
            {loader ? (
              <ThreeDots
                height="80"
                width="80"
                radius="9"
                color="##2596be"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClassName=""
                visible={true}
              />
            ) : (
              <button type="submit" className="btn btn-primary mt-3">
                Submit
              </button>
            )}
          </div>
        </form>
      </div>
      {/* </div> */}
    </React.Fragment>
  );
};

export default VaccineForm;

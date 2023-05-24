import React, { useState, useEffect } from 'react';
import Joi from 'joi';
import { useDispatch, useSelector } from 'react-redux';
import { ThreeDots } from 'react-loader-spinner';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { loaderTrue, setErrorMessage, loaderFalse } from '../../action';

import {
  hospitalList,
  doctorsList,
  timesList,
  departmentList,
  consultationAdd,
} from './action';
import Web3 from 'web3';
import moment from 'moment';

const Consultation = () => {
  const [errors, setErrors] = useState({});
  const [hospital, setHospital] = useState('');
  const [department, setDepartment] = useState('');
  const [doctor, setDoctor] = useState('');
  const [time, setTime] = useState('');
  const [timeset, setTimeset] = useState();
  const [date, setDate] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { loader } = useSelector((state) => state.Reducers);

  const { doctors, departments, hospitals, Times } = useSelector(
    (e) => e.consultationReducer
  );
  const schema = Joi.object({
    hospital: Joi.string().required(),
    department: Joi.string().required(),
    doctor: Joi.string().required(),
    time: Joi.string().required(),
    date: Joi.string().required(),
  });

  useEffect(() => {
    dispatch(departmentList());
  }, []);
  useEffect(() => {
    dispatch(hospitalList());
  }, []);
  useEffect(() => {
    if (hospital && department) {
      const { hospitalId } = hospitals.find(
        (eachHospital) => eachHospital.id === hospital
      );
      const { departmentId } = departments.find(
        (eachdept) => eachdept.id === department
      );
      // console.log(hId, dId);
      dispatch(doctorsList({ hospitalId, departmentId }));
    }
  }, [hospital, department]);

  useEffect(() => {
    if (date && doctor) {
      console.log(doctor);
      const doctorId = doctors.find((eachDoctor) => eachDoctor.id === doctor);

      dispatch(timesList({ doctorId: doctorId.id, date }));
    }
    generateTimeSlots(date);
  }, [date, doctor]);

  useEffect(() => {
    if (Times) {
      const timer = timeset?.filter(
        (eachTime) => !Times.some((e) => e.time === eachTime)
      );

      setTimeset(timer);
    }
  }, [Times]);

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
      if (formattedTime !== '01:00PM') {
        timeSlots.push(formattedTime);
      }
      currentTime.add(1, 'hour').startOf('hour');
    }

    setTimeset(timeSlots);
    return timeSlots;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let filteredDepartmentId; // Use the current state value by default
    let filteredHospitalId;

    if (name === 'hospital') {
      const filteredHospital = hospitals?.find(
        (hospital) => hospital.name === value
      );
      setHospital(value);
      filteredHospitalId = filteredHospital
        ? filteredHospital.hospitalId
        : null;
    }

    if (name === 'department') {
      const filteredDepartment = departments?.find(
        (department) => department.name === value
      );
      setDepartment(value);
      filteredDepartmentId = filteredDepartment
        ? filteredDepartment.departmentId
        : null;
    } else {
      setDoctor(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error } = schema.validate(
      { hospital, department, doctor, time, date },
      { abortEarly: false }
    );
    if (error) {
      const validationErrors = {};
      error.details.forEach((detail) => {
        validationErrors[detail.context.label] = detail.message;
      });
      setErrors(validationErrors);
    } else {
      dispatch(loaderTrue());
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const web3 = new Web3(window.ethereum);
        const accounts = await web3.eth.getAccounts();
        const netVer = await web3.eth.net.getId();

        const tokenAddress = '0x18673264427402acf57E7AE218403d3f60daba0c';

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
          dispatch(
            consultationAdd(
              { hospital, department, doctor, time, date, result },
              navigate
            )
          );
        }
      } catch (e) {
        dispatch(setErrorMessage(`${e.message}`));
        dispatch(loaderFalse());
      }
    }
  };
  return (
    <div>
      <section className="vh-100 gradient-custom">
        <div className="container py-5 h-100">
          <div className="row justify-content-center align-items-center h-100">
            <div className="col-12 col-lg-9 col-xl-7">
              <div
                className="card shadow-2-strong card-registration"
                style={{ borderRadius: ' 15px' }}
              >
                <div className="card-body p-4 p-md-5">
                  <h3
                    className="mb-4 pb-2 pb-md-0 mb-md-5"
                    style={{ marginLeft: '25%', color: '#1874a5' }}
                  >
                    Consultation Booking
                  </h3>
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-md-12 mb-4">
                        <div className="form-outline">
                          <label className="form-label" htmlFor="hospital">
                            Hospital
                          </label>
                          <select
                            className={`form-control form-control-lg ${
                              errors.hospital && 'is-invalid'
                            }`}
                            id="hospital"
                            name="hospital"
                            value={hospital}
                            onChange={handleChange}
                          >
                            <option value="">--Select hospital--</option>
                            {hospitals?.map((hospitalDatas, index) => {
                              return (
                                <option key={index} value={hospitalDatas?.id}>
                                  {hospitalDatas?.name}
                                </option>
                              );
                            })}
                          </select>

                          {errors.hospital && (
                            <div className="invalid-feedback">
                              {errors.hospital}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="col-md-12 mb-4">
                        <div className="form-outline">
                          <label className="form-label" htmlFor="department">
                            Department
                          </label>
                          <select
                            className={`form-control form-control-lg ${
                              errors.department && 'is-invalid'
                            }`}
                            id="department"
                            name="department"
                            value={department}
                            onChange={handleChange}
                          >
                            <option value="">--Select department--</option>
                            {departments?.map((departmentDatas, index) => {
                              return (
                                <option key={index} value={departmentDatas?.id}>
                                  {departmentDatas?.name}
                                </option>
                              );
                            })}
                          </select>

                          {errors.department && (
                            <div className="invalid-feedback">
                              {errors.department}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="col-md-12 mb-4">
                        <div className="form-outline">
                          <label className="form-label" htmlFor="doctor">
                            Doctor
                          </label>
                          <select
                            id="doctor"
                            name="doctor"
                            value={doctor}
                            onChange={handleChange}
                            className={`form-control form-control-lg ${
                              errors.doctor && 'is-invalid'
                            }`}
                          >
                            <option value="">--Select doctor--</option>
                            {doctors?.map((doctorDatas, index) => {
                              return (
                                <option key={index} value={doctorDatas?.id}>
                                  {doctorDatas?.name}
                                </option>
                              );
                            })}
                          </select>

                          {errors.doctor && (
                            <div className="invalid-feedback">
                              {errors.doctor}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12 mb-4">
                      <div className="form-outline">
                        <label className="form-label" htmlFor="date">
                          Date
                        </label>
                        <input
                          type="date"
                          id="date"
                          name="date"
                          min={new Date().toISOString()?.split('T')[0]}
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                          className={`form-control form-control-lg ${
                            errors.date && 'is-invalid'
                          }`}
                        />

                        {errors.date && (
                          <div className="invalid-feedback">{errors.date}</div>
                        )}
                      </div>
                    </div>
                    <div className="col-md-12 mb-4">
                      <div className="form-outline">
                        <label className="form-label" htmlFor="time">
                          Time
                        </label>
                        <select
                          name="time"
                          id="time"
                          className={`form-control form-control-lg ${
                            errors.time && 'is-invalid'
                          }`}
                          value={time}
                          onChange={(e) => setTime(e.target.value)}
                        >
                          <option value="">select one</option>
                          {timeset?.map((e, index) => {
                            return (
                              <option key={index} value={e}>
                                {e}
                              </option>
                            );
                          })}
                        </select>

                        {errors.time && (
                          <div className="invalid-feedback">{errors.time}</div>
                        )}
                      </div>
                    </div>
                    <div className="row">
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
                          <button
                            className="btn btn-primary btn-lg"
                            type="submit"
                          >
                            Book now
                          </button>
                        )}
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Consultation;

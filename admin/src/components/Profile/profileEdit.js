import React, { useState, useEffect } from 'react';
import Joi from 'joi';
import { useDispatch, useSelector } from 'react-redux';
import { getProfileById, profileList } from './action';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { editdata } from '../../api/service';

const ProfileEdit = ({ id, onHide }) => {
  //   console.log(onHide);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    aadhar: '',
    email: '',
    phoneNumber: '',
    birthdayDate: '',
    address: '',
    country: '',
    state: '',
    pincode: '',
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { profileView } = useSelector((state) => state.profileReducer);
  console.log(profileView);
  const schema = Joi.object({
    name: Joi.string().required(),
    aadhar: Joi.string()
      .pattern(/^[0-9]{12}$/)
      .required()
      .messages({
        'string.pattern.base': 'Aadhar Number must be a 12-digit number',
      }),
    email: Joi.string().email({ tlds: false }).required(),
    phoneNumber: Joi.string()
      .pattern(/^[0-9]{10}$/)
      .required()
      .messages({
        'string.pattern.base': 'Phone Number must be a 10-digit number',
      }),
    birthdayDate: Joi.string().required(),
    address: Joi.string().required(),
    country: Joi.string().required(),
    state: Joi.string().required(),

    pincode: Joi.string()
      .pattern(/^[0-9]{6}$/)
      .required()
      .messages({
        'string.pattern.base': 'Pincode must be a 6-digit number',
      }),
  });
  useEffect(() => {
    if (id) {
      dispatch(getProfileById(id));
    }
  }, []);
  console.log(profileView);
  useEffect(() => {
    if (profileView) {
      setFormData({
        name: id ? profileView?.name : '',
        aadhar: id ? profileView?.aadharNumber : '',
        email: id ? profileView?.login?.email : '',
        phoneNumber: id ? profileView?.phoneNumber : '',
        birthdayDate: id ? profileView?.dob : '',
        address: id ? profileView?.address : '',
        country: id ? profileView?.country : '',
        state: id ? profileView?.state : '',
        pincode: id ? profileView?.pinCode : '',
      });
    }
  }, [profileView]);
  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.target;
    const formData = {
      name: form.name.value,
      aadhar: form.aadhar.value,
      email: form.email.value,
      phoneNumber: form.phoneNumber.value,
      birthdayDate: form.birthdayDate.value,
      address: form.address.value,
      country: form.country.value,
      state: form.state.value,

      pincode: form.pincode.value,
    };

    const { error } = schema.validate(formData, { abortEarly: false });

    if (!error) {
      console.log('Form data is valid:', formData);
      try {
        // Handle success case
        if (id) {
          editdata('/profile', id, formData).then(() => {
            dispatch(profileList());
            onHide();
          });
          navigate('/profile');
        }
      } catch (error) {
        // Handle error case
      }
    } else {
      const validationErrors = {};
      error.details.forEach((error) => {
        validationErrors[error.context.key] = error.message;
      });
      setErrors(validationErrors);
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
                    Basic Information
                  </h3>
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <input
                            type="text"
                            id="name"
                            value={formData.name}
                            onChange={handleChange}
                            className={`form-control form-control-lg ${
                              errors.name && 'is-invalid'
                            }`}
                          />
                          <label className="form-label" for="name">
                            Name
                          </label>
                          {errors.name && (
                            <div className="invalid-feedback">
                              {errors.name}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <input
                            type="text"
                            id="aadhar"
                            value={formData.aadhar}
                            onChange={handleChange}
                            className={`form-control form-control-lg ${
                              errors.aadhar && 'is-invalid'
                            }`}
                          />
                          <label className="form-label" for="aadhar">
                            Aadhar Number
                          </label>
                          {errors.aadhar && (
                            <div className="invalid-feedback">
                              {errors.aadhar}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6 mb-4 pb-2">
                        <div className="form-outline">
                          <input
                            type="email"
                            id="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`form-control form-control-lg ${
                              errors.email && 'is-invalid'
                            }`}
                          />
                          <label className="form-label" for="email">
                            Email
                          </label>
                          {errors.email && (
                            <div className="invalid-feedback">
                              {errors.email}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="col-md-6 mb-4 pb-2">
                        <div className="form-outline">
                          <input
                            type="tel"
                            id="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            className={`form-control form-control-lg ${
                              errors.phoneNumber && 'is-invalid'
                            }`}
                          />
                          <label className="form-label" for="phoneNumber">
                            Phone Number
                          </label>
                          {errors.phoneNumber && (
                            <div className="invalid-feedback">
                              {errors.phoneNumber}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6 mb-4 d-flex align-items-center">
                        <div className="form-outline datepicker w-100">
                          <input
                            type="date"
                            className={`form-control form-control-lg ${
                              errors.birthdayDate && 'is-invalid'
                            }`}
                            id="birthdayDate"
                            value={formData.birthdayDate}
                            onChange={handleChange}
                          />
                          <label for="birthdayDate" className="form-label">
                            DOB
                          </label>
                          {errors.birthdayDate && (
                            <div className="invalid-feedback">
                              {errors.birthdayDate}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="col-md-6 mb-4 pb-2">
                        <div className="form-outline">
                          <input
                            type="text"
                            id="address"
                            value={formData.address}
                            onChange={handleChange}
                            className={`form-control form-control-lg ${
                              errors.address && 'is-invalid'
                            }`}
                          />
                          <label className="form-label" for="address">
                            Address
                          </label>
                          {errors.address && (
                            <div className="invalid-feedback">
                              {errors.address}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6 mb-4 d-flex align-items-center">
                        <div className="form-outline datepicker w-100">
                          <input
                            type="text"
                            className={`form-control form-control-lg ${
                              errors.country && 'is-invalid'
                            }`}
                            id="country"
                            value={formData.country}
                            onChange={handleChange}
                          />
                          <label for="country" className="form-label">
                            Country
                          </label>
                          {errors.country && (
                            <div className="invalid-feedback">
                              {errors.country}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="col-md-6 mb-4 pb-2">
                        <div className="form-outline">
                          <input
                            type="text"
                            id="state"
                            value={formData.state}
                            onChange={handleChange}
                            className={`form-control form-control-lg ${
                              errors.state && 'is-invalid'
                            }`}
                          />
                          <label className="form-label" for="state">
                            State
                          </label>
                          {errors.state && (
                            <div className="invalid-feedback">
                              {errors.state}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6 mb-4 d-flex align-items-center">
                        <div className="form-outline datepicker w-100">
                          <input
                            type="text"
                            className={`form-control form-control-lg ${
                              errors.pincode && 'is-invalid'
                            }`}
                            id="pincode"
                            value={formData.pincode}
                            onChange={handleChange}
                          />
                          <label for="pincode" className="form-label">
                            Pincode
                          </label>
                          {errors.pincode && (
                            <div className="invalid-feedback">
                              {errors.pincode}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 pt-2">
                      <input
                        className="btn btn-success btn-lg"
                        type="submit"
                        value="Submit"
                      />
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

export default ProfileEdit;

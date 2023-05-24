import React, { useState } from 'react';
import Joi from 'joi';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { contactAdd } from './action';

function Contactus() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const schema = Joi.object({
    name: Joi.string().required().label('Name'),
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .label('Email'),
    phone: Joi.string().required().label('Phone'),
    message: Joi.string().required().label('Message'),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { name, email, phone, message };
    const { error } = schema.validate(data, { abortEarly: false });

    if (error) {
      const newErrors = {};
      error.details.forEach((errorDetail) => {
        newErrors[errorDetail.context.key] = errorDetail.message;
      });
      setErrors(newErrors);
    } else {
      dispatch(
        contactAdd(
          {
            name: name,
            email: email,
            message: message,
            phoneNumber: phone,
          },
          navigate
        )
      );
    }
  };
  return (
    <div
      className="contact2"
      style={{
        background:
          'url(https://www.wrappixel.com/demos/ui-kit/wrapkit/assets/images/contact/map.jpg)',
      }}
      id="contact"
    >
      <div className="container">
        <div className="row contact-container">
          <div className="col-lg-12">
            <div className="card card-shadow border-0 mb-4">
              <div className="row">
                <div className="col-lg-8">
                  <div className="contact-box p-4">
                    <h4 className="title">Contact Us</h4>
                    <form onSubmit={handleSubmit}>
                      <div className="row">
                        <div className="col-lg-6">
                          <div className="form-group mt-3">
                            <input
                              className="form-control"
                              type="text"
                              placeholder="name"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                            />
                            {errors.name && (
                              <div className="error text-danger">
                                {errors.name}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group mt-3">
                            <input
                              className="form-control"
                              type="text"
                              placeholder="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                            />
                            {errors.email && (
                              <div className="error text-danger">
                                {errors.email}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group mt-3">
                            <input
                              className="form-control"
                              type="text"
                              placeholder="phone"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                            />
                            {errors.phone && (
                              <div className="error text-danger">
                                {errors.phone}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="col-lg-12">
                          <div className="form-group mt-3">
                            <input
                              className="form-control"
                              type="text"
                              placeholder="message"
                              value={message}
                              onChange={(e) => setMessage(e.target.value)}
                            />
                            {errors.message && (
                              <div className="error text-danger">
                                {errors.message}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <button
                            type="submit"
                            className="btn btn-danger-gradiant mt-3 mb-3 text-white border-0 py-2 px-3"
                          >
                            <span>
                              {' '}
                              SUBMIT NOW <i className="ti-arrow-right"></i>
                            </span>
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <div
                  className="col-lg-4 bg-image"
                  style={{
                    background:
                      'url(https://www.wrappixel.com/demos/ui-kit/wrapkit/assets/images/contact/1.jpg)',
                  }}
                >
                  <div className="detail-box p-4">
                    <h5 className="text-white font-weight-light mb-3">
                      ADDRESS
                    </h5>
                    <p className="text-white op-7">
                      601 Sherwood Ave.
                      <br /> San Bernandino
                    </p>
                    <h5 className="text-white font-weight-light mb-3 mt-4">
                      CALL US
                    </h5>
                    <p className="text-white op-7">
                      251 546 9442
                      <br /> 630 446 8851
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contactus;

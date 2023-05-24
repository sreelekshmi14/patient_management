import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginall } from './action';
import { useNavigate } from 'react-router-dom';
import { ThreeDots } from 'react-loader-spinner';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const emailRegex = /^\S+@\S+\.\S+$/;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loader } = useSelector((state) => state.Reducers);
  console.log(loader);
  const handleSubmit = (event) => {
    event.preventDefault();

    // validate email and password
    if (!emailRegex.test(email)) {
      setEmailError('Invalid email');
    } else {
      setEmailError('');
    }

    if (!password) {
      setPasswordError('Password Required');
    } else {
      setPasswordError('');
    }

    if (emailRegex.test(email) && password) {
      // perform login logic
      dispatch(
        loginall(
          {
            email: email,
            password: password,
          },
          navigate
        )
      );
    }
  };

  return (
    <div>
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card shadow-2-strong" style={{ border: '1rem' }}>
              <div className="card-body p-5 text-center">
                <h3 className="mb-5">Sign in</h3>
                <form onSubmit={handleSubmit}>
                  <div className="form-outline mb-4">
                    <div>
                      <img
                        width="30"
                        height="30"
                        src="https://img.icons8.com/nolan/64/gmail-new.png"
                        alt="gmail-new"
                      />
                      <label className="form-label" htmlFor="typeEmailX-2">
                        Email
                      </label>
                    </div>

                    <input
                      type="email"
                      id="typeEmailX-2"
                      className="form-control form-control-lg"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                    />
                    {emailError && (
                      <span className="text-danger">{emailError}</span>
                    )}
                  </div>

                  <div className="form-outline mb-4">
                    <div>
                      <img
                        width="20"
                        height="20"
                        src="https://img.icons8.com/office/16/lock-2.png"
                        alt="lock-2"
                      />
                      <label className="form-label" htmlFor="typePasswordX-2">
                        Password
                      </label>
                    </div>

                    <input
                      type="password"
                      id="typePasswordX-2"
                      className="form-control form-control-lg"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                    />
                    {passwordError && (
                      <span className="text-danger">{passwordError}</span>
                    )}
                  </div>

                  <div>
                    <p className="mb-0">
                      Don't have an account?{' '}
                      <a href="/signup" className="text-dark-50 fw-bold">
                        Sign Up
                      </a>
                    </p>
                  </div>
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
                      className="btn btn-outline-info btn-lg btn-block"
                      type="submit"
                    >
                      Login
                    </button>
                  )}
                </form>

                <hr className="my-4" />

                <div>
                  <a href="http://localhost:3000/" className="text-dark-50 ">
                    Back to{' '}
                    <img src="https://img.icons8.com/ultraviolet/15/null/home--v1.png" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

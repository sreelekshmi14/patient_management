import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../action/index';

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let role = localStorage.getItem('role');

  return (
    <div>
      <div className="s-layout">
        <div className="s-layout__sidebar">
          <a className="s-sidebar__trigger" href="#0">
            <i className="fa fa-bars"></i>
          </a>

          <nav className="s-sidebar__nav">
            <ul>
              <li>
                <Link
                  className="s-sidebar__nav-link"
                  to="/dashboard"
                  style={{ color: 'white' }}
                >
                  <i className="fa fa-home"></i>
                  <em>Dashboard</em>
                </Link>
              </li>
              {role === 'patient' ? (
                <li>
                  <Link
                    className="s-sidebar__nav-link"
                    to="/profile"
                    style={{ color: 'white' }}
                  >
                    <i class="fa fa-solid fa-user"></i>
                    <em>Profile</em>
                  </Link>
                </li>
              ) : null}

              <li>
                <Link
                  className="s-sidebar__nav-link"
                  to="/consultation"
                  style={{ color: 'white' }}
                >
                  <i className="fa fa-solid fa-user-doctor"></i>
                  <em>Consultation</em>
                </Link>
              </li>

              <li>
                <Link
                  className="s-sidebar__nav-link"
                  to="/vaccination"
                  style={{ color: 'white' }}
                >
                  <i className="fa fa-solid fa-syringe"></i>
                  <em>Vaccination</em>
                </Link>
              </li>
              {role === 'admin' ? (
                <li>
                  <Link
                    className="s-sidebar__nav-link"
                    to="/patients"
                    style={{ color: 'white' }}
                  >
                    <i className="fa fa-solid fa-syringe"></i>
                    <em>Patient</em>
                  </Link>
                </li>
              ) : null}
              {role === 'admin' ? (
                <li>
                  <Link
                    className="s-sidebar__nav-link"
                    to="/enquiry"
                    style={{ color: 'white' }}
                  >
                    <i className="fa  fa-comments"></i>
                    <em>Message</em>
                  </Link>
                </li>
              ) : null}

              <li>
                <Link
                  className="s-sidebar__nav-link"
                  to="/transaction"
                  style={{ color: 'white' }}
                >
                  <i className="fa fa-credit-card"></i>
                  <em>Transaction history</em>
                </Link>
              </li>

              <li>
                <Link
                  className="s-sidebar__nav-link"
                  to="/changepassword"
                  style={{ color: 'white' }}
                >
                  <i className="fa fa-key"></i>
                  <em>Change password</em>
                </Link>
              </li>
              <li>
                <Link
                  className="s-sidebar__nav-link"
                  style={{ color: 'white' }}
                  onClick={() => dispatch(logout(navigate))}
                >
                  <i className="fa fa-lock"></i>

                  <em> LogOut</em>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

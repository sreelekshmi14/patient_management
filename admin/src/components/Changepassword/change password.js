import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { updatePassword } from './action';

const ChangePassword = () => {
  const dispatch = useDispatch();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const inputStyles = {
    width: '100%',
    border: '1px solid #ccc',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px',
    color: '#333',
    fontWeight: 'normal',
    fontSize: '16px',
    lineHeight: '1.5',
    outline: 'none',
  };

  const buttonStyles = {
    padding: '10px',
    backgroundColor: '#007bff',
    color: '#fff',
    borderRadius: '5px',
    fontWeight: 'bold',
    fontSize: '16px',
    lineHeight: '1.5',
    cursor: 'pointer',
  };

  return (
    <div style={{ padding: '20px', display: 'flex', justifyContent: 'center' }}>
      <div
        style={{
          padding: '20px',
          backgroundColor: '#fff',
          borderRadius: '10px',
          width: '50%',
        }}
      >
        <div
          style={{
            fontSize: '24px',
            fontWeight: 'bold',
            textAlign: 'center',
            paddingBottom: '20px',
          }}
        >
          Change Password
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <input
            value={currentPassword}
            onChange={({ target: { value } }) => setCurrentPassword(value)}
            type="password"
            style={inputStyles}
            placeholder="Current Password"
          />
          <input
            value={newPassword}
            onChange={({ target: { value } }) => setNewPassword(value)}
            type="password"
            style={inputStyles}
            placeholder="New Password"
          />
          <input
            value={confirmNewPassword}
            onChange={({ target: { value } }) => setConfirmNewPassword(value)}
            type="password"
            style={inputStyles}
            placeholder="Confirm New Password"
          />
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            paddingTop: '20px',
          }}
        >
          <button
            onClick={() =>
              dispatch(updatePassword({ currentPassword, newPassword }))
            }
            style={buttonStyles}
          >
            submit
          </button>
          <Link to="/dashboard" type="button" className="btn btn-info">
            cancel
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;

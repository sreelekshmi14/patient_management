import React, { useEffect, useState } from 'react';
import { profileList } from './action/index';
import Model from './profileModal';
import { useDispatch, useSelector } from 'react-redux';

const UserProfile = () => {
  const dispatch = useDispatch();
  const [showModal, setshowModal] = useState({
    showModal: false,
    id: '',
  });

  useEffect(() => {
    dispatch(profileList());
  }, []);
  const { profile } = useSelector((state) => state.profileReducer);

  return (
    <div
      style={{
        border: '1px solid #ccc',
        padding: '20px',
        borderRadius: '10px',
        backgroundColor: '#f5f5f5',
        maxWidth: '800px',
        margin: 'auto',
        marginTop: '50px',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
        }}
      >
        <div
          style={{
            fontSize: '25px',
            fontWeight: 'bold',
            color: '#2596be',
          }}
        >
          Basic Information
        </div>
        <div
          style={{ marginLeft: '2%' }}
          onClick={() =>
            setshowModal({
              showModal: true,
              id: profile?.id,
            })
          }
        >
          <i
            class="fa-solid fa-user-pen"
            style={{ fontSize: '24px', color: '#2596be', marginLeft: '3%' }}
          ></i>
        </div>
      </div>
      <div
        style={{
          fontSize: '15px',
          paddingBottom: '10px',
          color: '#4a5568',
        }}
      >
        Name: {profile?.name}
      </div>
      <div
        style={{
          fontSize: '15px',
          paddingBottom: '10px',
          color: '#4a5568',
        }}
      >
        Email: {profile?.login?.email}
      </div>
      <div
        style={{
          fontSize: '15px',
          paddingBottom: '10px',
          color: '#4a5568',
        }}
      >
        Aadhar: {profile?.aadharNumber}
      </div>
      <div
        style={{
          fontSize: '15px',
          paddingBottom: '10px',
          color: '#4a5568',
        }}
      >
        Phone: {profile?.phoneNumber}
      </div>
      <div
        style={{
          fontSize: '15px',
          paddingBottom: '10px',
          color: '#4a5568',
        }}
      >
        DOB: {profile?.dob}
      </div>
      <div
        style={{
          fontSize: '15px',
          paddingBottom: '10px',
          color: '#4a5568',
        }}
      >
        Address: {profile?.address}
      </div>
      <div
        style={{
          fontSize: '15px',
          paddingBottom: '10px',
          color: '#4a5568',
        }}
      >
        Country: {profile?.country}
      </div>
      <div
        style={{
          fontSize: '15px',
          paddingBottom: '10px',
          color: '#4a5568',
        }}
      >
        State: {profile?.state}
      </div>
      <div
        style={{
          fontSize: '15px',
          paddingBottom: '10px',
          color: '#4a5568',
        }}
      >
        Pincode: {profile?.pinCode}
      </div>
      <Model
        show={showModal.showModal}
        onHide={() => setshowModal({ showModal: false })}
        id={showModal.id}
      />
    </div>
  );
};

export default UserProfile;

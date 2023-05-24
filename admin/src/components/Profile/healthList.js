import React, { useEffect, useState } from 'react';
import { healthList } from './action/index';
import Model from './Modal';
import { useDispatch, useSelector } from 'react-redux';

const UserProfile = () => {
  const [showModal, setshowModal] = useState({
    showModal: false,
    id: '',
  });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(healthList());
  }, []);
  const { healthData } = useSelector((state) => state.profileReducer);

  return (
    <div
      style={{
        border: '1px solid #ccc',
        padding: '10px',
        borderRadius: '10px',
        backgroundColor: '#f5f5f5',
        // maxWidth: '300px',
        margin: 'auto',
        marginTop: '20px',
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
            fontSize: '20px',
            fontWeight: 'bold',
            color: '#2596be',
          }}
        >
          HealthInformation
        </div>
        <div
          style={{ margin: '2%' }}
          onClick={() =>
            setshowModal({
              showModal: true,
              id: healthData?.id,
            })
          }
        >
          <i
            class="fa-solid fa-pen-to-square"
            style={{ fontSize: '20px', color: '#2596be', margin: '2%' }}
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
        Blood Group :{healthData?.blood}
      </div>
      <div
        style={{
          fontSize: '15px',
          paddingBottom: '10px',
          color: '#4a5568',
        }}
      >
        Height :{healthData?.height}
      </div>
      <div
        style={{
          fontSize: '15px',
          paddingBottom: '10px',
          color: '#4a5568',
        }}
      >
        Weight :{healthData?.weight}
      </div>
      <div
        style={{
          fontSize: '15px',
          paddingBottom: '10px',
          color: '#4a5568',
        }}
      >
        Gender :{healthData?.gender}
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

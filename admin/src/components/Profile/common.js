import React, { useEffect, useState } from 'react';
import Sidebar from '../Dashboard/sidebar';
import HealthInfo from './healthInfo';
import { useDispatch, useSelector } from 'react-redux';
import ProfileView from './profile';
import HealthList from './healthList';

import DiseaseList from './Disease/diseaseList';

const DashboardMain = () => {
  const [form, setform] = useState(false);

  const { healthData, diseases } = useSelector((state) => state.profileReducer);

  useEffect(() => {
    if (healthData) {
      setform(false);
    }
  }, [healthData]);

  return (
    <div
      style={{
        display: 'flex',
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      <Sidebar />

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          padding: '20px',
          overflow: 'auto',
        }}
      >
        <ProfileView />

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '4%',
            color: '#1874a5',
          }}
        >
          {!healthData ? (
            <button
              style={{
                fontSize: '16px',
                background: '#1874a5',
               

                borderRadius: '5px',
                border: 'none',
                cursor: 'pointer',
                marginRight: '10px',
                height: '30px',
              }}
              onClick={() => setform(!form)}
            >
              HealthInfo
              {form ? <HealthInfo /> : null}
            </button>
          ) : (
            <HealthList />
          )}

          <div>
            <DiseaseList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardMain;

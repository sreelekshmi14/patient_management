import React, { useEffect } from 'react';
import { consultationList } from '../Consultation/action';
import { listvaccination } from '../Vaccination/action';
import { patientsList } from '../Patients/action';
import { useDispatch, useSelector } from 'react-redux';

const Dashboard = () => {
  const dispatch = useDispatch();

  const { patients } = useSelector((state) => state.patientReducer);
  const { vaccinedata } = useSelector((state) => state.vaccineReducers);
  const { consultations } = useSelector((state) => state.consultationReducer);
  let role = localStorage.getItem('role');
  useEffect(() => {
    dispatch(consultationList());
    dispatch(listvaccination());
    dispatch(patientsList());
  }, []);

  const count = Object.keys(patients).length;
  const countIn = Object.keys(vaccinedata).length;
  const countConsult = Object.keys(consultations).length;

  const counterAdmin = [
    { label: 'Patients', value: count },
    { label: 'Vaccinations', value: countIn },
    { label: 'Consultations', value: countConsult },
  ];
  const counterPatient = [
    { label: 'Vaccinations', value: countIn },
    { label: 'Consultations', value: countConsult },
  ];
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        position: 'fixed',
        top: '20px',
      }}
    >
      <div
        style={{
          fontSize: '24px',
          fontWeight: 'bold',
          textAlign: 'center',
          paddingBottom: '20px',
          color: '#2596be',
          //   justifyContent: 'flex-end',
        }}
      >
        Welcome, User!
      </div>
      {role === 'admin' ? (
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          {counterAdmin.map((counter) => (
            <div
              key={counter.label}
              style={{
                backgroundColor: '#f5f5f5',
                borderRadius: '10px',
                padding: '20px',
                marginLeft: '20px',
                boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <div style={{ fontSize: '36px', fontWeight: 'bold' }}>
                {counter.value}
              </div>
              <div
                style={{
                  fontSize: '18px',
                  color: '#4a5568',
                  marginTop: '10px',
                  textAlign: 'center',
                }}
              >
                {counter.label}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          {counterPatient.map((counter) => (
            <div
              key={counter.label}
              style={{
                backgroundColor: '#f5f5f5',
                borderRadius: '10px',
                padding: '20px',
                marginLeft: '20px',
                boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <div style={{ fontSize: '36px', fontWeight: 'bold' }}>
                {counter.value}
              </div>
              <div
                style={{
                  fontSize: '18px',
                  color: '#4a5568',
                  marginTop: '10px',
                  textAlign: 'center',
                }}
              >
                {counter.label}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;

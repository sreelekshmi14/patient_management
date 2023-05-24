import React, { useEffect } from 'react';
import Sidebar from '../Dashboard/sidebar';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import List from './VaccineTable';
import styled from 'styled-components';
import { ThreeDots } from 'react-loader-spinner';

const Listvaccine = () => {
  return (
    <>
      <div className="dashboard d-flex">
        <div>
          <Sidebar />
        </div>
        <div
          style={{
            flex: '1 1 auto',
            display: 'flex',
            flexFlow: 'column',
            height: '100vh',
            overflowY: 'scroll',
          }}
        >
          <div>
            <div className="intro text-center m-5 headd">
              <h2>Vaccination List</h2>
            </div>

            <div style={{ marginLeft: '10rem' }}>
              <List />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Listvaccine;

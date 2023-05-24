import React, { useEffect, useState } from 'react';

import { Link, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { patientsList } from './action/index';

import Sidebar from '../Dashboard/sidebar';
import DataTable from 'react-data-table-component';
import moment from 'moment';

// ==== style components =====//
const EventMain = styled.div`
  width: 80%;
  margin: 5% 30%;
  background-color: #fff;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  padding: 10px;
`;

const Title = styled.h3`
  color: #dc3545;
`;

const Button = styled(Link)`
  background-color: #28a745;
  color: #fff;
  border-radius: 5px;
  padding: 10px 20px;
  text-decoration: none;
  transition: all 0.2s ease-in-out;
  font-weight: 600;
  font-size: 16px;
  line-height: 1.5;
  cursor: pointer;

  &:hover {
    background-color: #218838;
    text-decoration: none;
  }
`;

const DataTableWrapper = styled.div`
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  padding: 20px;
`;

// DISPLAY
const PatientsList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(patientsList());
  }, []);

  const columns = [
    {
      name: 'Name',
      selector: (row) => row.name,
    },

    {
      name: 'Aadhar Number',
      selector: (row) => row.aadharNumber,
    },

    {
      name: 'Phone Number',
      selector: (row) => row.phoneNumber,
    },

    {
      name: 'Address',
      selector: (row) => row.address,
    },
    {
      name: 'DOB',
      selector: (row) => row.dob,
    },
  ];

  const { patients } = useSelector((state) => state.patientReducer);
  console.log(patients);

  return (
    <div className="d-flex ">
      <Sidebar />
      <EventMain>
        <div className="">
          <Title className="text-danger">Patients</Title>
        </div>

        <DataTableWrapper className="mt-5">
          <DataTable columns={columns} data={patients ? patients : []} />
        </DataTableWrapper>
      </EventMain>
    </div>
  );
};

export default PatientsList;

import React, { useEffect, useState } from 'react';

import { Link, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { transList } from './action/index';

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
const TransList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(transList());
  }, []);
  const role = localStorage.getItem('role');
  const columns = [
    {
      name: 'Appointment Type',
      selector: (row) => row.appointmentType,
    },

    {
      name: 'Amount',
      selector: (row) => row.amount,
    },

    {
      name: 'Transaction Hash',
      selector: (row) => row.transactionHash,
    },
  ];

  const { trans } = useSelector((state) => state.transReducer);
  console.log(trans);

  return (
    <div className="d-flex ">
      <Sidebar />
      <EventMain>
        <div className="">
          <Title className="text-danger">Transaction History</Title>
        </div>

        <DataTableWrapper className="mt-5">
          <DataTable columns={columns} data={trans ? trans : []} />
        </DataTableWrapper>
      </EventMain>
    </div>
  );
};

export default TransList;

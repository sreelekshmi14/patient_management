import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import {
  consultationList,
  cancelconsultation,
  CertificateCreation,
} from './action';
import {
  setErrorMessage,
  setSuccessMessage,
  loaderTrue,
  loaderFalse,
} from '../../action';
import Sidebar from '../Dashboard/sidebar';
import DataTable from 'react-data-table-component';
import ConsultationCretificate from '../blockChain/ConsultationCretificate';
import Web3 from 'web3';
import { ThreeDots } from 'react-loader-spinner';

// ==== style components =====//
const EventMain = styled.div`
  width: 60%;
  margin: 5% 32%;
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
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent black */
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 500;
`;
// DISPLAY
const ConsultationList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loader } = useSelector((state) => state.Reducers);
  useEffect(() => {
    dispatch(consultationList());
  }, [dispatch]);

  let role = localStorage.getItem('role');
  const handleclick = (id) => {
    const datas = consultations;
    dispatch(cancelconsultation(id, datas));
  };
  const handleCertificate = async (item) => {
    try {
      dispatch(loaderTrue());
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const web3 = new Web3(window.ethereum);
      const accounts = await web3.eth.getAccounts();
      const netVer = await web3.eth.net.getId();
      localStorage.setItem('walletAddress', accounts[0]);
      console.log(item.time.slice(0, 5));

      const ConsultationDetail = await ConsultationCretificate({
        web3,
        address: accounts[0],
        netVer,
        values: {
          patientName: item.signup.name,
          patientUUID: item.signup.aadharNumber,
          patientRegId: item.signup.id,
          doctorName: item.doctor.name,
          consultationTime: new Date(
            `${item.date} ${item.time.slice(0, 5)}`
          ).getTime(),
          departmentName: item.department.name,
          hospitalName: item.hospital.name,
          issuerName: item.hospital.name,
          issuerId: item.hospital.id.slice(0, 32),
          issuedDateTime: new Date().getTime(),
        },
      });
      console.log(ConsultationDetail);
      dispatch(CertificateCreation(ConsultationDetail, navigate));
    } catch (err) {
      dispatch(setErrorMessage(`${err.message}`));
      dispatch(loaderFalse());
    }
  };
  const columns = [
    {
      name: 'Hospital',
      selector: (row) => row.hospital?.name,
    },
    {
      name: 'Department',
      selector: (row) => row.department?.name,
    },
    {
      name: 'Doctor',
      selector: (row) => row.doctor?.name,
    },
    {
      name: 'Time',
      selector: (row) => row.time,
    },
    {
      name: 'Date',
      selector: (row) => row.date,
    },
    {
      name: 'Status',
      selector: (row) => row.status,
    },
    {
      name: 'Action',
      cell: (row) => (
        <div className="d-flex">
          {row.status === 'pending' && role === 'patient' ? (
            <button
              className="btn btn-danger"
              onClick={() => {
                handleclick(row.id);
              }}
            >
              Cancel
            </button>
          ) : null}
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
    {
      name: 'Action',
      cell: (row) => (
        <div className="d-flex">
          {row.status === 'consulted' && role === 'admin' ? (
            <button
              onClick={() => {
                handleCertificate(row);
              }}
            >
              Certificate
            </button>
          ) : null}
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  const { consultations } = useSelector((state) => state.consultationReducer);

  return (
    <>
      {loader ? (
        <Overlay>
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
        </Overlay>
      ) : null}
      <div className="d-flex">
        <Sidebar />
        <EventMain>
          <div className="d-flex justify-content-between">
            <Title className="text-danger">Your Appointments</Title>
            {role === 'patient' ? (
              <div className="text-center">
                <Link to="/consultation/add" className="btn btn-success mt-4">
                  Add
                </Link>
              </div>
            ) : null}
          </div>

          <div className="mt-5">
            <DataTable
              columns={columns}
              data={consultations || []}
              pagination
              highlightOnHover
              pointerOnHover
            />
          </div>
        </EventMain>
      </div>
    </>
  );
};

export default ConsultationList;

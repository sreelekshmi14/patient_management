import { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
  setErrorMessage,
  setSuccessMessage,
  loaderTrue,
  loaderFalse,
} from '../../action';
import {
  cancelvaccination,
  listvaccination,
  CertificateCreation,
} from './action';
import styled from 'styled-components';
import Web3 from 'web3';
import VaccinationCertificate from '../blockChain/VaccinationCertificate';
import { ThreeDots } from 'react-loader-spinner';

const TableContainer = styled.div`
  width: 100%;
  max-width: 800px; /* Adjust the width as needed */
  margin: 0 auto;
`;

const CustomButton = styled(Button)`
  font-size: 18px;
  padding: 5px 10px;
  /* Add more custom styles as needed */
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
function List() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loader } = useSelector((state) => state.Reducers);

  let role = localStorage.getItem('role');
  useEffect(() => {
    dispatch(listvaccination());
  }, []);

  const { vaccinedata } = useSelector((state) => state.vaccineReducers);

  const handleClick = (id) => {
    const datas = vaccinedata;
    console.log('datas', datas);
    dispatch(cancelvaccination(id, datas));
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

      const VaccinationDetail = await VaccinationCertificate({
        web3,
        address: accounts[0],
        netVer,
        values: {
          patientName: item.signup.name,
          patientUUID: item.signup.aadharNumber,
          patientRegId: item.signup.id,
          vaccineName: item.vaccine.name,

          vaccineTakenDatetime: new Date(
            `${item.date} ${item.time.slice(0, 5)}`
          ).getTime(),
          disease: item.vaccine.disease,
          antigen: item.vaccine.antigen,

          issuerName: item.hospital.name,
          issuerId: item.hospital.id.slice(0, 32),
          issuedDateTime: new Date().getTime(),
        },
      });
      console.log(VaccinationDetail);
      dispatch(CertificateCreation(VaccinationDetail, navigate));
    } catch (e) {
      dispatch(setErrorMessage(`${e.message}`));
      dispatch(loaderFalse());
    }
  };

  const columns = [
    {
      name: 'Vaccine',
      selector: (row) => row.vaccine?.name,
      center: true,
    },
    {
      name: 'Hospital',
      selector: (row) => row.hospital?.name,
      center: true,
    },
    {
      name: 'Date',
      selector: (row) => row.date,
      center: true,
    },
    {
      name: 'Time',
      selector: (row) => row.time,
      center: true,
    },
    {
      name: 'Status',
      selector: (row) => row.status,
      center: true,
    },
    {
      name: 'Action',
      cell: (row) => (
        <div className="d-flex">
          {role === 'patient' && row.status === 'notTaken' ? (
            <CustomButton
              type="button"
              variant="danger"
              className="m-1"
              onClick={() => handleClick(row.id)}
              style={{ cursor: 'pointer' }}
            >
              <i className="fa-solid fa-ban"></i>
            </CustomButton>
          ) : null}
        </div>
      ),
      center: true,
    },
    {
      name: 'Action',
      cell: (row) => (
        <div className="d-flex">
          {role === 'admin' && row.status === 'taken' ? (
            <Button
              type="button"
              variant="primary"
              className="m-1"
              onClick={() => handleCertificate(row)}
              style={{ cursor: 'pointer' }}
            >
              Certificate
            </Button>
          ) : null}
        </div>
      ),
      center: true,
    },
  ];

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
      <TableContainer>
        {role === 'patient' ? (
          <div className="m-4">
            <Button variant="primary" as={Link} to="/vaccination/add">
              Add
            </Button>
          </div>
        ) : null}

        <DataTable
          columns={columns}
          data={vaccinedata ? vaccinedata : []}
          pagination
          theme="solarized"
        />
      </TableContainer>
    </>
  );
}

export default List;

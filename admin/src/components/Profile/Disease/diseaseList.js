import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { diseaseList } from '../action/index';
import { deleteData } from '../../../api/service';
import DiseaseAdd from './diseases';

import DataTable from 'react-data-table-component';

// ==== style components =====//
const EventMain = styled.div`
  width: 100%;
  margin: 2% 4%;
  background-color: #fff;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  padding: 20px;
`;

const Title = styled.h3`
  color: #dc3545;
`;

const Button = styled(Link)`
  background-color: #1874a5;
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
    background-color: white;
    text-decoration: none;
  }
`;

const DataTableWrapper = styled.div`
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  padding: 20px;
`;

// DISPLAY

const UserList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [disease, setDisease] = useState(false);
  useEffect(() => {
    dispatch(diseaseList());
  }, []);

  const columns = [
    {
      name: 'name',
      selector: (row) => row.diseaseName?.name,
    },

    {
      name: 'Action',
      selector: (row) => (
        <Link
          onClick={() => {
            deleteData('/disease', row.id).then(() => {
              dispatch(diseaseList());
            });
            navigate('/profile');
          }}
        >
          <i
            class="fa fa-thin fa-trash"
            style={{ color: '#76b5c5', fontSize: '20px' }}
          ></i>
        </Link>
      ),
    },

    {
      selector: (row) => (
        <Link to={`/disease/${row.id}`}>
          <i
            class="fa fa-regular fa-eye"
            style={{ color: '#76b5c5', fontSize: '20px' }}
          ></i>
        </Link>
      ),
    },
  ];

  const { diseases } = useSelector((state) => state.profileReducer);
  console.log(diseases);

  return (
    <div style={{}}>
      <EventMain>
        <div className="d-flex justify-content-between">
          <Title style={{ color: '#1874a5' }}>Diseases</Title>
          <div className="text-center">
            <Button className="btn " onClick={() => setDisease(!disease)}>
              <i class="fa fa-solid fa-plus"></i>
            </Button>
          </div>
        </div>

        {disease ? (
          <DiseaseAdd setDisease={setDisease} />
        ) : (
          <DataTableWrapper className="mt-5">
            <DataTable columns={columns} data={diseases ? diseases : []} />
          </DataTableWrapper>
        )}
      </EventMain>
    </div>
  );
};

export default UserList;

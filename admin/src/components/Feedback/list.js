import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Sidebar from '../Dashboard/sidebar';
import DataTable from 'react-data-table-component';
import { contactList } from './action';
import { deleteData } from '../../api/service';

// Styled Components
const EventMain = styled.div`
  width: 50%;
  margin: 8% 20%;
`;

const Feedback = () => {
  const dispatch = useDispatch();
  const { contactAll } = useSelector((state) => state.contactReducer);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(contactList());
  }, [dispatch]);

  const role = localStorage.getItem('role');

  const columns = [
    {
      name: 'Name',
      selector: (row) => row.name,
    },
    {
      name: 'Message',
      selector: (row) => row.message,
    },
    {
      name: 'Action',
      cell: (row) => (
        <div>
          <Link to={`/enquiry/${row.id}`} className="btn btn-info mr-2">
            View
          </Link>
          <button
            className="btn btn-danger"
            onClick={() => {
              deleteData('/contact', row.id).then(() => {
                dispatch(contactList());
              });
              navigate('/enquiry');
            }}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="d-flex">
      <Sidebar />
      <EventMain>
        <div className="d-flex justify-content-between">
          <h3 className="text-danger">Messages</h3>
        </div>

        <div className="mt-5">
          <DataTable columns={columns} data={contactAll || []} />
        </div>
      </EventMain>
    </div>
  );
};

export default Feedback;

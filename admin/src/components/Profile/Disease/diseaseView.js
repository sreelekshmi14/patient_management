import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { diseaseById } from '../action';
import { useDispatch, useSelector } from 'react-redux';

const FeedbackMain = styled.div`
  width: 50%;
  margin: 8% auto;
  background-color: #f5f5f5;
`;

const FeedbackContainer = styled.div`
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  font-family: Arial, sans-serif;
  font-size: 16px;
`;

const FeedbackHeading = styled.h2`
  margin-bottom: 20px;
  color: #063970;
`;

const FeedbackLabel = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #1e81b0;
`;

const FeedbackValue = styled.p`
  margin-bottom: 10px;
`;

const BackButton = styled(Link)`
  display: inline-block;
  margin-top: 10px;
  padding: 8px 16px;
  background-color: #ffa500;
  color: #fff;
  border-radius: 5px;
  text-decoration: none;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #ff8c00;
  }
`;

const TruckView = () => {
  const { id } = useParams(); // assuming the ID is passed as a parameter in the URL
  const dispatch = useDispatch();

  // Fetch feedback data using the ID
  useEffect(() => {
    dispatch(diseaseById(id));
  }, []);
  const { diseaseView } = useSelector((state) => state.profileReducer);
  console.log(diseaseView);

  return (
    <FeedbackMain>
      <FeedbackContainer>
        <FeedbackHeading>Disease Details</FeedbackHeading>
        <FeedbackLabel>Name:</FeedbackLabel>
        <FeedbackValue> {diseaseView?.diseaseName?.name}</FeedbackValue>
        <FeedbackLabel>Start Date:</FeedbackLabel>
        <FeedbackValue>{diseaseView?.startDate}</FeedbackValue>
        <FeedbackLabel>Remarks:</FeedbackLabel>
        <FeedbackValue>{diseaseView?.remarks}</FeedbackValue>

        <Link className="btn btn-warning" to="/profile">
          Back
        </Link>
      </FeedbackContainer>
    </FeedbackMain>
  );
};

export default TruckView;

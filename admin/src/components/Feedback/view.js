import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { getById } from './action';
import { useDispatch, useSelector } from 'react-redux';

const FeedbackMain = styled.div`
  width: 50%;
  margin: 8% 20%;
`;

const FeedbackContainer = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const FeedbackHeading = styled.h2`
  margin-bottom: 20px;
  color: #063970;
`;

const FeedbackLabel = styled.label`
  font-weight: bold;
  color: #1e81b0;
`;

const FeedbackValue = styled.p`
  margin-bottom: 10px;
`;

const FeedbackView = () => {
  const { id } = useParams(); // assuming the ID is passed as a parameter in the URL
  const dispatch = useDispatch();

  // Fetch feedback data using the ID
  useEffect(() => {
    dispatch(getById(id));
  }, []);
  const { contactView } = useSelector((state) => state.contactReducer);
  console.log(contactView);

  return (
    <FeedbackMain>
      <FeedbackContainer>
        <FeedbackHeading>Feedback Details</FeedbackHeading>
        <FeedbackLabel>Name:</FeedbackLabel>
        <FeedbackValue> {contactView.name}</FeedbackValue>
        <FeedbackLabel>Email:</FeedbackLabel>
        <FeedbackValue>{contactView.email}</FeedbackValue>
        <FeedbackLabel>Message:</FeedbackLabel>
        <FeedbackValue>{contactView.message}</FeedbackValue>
        <FeedbackLabel>Phonenumber:</FeedbackLabel>
        <FeedbackValue>{contactView.phoneNumber}</FeedbackValue>
        <Link className="btn btn-warning" to="/enquiry">
          Back
        </Link>
      </FeedbackContainer>
    </FeedbackMain>
  );
};

export default FeedbackView;

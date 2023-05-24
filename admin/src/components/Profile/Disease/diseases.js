import React, { useState, useEffect } from 'react';
import Joi from 'joi';
import { diseaseNameList, diseaseAdd } from '../action';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const DiseaseForm = (props) => {
  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [remarks, setRemarks] = useState('');
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { diseaseNames } = useSelector((state) => state.profileReducer);

  const validationSchema = Joi.object({
    name: Joi.string().required().label('Name'),
    startDate: Joi.date()
      .required()
      .label('Start Date')
      .max(new Date().toISOString().split('T')[0]),
    remarks: Joi.string().required().label('Remarks'),
  });

  useEffect(() => {
    dispatch(diseaseNameList());
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      name,
      startDate,
      remarks,
    };

    const validationResult = validationSchema.validate(formData, {
      abortEarly: false,
    });

    if (validationResult.error) {
      const validationErrors = {};
      validationResult.error.details.forEach((error) => {
        validationErrors[error.context.key] = error.message;
      });
      setErrors(validationErrors);
    } else {
      setErrors({});
      try {
        dispatch(diseaseAdd({ name, startDate, remarks }, navigate));
        props.setDisease(false);
      } catch (error) {
        // Handle error case
      }
    }
  };

  return (
    <div
      style={{
        border: '1px solid #ccc',
        padding: '20px',
        borderRadius: '10px',
        backgroundColor: '#f5f5f5',
        maxWidth: '400px',
        margin: 'auto',
        marginTop: '50px',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
      }}
    >
      <h2
        style={{ textAlign: 'center', marginBottom: '20px', color: '#1874a5' }}
      >
        Add Disease
      </h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="name">Name:</label>
          <select
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          >
            <option value="">Select</option>
            {diseaseNames?.map((disease, index) => {
              return (
                <option key={index} value={disease?.id}>
                  {disease?.name}
                </option>
              );
            })}
          </select>
          {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="startDate">Start Date:</label>
          <input
            type="date"
            id="startDate"
            value={startDate}
            // max={new Date().toISOString().split('T')[0]}
            onChange={(e) => setStartDate(e.target.value)}
          />
          {errors.startDate && (
            <p style={{ color: 'red' }}>{errors.startDate}</p>
          )}
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="remarks">Remarks:</label>
          <textarea
            id="remarks"
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
          ></textarea>
          {errors.remarks && <p style={{ color: 'red' }}>{errors.remarks}</p>}
        </div>
        <div style={{ textAlign: 'center' }}>
          <button type="submit" className="btn btn-success">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default DiseaseForm;

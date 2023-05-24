import React, { useState, useEffect } from 'react';
import Joi from 'joi';
import { healthInfoAdd, getById, healthList } from './action';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { editdata } from '../../api/service';

const UserProfileForm = ({ id, onHide }) => {
  const [blood, setblood] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [gender, setGender] = useState('');
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const { id } = useParams();
  const { healthView } = useSelector((state) => state.profileReducer);
  const validationSchema = Joi.object({
    blood: Joi.string().required().label('Blood Group'),
    height: Joi.string().required().label('Height'),
    weight: Joi.string().required().label('Weight'),
    gender: Joi.string()
      .valid('male', 'female', 'other')
      .required()
      .label('Gender'),
  });
  useEffect(() => {
    if (id) {
      dispatch(getById(id));
    }
  }, []);
  // console.log(healthView);
  useEffect(() => {
    if (healthView) {
      setblood(id ? healthView?.blood : '');

      setHeight(id ? healthView?.height : '');
      setWeight(id ? healthView?.weight : '');
      setGender(id ? healthView?.gender : '');
    }
  }, [healthView]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      blood,
      height,
      weight,
      gender,
    };

    const validationResult = validationSchema.validate(formData, {
      abortEarly: false,
    });

    if (validationResult.error) {
      // Handle validation errors
      const validationErrors = {};
      validationResult.error.details.forEach((error) => {
        validationErrors[error.context.key] = error.message;
      });
      setErrors(validationErrors);
    } else {
      // Clear errors and perform form submission logic here
      setErrors({});
      try {
        // Handle success case
        if (id) {
          editdata('/health', id, { blood, height, weight, gender }).then(
            () => {
              dispatch(healthList());
              onHide();
            }
          );
          navigate('/profile');
        } else {
          dispatch(healthInfoAdd({ blood, height, weight, gender }, navigate));
        }
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
        Health Info
      </h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="blood">Blood Group:</label>
          <select
            id="blood"
            value={blood}
            onChange={(e) => setblood(e.target.value)}
          >
            <option value="">Select</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
          </select>
          {errors.blood && <p style={{ color: 'red' }}>{errors.blood}</p>}
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="height">Height:</label>
          <input
            type="text"
            id="height"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
          {errors.height && <p style={{ color: 'red' }}>{errors.height}</p>}
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="weight">Weight:</label>
          <input
            type="text"
            id="weight"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
          {errors.weight && <p style={{ color: 'red' }}>{errors.weight}</p>}
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="gender">Gender:</label>
          <select
            id="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {errors.gender && <p style={{ color: 'red' }}>{errors.gender}</p>}
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

export default UserProfileForm;

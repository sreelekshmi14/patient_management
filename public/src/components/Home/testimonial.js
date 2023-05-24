import React, { useEffect, useState } from 'react';
import { contactList } from '../Home/Contactus/action';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Testimonial = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    // get events data from actions //
    dispatch(contactList());
  }, []);
  const { contactAll } = useSelector((state) => state.contactReducer);

  return (
    <section style={{ color: '#000', backgroundcolor: '#f3f2f2' }}>
      <div className="container py-2">
        <div className="row d-flex justify-content-center">
          <div className="col-md-10 col-xl-8 text-center">
            <h3 className="fw-bold mb-4" style={{ color: '#1979a9' }}>
              Testimonials
            </h3>
            <p className="mb-4 pb-2 mb-md-5 pb-md-0">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit,
              error amet numquam iure provident voluptate esse quasi, veritatis
              totam voluptas nostrum quisquam eum porro a pariatur veniam.
            </p>
          </div>
        </div>

        <div className="row text-center">
          {contactAll.map((contact) => (
            <div className="col-md-4 mb-4 mb-md-0" key={contact.id}>
              <div className="card">
                <div className="card-body py-4 mt-2">
                  <div className="d-flex justify-content-center mb-4">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(10).webp"
                      className="rounded-circle shadow-1-strong"
                      width="100"
                      height="100"
                    />
                  </div>
                  <h5 className="font-weight-bold">{contact.name}</h5>

                  <h6 className="mb-2">
                    <i className="fas fa-quote-left pe-2"></i>
                    {contact.message}
                  </h6>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonial;

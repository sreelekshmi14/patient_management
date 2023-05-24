import React from 'react';

function Hospital() {
  return (
    <div style={{ padding: '2em' }}>
      <div className="bg-light py-5 service-15">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="row">
                <div className="col-md-12 mb-4">
                  <div className="d-flex">
                    <div className="no-shrink">
                      <span className="icon-round bg-white text-success rounded-circle text-center d-inline-block">
                        R
                      </span>
                    </div>
                    <div className="p-3">
                      <h6 className="font-weight-medium">
                        <a href="javascript:void(0)" className="linking">
                          Reliable Care
                        </a>
                      </h6>
                      <p className="mt-3">
                        You can rely on our hospital for exceptional care and
                        dedicated services that prioritize your well-being.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-12 mb-4">
                  <div className="d-flex">
                    <div className="no-shrink">
                      <span className="icon-round bg-white text-success rounded-circle text-center d-inline-block">
                        C
                      </span>
                    </div>
                    <div className="p-3">
                      <h6 className="font-weight-medium">
                        <a href="javascript:void(0)" className="linking">
                          Compassionate Staff
                        </a>
                      </h6>
                      <p className="mt-3">
                        Our hospital is staffed with a compassionate team of
                        healthcare professionals who provide personalized care
                        and support to every patient.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-12 mb-4">
                  <div className="d-flex">
                    <div className="no-shrink">
                      <span className="icon-round bg-white text-success rounded-circle text-center d-inline-block">
                        A
                      </span>
                    </div>
                    <div className="p-3">
                      <h6 className="font-weight-medium">
                        <a href="javascript:void(0)" className="linking">
                          Advanced Technology
                        </a>
                      </h6>
                      <p className="mt-3">
                        Our hospital leverages advanced medical technology to
                        provide accurate diagnoses, effective treatments, and
                        innovative healthcare solutions.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <img
                src="https://www.bharathhospital.co.in/themes/user/images/division1.jpg"
                alt="hospital"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hospital;

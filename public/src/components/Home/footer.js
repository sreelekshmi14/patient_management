import React from 'react';

function footer() {
  return (
    <section className="">
      <footer className="text-center text-white bg-dark">
        <div className="container p-4 pb-0">
          <section className="">
            <p className="d-flex justify-content-center align-items-center">
              <span className="me-3">Register for free</span>
              <a
                type="button"
                className="btn btn-outline-light btn-rounded"
                href="http://localhost:3001/signUp"
              >
                Sign up!
              </a>
            </p>
          </section>
        </div>

        <div className="text-center p-3 bg-dark">
          © 2020 Copyright:
          <a className="text-white" href="http://localhost:3000/">
            medizep.com
          </a>
        </div>
      </footer>
    </section>
  );
}

export default footer;

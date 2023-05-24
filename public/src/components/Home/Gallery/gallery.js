import React from 'react';

const ImageGallery = () => {
  return (
    <div className="container gallery" style={{ padding: '2em' }}>
      <div className="jumbotron   d-flex justify-content-center">
        <h3 className="fw-bold mb-4" style={{ color: '#1979a9' }}>
          Our Efficient Doctors
        </h3>
      </div>

      <div className="row">
        <div className="col-sm-6 col-md-4 mb-3">
          <img
            src="https://thumbs.dreamstime.com/b/smiling-female-doctor-holding-medical-records-lab-coat-her-office-clipboard-looking-camera-56673035.jpg"
            alt=""
            className="fluid img-thumbnail"
          />
        </div>
        <div className="col-sm-6 col-md-4 mb-3">
          <img
            src="https://images.unsplash.com/photo-1612349316228-5942a9b489c2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bWVkaWNhbCUyMGRvY3RvcnxlbnwwfHwwfHw%3D&w=1000&q=80"
            alt=""
            className="fluid img-thumbnail"
          />
        </div>
        <div className="col-sm-6 col-md-4 mb-3">
          <img
            src="https://www.indiaspend.com/h-upload/2022/02/04/647654-third-wave-family-doctors-covid-india-1500.jpg"
            alt=""
            className="fluid img-thumbnail"
          />
        </div>
        <div className="col-sm-6 col-md-4 mb-3">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVvuWx5n-7jCdq9_weGDYOkt-b9lh635OyhQ&usqp=CAU"
            alt=""
            className="fluid img-thumbnail"
          />
        </div>
        <div className="col-sm-6 col-md-4 mb-3">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnttioow3Ggcznk_QQkaivSZ12kPPV0LUgHQ&usqp=CAU"
            alt=""
            className="fluid img-thumbnail"
          />
        </div>
        <div className="col-sm-6 col-md-4 mb-3">
          <img
            src="https://hms.harvard.edu/sites/default/files/media/800-Doctors-Talking-GettyImages-1421919753.jpg"
            alt=""
            className="fluid img-thumbnail"
          />
        </div>
      </div>
    </div>
  );
};

export default ImageGallery;

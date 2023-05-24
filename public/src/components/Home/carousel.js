import { Carousel } from 'react-bootstrap';

const ResponsiveCarousel = () => {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://www.cdc.gov/nchs/images/covid19/nhcs/encounters.jpg?_=36402"
          alt="First slide"
          style={{
            maxHeight: '500px',
            maxWidth: '100%',
            width: 'auto',
            height: 'auto',
          }}
        />
        <Carousel.Caption>
          <h3 style={{ color: '#1979a9', fontSize: '2rem' }}>
            Compassionate Care
          </h3>
          <p style={{ color: 'black', fontSize: '1.2rem' }}>
            Hospitals provide compassionate care, ensuring the well-being and
            comfort of patients during their healthcare journey.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://highlandhospital.in/images/slider/slider005.jpg"
          alt="Second slide"
          style={{
            maxHeight: '500px',
            maxWidth: '100%',
            width: 'auto',
            height: 'auto',
          }}
        />
        <Carousel.Caption>
          <h3 style={{ color: '#063970', fontSize: '2rem' }}>
            Skilled Healthcare Professionals
          </h3>
          <p style={{ color: 'black', fontSize: '1.2rem' }}>
            Hospitals are staffed with highly skilled healthcare professionals
            who provide expert care and treatment to patients, ensuring their
            well-being.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://www.fordhospital.org/img/slider/1.jpg"
          alt="Third slide"
          style={{
            maxHeight: '500px',
            maxWidth: '100%',
            width: 'auto',
            height: 'auto',
          }}
        />
        <Carousel.Caption>
          <h3 style={{ color: '#063970', fontSize: '2rem' }}>
            Advanced Medical Technologies
          </h3>
          <p style={{ color: 'black', fontSize: '1.2rem' }}>
            Hospitals embrace advanced medical technologies, enabling accurate
            diagnoses, effective treatments, and improved patient outcomes.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default ResponsiveCarousel;

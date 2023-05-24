import React from 'react';
import Header from './header';
import Carousel from './carousel';
import Service from './service';
import Testimonial from './testimonial';
import Gallery from './Gallery/gallery';
import Contact from './Contactus/contactus';
import Footer from './footer';

const Home = () => {
  return (
    <div>
      {/* <Header /> */}
      <Carousel />
      <Service />
      <Testimonial />
      <Gallery />
      <Contact />
      <Footer />
    </div>
  );
};

export default Home;

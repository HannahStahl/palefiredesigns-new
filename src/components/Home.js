import React from 'react';
import Button from 'react-bootstrap/Button';
import config from '../config';

const Home = () => (window.innerWidth > 600 ? (
  <>
    <img src={`${config.publicCloudfrontURL}/palefiredesigns-home.png`} alt={config.businessName} className="home-page-image" />
    <div className="home">
      <h1>Pale Fire Designs</h1>
      <h3>Uncommon Jewelry for the Slightly Off-Center</h3>
      <a href="/items"><Button size="lg" variant="outline-dark">SHOP</Button></a>
    </div>
  </>
) : (
  <>
    <img src={`${config.publicCloudfrontURL}/palefiredesigns-home-mobile2.png`} alt={config.businessName} className="home-page-image" />
    <div className="home">
      <h1>Pale Fire Designs</h1>
      <p>Uncommon Jewelry for the Slightly Off-Center</p>
      <a href="/items"><Button size="lg" variant="outline-dark">SHOP</Button></a>
    </div>
  </>
));

export default Home;

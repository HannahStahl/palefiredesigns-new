import React from 'react';
import Button from 'react-bootstrap/Button';

const Home = () => (
  <div className="home">
    <div className="home-section home-section-1 left-text">
      <div className="carousel-slide-1">
        <div className="home-section-text">
          <div className="tagline">
            <h1>Uncommon Jewelry</h1>
            <h1 className="tagline-line-2">for the Slightly Off-Center</h1>
          </div>
          <a href="/items">
            <Button size="lg" variant="outline-dark" className="home-page-btn">SHOP</Button>
          </a>
        </div>
      </div>
    </div>
    <div className="home-section home-section-2 right-text">
      <div className="home-section-text">
        <h1>Collar Me Beautiful</h1>
        <a href="/items/necklaces">
          <Button size="lg" variant="outline-dark" className="home-page-btn">SHOP NECKLACES</Button>
        </a>
      </div>
    </div>
    <div className="home-section home-section-3 left-text">
      <div className="home-section-text">
        <h1>Wrist Action</h1>
        <a href="/items/bracelets">
          <Button size="lg" variant="outline-dark" className="home-page-btn">SHOP BRACELETS</Button>
        </a>
      </div>
    </div>
    <div className="home-section home-section-4 right-text">
      <div className="home-section-text">
        <h1>Lobe Trotters</h1>
        <a href="/items/earrings">
          <Button size="lg" variant="outline-dark" className="home-page-btn">SHOP EARRINGS</Button>
        </a>
      </div>
    </div>
  </div>
);

export default Home;

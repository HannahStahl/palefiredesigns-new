import React from 'react';
import { NavLink } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Carousel from 'react-bootstrap/Carousel';

const Home = () => (
  <div className="home">
    <Carousel>
      <Carousel.Item>
        <div className="home-section home-section-1 left-text">
          <div className="home-section-text">
            <div className="tagline">
              <h1>Uncommon Jewelry</h1>
              <h1 className="tagline-line-2">for the Slightly Off-Center</h1>
            </div>
            <NavLink to="/items">
              <Button size="lg" variant="outline-dark" className="home-page-btn">SHOP</Button>
            </NavLink>
          </div>
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div className="home-section home-section-1 right-text">
          <div className="home-section-text">
            <h1>Featured Collection:</h1>
            <h1>Luxe Cuffs</h1>
            <NavLink to="/collections/luxe-cuffs">
              <Button size="lg" variant="outline-dark" className="home-page-btn">SHOP THE COLLECTION</Button>
            </NavLink>
          </div>
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div className="home-section home-section-1 left-text">
          <div className="home-section-text">
            <h1>Meet the Artist:</h1>
            <h1>Dale Feuer</h1>
            <p className="artist-quote">
              Natural beauty, balanced asymmetry, the spirit of yin yang...these
              are a few of my favorite things.
            </p>
            <NavLink to="/about">
              <Button size="lg" variant="outline-dark" className="home-page-btn">READ MORE</Button>
            </NavLink>
          </div>
        </div>
      </Carousel.Item>
    </Carousel>
    <div className="home-section home-section-2 right-text">
      <div className="home-section-text">
        <h1>Collar Me Beautiful</h1>
        <NavLink to="/items/necklaces">
          <Button size="lg" variant="outline-dark" className="home-page-btn">SHOP NECKLACES</Button>
        </NavLink>
      </div>
    </div>
    <div className="home-section home-section-3 left-text">
      <div className="home-section-text">
        <h1>Wrist Action</h1>
        <NavLink to="/items/bracelets">
          <Button size="lg" variant="outline-dark" className="home-page-btn">SHOP BRACELETS</Button>
        </NavLink>
      </div>
    </div>
    <div className="home-section home-section-4 right-text">
      <div className="home-section-text">
        <h1>Lobe Trotters</h1>
        <NavLink to="/items/earrings">
          <Button size="lg" variant="outline-dark" className="home-page-btn">SHOP EARRINGS</Button>
        </NavLink>
      </div>
    </div>
  </div>
);

export default Home;

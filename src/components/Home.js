import React from 'react';
import { NavLink } from 'react-router-dom';
import { Fade } from 'react-reveal';
import Button from 'react-bootstrap/Button';
import Carousel from 'react-bootstrap/Carousel';

const mobile = window.innerWidth <= 1001;

const Home = () => (
  <div className="home">
    <Carousel>
      <Carousel.Item>
        <div className="home-section home-section-1 left-text slide-1">
          <div className="home-section-text">
            <div className="home-section-text-box">
              <div>
                <h1 className="tagline-line-1">Uncommon Jewelry</h1>
                <h1 className="tagline-line-2">for the Slightly Off-Center</h1>
              </div>
              <NavLink to="/items">
                <Button size="lg" variant="outline-dark" className="home-page-btn coral-button">SHOP</Button>
              </NavLink>
            </div>
          </div>
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div className="home-section home-section-1 right-text slide-2">
          <div className="home-section-text">
            <div className="home-section-text-box">
              <h1>Featured Collection:</h1>
              <h1>Luxe Cuffs</h1>
              <NavLink to="/collections/luxe-cuffs">
                <Button size="lg" variant="outline-dark" className="home-page-btn aqua-button">SHOP THE COLLECTION</Button>
              </NavLink>
            </div>
          </div>
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div className="home-section home-section-1 left-text slide-3">
          <div className="home-section-text">
            <div className="home-section-text-box">
              <h1>Meet the Artist:</h1>
              <h1>Dale Feuer</h1>
              <p className="artist-quote">
                Natural beauty, balanced asymmetry, the spirit of yin yang...these
                are a few of my favorite things.
              </p>
              <NavLink to="/about">
                <Button size="lg" variant="outline-dark" className="home-page-btn coral-button">READ MORE</Button>
              </NavLink>
            </div>
          </div>
        </div>
      </Carousel.Item>
    </Carousel>
    <div className="home-section category right-img home-section-2 aqua">
      <Fade><img className="home-category-img" src="home-necklaces.jpg" alt="Necklaces" /></Fade>
      <Fade>
        <div className="home-section-text">
          <div className="home-section-text-box">
            <h1>Collar Me Beautiful</h1>
            <NavLink to="/items/necklaces">
              <Button size="lg" variant="outline-dark" className="home-page-btn aqua-button">SHOP NECKLACES</Button>
            </NavLink>
          </div>
        </div>
      </Fade>
    </div>
    <div className="home-section category left-img home-section-3 coral">
      {mobile && <Fade><img className="home-category-img" src="home-bracelets.jpg" alt="Bracelets" /></Fade>}
      <Fade>
        <div className="home-section-text">
          <div className="home-section-text-box">
            <h1>Wrist Action</h1>
            <NavLink to="/items/bracelets">
              <Button size="lg" variant="outline-dark" className="home-page-btn coral-button">SHOP BRACELETS</Button>
            </NavLink>
          </div>
        </div>
      </Fade>
      {!mobile && <Fade><img className="home-category-img" src="home-bracelets.jpg" alt="Bracelets" /></Fade>}
    </div>
    <div className="home-section category right-img home-section-4 aqua">
      <Fade><img className="home-category-img" src="home-earrings.jpg" alt="Earrings" /></Fade>
      <Fade>
        <div className="home-section-text">
          <div className="home-section-text-box">
            <h1>Lobe Trotters</h1>
            <NavLink to="/items/earrings">
              <Button size="lg" variant="outline-dark" className="home-page-btn aqua-button">SHOP EARRINGS</Button>
            </NavLink>
          </div>
        </div>
      </Fade>
    </div>
  </div>
);

export default Home;

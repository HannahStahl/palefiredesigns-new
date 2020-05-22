import React from 'react';
import Carousel from 'react-bootstrap/Carousel';

const Home = () => (
  <div className="home">
    <Carousel>
      <Carousel.Item>
        <div className="home-section home-section-1 left-text slide-1">
          <div className="home-section-text">
            <a href="/items" className="home-section-text-box">
              <div>
                <h1 className="tagline-line-1">Uncommon Jewelry</h1>
                <h1 className="tagline-line-2">for the Slightly Off-Center</h1>
              </div>
            </a>
          </div>
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div className="home-section home-section-1 right-text slide-2">
          <div className="home-section-text">
            <a href="/collections/luxe-cuffs" className="home-section-text-box">
              <h1>Featured Collection:</h1>
              <h1>Luxe Cuffs</h1>
            </a>
          </div>
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div className="home-section home-section-1 left-text slide-3">
          <div className="home-section-text">
            <a href="/items/necklaces" className="home-section-text-box">
              <h1>Collar Me Beautiful</h1>
            </a>
          </div>
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div className="home-section home-section-1 right-text slide-4">
          <div className="home-section-text">
            <a href="/items/bracelets" className="home-section-text-box">
              <h1>Wrist Action</h1>
            </a>
          </div>
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div className="home-section home-section-1 left-text slide-5">
          <div className="home-section-text">
            <a href="/items/earrings" className="home-section-text-box">
              <h1>Lobe Trotters</h1>
            </a>
          </div>
        </div>
      </Carousel.Item>
    </Carousel>
  </div>
);

export default Home;

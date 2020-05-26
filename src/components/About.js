import React from 'react';
import content from '../content.json';
import config from '../config';

const About = () => (
  <div className="page-content">
    <h1>MEET THE ARTIST: DALE FEUER</h1>
    <div className="bio">
      <img src={`${config.publicCloudfrontURL}/dalefeuerjewelry-bio.jpg`} alt="Dale Feuer" />
      {content.bio.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
    </div>
  </div>
);

export default About;

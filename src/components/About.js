import React from 'react';
import content from '../content.json';
import config from '../config';

const About = () => (
  <div>
    <h1>Meet the Artist: Dale Feuer</h1>
    <div className="bio">
      <img src={`${config.publicCloudfrontURL}/palefiredesigns-bio.jpg`} alt="Dale Feuer" />
      {content.bio.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
    </div>
  </div>
);

export default About;

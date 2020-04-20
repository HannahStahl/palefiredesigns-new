import React from 'react';
import config from '../config';

const Footer = () => (
  <div className="footer">
    <p>
      {`© ${config.businessName}, ${(new Date()).getFullYear()}. All Rights Reserved.`}
    </p>
    <p>
      Website crafted by
      {' '}
      <a href="https://websitesbyhannah.com" target="_blank" rel="noopener noreferrer">
        my daughter Hannah
      </a>
    </p>
  </div>
);

export default Footer;

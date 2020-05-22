import React from 'react';

const Footer = () => {
  const className = window.location.pathname === '/' ? ' aqua' : '';

  return (
    <div className={`footer${className}`}>
      <p>
        {`© Dale Feuer, ${(new Date()).getFullYear()}. All Rights Reserved.`}
      </p>
      <a href="https://websitesbyhannah.com" target="_blank" rel="noopener noreferrer">
        <p>Websites By Hannah</p>
      </a>
    </div>
  );
};

export default Footer;

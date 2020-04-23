import React from 'react';

const ShoppingBagIcon = ({ bag }) => (
  <div className="bag-icon-container">
    <svg
      className="bag-icon"
      enableBackground="new 0 0 50 50"
      height="24px"
      id="Layer_1"
      version="1.1"
      viewBox="0 0 50 50"
      width="24px"
      xmlSpace="preserve"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <path
        d="M8,14L4,49h42l-4-35H8z"
        fill="none"
        stroke="rgba(0, 0, 0, 0.5)"
        strokeLinecap="round"
        strokeMiterlimit="10"
        strokeWidth="2"
      />
      <rect
        fill="none"
        height="50"
        width="50"
      />
      <path
        d="M34,19c0-1.241,0-6.759,0-8  c0-4.971-4.029-9-9-9s-9,4.029-9,9c0,1.241,0,6.759,0,8"
        fill="none"
        stroke="rgba(0, 0, 0, 0.5)"
        strokeLinecap="round"
        strokeMiterlimit="10"
        strokeWidth="2"
      />
      <circle
        cx="34"
        cy="19"
        r="2"
        stroke="rgba(0, 0, 0, 0.5)"
        fill="rgba(0, 0, 0, 0.5)"
      />
      <circle
        cx="16"
        cy="19"
        r="2"
        stroke="rgba(0, 0, 0, 0.5)"
        fill="rgba(0, 0, 0, 0.5)"
      />
    </svg>
    {bag && bag.length > 0 && (
      <div className="bag-number-container">
        <div className="bag-number">{bag.length}</div>
      </div>
    )}
  </div>
);

export default ShoppingBagIcon;

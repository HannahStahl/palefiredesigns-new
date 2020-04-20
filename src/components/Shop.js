import React, { useState, useEffect } from 'react';
import Masonry from 'react-masonry-component';
import config from '../config';

const Shop = ({ items }) => {
  const [etsyItems, setEtsyItems] = useState([]);

  return (
    <div>
      <h1>SHOP</h1>
      <div className="items">
        <Masonry className="masonry-layout" options={{ isFitWidth: true }}>
          {items.map((item) => (
            <a
              key={item.itemId}
              href={escape(`/items/${item.itemName.replace(/ /g, '_').toLowerCase()}`)}
              className="item"
            >
              <img
                src={`${config.cloudfrontURL}/${item.itemPhotos[0].photoName}`}
                alt={item.itemName}
                className="item-img"
              />
            </a>
          ))}
        </Masonry>
      </div>
    </div>
  );
};

export default Shop;

import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Masonry from 'react-masonry-component';
import QuickView from './QuickView';

const Items = ({ items, bag, updateBag }) => {
  const [selected, setSelected] = useState(undefined);
  const [showImages, setShowImages] = useState(false);

  return (
    <div>
      <style>
        {`
          .items-list {
            opacity: ${showImages ? '1' : '0'};
          }
        `}
      </style>
      <h1>ALL ITEMS</h1>
      <div>
        <QuickView
          items={items}
          selected={selected}
          setSelected={setSelected}
          bag={bag}
          updateBag={updateBag}
        />
        <Masonry
          className="masonry-layout items-list"
          options={{ isFitWidth: true }}
          onLayoutComplete={() => setShowImages(true)}
        >
          {items.map((item, index) => (
            <div key={item.listing_id} className="item" onClick={() => setSelected(index)}>
              <img
                src={item.Images[0].url_fullxfull}
                alt={item.title}
                className="item-img"
                id={`item-${index}`}
              />
              <div className="quickview-button-container" id="quickview-button-container">
                <Button size="lg" variant="light">Quick View</Button>
              </div>
            </div>
          ))}
        </Masonry>
      </div>
    </div>
  );
};

export default Items;

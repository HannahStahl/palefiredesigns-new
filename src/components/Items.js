import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Masonry from 'react-masonry-component';
import QuickView from './QuickView';

const Items = ({
  items, bag, updateBag, header, closeOnRemove,
}) => {
  const [selected, setSelected] = useState(undefined);

  return (
    <div>
      {header && <h1>{header}</h1>}
      <div>
        <QuickView
          items={items}
          selected={selected}
          setSelected={setSelected}
          bag={bag}
          updateBag={updateBag}
          closeOnRemove={closeOnRemove}
        />
        <Masonry className="masonry-layout" options={{ isFitWidth: true }}>
          {items.map((item, index) => (
            <div key={item.listing_id} className="item" onClick={() => setSelected(index)}>
              <img
                src={item.Images[0].url_fullxfull}
                alt={item.title}
                className="item-img"
                id={`item-${index}`}
              />
              <div className="quickview-button-container" id="quickview-button-container">
                <Button size="lg" variant="light">QUICK VIEW</Button>
              </div>
            </div>
          ))}
        </Masonry>
      </div>
    </div>
  );
};

export default Items;

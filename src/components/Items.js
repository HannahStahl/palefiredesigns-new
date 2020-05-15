import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Masonry from 'react-masonry-component';
import QuickView from './QuickView';
import Loading from './Loading';

const Items = ({
  items, bag, updateBag, closeOnRemove,
}) => {
  const [selected, setSelected] = useState(undefined);
  const [layoutComplete, setLayoutComplete] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const showItems = layoutComplete && imagesLoaded;

  return (
    <div>
      <div>
        <QuickView
          items={items}
          selected={selected}
          setSelected={setSelected}
          bag={bag}
          updateBag={updateBag}
          closeOnRemove={closeOnRemove}
        />
        {!showItems && <Loading />}
        <Masonry
          className={`masonry-layout ${showItems ? 'visible' : 'hidden'}`}
          options={{ isFitWidth: true }}
          onLayoutComplete={(layout) => setLayoutComplete(layout.length > 0)}
          onImagesLoaded={(images) => setImagesLoaded(images.images.length > 0)}
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

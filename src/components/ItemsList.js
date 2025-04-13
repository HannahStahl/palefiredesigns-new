import React, { useState } from 'react';
import Masonry from 'react-masonry-component';
import QuickView from './QuickView';
import Loading from './Loading';
import SortBy from './SortBy';

const Items = ({
  items, sortBy, setSortBy, bag, updateBag,
}) => {
  const [selected, setSelected] = useState(undefined);
  const [colorSelected, setColorSelected] = useState('');
  const [layoutComplete, setLayoutComplete] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const showItems = layoutComplete && imagesLoaded;

  return (
    <div>
      <QuickView
        items={items}
        selected={selected}
        setSelected={setSelected}
        colorSelected={colorSelected}
        setColorSelected={setColorSelected}
        bag={bag}
        updateBag={updateBag}
      />
      {sortBy && <SortBy sortBy={sortBy} setSortBy={setSortBy} />}
      <div className="items-container">
        {!showItems && <Loading />}
        <Masonry
          className={`masonry-layout ${showItems ? 'visible' : 'hidden'}`}
          options={{ isFitWidth: true }}
          onLayoutComplete={(layout) => { if (layout.length > 0) setLayoutComplete(true); }}
          onImagesLoaded={(images) => { if (images.images.length > 0) setImagesLoaded(true); }}
        >
          {items.map((item, index) => (
            <div key={item._id} className="item" onClick={() => setSelected(index)}>
              <img
                src={item.photos[0].asset.url}
                alt={item.title}
                className="item-img"
                id={`item-${index}`}
              />
              <div className="item-img-container" id="quickview-button-container" />
            </div>
          ))}
        </Masonry>
      </div>
    </div>
  );
};

export default Items;

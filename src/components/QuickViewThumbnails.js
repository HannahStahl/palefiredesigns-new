import React from 'react';
import Masonry from 'react-masonry-component';
import Loading from './Loading';

export default ({
  showThumbnails, selected, setLayoutComplete, setImagesLoaded, item, setImgIndex,
}) => (
  <div className="thumbnails-outer-container">
    {!showThumbnails && <Loading />}
    <div className={`thumbnails-container ${showThumbnails ? 'visible' : 'hidden'}`}>
      <Masonry
        className="masonry-layout thumbnails"
        options={{ isFitWidth: true }}
        onLayoutComplete={(layout) => { if (layout.length > 0) setLayoutComplete(true); }}
        onImagesLoaded={(images) => { if (images.images.length > 0) setImagesLoaded(true); }}
      >
        {selected === undefined ? <></> : item.photos.map((photo, index) => (
          <div key={photo.asset.url} className="thumbnail">
            <img
              src={photo.asset.url}
              alt={item.title}
              className="thumbnail-img"
              id={`thumbnail-${index}`}
              onClick={() => setImgIndex(index)}
            />
          </div>
        ))}
      </Masonry>
    </div>
  </div>
);

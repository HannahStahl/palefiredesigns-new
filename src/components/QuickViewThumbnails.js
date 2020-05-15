import React from 'react';
import Masonry from 'react-masonry-component';

export default ({
  showThumbnails, selected, setLayoutComplete, setImagesLoaded, item, setImgIndex,
}) => (
  <div className={`thumbnails-container ${showThumbnails ? 'visible' : 'hidden'}`}>
    <Masonry
      className="masonry-layout thumbnails"
      options={{ isFitWidth: true }}
      onLayoutComplete={(layout) => { if (layout.length > 0) setLayoutComplete(true); }}
      onImagesLoaded={(images) => { if (images.images.length > 0) setImagesLoaded(true); }}
    >
      {selected === undefined ? <></> : item.Images.map((image, index) => (
        <div key={image.listing_image_id} className="thumbnail">
          <img
            src={image.url_fullxfull}
            alt={item.title}
            className="thumbnail-img"
            id={`thumbnail-${index}`}
            onClick={() => setImgIndex(index)}
          />
        </div>
      ))}
    </Masonry>
  </div>
);

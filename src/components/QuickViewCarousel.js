import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';

export default ({
  imgIndex, setImgIndex, item, selected, mobileStyling,
}) => {
  const [isZoomed, setIsZoomed] = useState(false);

  const zoomIn = () => {
    const { body } = document;
    setIsZoomed(true);
    body.style.height = '100vh';
    body.style.overflow = 'hidden';
  };

  const zoomOut = () => {
    const { body } = document;
    setIsZoomed(false);
    body.style.height = 'auto';
    body.style.overflow = 'auto';
  };

  const renderCarousel = () => (
    <Carousel
      indicators={false}
      activeIndex={imgIndex}
      onSelect={setImgIndex}
      interval={false}
      slide={false}
    >
      {item.Images.map((image) => (
        <Carousel.Item key={image.listing_image_id}>
          <img
            src={selected === undefined ? undefined : image.url_fullxfull}
            alt={selected === undefined ? '' : item.title}
            className="quickview-img"
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );

  const renderZoomableCarousel = () => (
    <>
      <Carousel
        indicators={false}
        activeIndex={imgIndex}
        onSelect={setImgIndex}
        interval={false}
        slide={false}
        className={isZoomed ? 'hidden-carousel' : ''}
      >
        {item.Images.map((image) => (
          <Carousel.Item key={image.listing_image_id}>
            <img
              src={selected === undefined ? undefined : image.url_fullxfull}
              alt={selected === undefined ? '' : item.title}
              className="quickview-img zoomable"
              onClick={zoomIn}
            />
          </Carousel.Item>
        ))}
      </Carousel>
      {isZoomed && (
        <>
          <div className="zoomed-carousel-background" onClick={zoomOut} />
          <Carousel
            indicators={false}
            activeIndex={imgIndex}
            onSelect={setImgIndex}
            interval={false}
            slide={false}
            className="zoomed-carousel"
          >
            {item.Images.map((image) => (
              <Carousel.Item key={image.listing_image_id}>
                <img
                  src={selected === undefined ? undefined : image.url_fullxfull}
                  alt={selected === undefined ? '' : item.title}
                  className="quickview-img"
                />
              </Carousel.Item>
            ))}
          </Carousel>
        </>
      )}
    </>
  );

  return mobileStyling ? renderCarousel() : renderZoomableCarousel();
};

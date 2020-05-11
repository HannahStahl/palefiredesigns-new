import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Carousel from 'react-bootstrap/Carousel';
import Masonry from 'react-masonry-component';

const QuickView = ({
  items, selected, setSelected, bag, updateBag, closeOnRemove,
}) => {
  const item = items[selected];
  const [imgIndex, setImgIndex] = useState(0);
  const [imgTop, setImgTop] = useState(undefined);
  const [imgLeft, setImgLeft] = useState(undefined);
  const [imgHeight, setImgHeight] = useState(undefined);

  useEffect(() => {
    if (selected !== undefined) {
      const img = document.getElementById(`item-${selected}`);
      img.style.visibility = 'hidden';
      const { top, left, height } = img.getBoundingClientRect();
      setImgTop(top);
      setImgLeft(left);
      setImgHeight(height);
      const quickview = document.getElementById('quickview');
      quickview.classList.add('expanded');
      const quickviewImgContainer = document.getElementById('quickview-img-container');
      quickviewImgContainer.classList.add('expanded');
      const thumbnails = document.getElementById('thumbnails');
      thumbnails.classList.add('visible');
      const details = document.getElementById('quickview-details');
      details.classList.add('visible');
      const overlay = document.getElementById('background-overlay');
      overlay.classList.add('visible');
      document.body.style.height = '100vh';
      document.body.style.overflow = 'hidden';
    }
  }, [selected]);

  const exitQuickview = () => {
    const img = document.getElementById(`item-${selected}`);
    setSelected(undefined);
    img.style.visibility = 'visible';
    const quickview = document.getElementById('quickview');
    quickview.classList.remove('expanded');
    const quickviewImgContainer = document.getElementById('quickview-img-container');
    quickviewImgContainer.classList.remove('expanded');
    const thumbnails = document.getElementById('thumbnails');
    thumbnails.classList.remove('visible');
    const details = document.getElementById('quickview-details');
    details.classList.remove('visible');
    const overlay = document.getElementById('background-overlay');
    overlay.classList.remove('visible');
    document.body.style.height = 'auto';
    document.body.style.overflow = 'auto';
    setImgIndex(0);
  };

  const addOrRemoveFromBag = () => {
    const { listing_id } = item; // eslint-disable-line camelcase
    const newBagItem = listing_id; // eslint-disable-line camelcase
    const index = bag.findIndex((itemInList) => itemInList === newBagItem);
    let removingItem = false;
    if (index > -1) {
      removingItem = true;
      bag.splice(index, 1);
    } else bag.push(newBagItem);
    if (removingItem && closeOnRemove) exitQuickview();
    updateBag(bag);
  };

  const getButtonText = () => {
    if (!item) return '';
    const index = bag.findIndex((itemInList) => itemInList === item.listing_id);
    return index > -1 ? 'REMOVE FROM BAG' : 'ADD TO BAG';
  };

  const getDimensions = (unit) => {
    if (unit === 'in') return '"';
    if (unit === 'ft') return "'";
    return unit;
  };

  const units = selected !== undefined && getDimensions(item.item_dimensions_unit);

  let mobileStyling = false;
  let quickviewWidth = 897;
  const availableWidth = 0.9 * window.innerWidth;
  if (availableWidth < 897) {
    mobileStyling = true;
    quickviewWidth = 332;
  }
  const quickviewMargin = (window.innerWidth - quickviewWidth) / 2;
  let style = `
    @keyframes expandQuickview {
      0% {
        top: ${imgTop}px;
        left: ${imgLeft}px;
        margin: 0;
        max-height: ${imgHeight}px;
        width: 302px;
      }
      33.3% {
        top: 0;
        left: 0;
        margin: 10vh ${quickviewMargin}px 10vh ${quickviewMargin}px;
        max-height: ${imgHeight + 30}px;
        width: 332px;
      }
      66.7% {
        top: 0;
        left: 0;
        margin: 10vh ${quickviewMargin}px 10vh ${quickviewMargin}px;
        max-height: ${imgHeight + 30}px;
        width: ${quickviewWidth}px;
      }
      100% {
        top: 0;
        left: 0;
        margin: 10vh ${quickviewMargin}px 10vh ${quickviewMargin}px;
        max-height: 80vh;
        width: ${quickviewWidth}px;
      }
    }
    .quickview.expanded {
      width: ${quickviewWidth}px;
      margin: 10vh ${quickviewMargin}px 10vh ${quickviewMargin}px;
    }
  `;
  if (mobileStyling) {
    style += `
      .item-details-container {
        margin-left: 11px;
        margin-right: 11px;
      }
      .thumbnails-container {
        width: 300px;
      }
      .thumbnail, .thumbnail-img {
        width: 80px;
      }
    `;
  }

  return (
    <div className="background-overlay" id="background-overlay">
      <style>{style}</style>
      <div className="quickview" id="quickview">
        <div className="quickview-img-container" id="quickview-img-container">
          {selected === undefined ? <></> : (
            <Carousel activeIndex={imgIndex} onSelect={setImgIndex} interval={false}>
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
          )}
        </div>
        <div className="thumbnails-container">
          <Masonry className="masonry-layout thumbnails" id="thumbnails" options={{ isFitWidth: true }}>
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
        <div className="item-details-container">
          <div className="item-details" id="quickview-details">
            {selected === undefined ? <></> : (
              <>
                <div className="item-price-container">
                  <h3 className="item-price">{`$${item.price}`}</h3>
                  <Button size="lg" variant="outline-dark" onClick={addOrRemoveFromBag}>
                    {getButtonText()}
                  </Button>
                </div>
                {(item.item_length || item.item_width) && (
                  <div className="item-dimensions">
                    <img src="/dimensions.svg" alt="Dimensions" className="item-details-icon" />
                    <p>
                      {item.item_length ? `${item.item_length}${units} long` : ''}
                      {(item.item_length && item.item_width) ? ', ' : ''}
                      {item.item_width ? `${item.item_width}${units} wide` : ''}
                    </p>
                  </div>
                )}
                {(item.materials && item.materials.length > 0) && (
                  <div className="item-materials">
                    <img src="/materials.svg" alt="Materials" className="item-details-icon" />
                    <p>{item.materials.map((material, index) => `${index > 0 ? ', ' : ''}${material}`)}</p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      <div className="exit-quickview" onClick={exitQuickview}>
        <img src="/exit.svg" alt="Exit" />
      </div>
    </div>
  );
};

export default QuickView;

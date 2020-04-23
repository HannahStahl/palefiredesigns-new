import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Carousel from 'react-bootstrap/Carousel';
import Masonry from 'react-masonry-component';

const Shop = ({ items, bag, updateBag }) => {
  const [selected, setSelected] = useState(undefined);
  const [imgIndex, setImgIndex] = useState(0);
  const [imgTop, setImgTop] = useState(undefined);
  const [imgLeft, setImgLeft] = useState(undefined);
  const [imgHeight, setImgHeight] = useState(undefined);

  const quickView = (index) => {
    setImgIndex(0);
    setSelected(index);
    const img = document.getElementById(`item-${index}`);
    img.style.visibility = 'hidden';
    const { top, left, height } = img.getBoundingClientRect();
    const quickview = document.getElementById('quickview');
    setImgTop(top);
    setImgLeft(left);
    setImgHeight(height);
    quickview.classList.add('expanded');
    const thumbnails = document.getElementById('thumbnails');
    thumbnails.classList.add('visible');
    const details = document.getElementById('quickview-details');
    details.classList.add('visible');
    const overlay = document.getElementById('background-overlay');
    overlay.classList.add('visible');
    document.body.style.height = '100vh';
    document.body.style.overflow = 'hidden';
  };

  const exitQuickview = () => {
    const img = document.getElementById(`item-${selected}`);
    setSelected(undefined);
    img.style.visibility = 'visible';
    const quickview = document.getElementById('quickview');
    quickview.classList.remove('expanded');
    const thumbnails = document.getElementById('thumbnails');
    thumbnails.classList.remove('visible');
    const details = document.getElementById('quickview-details');
    details.classList.remove('visible');
    const overlay = document.getElementById('background-overlay');
    overlay.classList.remove('visible');
    document.body.style.height = 'auto';
    document.body.style.overflow = 'auto';
  };

  const addOrRemoveFromBag = () => {
    const { listing_id } = items[selected]; // eslint-disable-line camelcase
    const newBagItem = listing_id; // eslint-disable-line camelcase
    const index = bag.findIndex((itemInList) => itemInList === newBagItem);
    if (index > -1) bag.splice(index, 1);
    else bag.push(newBagItem);
    updateBag(bag);
  };

  const getButtonText = () => {
    const item = items[selected];
    if (!item) return '';
    const index = bag.findIndex((itemInList) => itemInList === item.listing_id);
    return index > -1 ? 'Remove from Bag' : 'Add to Bag';
  };

  const getDimensions = (unit) => {
    if (unit === 'in') return '"';
    if (unit === 'ft') return "'";
    return unit;
  };

  const units = selected !== undefined && getDimensions(items[selected].item_dimensions_unit);

  console.log(items[selected]);

  return (
    <div>
      <style>
        {`@keyframes expandQuickview {
          0% {
            top: ${imgTop}px;
            left: ${imgLeft}px;
            margin: 0;
            border-right: none;
            border-bottom: none;
            max-height: ${imgHeight}px;
            width: 302px;
          }
          33.3% {
            top: 0;
            left: 0;
            margin: 10vh 10vw 10vh 10vw;
            border-right: solid 1px black;
            border-bottom: solid 1px black;
            max-height: ${imgHeight}px;
            width: 302px;
          }
          66.7% {
            top: 0;
            left: 0;
            margin: 10vh 10vw 10vh 10vw;
            border-right: solid 1px black;
            border-bottom: solid 1px black;
            max-height: ${imgHeight}px;
            width: 922px;
          }
          100% {
            top: 0;
            left: 0;
            margin: 10vh 10vw 10vh 10vw;
            border-right: solid 1px black;
            border-bottom: solid 1px black;
            max-height: 80vh;
            width: 922px;
          }
        }`}
      </style>
      <h1>ALL ITEMS</h1>
      <div className="items">
        <div className="background-overlay" id="background-overlay" />
        <div className="quickview" id="quickview">
          {selected === undefined ? <></> : (
            <Carousel activeIndex={imgIndex} onSelect={setImgIndex} interval={false}>
              {items[selected].Images.map((image) => (
                <Carousel.Item key={image.listing_image_id}>
                  <img
                    src={selected === undefined ? undefined : image.url_fullxfull}
                    alt={selected === undefined ? '' : items[selected].title}
                    className="quickview-img"
                  />
                </Carousel.Item>
              ))}
            </Carousel>
          )}
          <div className="thumbnails-container">
            <Masonry className="masonry-layout thumbnails" id="thumbnails" options={{ isFitWidth: true }}>
              {selected === undefined ? <></> : items[selected].Images.map((image, index) => (
                <div key={image.listing_image_id} className="thumbnail">
                  <img
                    src={image.url_fullxfull}
                    alt={items[selected].title}
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
                    <h3>{`$${items[selected].price}`}</h3>
                    <Button size="lg" variant="outline-dark" onClick={addOrRemoveFromBag}>
                      {getButtonText()}
                    </Button>
                  </div>
                  {(items[selected].item_length || items[selected].item_width) && (
                    <div className="item-dimensions">
                      <img src="/dimensions.svg" alt="Dimensions" className="item-details-icon" />
                      <p>
                        {items[selected].item_length ? `${items[selected].item_length}${units} long` : ''}
                        {(items[selected].item_length && items[selected].item_width) ? ', ' : ''}
                        {items[selected].item_width ? `${items[selected].item_width}${units} wide` : ''}
                      </p>
                    </div>
                  )}
                  {(items[selected].materials && items[selected].materials.length > 0) && (
                    <div className="item-materials">
                      <img src="/materials.svg" alt="Materials" className="item-details-icon" />
                      <p>{items[selected].materials.map((material, index) => `${index > 0 ? ', ' : ''}${material}`)}</p>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
          <div className="exit-quickview" onClick={exitQuickview}>x</div>
        </div>
        <Masonry className="masonry-layout" options={{ isFitWidth: true }}>
          {items.map((item, index) => (
            <div key={item.listing_id} className="item" onClick={() => quickView(index)}>
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

export default Shop;

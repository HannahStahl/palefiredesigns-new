import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';

export default ({
  show, selected, bag, item, exitQuickview, updateBag, setFadeOut,
}) => {
  const [buttonText, setButtonText] = useState('');

  useEffect(() => {
    if (!item) setButtonText('');
    else {
      const index = bag.findIndex((itemInList) => itemInList === item.listing_id);
      setButtonText(index > -1 ? 'REMOVE FROM BAG' : 'ADD TO BAG');
    }
  }, [bag, item]);

  const addOrRemoveFromBag = () => {
    const { listing_id } = item; // eslint-disable-line camelcase
    const newBagItem = listing_id; // eslint-disable-line camelcase
    const index = bag.findIndex((itemInList) => itemInList === newBagItem);
    let addingItem = true;
    if (index > -1) {
      addingItem = false;
      bag.splice(index, 1);
      setButtonText('ADD TO BAG');
    } else {
      bag.push(newBagItem);
      setButtonText('ADDED TO BAG!');
    }
    const closeQuickview = addingItem || window.location.pathname === '/checkout';
    if (closeQuickview) {
      setFadeOut(true);
      setTimeout(() => {
        exitQuickview();
        updateBag(bag);
      }, 500);
    } else updateBag(bag);
  };

  const getUnits = () => {
    if (selected === undefined) return undefined;
    const unit = item.item_dimensions_unit;
    if (unit === 'in') return '"';
    if (unit === 'ft') return "'";
    return unit;
  };

  const units = getUnits();

  return (
    <div className={`item-details-container ${show ? 'visible' : 'hidden'}`}>
      <div className="item-details" id="quickview-details">
        {selected === undefined ? <></> : (
          <>
            <div className="item-price-container">
              <h3 className="item-price">{`$${item.price}`}</h3>
              <Button size="lg" variant="outline-dark" onClick={addOrRemoveFromBag} className="aqua-button">
                {buttonText}
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
  );
};

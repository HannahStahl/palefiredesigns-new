import React from 'react';
import Button from 'react-bootstrap/Button';

export default ({
  selected, bag, item, closeOnRemove, exitQuickview, updateBag,
}) => {
  const getButtonText = () => {
    if (!item) return '';
    const index = bag.findIndex((itemInList) => itemInList === item.listing_id);
    return index > -1 ? 'REMOVE FROM BAG' : 'ADD TO BAG';
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

  const getUnits = () => {
    if (selected === undefined) return undefined;
    const unit = item.item_dimensions_unit;
    if (unit === 'in') return '"';
    if (unit === 'ft') return "'";
    return unit;
  };

  const units = getUnits();

  return (
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
  );
};

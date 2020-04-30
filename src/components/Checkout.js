import React, { useState, useEffect } from 'react';
import { Elements, StripeProvider } from 'react-stripe-elements';
import config from '../config';
import CheckoutForm from './CheckoutForm';
import CheckoutSuccess from './CheckoutSuccess';


const Checkout = ({ items, bag, updateBag }) => {
  const [stripe, setStripe] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setStripe(window.Stripe(config.stripeKey));
  }, []);

  useEffect(() => {
    if (items.length > 0 && bag.length > 0) {
      let runningTotal = 0;
      bag.forEach((item) => {
        const itemDetails = items.find((itemInList) => itemInList.itemId === item.itemId);
        if (itemDetails.itemOnSale) {
          runningTotal += parseInt(itemDetails.itemSalePrice); // TODO get correct property name
        } else {
          runningTotal += parseInt(itemDetails.price);
        }
      });
      setTotal(runningTotal);
    }
  }, [items, bag]);

  const removeItem = () => {
    // TODO
  };

  const handleSubmit = async ({ token, error }) => {
    if (error) {
      alert(error);
      return;
    }
    setIsLoading(true);
    try {
      fetch(`${config.apiURL}/charge/${config.userID}`, {
        method: 'POST',
        body: JSON.stringify({
          amount: total,
          description: config.businessName,
          source: token.id,
        }),
      }).then((res) => res.json()).then((json) => {
        if (json.error) {
          alert('Oops! An error occurred with our payment processing system. Please use the Contact form to send us a message, and we\'ll get it straightened out right away.');
          setIsLoading(false);
        } else {
          updateBag([]);
          setIsLoading(false);
          setShowSuccessModal(true);
        }
      });
    } catch (e) {
      alert(e);
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1>SHOPPING BAG</h1>
      {items.length > 0 && (
        bag.length > 0 ? (
          <>
            {bag.map((item) => (
              <div key={item} className="bag-item">
                <p className="bag-item-name">
                  {items.find((itemInList) => itemInList.listing_id === item).title}
                </p>
              </div>
            ))}
            <p>{`Total: $${total}`}</p>
            <div className="checkout-form-container">
              <StripeProvider stripe={stripe}>
                <Elements
                  fonts={[{
                    cssSrc: 'https://fonts.googleapis.com/css2?family=Dosis:wght@200;300;400;500;600;700;800&display=swap',
                  }]}
                >
                  <CheckoutForm isLoading={isLoading} onSubmit={handleSubmit} />
                </Elements>
              </StripeProvider>
            </div>
          </>
        ) : <p>Shopping bag is empty</p>
      )}
      <CheckoutSuccess show={showSuccessModal} closeModal={() => setShowSuccessModal(false)} />
    </div>
  );
};

export default Checkout;

import React, { useState, useEffect } from 'react';
import { Elements, StripeProvider } from 'react-stripe-elements';
import Button from 'react-bootstrap/Button';
import config from '../config';
import CheckoutForm from './CheckoutForm';
import CheckoutSuccess from './CheckoutSuccess';
import Items from './Items';
import { constructOrderNotificationHtml, constructOrderConfirmationHtml, getItemDetails } from '../utils';


const Checkout = ({ items, bag, updateBag }) => {
  const [stripe, setStripe] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [total, setTotal] = useState(0);
  const [checkoutFormVisible, setCheckoutFormVisible] = useState(false);

  useEffect(() => {
    setStripe(window.Stripe(config.stripeKey));
  }, []);

  useEffect(() => {
    if (items.length > 0 && bag.length > 0) {
      let runningTotal = 0;
      bag.forEach((item) => {
        runningTotal += parseFloat(getItemDetails(items, item).price);
      });
      setTotal(runningTotal);
    }
  }, [items, bag]);

  const showCheckoutForm = () => {
    setCheckoutFormVisible(true);
  };

  const handleSubmit = async ({
    token, error, name, email, address, city, state, zip,
  }) => {
    if (error) {
      alert(error);
      return;
    }
    setIsLoading(true);
    try {
      fetch(`${config.etsyApiURL}/purchase`, {
        method: 'POST',
        body: JSON.stringify({
          listingIds: bag,
          amount: total,
          description: config.businessName,
          source: token.id,
          userId: config.userID,
          email,
        }),
      }).then((res) => res.json()).then((json) => {
        if (!json.status) {
          alert('Oops! An error occurred with our payment processing system. Please use the Contact form to send us a message, and we\'ll get it straightened out right away.');
          setIsLoading(false);
        } else {
          const emailsToSend = [
            fetch(config.emailURL, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                name,
                html: constructOrderNotificationHtml(
                  bag.map((item) => getItemDetails(items, item)),
                  name, total, address, city, state, zip,
                ),
                userEmail: email,
                clientEmail: config.emailAddress,
                siteDomain: window.location.origin,
                orderNotification: true,
              }),
            }),
            fetch(config.emailURL, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                name,
                html: constructOrderConfirmationHtml(
                  bag.map((item) => getItemDetails(items, item)),
                  name, total, address, city, state, zip,
                ),
                userEmail: email,
                clientEmail: config.emailAddress,
                siteDomain: window.location.origin,
                orderConfirmation: true,
                businessName: config.businessName,
              }),
            }),
          ];
          Promise.all(emailsToSend).then(() => {
            updateBag([]);
            setIsLoading(false);
            setShowSuccessModal(true);
          });
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
          <div>
            <Items
              items={bag.map((item) => getItemDetails(items, item))}
              bag={bag}
              updateBag={updateBag}
            />
            <h4 className="bag-total">
              <span>TOTAL:</span>
              <span>{`$${total.toFixed(2)}`}</span>
            </h4>
            <p>
              Free standard shipping with USPS.
              Please allow 1-2 days of processing time prior to shipping.
            </p>
            <Button size="lg" variant="outline-dark" onClick={showCheckoutForm} className="checkout-button">
              CHECK OUT
            </Button>
            <div className={`checkout-form-container${checkoutFormVisible ? '' : ' hidden'}`}>
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
          </div>
        ) : <p>Shopping bag is empty</p>
      )}
      <CheckoutSuccess show={showSuccessModal} closeModal={() => setShowSuccessModal(false)} />
    </div>
  );
};

export default Checkout;

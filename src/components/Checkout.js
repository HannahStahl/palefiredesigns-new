import React, { useState, useEffect } from 'react';
import { Elements, StripeProvider } from 'react-stripe-elements';
import config from '../config';
import CheckoutForm from './CheckoutForm';
import CheckoutSuccess from './CheckoutSuccess';
import Items from './Items';


const Checkout = ({ items, bag, updateBag }) => {
  const [stripe, setStripe] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setStripe(window.Stripe(config.stripeKey));
  }, []);

  const getItemDetails = (item) => items.find((itemInList) => itemInList.listing_id === item);

  useEffect(() => {
    if (items.length > 0 && bag.length > 0) {
      let runningTotal = 0;
      bag.forEach((item) => {
        runningTotal += parseFloat(getItemDetails(item).price);
      });
      setTotal(runningTotal);
    }
  }, [items, bag]);

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
        }),
      }).then((res) => res.json()).then((json) => {
        if (!json.status) {
          alert('Oops! An error occurred with our payment processing system. Please use the Contact form to send us a message, and we\'ll get it straightened out right away.');
          setIsLoading(false);
        } else {
          let itemsTable = '';
          items.forEach((item) => {
            itemsTable += `
              <tr>
                <td>
                  <a href="https://etsy.com/your/shops/${config.etsyShopName}/tools/listings/state:inactive/${item.listing_id}">
                    <img src="${item.Images[0].url_fullxfull}" width="200" />
                  </a>
                </td>
                <td>$${item.price}</td>
              </tr>
            `;
          });
          const html = `
            <html>
              <head>
                <link href="https://fonts.googleapis.com/css?family=Rubik&display=swap" rel="stylesheet" />
                <style>
                  * {
                    font-family: 'Rubik', sans-serif;
                  }
                  h2 {
                    font-weight: normal;
                    letter-spacing: 1.6px;
                  }
                  p {
                    font-size: 16px;
                    letter-spacing: 1.1px;
                  }
                  .items-table td {
                    padding: 20px;
                    border: solid 1px rgb(206, 212, 218);
                  }
                  .note {
                    font-size: 14px;
                  }
                  .address {
                    margin: 0px;
                  }
                </style>
              </head>
              <body>
                <h2>You have a new order from <b>${name}</b>!</h2>
                <table class="items-table">
                  <thead><tr>
                    <td><b>ITEM</b></td>
                    <td><b>PRICE</b></td>
                  </tr></thead>
                  <tbody>${itemsTable}</tbody>
                </table>
                <p><b>TOTAL AMOUNT PAID:</b> $${total.toFixed(2)}</p>
                <p class="address"><b>SHIP TO:</b></p>
                <p class="address">${name}</p>
                <p class="address">${address}</p>
                <p class="address">${city}, ${state} ${zip}</p>
                <p class="note"><i>To get in touch with ${name}, simply reply to this email.</i></p>
              </body>
            </html>
          `;
          fetch(config.emailURL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name,
              email,
              sourceEmail: config.emailAddress,
              siteDomain: window.location.origin,
              html,
              orderNotification: true,
            }),
          }).then((response) => response.json()).then(() => {
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
              items={bag.map(getItemDetails)}
              bag={bag}
              updateBag={updateBag}
            />
            <h4 className="bag-total">
              <span>TOTAL:</span>
              <span>{`$${total.toFixed(2)}`}</span>
            </h4>
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
          </div>
        ) : <p>Shopping bag is empty</p>
      )}
      <CheckoutSuccess show={showSuccessModal} closeModal={() => setShowSuccessModal(false)} />
    </div>
  );
};

export default Checkout;

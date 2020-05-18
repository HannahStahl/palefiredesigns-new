import config from './config';

export const sortByOptions = ['Newest', 'Least expensive', 'Most expensive'];

export const getItemDetails = (items, item) => (
  items.find((itemInList) => itemInList.listing_id === item)
);

export const constructOrderNotificationHtml = (items, name, total, address, city, state, zip) => {
  let itemsTable = '';
  items.forEach((item) => {
    itemsTable += `
      <tr>
        <td>
          <a href="https://etsy.com/your/shops/${config.etsyShopName}/tools/listings/state:inactive/${item.listing_id}">
            <img src="${item.Images[0].url_fullxfull}" width="200" />
          </a>
        </td>
        <td><p>$${item.price}</p></td>
      </tr>
    `;
  });
  return `
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
          .items-table {
            border-spacing: 0px;
            margin-bottom: 25px;
          }
          .items-table td {
            border: solid 1px rgb(206, 212, 218);
            padding: 20px;
          }
          .items-table td p {
            margin: 0px;
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
        <h2>You have received a new order from <b>${name}</b>!</h2>
        <table class="items-table">
          <thead><tr>
            <td><p><b>ITEM</b></p></td>
            <td><p><b>PRICE</b></p></td>
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
};

export const constructOrderConfirmationHtml = (items, name, total, address, city, state, zip) => {
  let itemsTable = '';
  items.forEach((item) => {
    itemsTable += `
      <tr>
        <td><img src="${item.Images[0].url_fullxfull}" width="200" /></td>
        <td><p>$${item.price}</p></td>
      </tr>
    `;
  });
  return `
    <html>
      <head>
        <link href="https://fonts.googleapis.com/css?family=Rubik&display=swap" rel="stylesheet" />
        <style>
          * {
            font-family: 'Rubik', sans-serif;
          }
          p {
            font-size: 16px;
            letter-spacing: 1.1px;
          }
          .items-table {
            border-spacing: 0px;
            border: solid 1px rgb(206, 212, 218);
            margin-bottom: 25px;
          }
          .items-table td {
            border: solid 1px rgb(206, 212, 218);
            padding: 20px;
          }
          .items-table td p {
            margin: 0px;
          }
          .address {
            margin: 0px;
          }
        </style>
      </head>
      <body>
        <p>Hello ${name},</p>
        <p>Thank you for your order from ${config.businessName}!</p>
        <p><b>ORDER DETAILS:</b></p>
        <table class="items-table">
          <thead><tr>
            <td><p><b>ITEM</b></p></td>
            <td><p><b>PRICE</b></p></td>
          </tr></thead>
          <tbody>${itemsTable}</tbody>
        </table>
        <p><b>TOTAL:</b> $${total.toFixed(2)}</p>
        <p class="address"><b>SHIPPING ADDRESS:</b></p>
        <p class="address">${name}</p>
        <p class="address">${address}</p>
        <p class="address">${city}, ${state} ${zip}</p>
        <p>I hope you love your new one-of-a-kind, handcrafted jewelry. If you have any questions about your order, please reply directly to this email to get in touch with me.</p>
        <p>- Dale</p>
      </body>
    </html>
  `;
};

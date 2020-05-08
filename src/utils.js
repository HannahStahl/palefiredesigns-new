import config from './config';

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
        <td>$${item.price}</td>
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
        <h2>You have received a new order from <b>${name}</b>!</h2>
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
};

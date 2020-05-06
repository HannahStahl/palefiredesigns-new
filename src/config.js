const dev = {
  etsyApiURL: 'https://nbqclvrlaf.execute-api.us-east-1.amazonaws.com/dev',
  listFunction: 'testListings',
  purchaseFunction: 'testPurchase',
  cloudfrontBaseURL: 'https://d1ljva6zkf6zjh.cloudfront.net',
  emailURL: 'https://c0mrk8va37.execute-api.us-east-1.amazonaws.com/dev/email/send',
  emailAddress: 'hannahstahl14@gmail.com',
  userID: 'us-east-1:34ee9094-c95a-4f8f-b2c2-551ef33bd49f',
  stripeKey: 'pk_test_meScYDjalEIH2Hrgp9DRRXiI',
};

const prod = {
  etsyApiURL: 'https://qre3hotwsa.execute-api.us-east-1.amazonaws.com/prod',
  listFunction: 'listings',
  purchaseFunction: 'purchase',
  cloudfrontBaseURL: 'https://d1esxin5o90ebg.cloudfront.net',
  emailURL: 'https://aiikn63n03.execute-api.us-east-1.amazonaws.com/prod/email/send',
  emailAddress: 'dale.feuer@gmail.com',
  userID: 'client-user-id', // TODO
  stripeKey: 'client-prod-stripe-key', // TODO
};

// Default to dev if not set
const config = process.env.REACT_APP_STAGE === 'prod'
  ? prod
  : dev;

export default {
  // Add common config values here
  cloudfrontURL: `${config.cloudfrontBaseURL}/${config.userID}`,
  publicCloudfrontURL: 'https://d17jmxltsx3ffm.cloudfront.net',
  businessName: 'Pale Fire Designs',
  ...config,
};

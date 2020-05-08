const dev = {
  etsyApiURL: 'https://nbqclvrlaf.execute-api.us-east-1.amazonaws.com/dev',
  etsyShopName: 'DesignsByHannahTEST',
  cloudfrontBaseURL: 'https://d1ljva6zkf6zjh.cloudfront.net',
  emailURL: 'https://c0mrk8va37.execute-api.us-east-1.amazonaws.com/dev/email/send',
  emailAddress: 'hannahstahl14@gmail.com',
  userID: 'us-east-1:34ee9094-c95a-4f8f-b2c2-551ef33bd49f',
  stripeKey: 'pk_test_meScYDjalEIH2Hrgp9DRRXiI',
};

const prod = {
  etsyApiURL: 'https://nbqclvrlaf.execute-api.us-east-1.amazonaws.com/dev',
  etsyShopName: 'DesignsByHannahTEST',
  cloudfrontBaseURL: 'https://d1ljva6zkf6zjh.cloudfront.net',
  emailURL: 'https://c0mrk8va37.execute-api.us-east-1.amazonaws.com/dev/email/send',
  emailAddress: 'hannahstahl14@gmail.com',
  userID: 'us-east-1:e51b2b71-8b21-46c0-a302-6f3b84783041', // TODO change to user ID you create for Mom
  stripeKey: 'pk_live_I9Ef3jCoWQ6uj7bodYY5GyFw', // TODO change to public key of Stripe account you create for Mom
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

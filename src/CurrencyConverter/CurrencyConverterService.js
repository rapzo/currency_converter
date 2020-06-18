import UpholdSDK from '@uphold/uphold-sdk-javascript';

const sdk = new UpholdSDK({
  baseUrl: 'http://api-sandbox.uphold.com',
  clientId: 'foo',
  clientSecret: 'bar'
});

let cache = [];

export class CurrencyConverterService {
  constructor() {
    sdk.getTicker().then(response => {
      cache = response;
    });
  }
}

export const converter = async (value, currency = 'USD') => {
};

const {send} = require('micro');
const UpholdSDK = require('@uphold/uphold-sdk-javascript').default;

const {
  CLIENT_ID = 'foo',
  CLIENT_SECRET = 'bar',
} = process.env;

const sdk = new UpholdSDK({
  baseUrl: 'http://api-sandbox.uphold.com',
  clientId: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
});

module.exports = async (req, res) => {
  const { url } = req;

  if (req.method === 'GET' && url.startsWith('/api/ticker')) {
    try {
      const currency = url.slice(url.lastIndexOf('/') + 1).toUpperCase();

      send(res, 200, await sdk.getTicker(currency));
    } catch (e) {
      send(res, 400, {error: e.message});
    }
  }

  send(res, 400);
}

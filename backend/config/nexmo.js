const nexmo = require('nexmo');

nexmo.config({
  apiKey: process.env.NEXMO_API_KEY,
  apiSecret: process.env.NEXMO_API_SECRET,
});

module.exports = nexmo;
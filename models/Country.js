const mongoose = require('mongoose');

const countrySchema = new mongoose.Schema({
    name: {
    type: String
  },
  region: {
    type: String
  },
});

const Country = mongoose.model('countries', countrySchema);

module.exports = Country;
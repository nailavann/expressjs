const express = require('express');
const router = express.Router();
const countryController = require('../controllers/CountryController');

router.get('/countries', countryController.getCountries);

router.get('/salesrep', countryController.getSalesrep);

router.get('/optimal', countryController.getOptimal);


module.exports = router;
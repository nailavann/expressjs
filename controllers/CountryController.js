const Country = require('../models/Country');
const axios = require('axios');
const CountryHelper = require('../helpers/CountryHelper')


async function getCountries(req,res) {
    const { region } = req.query;
    let countriesPromise;

    if (region) {
      countriesPromise = Country.find({ region });
    } else {
      countriesPromise = Country.find();
    }

    countriesPromise
    .then((countriesData) => {
      res.json(countriesData);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });

}

function getSalesrep(req, res) {
   axios.get('http://localhost:3000/api/countries').then((response)=>{
      const salesrep =  CountryHelper.salesrepOperation(response.data);
      res.json(salesrep);
    }).catch((err)=>{
      res.status(500).json({ message: err.message });
    }); 
  
}



function getOptimal(req,res){
  axios.get('http://localhost:3000/api/countries').then((response)=>{
    const optimal = CountryHelper.optimalOperation(response.data);
    res.json(optimal);
  }).catch((err)=>{
    res.status(500).json({ message: err.message });
  }); 
} 

module.exports = { getCountries, getSalesrep, getOptimal};
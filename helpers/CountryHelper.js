function salesrepOperation(countriesData) {
    const salesRepOps = {};
    countriesData.forEach(country => {
      if (!salesRepOps[country.region]) {
        salesRepOps[country.region] = {
          region: country.region,
          minSalesReq: 0,
          maxSalesReq: 0
        };
      }
      salesRepOps[country.region].minSalesReq++;
      salesRepOps[country.region].maxSalesReq++;
    });
  
    Object.keys(salesRepOps).forEach(region => {
      salesRepOps[region].minSalesReq = Math.ceil(salesRepOps[region].minSalesReq / 7);
      salesRepOps[region].maxSalesReq = Math.ceil(salesRepOps[region].maxSalesReq / 3);
    });
  
    return Object.values(salesRepOps);
  }


 function optimalOperation(countriesData) {
    const regionWithMinSales = calculateMinSalesReps(countriesData);
    const sales = [];
    regionWithMinSales.forEach((region) => {
      for (let i = 0; i < region.minSalesReq; i++) {
        sales.push({
          region: region.region,
          countryCount: 0,
          countryList: []
        });
      }
    });
  
    const groupedCountries = {};
    countriesData.forEach(country => {
      const { region } = country;
      if (!groupedCountries[region]) {
        groupedCountries[region] = [];
      }
      groupedCountries[region].push(country);
    });
  
    sales.forEach((salesRep) => {
      const region = salesRep.region;
      const countriesForRegion = groupedCountries[region];
      const countriesToAssign = Math.min(7, countriesForRegion.length - salesRep.countryCount);
      if (countriesToAssign > 0) {
        salesRep.countryList.push(...countriesForRegion.splice(0, countriesToAssign).map(country => country.name));
        salesRep.countryCount += countriesToAssign;
      }
    });
    
    return Object.values(sales);
  }
  
  function calculateMinSalesReps(countriesData) {
    const salesRepOps = {};
    countriesData.forEach((country)=>{
      if (!salesRepOps[country.region]) {
        salesRepOps[country.region] = {
          region: country.region,
          minSalesReq: 0,
        };
      }
      salesRepOps[country.region].minSalesReq++;
    });
    Object.keys(salesRepOps).forEach(region => {
      salesRepOps[region].minSalesReq = Math.ceil(salesRepOps[region].minSalesReq / 7);
    });
  
    return Object.values(salesRepOps);
  }

  module.exports = {
    salesrepOperation,
    optimalOperation
  };
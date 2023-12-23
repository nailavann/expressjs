function salesMinMaxOperation(countriesData) {
    const salesRepOps = {};
    countriesData.forEach(country => {
      const { region } = country;
      if (!salesRepOps[region]) {
        salesRepOps[region] = {
          region: region,
          minSalesReq: 0,
          maxSalesReq: 0
        };
      }
      salesRepOps[region].minSalesReq++;
      salesRepOps[region].maxSalesReq++;
    });

    Object.keys(salesRepOps).forEach(region => {
      salesRepOps[region].minSalesReq = Math.ceil(salesRepOps[region].minSalesReq / 7);
      salesRepOps[region].maxSalesReq = Math.ceil(salesRepOps[region].maxSalesReq / 3);
    });

    return Object.values(salesRepOps);
  }


 function optimalOperation(countriesData) {
    const regionWithMinSales = salesMinMaxOperation(countriesData);
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

    const groupedCountries = preparedGroupCountries(countriesData);
   
    sales.forEach((salesRep,index) => {
      const region = salesRep.region;
      const countriesForRegion = groupedCountries[region];
      let countriesToAssign = Math.min(7, countriesForRegion.length - salesRep.countryCount);

      // Eğer üçten az ise bir önceki elemandan ülke aktar.
      while(countriesToAssign< 3){
          const prevSalesRep = sales[index - 1];
          const countriesFromPrev = prevSalesRep.countryList.splice(-1);
          
          // Şu ankine aktar
          salesRep.countryList.push(...countriesFromPrev);

          prevSalesRep.countryCount--;
          countriesToAssign++;
      }

      if(countriesToAssign >2){
        salesRep.countryList.push(...countriesForRegion.splice(0, countriesToAssign).map(country => country.name));
        salesRep.countryCount += countriesToAssign;
      }

    });

    return sales;
  }

 function  preparedGroupCountries(countriesData){
   let groupedCountries = {};
   countriesData.forEach(country => {
     const { region } = country;
     if (!groupedCountries[region]) {
       groupedCountries[region] = [];
     }
     groupedCountries[region].push(country);
   });
   return groupedCountries;
  }
 
  module.exports = {
    salesMinMaxOperation,
    optimalOperation
  };
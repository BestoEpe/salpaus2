const { fetchDataFromXlsb } = require('./xlsbServer');

// URL of the XLSB file to fetch
const xlsbUrl = 'https://vipunen.fi/fi-fi/_layouts/15/XlFileHandler.aspx?id=https%3A%2F%2Fvipunen.fi%2Ffi-fi%2FRaportit%2FAmmatillinen%20koulutus%20-%20ty%C3%B6llistyminen%20ja%20jatko-opinnot%20-%20tilastovuosi.xlsb&sessionId=36.edd378bf-313d-4c32-844d-f4b1d6cd1e7f1.A94.1.V26.173818lMiKxu8mOu7coiU%2BVNIG14.5.fi-FI5.fi-FI36.94153f1a-692f-42fe-a1a9-766f6877aa181.A1.N&workbookFileName=Ammatillinen%20koulutus%20-%20ty%C3%B6llistyminen%20ja%20jatko-opinnot%20-%20tilastovuosi.xlsb&workbookType=PublishedItemsSnapshot';

// Call the fetchDataFromXlsb function with the URL
fetchDataFromXlsb(xlsbUrl)
  .then(data => {
    // Do something with the fetched data
    console.log('Fetched data:', data);
  })
  .catch(error => {
    // Handle any errors
    console.error('Error fetching data:', error);
  });

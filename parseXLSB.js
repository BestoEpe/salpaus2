// Dynamic import() to load node-fetch
const fetchPromise = import('node-fetch');

// Function to download XLSB file
async function downloadXLSB(url) {
    try {
        const fetch = await fetchPromise;
        const response = await fetch.default(url);
        const buffer = await response.arrayBuffer();
        return new Uint8Array(buffer);
    } catch (error) {
        console.error('Error downloading XLSB file:', error);
        return null;
    }
}

// Function to parse XLSB file
function parseXLSB(data) {
    try {
        const { read, utils } = require('xlsx');
        const workbook = read(data, { type: 'array', cellStyles: true });
        // Assuming there's only one sheet
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = utils.sheet_to_json(sheet, { header: 1 });
        // Print JSON data to console
        console.log(jsonData);
    } catch (error) {
        console.error('Error parsing XLSB file:', error);
    }
}

// Main function to execute
(async () => {
    const url = 'https://vipunen.fi/fi-fi/_layouts/15/XlFileHandler.aspx?id=https%3A%2F%2Fvipunen.fi%2Ffi-fi%2FRaportit%2FAmmatillinen%20koulutus%20-%20ty%C3%B6llistyminen%20ja%20jatko-opinnot%20-%20tilastovuosi.xlsb&sessionId=36.edd378bf-313d-4c32-844d-f4b1d6cd1e7f1.D91.1.V23.567rM%2Fb%2FpgGh2fMfvVViUYF14.5.fi-FI5.fi-FI36.94153f1a-692f-42fe-a1a9-766f6877aa181.A1.N&workbookFileName=Ammatillinen%20koulutus%20-%20ty%C3%B6llistyminen%20ja%20jatko-opinnot%20-%20tilastovuosi.xlsb&workbookType=PublishedItemsSnapshot';
    
    const xlsbData = await downloadXLSB(url);
    if (xlsbData) {
        parseXLSB(xlsbData);
    }
})();

const axios = require('axios');
const exceljs = require('exceljs');

async function fetchDataFromXlsb(url) {
    try {
        // Fetch the XLSB file from the URL
        const response = await axios.get(url, {
            responseType: 'arraybuffer' // Set responseType to 'arraybuffer' to handle binary data
        });

        // Load the XLSB file's contents into an Excel workbook
        const workbook = new exceljs.Workbook();
        await workbook.xlsx.load(response.data);

        // Process the workbook and extract the data
        const jsonData = [];
        workbook.eachSheet(sheet => {
            const sheetData = [];
            sheet.eachRow(row => {
                const rowData = row.values.map(cell => {
                    if (typeof cell === 'number' && cell >= 1 && cell <= 4) {
                        return 2;
                    }
                    return cell;
                });
                sheetData.push(rowData);
            });
            jsonData.push({ sheetName: sheet.name, sheetData });
        });

        // Log fetched data to the console
        console.log('Fetched data:', jsonData);

        return jsonData;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

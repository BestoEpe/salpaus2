const puppeteer = require('puppeteer');

async function getSessionId(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setViewport({ width: 1280, height: 800 });

    try {
        await page.goto(url, { waitUntil: 'networkidle0' }); // Wait until the network activity is idle

        console.log('Page loaded successfully.');

        // Click on the button with text "Oppilaitos"
        await page.evaluate(() => {
            const buttons = document.querySelectorAll('.ewr-slicer-header-button');
            for (const button of buttons) {
                if (button.textContent.trim() === 'Oppilaitos') {
                    button.click();
                    break;
                }
            }
        });

        console.log('Button "Oppilaitos" clicked.');

        // Wait for some time before continuing (you can adjust this as needed)
        await new Promise(resolve => setTimeout(resolve, 4000)); // Wait for 10 seconds

        // Click on the button with text "Koulutuskeskus Salpaus"
        await page.evaluate(() => {
            const buttons = document.querySelectorAll('.ewr-slicer-header-button');
            for (const button of buttons) {
                if (button.textContent.trim() === 'Koulutuskeskus Salpaus') {
                    button.click();
                    break;
                }
            }
        });

        console.log('Button "Koulutuskeskus Salpaus" clicked.');

        // Wait for some time before continuing (you can adjust this as needed)
        await new Promise(resolve => setTimeout(resolve, 4000)); // Wait for 10 seconds

        const sessionIdInput = await page.waitForSelector('input[name="m_excelWebRenderer$ewaCtl$m_workbookContextJson"]', { timeout: 4000 });
        
        const sessionId = await sessionIdInput.evaluate(element => {
            const value = element.value;
            if (value) {
                const jsonValue = JSON.parse(value);
                return jsonValue.SessionId;
            }
            return null;
        });

        await browser.close();

        return sessionId;
        
    } catch (error) {
        console.error('Error:', error);
        await browser.close();
        return null;
    }
}

const fetchPromise = import('node-fetch');

async function fetchAndDownloadXLSB(url) {
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

function parseXLSB(data) {
    try {
        const { read, utils } = require('xlsx');
        const workbook = read(data, { type: 'array', cellStyles: true });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = utils.sheet_to_json(sheet, { header: 1 });
        console.log(jsonData);
    } catch (error) {
        console.error('Error parsing XLSB file:', error);
    }
}

(async () => {
    const sessionId = await getSessionId('https://vipunen.fi/fi-fi/Raportit/Ammatillinen%20koulutus%20-%20ty%C3%B6llistyminen%20ja%20jatko-opinnot%20-%20tilastovuosi.xlsb?Web=1');
    
    if (sessionId) {
        const url = `https://vipunen.fi/fi-fi/_layouts/15/XlFileHandler.aspx?id=https%3A%2F%2Fvipunen.fi%2Ffi-fi%2FRaportit%2FAmmatillinen%20koulutus%20-%20ty%C3%B6llistyminen%20ja%20jatko-opinnot%20-%20tilastovuosi.xlsb&sessionId=${sessionId}&workbookFileName=Ammatillinen%20koulutus%20-%20ty%C3%B6llistyminen%20ja%20jatko-opinnot%20-%20tilastovuosi.xlsb&workbookType=PublishedItemsSnapshot`;
        
        const xlsbData = await fetchAndDownloadXLSB(url);
        if (xlsbData) {
            parseXLSB(xlsbData);
        }
    }
})();

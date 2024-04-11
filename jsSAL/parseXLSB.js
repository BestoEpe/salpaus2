const puppeteer = require('puppeteer');

async function getSessionId(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Set viewport to a desktop resolution to ensure all elements are visible
    await page.setViewport({ width: 1280, height: 800 });

    // Navigate to the URL
    await page.goto(url, { waitUntil: 'load' });

    // Evaluate JavaScript on the page to extract the session ID from the input field
    const sessionId = await page.evaluate(() => {
        const sessionIdInput = document.querySelector('input[name="m_excelWebRenderer$ewaCtl$m_workbookContextJson"]');
        if (sessionIdInput) {
            const value = sessionIdInput.getAttribute('value');
            if (value) {
                const jsonValue = JSON.parse(value);
                return jsonValue.SessionId;
            }
        }
        return null;
    });

    await browser.close();

    return sessionId;
}

const url = 'https://vipunen.fi/fi-fi/Raportit/Ammatillinen%20koulutus%20-%20ty%C3%B6llistyminen%20ja%20jatko-opinnot%20-%20tilastovuosi.xlsb?Web=1';

getSessionId(url)
    .then(sessionId => {
        console.log('Session ID:', sessionId);
    })
    .catch(error => {
        console.error('Error:', error);
    });

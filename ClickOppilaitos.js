const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

async function clickOppilaitosElement() {
    const driver = await new Builder()
        .forBrowser('chrome')
        .build();

    try {
        await driver.get('https://vipunen.fi/fi-fi/Raportit/Ammatillinen%20koulutus%20-%20ty%C3%B6llistyminen%20ja%20jatko-opinnot%20-%20tilastovuosi.xlsb?Web=1');
        console.log('Page loaded successfully.');

        // Wait for the Oppilaitos element to be located and clickable
        const oppilaitosElement = await driver.wait(until.elementLocated(By.xpath('//*[@id="m_excelWebRenderer_nov_ewaCtl__2_Oppilaitos_21_0"]')), 15000);
        await driver.wait(until.elementIsVisible(oppilaitosElement), 15000);
        await driver.wait(until.elementIsEnabled(oppilaitosElement), 15000);
        
        // Click on the Oppilaitos element
        await oppilaitosElement.click();
        console.log('Oppilaitos element clicked.');

        // Wait for 4 seconds
        await driver.sleep(4000);

        console.log('Waiting for 4 seconds after clicking.');

        // You can add further actions here if needed
    } catch (error) {
        console.error('Error:', error);
    } finally {
        await driver.quit();
    }
}

// Call the function to click the Oppilaitos element
clickOppilaitosElement();

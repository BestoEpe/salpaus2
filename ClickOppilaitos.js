const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

async function clickOppilaitosElement() {
    const driver = await new Builder()
        .forBrowser('chrome')
        .build();

    try {
        await driver.get('https://vipunen.fi/fi-fi/Raportit/Ammatillinen%20koulutus%20-%20ty%C3%B6llistyminen%20ja%20jatko-opinnot%20-%20tilastovuosi.xlsb?Web=1');
        console.log('Page loaded successfully.');

        await driver.sleep(10000);

        const oppilaitosElement = await driver.wait(until.elementLocated(By.xpath('//*[@id="m_excelWebRenderer_nov_ewaCtl__2_Oppilaitos_21_0"]')), 15000);
        await driver.wait(until.elementIsVisible(oppilaitosElement), 15000);
        await driver.wait(until.elementIsEnabled(oppilaitosElement), 15000);

        await oppilaitosElement.click();
        console.log('Oppilaitos element clicked.');

        await driver.sleep(10000);

        const adultaElement = await driver.wait(until.elementLocated(By.xpath('//td[@id="ctl00_AdultaOy1"]')), 15000);
        await driver.wait(until.elementIsVisible(adultaElement), 15000);
        await driver.wait(until.elementIsEnabled(adultaElement), 15000);

        await adultaElement.click();
        console.log('Adulta element clicked.');
    } catch (error) {
        console.error('Error:', error);
    } finally {
        await driver.quit();
    }
}

clickOppilaitosElement();

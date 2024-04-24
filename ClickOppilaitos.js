const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

async function clickBelowOppilaitosAndScroll() {
    const driver = await new Builder()
        .forBrowser('chrome')
        .build();

    try {
        await driver.get('https://vipunen.fi/fi-fi/Raportit/Ammatillinen%20koulutus%20-%20ty%C3%B6llistyminen%20ja%20jatko-opinnot%20-%20tilastovuosi.xlsb?Web=1');
        console.log('Page loaded successfully.');

        await driver.sleep(10000);

        // Find the oppilaitos element
        const oppilaitosElement = await driver.wait(until.elementLocated(By.xpath('//*[@id="m_excelWebRenderer_nov_ewaCtl__2_Oppilaitos_21_0"]')), 15000);

        // Get the location of the oppilaitos element
        const oppilaitosRect = await oppilaitosElement.getRect();
        const oppilaitosX = Math.floor(oppilaitosRect.x);
        const oppilaitosY = Math.floor(oppilaitosRect.y);

        // Click on the oppilaitos element
        await oppilaitosElement.click();
        console.log('Oppilaitos element clicked.');

        await driver.sleep(4000);

        // Calculate the coordinates a few pixels below the oppilaitos element
        const offsetX = 0; // Adjust as needed
        const offsetY = 20; // Adjust as needed
        const clickX = oppilaitosX + offsetX;
        const clickY = oppilaitosY + Math.floor(oppilaitosRect.height) + offsetY;

        // Click a few pixels below the oppilaitos element using the original coordinates
        await driver.actions({ bridge: true }).move({ x: clickX, y: clickY }).click().perform();
        console.log('Clicked a few pixels below the original position of the oppilaitos element.');

        await driver.sleep(4000);

        // Scroll downward after clicking
        const actions = driver.actions({ bridge: true });
        await actions.sendKeys(Key.DOWN).perform();
        console.log('Page scrolled downward.');

        // Loop for downward scrolling for a fixed number of times
        let scrollCount = 0;
        const maxScrolls = 13; // Adjust as needed
        while (scrollCount < maxScrolls) {
            await actions.sendKeys(Key.DOWN).perform();
            console.log('Page scrolled downward.');
            scrollCount++;
            await driver.sleep(1000); // Adjust sleep time between scrolls as needed
        }

        console.log('Finished scrolling.');
        await driver.sleep(5000);
    } catch (error) {
        console.error('Error:', error);
    } finally {
        await driver.quit();
    }
}

clickBelowOppilaitosAndScroll();

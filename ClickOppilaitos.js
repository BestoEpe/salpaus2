const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

async function clickBelowOppilaitosAndScroll() {
    const driver = await new Builder()
        .forBrowser('chrome')
        .build();
    //lataa ja avaa sivu
    try {
        await driver.get('https://vipunen.fi/fi-fi/Raportit/Ammatillinen%20koulutus%20-%20ty%C3%B6llistyminen%20ja%20jatko-opinnot%20-%20tilastovuosi.xlsb?Web=1');
        console.log('Page loaded successfully.');

        await driver.sleep(6000);

        // etsi Oppilaitos
        const oppilaitosElement = await driver.wait(until.elementLocated(By.xpath('//*[@id="m_excelWebRenderer_nov_ewaCtl__2_Oppilaitos_21_0"]')), 8000);

        // etsi Oppilaitos
        const oppilaitosRect = await oppilaitosElement.getRect();
        const oppilaitosX = Math.floor(oppilaitosRect.x);
        const oppilaitosY = Math.floor(oppilaitosRect.y);

        // Paina Oppilaitosta
        await oppilaitosElement.click();
        console.log('Oppilaitos element clicked.');

        await driver.sleep(2000);

        // laske koordinaatit
        const offsetX = 0; 
        const offsetY = 20; 
        const clickX = oppilaitosX + offsetX;
        const clickY = oppilaitosY + Math.floor(oppilaitosRect.height) + offsetY;

        // koordinaattien avulla valitse scrollattava alue
        await driver.actions({ bridge: true }).move({ x: clickX, y: clickY }).click().perform();
        console.log('Clicked a few pixels below the original position of the oppilaitos element.');

        await driver.sleep(2000);

        
        const actions = driver.actions({ bridge: true });
        await actions.sendKeys(Key.DOWN).perform();
        console.log('Page scrolled downward.');

        // scrollaa alas loop
        let scrollCount = 0;
        const maxScrolls = 13; 
        while (scrollCount < maxScrolls) {
            await actions.sendKeys(Key.DOWN).perform();
            console.log('Page scrolled downward.');
            scrollCount++;
            await driver.sleep(400); 
        }

        
        await driver.sleep(1000);

        // mene Salpauksen kohdalle
        for (let i = 0; i < 3; i++) {
            await driver.actions({ bridge: true }).sendKeys(Key.UP).perform();
            console.log('Pressed the up arrow key.');
            await driver.sleep(700); 
        }

        // paina Salpausta
        await driver.actions({ bridge: true }).sendKeys(Key.ENTER).perform();
        console.log('Pressed Enter.');

        console.log('Finished scrolling.');
        await driver.sleep(5000);
    } catch (error) {
        console.error('Error:', error);
    }
}

clickBelowOppilaitosAndScroll();

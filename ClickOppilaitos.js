const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

async function clickBelowOppilaitosAndScroll() {
    const driver = await new Builder()
        .forBrowser('chrome')
        .build();
    // Load and open the page
    try {
        await driver.get('https://vipunen.fi/fi-fi/Raportit/Ammatillinen%20koulutus%20-%20ty%C3%B6llistyminen%20ja%20jatko-opinnot%20-%20tilastovuosi.xlsb?Web=1');
        console.log('Page loaded successfully.');

        // Display modal overlay with message
        await driver.executeScript(`
            var modal = document.createElement('div');
            modal.id = 'customOverlay';
            modal.style.position = 'fixed';
            modal.style.top = '50%';
            modal.style.left = '50%';
            modal.style.transform = 'translate(-50%, -50%)';
            modal.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
            modal.style.padding = '20px';
            modal.style.border = '2px solid black';
            modal.style.zIndex = '9999';
            modal.textContent = 'Sovellus on käynnissä, odota kunnes tämä viesti katoaa!';
            document.body.appendChild(modal);
        `);

        // Wait for a brief period
        await driver.sleep(4000);

        // Find the Oppilaitos element
        const oppilaitosElement = await driver.wait(until.elementLocated(By.xpath('//*[@id="m_excelWebRenderer_nov_ewaCtl__2_Oppilaitos_21_0"]')), 8000);
        const oppilaitosRect = await oppilaitosElement.getRect();
        const oppilaitosX = Math.floor(oppilaitosRect.x);
        const oppilaitosY = Math.floor(oppilaitosRect.y);

        // Click on the Oppilaitos element
        await oppilaitosElement.click();
        console.log('Oppilaitos element clicked.');

        await driver.sleep(2000);

        // Calculate coordinates for scrolling
        const offsetX = 0;
        const offsetY = 20;
        const clickX = oppilaitosX + offsetX;
        const clickY = oppilaitosY + Math.floor(oppilaitosRect.height) + offsetY;

        // Scroll a few pixels below the Oppilaitos element
        await driver.actions({ bridge: true }).move({ x: clickX, y: clickY }).click().perform();
        console.log('Clicked a few pixels below the original position of the Oppilaitos element.');

        await driver.sleep(2000);

        // Perform downward scrolling
        const actions = driver.actions({ bridge: true });
        await actions.sendKeys(Key.DOWN).perform();
        console.log('Page scrolled downward.');

        let scrollCount = 0;
        const maxScrolls = 13; 
        while (scrollCount < maxScrolls) {
            await actions.sendKeys(Key.DOWN).perform();
            console.log('Page scrolled downward.');
            scrollCount++;
            await driver.sleep(400); 
        }

        await driver.sleep(1000);

        // Scroll up to Salpauksen
        for (let i = 0; i < 3; i++) {
            await driver.actions({ bridge: true }).sendKeys(Key.UP).perform();
            console.log('Pressed the up arrow key.');
            await driver.sleep(700); 
        }

        // Press Enter on Salpaus
        await driver.actions({ bridge: true }).sendKeys(Key.ENTER).perform();
        console.log('Pressed Enter.');

        console.log('Finished scrolling.');

        // Remove the custom overlay
        await driver.executeScript(`
            var customOverlay = document.getElementById('customOverlay');
            if (customOverlay) {
                customOverlay.parentNode.removeChild(customOverlay);
            }
        `);

        await driver.sleep(5000);
    } catch (error) {
        console.error('Error:', error);

        // Display error modal overlay
        await driver.executeScript(`
            var errorModal = document.createElement('div');
            errorModal.id = 'errorOverlay';
            errorModal.style.position = 'fixed';
            errorModal.style.top = '50%';
            errorModal.style.left = '50%';
            errorModal.style.transform = 'translate(-50%, -50%)';
            errorModal.style.backgroundColor = 'rgba(255, 55, 55, 0.9)';
            errorModal.style.padding = '20px';
            errorModal.style.border = '2px solid black';
            errorModal.style.zIndex = '9999';
            errorModal.textContent = 'Virhe tapahtui, käynnistä sovellus uudelleen!';
            document.body.appendChild(errorModal);
        `);

        // Wait for a brief period
        await driver.sleep(5000);
    } 
}

clickBelowOppilaitosAndScroll();

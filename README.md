# projekti tiivistettynä

Automatisoitu excel service toiminto joka avaa kohdan koulutuskeskus salpaus niin että avaat työpöytä sovelluksen ja se run commendaa node koodin

# Teknologiat

- Node.js
- Selenium-webdriver
- Selenium-chromedriver

## Käyttö

1. Asenna tarvittavat riippuvuudet ajamalla `npm install`.
2. Asenna tarvittavat paketit komennolla `npm install selenium-webdriver selenium-webdriver/chrome`.
3. Muokkaa skriptiä tarvittaessa, erityisesti URL-osoitetta ja odotusaikoja.
4. Ajaa skripti komennolla `node <tiedostonimi.js>`.

## Huomioita

- Skripti on tarkoitettu ajettavaksi ympäristössä, jossa on asennettuna Chrome-selain ja Node.js.

## Sovellus

Tämän skriptin pohjalta on myös tehty sovelluksen käyttäen Electronia. Sovellus on nimeltään "Selenium Script Runner" ja se on paketoitu Windows-ympäristöön (`selenium-script-runner-win32-x64`). Sovelluksen avulla voit suorittaa Selenium-skriptejä tupla-klikkaamalla kuvaketta.

Sovelluksen paketointi komennolla:
`electron-packager . selenium-script-runner --platform=win32 --arch=x64 --electron-version=v30.0.1 --main=app.js`


package.json-tiedoston muokkaus:
```json
{
  "name": "selenium-script-runner",
  "version": "1.0.0",
  "main": "app.js",
  "scripts": {
    "start": "electron ."
  },
  "dependencies": {
    "chromedriver": "^124.0.1",
    "selenium-webdriver": "^4.20.0"
  },
  "author": "Erno & Iiro",
  "license": "MIT"
}

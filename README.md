# Selenium-skripti raporttisivun automaattiseen vieritykseen ja valinnan suorittamiseen

Tämä on yksinkertainen Selenium-skripti, joka automatisoi vierityksen tietylle verkkosivulle ja suorittaa valinnan. Skripti käyttää Node.js-pohjaista Selenium WebDriveria ja Chrome-selainta.

## Käyttö

1. Asenna tarvittavat riippuvuudet ajamalla `npm install`.
2. Asenna tarvittavat paketit komennolla `npm install selenium-webdriver selenium-webdriver/chrome`.
3. Muokkaa skriptiä tarvittaessa, erityisesti URL-osoitetta ja odotusaikoja.
4. Ajaa skripti komennolla `node <tiedostonimi.js>`.

## Huomioita

- Tämä skripti on tarkoitettu esimerkiksi koulutustarkoituksiin ja siinä voi olla sovelluskohtaisia riippuvuuksia.
- Muista varmistaa, että sinulla on oikeudet ja lupa käyttää automaatiota verkkosivulla.
- Skripti on tarkoitettu ajettavaksi ympäristössä, jossa on asennettuna Chrome-selain ja Node.js.

## Sovellus

Tämän skriptin pohjalta tein myös sovelluksen käyttäen Electronia. Sovellus on nimeltään "Selenium Script Runner" ja se on paketoitu Windows-ympäristöön (`selenium-script-runner-win32-x64`). Sovelluksen avulla voit suorittaa Selenium-skriptejä tupla-klikkaamalla kuvaketta.

Sovelluksen paketointi komennolla:
electron-packager . selenium-script-runner --platform=win32 --arch=x64 --electron-version=v30.0.1 --main=app.js


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
Lisenssi
Tätä skriptiä voi käyttää ja muokata vapaasti henkilökohtaisiin ja kaupallisiin tarkoituksiin, mutta ilman takuuta.

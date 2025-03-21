# Projektin dokumentaatio

## 1. Projektin yleiskuvaus
- Projektin nimi: Gulaari
- Tekijä: [Tekijän nimi]
- Päivämäärä: 21.3.2025
- Versio: 0.0.0

## 2. Tekninen ympäristö
### 2.1 Käytetyt teknologiat
- Angular 18.0.0
  - @angular/core: ^18.0.0
  - @angular/cli: ^18.0.1
- Bootstrap 5.3.3
- TypeScript 5.4.2
- RxJS 7.8.0

### 2.2 Kehitysympäristön asennus ja muutokset
1. Ensiksi lisättiin Bootstrap (npm i bootstrap)
    - Lisätty angular.jsoniin:
      - styles: "node_modules/bootstrap/dist/css/bootstrap.min.css"
      - scripts: "node_modules/bootstrap/dist/js/bootstrap.min.js"
2. Lisättiin Products-komponentti (ng g c products --skip-tests)
    - Komponentti luotu hakemistoon src/app/components/products
    - Lisätty app.component.ts tiedostoon import ja imports-taulukkoon
    - Lisätty app.component.html tiedostoon <app-products></app-products>
    - Komponentti näkyy nyt sovelluksen pääsivulla osoitteessa http://localhost:4200

## 3. Sovelluksen rakenne
### 3.1 Komponentit
- Products
  - Tuotteiden näyttämiseen tarkoitettu komponentti
  - Sijainti: src/app/components/products
  - Tila: Perusrakenne luotu, sisältää oletussisällön

### 3.2 Palvelut
- [Palvelun nimi]
  - Käyttötarkoitus
  - Toiminnallisuudet

## 4. Tietokannat ja rajapinnat
- [Käytetyt tietokannat/rajapinnat]
- Tietorakenteet

## 5. Käyttöliittymä
- Käyttöliittymän rakenne
- Näkymät ja toiminnallisuudet

## 6. Testaus
- Testausmenetelmät
- Testitapaukset

## 7. Jatkokehitysideat
- [Lista mahdollisista kehitysideoista]

## 8. Lähteet
- [Käytetyt lähteet ja materiaalit]
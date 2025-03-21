# Projektin dokumentaatio

## 1. Projektin yleiskuvaus
- Projektin nimi: Gulaari (Settlement Portal)
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
2. ~~Lisättiin Products-komponentti~~ (Poistettu)
3. Toteutettu Settlement Portal -käyttöliittymä (21.3.2025)
    - Lisätty Bootstrap-tyylitelty perusnäkymä
    - Käytetty container, row ja col -komponentteja asetteluun
    - Lisätty korttinäkymä tietojen esittämiseen
    - Lisätty "Add New" -painike uusien tietojen lisäämistä varten
4. Kehitysympäristön muutokset
    - Muokattu package.json start-skriptiä: `"start": "ng serve --o"`
      - --o lippu avaa selaimen automaattisesti

## 3. Sovelluksen rakenne
### 3.1 Komponentit
- App Component
  - Sovelluksen pääkomponentti
  - Sisältää Settlement Portal -käyttöliittymän perusrakenteen
  - Hyödyntää Bootstrap-komponentteja:
    - Container layout
    - Card-komponentti
    - Button-komponentit

### 3.2 Palvelut
- [Palvelun nimi]
  - Käyttötarkoitus
  - Toiminnallisuudet

## 4. Tietokannat ja rajapinnat
- [Käytetyt tietokannat/rajapinnat]
- Tietorakenteet

## 5. Käyttöliittymä
### 5.1 Rakenne
- Yläpalkki
  - Otsikko "Settlement Portal"
  - "Add New" -painike oikealla
- Sisältöalue
  - Korttinäkymä tietojen esittämiseen
  - Responsiivinen asettelu Bootstrap grid -järjestelmällä

### 5.2 Komponentit
- Card
  - Otsikko
  - Sisältöteksti
  - Toimintopainike

## 6. Testaus
- Testausmenetelmät
- Testitapaukset

## 7. Jatkokehitysideat
- Korttinäkymän tietojen dynaaminen lataaminen
- Uuden tiedon lisäämistoiminnon toteutus
- [Muut kehitysideat]

## 8. Lähteet
- [Käytetyt lähteet ja materiaalit]
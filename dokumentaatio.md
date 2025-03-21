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
  - Modal-komponentti
  - Grid-järjestelmä
  - Kortit ja painikkeet
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
5. Tyylimäärittelyt (21.3.2025)
    - Tumma teema:
      - Taustaväri: #2A2B2E (tumma harmaa)
      - Kortin otsikkoalue: #383A3F (hieman vaaleampi harmaa)
      - Kortin reunat: #383A3F
      - Tekstin väri: #E1E1E1 (vaalea harmaa)
      - Toimintopainikkeet: #4CAF50 (Material Design vihreä)
    - Tyylitiedosto: src/styles.css
    - Komponenttien tyylit:
      - Body: tumma tausta
      - Kortti: tumma tausta, vaaleammat reunat
      - Kortin otsikko: vaaleampi tausta
      - Kortin teksti: vaalea väri luettavuuden parantamiseksi
      - Painikkeet: mukautetut värit ja hover-efektit
6. Modal-toiminnallisuus (21.3.2025)
    - Lisätty Bootstrap modal -komponentti
    - Toteutettu openModal() -funktio app.component.ts:ssä
    - Yhdistetty "Add New" -painike modaalin avaamiseen
    - Modal-rakenne:
      - Header: otsikko ja sulkemispainike
      - Body: sisältöalue
      - Footer: toimintopainikkeet

## 3. Sovelluksen rakenne
### 3.1 Komponentit
- App Component
  - Sovelluksen pääkomponentti
  - Sisältää Settlement Portal -käyttöliittymän perusrakenteen
  - Hyödyntää Bootstrap-komponentteja:
    - Container layout
    - Card-komponentti (mukautettu tumma teema)
    - Button-komponentit (mukautetut värit)
    - Modal-komponentti uusien tietojen lisäämiseen
  - Toiminnallisuudet:
    - openModal(): avaa modaalin uuden tiedon lisäämistä varten

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
  - Otsikko "Settlement Portal" (vaalea teksti)
  - "Add New" -painike oikealla (vihreä outline)
- Sisältöalue
  - Korttinäkymä tietojen esittämiseen
  - Responsiivinen asettelu Bootstrap grid -järjestelmällä
- Modal-dialogi
  - Avautuu "Add New" -painikkeesta
  - Header, body ja footer -osiot
  - Sulkemispainike oikeassa yläkulmassa

### 5.2 Komponentit
- Card
  - Tumma teema:
    - Kortin tausta: #2A2B2E
    - Otsikkoalue: #383A3F
    - Reunat: #383A3F
    - Teksti: #E1E1E1
  - Rakenne:
    - Otsikko kortin yläosassa
    - Sisältöteksti vaalealla värillä
    - Toimintopainike
- Painikkeet
  - "Add New":
    - Normaali tila: vihreä reunus (#4CAF50)
    - Hover-tila: vihreä tausta, vaalea teksti
  - Modal:
    - Sulkemispainike (btn-close)
    - Toimintopainikkeet (btn-danger)

## 6. Testaus
- Testausmenetelmät
- Testitapaukset

## 7. Jatkokehitysideat
- Korttinäkymän tietojen dynaaminen lataaminen
- Uuden tiedon lisäämistoiminnon toteutus
  - Modal-lomakkeen kenttien lisääminen
  - Tietojen validointi
  - Tallennustoiminnallisuus
- Värimaailman laajentaminen ja yhtenäistäminen
  - Aksenttivärien lisääminen muihin toimintoihin
  - Hover-tilojen yhtenäistäminen
  - Painikkeiden värimaailman laajentaminen eri toimintoihin
  - Modal-dialogin tyylittely tumman teeman mukaiseksi
- [Muut kehitysideat]

## 8. Lähteet
- [Käytetyt lähteet ja materiaalit]
# Projektin dokumentaatio

## 1. Projektin yleiskuvaus
- Projektin nimi: Gulaari (Settlement Portal)
- Tekijä: [Tekijän nimi]
- Päivämäärä: 21.3.2025
- Versio: 0.0.1

## 2. Tekninen ympäristö
### 2.1 Käytetyt teknologiat
- Angular 18.0.0
  - @angular/core: ^18.0.0
  - @angular/cli: ^18.0.1
  - Standalone components
  - NgZone optimointi
- Bootstrap 5.3.3
  - Modal-komponentit
  - Grid-järjestelmä
  - Kortit ja painikkeet
  - Dark theme
  - Saavutettavuus
- TypeScript 5.4.2
- RxJS 7.8.0

### 2.2 Kehitysympäristön asennus ja muutokset
1. Bootstrap asennus ja konfigurointi
    - npm i bootstrap
    - angular.json päivitykset:
      - styles: "node_modules/bootstrap/dist/css/bootstrap.min.css"
      - scripts: "node_modules/bootstrap/dist/js/bootstrap.min.js"
2. Käyttöliittymän toteutus
    - Bootstrap-tyylitelty perusnäkymä
    - Responsiivinen grid-asettelu
    - Dark theme integraatio
3. Kehitysympäristön optimointi
    - package.json start-skripti: `"start": "ng serve --o"`
    - Automaattinen selainavaaus
4. Modal-järjestelmä
    - Bootstrap modaalit
    - Turvallinen alustus
    - Saavutettavuus
    - Virheiden käsittely

## 3. Sovelluksen rakenne
### 3.1 Komponentit
- App Component
  - Sovelluksen pääkomponentti
  - Modaalien alustus AfterViewInit-hookissa
  - NgZone-optimointi modaaleille
  - Delegoi toiminnot CrudServicelle

### 3.2 Palvelut
- CrudService
  - Tiedonhallinta ja bisneslogiikka
  - Modaalien hallinta:
    - Turvallinen alustus
    - Virheiden käsittely
    - Resurssien vapautus
  - Toiminnot:
    - Kohteiden CRUD-operaatiot
    - LocalStorage-integraatio
    - Modaalien elinkaarenhallinta

## 4. Käyttöliittymä
### 4.1 Rakenne
- Yläpalkki
  - Otsikko "Settlement Portal"
  - "Add New" -painike
- Sisältöalue
  - Responsiivinen korttinäkymä
  - Tyhjän tilan käsittely
- Modaalit
  - Lomakemodaali:
    - Dynaaminen otsikko
    - Validointi
    - Saavutettavuus
  - Poistomodaali:
    - Vahvistusviesti
    - Kohteen tiedot
    - Turvallinen käyttö

### 4.2 Teema
- Bootstrap dark theme
  - Globaali määritys (data-bs-theme="dark")
  - Yhtenäinen värimaailma
  - Kontrastit ja luettavuus
- Modaalien tyylit:
  - Tumma tausta
  - Varjostukset
  - Animaatiot
  - Reunukset

### 4.3 Saavutettavuus
- ARIA-attribuutit
  - Modaalien roolit
  - Painikkeiden kuvaukset
  - Virheilmoitukset
- Näppäimistökäyttö
  - Modaalien sulkeminen
  - Lomakkeen navigointi
  - Fokuksen hallinta

## 5. Tietoturva ja suorituskyky
### 5.1 Tietoturva
- Turvallinen modaalien käyttö
- Syötteiden validointi
- XSS-suojaus

### 5.2 Suorituskyky
- NgZone-optimointi
- Lazy-modaalien alustus
- Resurssien hallinta

## 6. Jatkokehitys
- Teeman vaihtaja
- Kehittyneemmät animaatiot
- Lisää saavutettavuusparannuksia
- Hakutoiminnallisuus
- Lajittelu ja suodatus

## 7. Versiohistoria
### v0.0.1 (21.3.2025)
- Bootstrap modaalien käyttöönotto
- Dark theme -toteutus
- Saavutettavuusparannukset
- Virheidenkäsittelyn parannus
- Modaalien suorituskykyoptimointi
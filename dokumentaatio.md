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
  - Dark theme
- TypeScript 5.4.2
- RxJS 7.8.0

### 2.2 Kehitysympäristön asennus ja muutokset
1. Ensiksi lisättiin Bootstrap (npm i bootstrap)
    - Lisätty angular.jsoniin:
      - styles: "node_modules/bootstrap/dist/css/bootstrap.min.css"
      - scripts: "node_modules/bootstrap/dist/js/bootstrap.min.js"
2. Toteutettu Settlement Portal -käyttöliittymä (21.3.2025)
    - Lisätty Bootstrap-tyylitelty perusnäkymä
    - Käytetty container, row ja col -komponentteja asetteluun
    - Lisätty korttinäkymä tietojen esittämiseen
    - Lisätty "Add New" -painike uusien tietojen lisäämistä varten
3. Kehitysympäristön muutokset
    - Muokattu package.json start-skriptiä: `"start": "ng serve --o"`
      - --o lippu avaa selaimen automaattisesti
4. Modal-toiminnallisuus (21.3.2025)
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
    - Card-komponentti
    - Button-komponentit
    - Modal-komponentti uusien tietojen lisäämiseen
  - Toiminnallisuudet:
    - openModal(): avaa modaalin uuden tiedon lisäämistä varten
    - closeModal(): sulkee modaalin ja tyhjentää lomakkeen
    - saveItem(): tallentaa kohteen localStorageen
    - updateItem(): päivittää olemassa olevan kohteen
    - deleteItem(): poistaa kohteen vahvistuksen jälkeen
    - onEdit(): avaa kohteen muokkaustilassa

### 3.2 Palvelut
- Item Service
  - Käyttötarkoitus: hallinoida sovelluksen tietojen tallennusta ja hakua
  - Toiminnallisuudet:
    - addItem(): lisää uuden kohteen sovelluksen tietoihin
    - updateItem(): päivittää olemassa olevan kohteen
    - getItems(): hakee kaikki sovelluksen kohteet
    - deleteItem(): poistaa kohteen vahvistuksen jälkeen

## 4. Tietokannat ja rajapinnat
- Sovellus käyttää paikallista tallennustilaa (localStorage) tietojen tallentamiseen
- Sovelluksen tietorakenteena käytetään Item-luokkaa, joka sisältää seuraavat ominaisuudet:
  - id: numeroarvo
  - name: merkkijono
  - description: merkkijono
  - price: numeroarvo
- Tietojen tallennus:
  - Käytetään selaimen localStorage-rajapintaa
  - Tallennetaan JSON-muodossa
  - Tietorakenne:
    - items: Item[]
  - Toiminnot:
    - Lataus: ngOnInit hakee tallennetut kohteet
    - Tallennus: saveItem ja updateItem tallentavat muutokset
    - Poisto: deleteItem poistaa kohteen vahvistuksen jälkeen

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
- Lomake kohteen tietojen syöttämiseen
  - Validointi ja virheilmoitukset

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

### 5.3 Interaktiot
1. Uuden kohteen lisäys:
   - "Add New" avaa modaalin
   - Lomakkeen täyttö
   - Tallennus tai peruutus
2. Kohteen muokkaus:
   - Edit-painike avaa modaalin
   - Esitäytetty lomake
   - Tallennus päivittää tiedot
3. Kohteen poisto:
   - Delete-painike
   - Välitön poisto listalta ja tallennuksesta

### 5.4 Teema
- Bootstrap dark theme
  - Globaali määritys index.html:ssä (data-bs-theme="dark")
  - Tumma tausta ja kontrastit
  - Yhtenäinen värimaailma kaikissa komponenteissa
- Väripaletti:
  - Taustaväri: Bootstrap dark theme
  - Kortit/Modaalit: Bootstrap dark components
  - Tekstit: Bootstrap dark theme text
  - Painikkeet:
    - Primary: Bootstrap sininen (uusi)
    - Success: Material vihreä (muokkaus)
    - Danger: Bootstrap punainen (poisto)

### 5.5 Saavutettavuus
- Korkea kontrasti
  - Tumma tausta
  - Vaalea teksti
  - Selkeät painikkeet
- Selkeä visuaalinen hierarkia
- Johdonmukaiset fokustilat
- Luettava typografia

## 6. Testaus
- Testausmenetelmät
- Testitapaukset

## 7. Jatkokehitysideat
- Teeman vaihtaja (vaalea/tumma)
- Kehittyneemmät animaatiot
- Lisää saavutettavuusparannuksia
- Hakutoiminnallisuus
- Lajittelu ja suodatus

## 8. Lähteet
- [Käytetyt lähteet ja materiaalit]
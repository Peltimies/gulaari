# Angular PWA käyttöönotto ja kehitysvinkit

## 1. PWA:n lisääminen projektiin
- Komento: `ng add @angular/pwa`
- Jos tulee riippuvuusristiriitoja, varmista että kaikki Angular-paketit (mm. @angular/core ja @angular/service-worker) ovat täsmälleen samassa versiossa.
- Tarvittaessa asenna oikea versio: `npm install @angular/service-worker@<versio>`

## 2. Buildin rakenne ja oikea kansio
- Buildin jälkeen tuotantotiedostot löytyvät kansiosta:
  - **Perus build:** `dist/projektin-nimi`
  - **Universal/prerendering:** `dist/projektin-nimi/browser`
- Palvelin (esim. http-server) pitää käynnistää _suoraan_ kansiosta, jossa on `index.html`!

## 3. Sovelluksen käynnistäminen paikallisesti
- Siirry oikeaan kansioon:
  - Esim. `cd dist/gulaari/browser`
- Käynnistä palvelin:
  - `http-server . -p 8080 --fallback index.html`
- Jos portti on jo käytössä (EADDRINUSE), sulje vanha palvelin (CTRL+C) tai käytä toista porttia (esim. `-p 8081`).

## 4. Julkaisu GitHub Pagesiin (gh-pages)

### 4.1. Oikea base-href
- Buildaa projekti komennolla:
  - `ng build --base-href /gulaari/`
- Tämä asettaa oikean polun, jotta reititys ja resurssit toimivat GitHub Pagesissa.

### 4.2. Ota buildin sisältö käyttöön gh-pages-haarassa
- Siirry gh-pages-haaraan: `git checkout gh-pages`
- Kopioi kaikki dist/gulaari/browser/* tiedostot ja kansiot gh-pages-haaran juureen:
  - PowerShell: `cp -r dist/gulaari/browser/* . -Force`
- Varmista, että juuresta löytyy ainakin: `index.html`, `404.html`, `manifest.webmanifest`, `ngsw-worker.js`, `ngsw.json`, `favicon.ico`, `assets/` ja mahdolliset muut buildin tuottamat tiedostot.

### 4.3. Luo 404.html
- Kopioi index.html: `cp dist/gulaari/browser/index.html dist/gulaari/browser/404.html`
- Tämä mahdollistaa SPA-reitityksen myös suoraan syötetyillä osoitteilla GitHub Pagesissa.

### 4.4. Lisää .nojekyll-tiedosto
- Luo tyhjä `.nojekyll`-tiedosto gh-pages-haaran juureen, jotta GitHub Pages ei estä tiedostopolkuja, joissa on alaviivoja tms.

### 4.5. Commit ja push
- Lisää, commitoi ja pushaa muutokset:
  - `git add .`
  - `git commit -m "PWA build julkaistu gh-pagesiin"`
  - `git push origin gh-pages`

## 5. PWA-metatiedot ja kuvakkeet
- Lisää index.html:ään:
```html
<!-- Apple touch iconit -->
<link rel="apple-touch-icon" sizes="180x180" href="/assets/icons/apple-touch-icon.png">
<link rel="apple-touch-icon" sizes="152x152" href="/assets/icons/apple-touch-icon-152x152.png">
<link rel="apple-touch-icon" sizes="167x167" href="/assets/icons/apple-touch-icon-167x167.png">
<!-- Apple meta-tiedot -->
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="default">
<meta name="apple-mobile-web-app-title" content="Gulaari">
<!-- Muut suositeltavat metatiedot -->
<meta name="description" content="Gulaari - moderni PWA-sovellus">
<meta name="theme-color" content="#f5e6d3">
<link rel="manifest" href="manifest.webmanifest">
```
- Vaihda oletuskuvakkeet omiin brändikuvakkeisiin.
- Varmista, että manifest.webmanifest-tiedostossa on oikeat ikonit ja start_url sekä scope ovat suhteessa base-hrefiin.

## 6. Service Worker ja ngsw-config.json
- Varmista, että `ngsw-worker.js` ja `ngsw.json` löytyvät julkaisun juuresta.
- Tarkista ngsw-config.json-tiedoston "index": "/index.html" ja assetGroups, että kaikki tarvittavat tiedostot ja polut ovat mukana.

## 7. Yleisiä ongelmia ja ratkaisuja
- **"Index of /"-sivu:** Palvelin käynnistetty väärästä kansiosta. Siirry kansioon, jossa on index.html.
- **404-virheet reiteillä:** Käytä `--fallback index.html`-optiota http-serverissä tai lisää 404.html.
- **Portti varattu:** Sulje vanha palvelin (CTRL+C) tai valitse toinen portti.
- **Selaimen välimuisti:** Päivitä sivu (Ctrl+F5) tai tyhjennä välimuisti.
- **PWA ei päivity:** Poista selaimen välimuisti ja/tai poista vanha asennettu PWA laitteelta.
- **Manifest tai service worker ei löydy:** Varmista, että tiedostot ovat julkaisun juuressa ja base-href on oikein.
- **Kuvat eivät näy:** Varmista, että polut ovat oikein ja assets-kansio on mukana julkaistussa sisällössä.
- **GitHub Pages näyttää vanhaa versiota:** Odota hetki ja päivitä sivu välimuisti tyhjennettynä (Ctrl+F5).

---

**Nämä muistiinpanot auttavat Angular PWA -projektin käyttöönotossa ja tyypillisissä ongelmatilanteissa.**

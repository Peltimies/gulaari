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

## 4. PWA-metatiedot ja kuvakkeet
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

## 5. Yleisiä ongelmia ja ratkaisuja
- **"Index of /"-sivu:** Palvelin käynnistetty väärästä kansiosta. Siirry kansioon, jossa on index.html.
- **404-virheet reiteillä:** Käytä `--fallback index.html`-optiota http-serverissä.
- **Portti varattu:** Sulje vanha palvelin (CTRL+C) tai valitse toinen portti.
- **Selaimen välimuisti:** Päivitä sivu (Ctrl+F5) tai tyhjennä välimuisti.

---

**Nämä muistiinpanot auttavat Angular PWA -projektin käyttöönotossa ja tyypillisissä ongelmatilanteissa.**

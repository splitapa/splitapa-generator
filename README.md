# Split APA Website

Questa cartella contiene il sito unico Split APA pronto per GitHub Pages.

## Struttura

```text
index.html
assets/
  i18n.js
generator/
  index.html
  fms/
    index.html
  assets/
    app.js
    fms.js
    fms.css
    style.css
    fms/
      7 test images (.webp)
  data/
    manifest.json
    neck.json
    upper-limb.json
    trunk.json
    lower-limb.json
    de/
    es/
    fr/
    it/
.nojekyll
README.md
```

## URL dopo la pubblicazione

```text
Home:
https://splitapa.github.io/splitapa-generator/

Generator:
https://splitapa.github.io/splitapa-generator/generator/

FMS assessment:
https://splitapa.github.io/splitapa-generator/generator/fms/

Specific districts:
https://splitapa.github.io/splitapa-generator/generator/?district=neck
https://splitapa.github.io/splitapa-generator/generator/?district=upper-limb
https://splitapa.github.io/splitapa-generator/generator/?district=trunk
https://splitapa.github.io/splitapa-generator/generator/?district=lower-limb
```

## Stato app

```text
Total exercises: 300
Visible media paths: 0
Languages: Deutsch, English, Espanol, Francais, Italiano
Localized interface: home, password screen, generator
Localized FMS assessment: 7 tests, scoring and movement profile
Localized archive: 300 exercises in every language
Movement metadata: canonical English IDs with localized labels
Clinical language review: standardized across all 300 exercises
Difficulty metadata: 1-5 stars
Access: beta password screen
Smart search: Ask Split APA
Workout sorting: generated order, easy to hard, hard to easy
Workout code: copy and restore generated plans
FMS recommendations: foundation, progressive and advanced workout codes
Pain safeguard: score 0 generates a referral notice and withholds automatic plans
```

## Nota password

La password beta e' utile per una preview privata, ma non e' una protezione sufficiente per vendere accessi a pagamento. GitHub Pages pubblica file statici, quindi per una fase commerciale servira' un sistema con autenticazione reale.

## Come pubblicare

Carica tutto il contenuto di questa cartella nella repository GitHub Pages.

Poi imposta:

```text
Settings > Pages
Source: Deploy from a branch
Branch: main
Folder: /root
```

Dopo il deploy, la home e il generatore saranno nello stesso sito.

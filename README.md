# Split APA Website

Questa cartella contiene il sito unico Split APA pronto per GitHub Pages.

## Struttura

```text
index.html
generator/
  index.html
  assets/
    app.js
    style.css
  data/
    manifest.json
    neck.json
    upper-limb.json
    trunk.json
    lower-limb.json
.nojekyll
README.md
```

## URL dopo la pubblicazione

```text
Home:
https://splitapa.github.io/splitapa-generator/

Generator:
https://splitapa.github.io/splitapa-generator/generator/

Specific districts:
https://splitapa.github.io/splitapa-generator/generator/?district=neck
https://splitapa.github.io/splitapa-generator/generator/?district=upper-limb
https://splitapa.github.io/splitapa-generator/generator/?district=trunk
https://splitapa.github.io/splitapa-generator/generator/?district=lower-limb
```

## Stato app

```text
Total exercises: 148
Visible media paths: 0
Movement metadata: English only
Difficulty metadata: 1-5 stars
Access: beta password screen
Smart search: Ask Split APA
Workout sorting: generated order, easy to hard, hard to easy
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

# Split APA Generator App

Questa cartella contiene la versione leggera e scalabile del generatore Split APA.

Stato attuale dell'archivio:

```text
Totale esercizi: 148
Immagini visibili nell'app: 0
Distretti: neck, upper-limb, trunk, lower-limb
```

## Struttura

```text
index.html
assets/
  style.css
  app.js
data/
  manifest.json
  neck.json
  upper-limb.json
  trunk.json
  lower-limb.json
images/
  neck/
  upper-limb/
  trunk/
  lower-limb/
```

Il codice HTML, CSS e JavaScript e' separato dall'archivio degli esercizi.
Per ora l'app lascia vuoto lo spazio media in ogni scheda esercizio, cosi' in futuro potrai sostituirlo con GIF dimostrative piu' chiare.

## Pubblicazione gratuita

### Opzione 1: GitHub Pages

GitHub Pages e' la scelta piu' semplice se vuoi restare su una soluzione gratuita.

1. Crea un nuovo repository su GitHub.
2. Carica il contenuto di questa cartella nella radice del repository.
3. Vai su `Settings > Pages`.
4. Seleziona `Deploy from branch`.
5. Scegli il branch `main` e la cartella `root`.
6. Dopo la pubblicazione, usa URL di questo tipo:

```text
https://TUO-UTENTE.github.io/NOME-REPOSITORY/?district=neck
https://TUO-UTENTE.github.io/NOME-REPOSITORY/?district=upper-limb
https://TUO-UTENTE.github.io/NOME-REPOSITORY/?district=trunk
https://TUO-UTENTE.github.io/NOME-REPOSITORY/?district=lower-limb
```

### Opzione 2: Cloudflare Pages

Cloudflare Pages e' una soluzione gratuita piu' robusta, utile se in futuro il progetto cresce.

1. Crea un progetto su Cloudflare Pages.
2. Collega il repository oppure carica direttamente questa cartella.
3. Lascia vuoto il comando di build.
4. Imposta la cartella di output su `/`.
5. Usa l'URL `pages.dev` generato da Cloudflare con gli stessi parametri:

```text
?district=neck
?district=upper-limb
?district=trunk
?district=lower-limb
```

## Accesso beta con password

L'app include una schermata iniziale con password.

Password beta attuale:

```text
splitapa2026
```

Il database degli esercizi viene caricato solo dopo l'inserimento della password corretta.

Nota importante: questa protezione e' adatta a una beta o a una prova privata, perche' GitHub Pages e' un hosting statico. Per vendere accessi a pagamento in modo serio servira' un sistema con autenticazione reale.

## Incorporamento in Google Sites

Una volta pubblicata la mini-app:

1. Apri Google Sites.
2. Vai nella pagina in cui vuoi inserire il generatore.
3. Clicca su `Inserisci > Incorpora`.
4. Seleziona `URL`.
5. Incolla il link del generatore, per esempio:

```text
https://TUO-UTENTE.github.io/NOME-REPOSITORY/?district=neck
```

Puoi creare una pagina Google Sites nascosta per ogni distretto, oppure usare un'unica pagina con la mini-app e cambiare il parametro `district`.

## Come aggiungere nuovi esercizi

1. Inserisci la GIF o il file media nella cartella del distretto corretto.

Esempio:

```text
images/neck/013-new-exercise.gif
```

2. Apri il file JSON del distretto corrispondente.

Esempio:

```text
data/neck.json
```

3. Aggiungi il nuovo esercizio nella sezione corretta.

Esempio:

```json
{
  "id": "neck-013",
  "nome": "New Exercise",
  "image": "images/neck/013-new-exercise.gif",
  "thumbnail": "images/neck/013-new-exercise.gif",
  "imageAlt": "New Exercise",
  "description": "Short exercise description.",
  "howToDo": "Clear execution instructions.",
  "whatToDo": "Useful cues to respect.",
  "whatNotToDo": "Common mistakes to avoid.",
  "movementDistrict": "neck",
  "movementTags": ["flexion"]
}
```

## Tag movimento

Ogni esercizio contiene ora due campi pensati per la futura ricerca intelligente:

```json
{
  "movementDistrict": "shoulder",
  "movementTags": ["flexion", "external-rotation"]
}
```

`movementDistrict` indica il distretto principale coinvolto nel movimento.

`movementTags` indica il tipo di movimento, per esempio:

```text
flexion
extension
abduction
adduction
rotation
internal-rotation
external-rotation
lateral-flexion
plantar-flexion
dorsiflexion
inversion
eversion
pronation
supination
isometric
stabilization
mobility
```

Questi tag permettono di usare la ricerca interna `Ask Split APA`, dove l'utente puo' chiedere in inglese, per esempio, `shoulder flexion` oppure `ankle plantar flexion` e ottenere esercizi coerenti dal database.

## Media futuri

Per ora i campi media sono vuoti nell'interfaccia.

Quando vorrai reinserire il supporto visivo, la scelta migliore sara' usare:

```text
Formato consigliato: GIF, WebP animato oppure MP4 breve
Durata: 3-8 secondi
Lato piu' lungo: 720-1200 px
Peso ideale: il piu' leggero possibile senza perdere chiarezza
```

In questo modo il generatore restera' veloce e ogni esercizio sara' piu' chiaro da capire al primo colpo.

## Regola pratica

Non inserire piu' file Base64 dentro HTML o JavaScript.

Usa sempre questa logica:

```text
media = file nella cartella images/
esercizio = dati nel file JSON
interfaccia = index.html + assets/style.css + assets/app.js
```

Cosi' Split APA rimane leggero, ordinato e pronto a crescere.

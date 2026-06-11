# IMA-G-IA — version React / JSX

Version convertie du fichier HTML autonome vers une structure React/Vite prête pour GitHub.

## Installation

```bash
npm install
npm run dev
```

## Build production

```bash
npm run build
```

## Structure

```txt
src/App.jsx             Composant React principal
src/main.jsx            Point d’entrée React
src/styles.css          Styles extraits du HTML original
src/imagia-engine.js    Logique JS originale chargée après le rendu React
index.html              Root Vite
package.json            Scripts GitHub/Vite
```

## Notes

- `React.StrictMode` n’est pas utilisé volontairement pour éviter la double initialisation du moteur legacy en développement.
- Le fichier `imagia-engine.js` garde la logique complète de l’application originale : favoris, historique, traduction, presets, génération du prompt, photo de contexte.
- Pour une refonte React complète, la prochaine étape serait de transformer `imagia-engine.js` en hooks/composants React natifs.

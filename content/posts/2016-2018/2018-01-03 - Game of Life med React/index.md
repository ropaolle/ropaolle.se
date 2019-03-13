---
author: "Olof Sjögren"
date: 2018-01-03
title: Game of Life med React
---

{{< bundle-image2 name="gol01.png" alt="image" class="right" caption="Game of Life" >}}

Detta är ett projekt med målet att testa användningen av HTML5-canvas tillsammans med React. Jag tittar närmare på hur man ritar direkt på canvasen, responsiv layout och hur detta implementeras tillsammans med React. Det är en typisk "single page app" skapad med Create-react-app. Knappar och formelement använder Material-UI, kanske lite overkill men varför inte.

En demosida av programmet ligger på GitHub Pages, en passande gratistjänst för hosting av statiska webbappar. Projektet har byggts med favoriteditorn VS Code med Eslint AirBnb/React som stilmall.

## Steg 1 - Boilerplate med Create-react-app

Till att börja med behöver vi generera en ren appstruktur med Create-react-app.

`create-react-app game-of-life`

<!--more-->

## Steg 2 - Konfigurera Eslint

För att få "lintningen" att fungera i VS Code behöver jag lägga till några npm-moduler och en konfigurationsfil.

`npm i --save-dev eslint-config-airbnb eslint-plugin-jsx-a11y eslint-plugin-react`

Lägg till följande i `.eslintrc`

```json
{
  "extends": ["airbnb", "plugin:react/recommended"],
  "env": {
    "es6": true,
    "browser": true
  },
  "plugins": ["react"],
  "rules": {
    "react/forbid-prop-types": 0
  }
}
```

## Steg 3 - Använd komponenter från Material-UI

Till knapplisten och select-komponenten för att välja antal celler används Material-UI.

`npm i material-ui@next material-ui-icons@next`

{{< bundle-image2 name="gol02.png" alt="image" caption="Knapplist" >}}

{{< bundle-image2 name="gol03.png" alt="image" caption="Antal celler" >}}

## Steg 4 - Bygg Game-of-life-komponenten

Grundkomponenten är `controller.jsx` och innehåller komponenter för knappar, inställningar och en grid som ritas direkt på en HTML5-canvas.

```jsx
{
  return (
    <GolButtons />
    <GolGrid {...this.state} />
    <GolSettings />
  );
```  

I `grid.jsx` används HTML5-canvas för att rita upp cellerna. Funktionen `drawGrid` ritar upp en grid och `drawPopulation` fyller respektive tömmer celler beroende på deras status.

Av prestandaskäl ser vi till att endast uppdatera celler som har ändrats, se `componentDidUpdate`.

```javascript
// Set all unchanged cells to -1. drawPopulation only draws cells with a value of 0 or 1.
const gridDiff = grid.map((val, i) =&gt; ((val === prevProps.grid[i]) ? -1 : val));
```

Eftersom Canvas inte är responsiv sätter vi bredden på canvas i `componentWillMount`.

```javascript
{
  const width =
    window.innerWidth &gt; 610 ? 601 : window.innerWidth - ((window.innerWidth - 10) % 50) - 9;
  this.setState({ height: width, width });
}
```

## Steg 5 - Bygg och hosta programmet på GitHub Pages

Med hjälp av modulen `gh-pages` kan vi enkelt ladda upp det byggda programmet till GitHUb Pages.

`npm i gh-pages`

Lägg till följande i `package.json`.

```json
{
  "homepage": "https://ropaolle.github.io/game-of-life",
  "main": "index.js",
  "scripts": {
    "deploy": "npm run build &amp;&amp; gh-pages -d build"
  }
}
```

`npm run deploy`

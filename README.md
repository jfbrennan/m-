# E- Components for Enhance (inspired by [M-](https://m-docs.org))
This is a fork of the [MDash](https://m-docs.org) components for use with Enhance.
It is a work in progress.
Many changes to come.
Some components have been changed to take advantage of Enhance features.
For instance M- uses many element styles (i.e. button).
This version uses a custom element wrapper for many of those (i.e. `<m-button>`), but because Enhance expands the element you don't need to author the button inside m-button.

## Usage
To use the components first install the package:
```sh
npm i @ryanbethel/e-components
```

The components can be added to a project in several ways:
- *Import all components with element.mjs manifest* to add all the components to an Enhance project:
Add the following `element.mjs` to your app directory:
```javascript
// /app/elements.mjs
import eComponents from '@ryanbethel/e-components' 

let elements = {...eComponents}

export default elements
```
Note this can be used in addition to the `/elements/` folder.
You can also import individual named components (i.e. `import { eLink } ...`) and add give it a custom name in the elements list.

  -OR-

- *Copy and paste elements* directly from `element/e/` to the project folder as needed. You can add just what you need.

  -OR-

- *Import and re-export* directly in the `/elements` folder.
```sh
cp -r  node_modules/@ryanbethel/e-components/helpers/e app/elements/e/
```
The files in the helpers directory import and re-export the components as shown below.

```javascript
import Accordion from '@ryanbethel/e-components/elements/e/accordion.mjs'
export default Accordion
```



## Global Assets
Add the `e-global.css` and the `e-.woff2` asssets to the public folder and the head. 
These files include custom properties and icons. 
An example head.mjs for an Enhance app is shown below. 
These assest are in the assets directory in this repo.

```javascript
// head.mjs
export default function Head() {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>Enhance Starter Project</title>
      <link rel="icon" href="/_public/favicon.svg">
      <link rel="stylesheet" href="/_public/e-global.css">
      <meta name="description" content="The HTML first full stack web framework.">
    </head>
    <body class="bg-gray-1">
`
}
```

## Examples 
An example app showing all components is included in the `/example` directory.
You can fork the repo and run `npm start` to see them. 


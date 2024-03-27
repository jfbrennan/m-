# E- Components for Enhance (inspired by [M-](https://m-docs.org))
This is a fork of the [MDash](https://m-docs.org) components for use with Enhance.
It is a work in progress.
Many changes to come.
Some components have been changed to take advantage of Enhance features.
For instance M- uses many element styles (i.e. button).
This version uses a custom element wrapper for many of those (i.e. `<e-button>`), but because Enhance expands the element you don't need to author the button inside e-button.

## Usage
To use the components first install the package:
```sh
npm i @ryanbethel/e-components
```

The components can be added to an Enhance project with the `element.mjs` file.
Add the following `/app/element.mjs` file to your app directory:

```javascript
// /app/elements.mjs
import eComponents from '@ryanbethel/e-components' 
let elements = {...eComponents}
export default elements
```

Note this can be used in addition to the `/elements/` folder.
You can also import individual named components (i.e. `import { eLink } ...`) 
and add give it a unique name in the elements list.


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


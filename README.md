# M- Components for Enhance
This is a fork of the [MDash](https://m-docs.org) components for use with Enhance.
It is a work in progress. Many changes to come. Some components have been changed to take advantage of Enhance features. For instance M- uses many element styles (i.e. button).
This version uses a custom element wrapper for many of those (i.e. `<m-button>`), but because Enhance expands the element you don't need to author the button inside m-button.

## Include Components
To add these components to an app:
1. Install 
```sh
npm i @ryanbethel/m-dash-enhance
```
2. Add to the elements folder:
```sh
cp -r  node_modules/@ryanbethel/m-dash-enhance/helpers/m app/elements/m/
```
The files in the helpers directory import and re-export the components as shown below.

```javascript
import Accordion from '@ryanbethel/m-dash-enhance/elements/m/accordion.mjs'
export default Accordion
```


## Global Assets
Add the `m-global.css` and the `m-.woff2` asssets to the head. These files include custom elements and icons. An example head.mjs for an Enhance app is shown below. These assest are in the assets directory in this repo.

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
      <link rel="stylesheet" href="/_public/m-global.css">
      <meta name="description" content="The HTML first full stack web framework.">
    </head>
    <body class="bg-gray-1">
`
}
```

## Examples 
An example app showing all components is included in the `/example` directory. You can fork the repo and run `npm start` to see them. 

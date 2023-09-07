<p align="center">
  <a href="http://m-docs.org">
    <img src="http://m-docs.org/img/m-logo.png" alt="Mdash logo" width="192">
  </a>
</p>
<h3 align="center">A design system that fully embraces web standards.</h3>
<p align="center">Mdash seeks to leverage HTML, not replace it or try to outsmart it.<br>This makes Mdash ideal for all web projects and skill levels.</p>
<p align="center"><strong>linkable | tiny 6kb | responsive | accessible | zero dependencies</strong></p>
<hr>

Mdash UI elements are built with 100% web standards. This makes Mdash [extremely light](https://m-docs.org/#performance), very fast, and compatible with any type of web project.

Mdash can work with any framework client-side and server-side or no framework at all because it's made from native HTML, custom HTML tags, and [Custom Elements](https://developer.mozilla.org/en-US/docs/Web/API/Window/customElements). Be it SSR, SPA, PWA, static site, and even some email templates - whatever type of project you have Mdash will work. This is especially useful to organizations looking to share a design system across products.

Try Mdash right now by simply linking to the CDN files below and visiting the [doc site](https://m-docs.org) for code samples and full API documentation. 

To apply your own design language, fork and customize Mdash. It's 100% vanilla HTML, CSS, and JavaScript.

## Quick start
This is the web. Include these files in `<head>` and you're all set!
```html
<link href="https://unpkg.com/m-@3.1.1/dist/m-.woff2" rel="preload" as="font" crossorigin>
<link href="https://unpkg.com/m-@3.1.1/dist/m-.css" rel="stylesheet">
<script src="https://unpkg.com/m-@3.1.1/dist/m-.js" defer></script>
```
Or install via NPM and bundle with your own assets: `npm install m-` (built files are located in `/dist`)

Then try some Mdash:
```html
<m-alert type="success">Success!</m-alert>
```

## Browser support
Mdash works with the latest versions of all mainstream browsers.

## Working on this project
_Pre-reqs:_ [Node](https://nodejs.org) and [Gulp CLI](https://gulpjs.com/docs/en/getting-started/quick-start)

1. Clone the repo (or fork)
1. `cd m-`
1. `npm install`
1. `gulp watch`
1. `cd docs`
1. `npm install`
1. `npm start`

That builds Mdash, watches for changes, and starts the doc site. Start coding!

### Developer notes
Custom Element constructors have strict rules about what you can safely do inside them. Please get familiar with [Requirements for custom element constructors and reactions](https://html.spec.whatwg.org/multipage/custom-elements.html#custom-element-conformance).

Some components are custom HTML tags that require no JavaScript. Other components are Custom Elements and for these the styles are still maintained in a separate CSS file.

The [TAC CSS methodology](https://jordanbrennan.hashnode.dev/tac-a-new-css-methodology) is followed.

Some IDEs complain about unknown HTML tags. If that's the case, add this list to make it happy:
```
m-accordion, m-alert, m-autocomplete, m-badge, m-box, m-breadcrumb, m-col, m-container, m-crumb, m-dot, m-icon, m-loader, m-menu, m-row, m-tab, m-tabs, m-tag, m-vbar
```

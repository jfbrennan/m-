<p align="center">
  <a href="https://www.mdash.dev">
    <img src="https://www.mdash.dev/img/m-logo.png" alt="Mdash logo" width="192">
  </a>
</p>
<h3 align="center">A design system that fully embraces web standards.</h3>
<p align="center">Mdash seeks to leverage HTML, not replace it or try to outsmart it.<br>This makes Mdash ideal for all web projects and skill levels.</p>
<p align="center"><strong>linkable | tiny 6kb | responsive | accessible | zero dependencies</strong></p>
<hr>

## About
Mdash is a design system. It is based 100% on web standards following the [TAC CSS methodology](https://jordanbrennan.hashnode.dev/tac-a-new-css-methodology), which has helped Mdash achieve its engineering goals:
- Smallest overhead possible (all of Mdash is just one 7kb stylesheet)
- Compatible with _every_ web project past, present, and future
- Leverage the modern web platform
- Easiest codebase to maintain, use, and debug

Try Mdash right now by simply linking to the CDN files below and visiting the [doc site](https://www.mdash.dev) for code samples and full API documentation. 

## Quick Start
This is the web, so link to these files in `<head>` and you're all set:
```html
<link href="https://unpkg.com/m-@3.2.0/dist/m-.css" rel="stylesheet">
<script src="https://unpkg.com/m-@3.2.0/dist/m-.js" defer></script>
```
Or install via NPM `npm install m-`. The path to the stylesheet is `node_modules/m-/dist/m-.css`.

## Contributions
Thank you for your interest in improving Mdash! You'll need to clone or fork the repo and have [Node.js](https://nodejs.org) installed.

**Run these and start making source code changes**
1. `npm install`
1. `npm run watch`

**Edit doc site and preview your changes**
1. Edit [/docs/index.html](/docs/index.html)
1. Open it in your browser to see

**Opening a pull request**
1. Be sure your changes have followed the [TAC CSS methodology](https://jordanbrennan.hashnode.dev/tac-a-new-css-methodology)
1. If editing docs, please follow the patterns you see in that file
1. For the PR summary in GitHub please use the [conventional commit format](https://www.conventionalcommits.org/en/v1.0.0/#summary)

**Some additional notes**

The project follows the [TAC CSS methodology](https://jordanbrennan.hashnode.dev/tac-a-new-css-methodology). Getting familiar with that will help when making contributions.

Your IDE might warn about unknown custom HTML tags. If that's the case, this is the list of custom tags your IDE needs to know about:
```
m-accordion, m-alert, m-autocomplete, m-badge, m-card, m-breadcrumb, m-col, m-container, m-crumb, m-dot, m-icon, m-loader, m-menu, m-row, m-tab, m-tabs, m-tag, m-vbar
```

## Browser Support
Mdash works with the latest versions of all mainstream browsers.

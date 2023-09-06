<p align="center">
  <a href="http://m-docs.org">
    <img src="http://m-docs.org/img/m-logo.png" alt="Mdash logo" width="192">
  </a>
</p>
<h3 align="center">A design system that fully embraces web standards.</h3>
<p align="center">Mdash seeks to leverage HTML, not replace it or try to outsmart it.<br>This makes Mdash ideal for all web projects and skill levels.</p>
<p align="center"><strong>linkable | tiny 7kb | responsive | WCAG 2.1 accessible | very compatible</strong></p>
<hr>

Mdash is a design system based 100% on web standards. This makes Mdash [extremely light](https://m-docs.org/#performance), very fast, and compatible with just about any type of web project.

Mdash can work with any framework client-side and server-side or no framework at all because it's made from native HTML, [custom HTML tags](https://dev.to/jfbrennan/custom-html-tags-4788), and [Custom Elements](https://developer.mozilla.org/en-US/docs/Web/API/Window/customElements). Be it SSR, SPA, PWA, static site, and even some email templates - whatever type of project you have Mdash will work. This is especially useful to organizations looking to share a design system across products.

Try Mdash right now by simply linking to the CDN files below and visiting the [doc site](https://m-docs.org) for code samples and full API documentation. If you want to apply your own design language, fork Mdash and customize the code (it's a very very easy codebase to work in).

## Quick start
This is the web, just link to these in `<head>` and you're all set!
```html
<link rel="preload" href="https://unpkg.com/m-@3.0.0/dist/m-icons.woff2" as="font" crossorigin>
<link rel="stylesheet" href="https://unpkg.com/m-@3.0.0/dist/m-min.css">
<script defer src="https://unpkg.com/m-@3.0.0/dist/m-min.js"></script>
```
Or install via NPM and bundle with your own assets: `npm install m-` (built files are located in `/dist`)

Then try some Mdash:
```html
<m-alert type="success">Success!</m-alert>
```

## Browser support
Mdash works with the latest versions of:

- Chrome
- Chrome for Android
- Safari
- iOS Safari
- Firefox
- Edge

Other modern browsers that support [Custom Elements](https://developer.mozilla.org/en-US/docs/Web/API/Window/customElements) are likely to work, but are not tested ([file a bug](https://github.com/jfbrennan/m-/issues) if you see something). IE is not supported and is unlikely to work even if you polyfill.

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

### Coding notes
Custom Element constructors have strict rules about what you can safely do inside them. Please get familiar with [Requirements for custom element constructors and reactions](https://html.spec.whatwg.org/multipage/custom-elements.html#custom-element-conformance).

Some components are custom HTML tags that require no JavaScript. Other components are Custom Elements and for these the styles are also maintained in a separate CSS file.

### How to publish the npm package
Just run `gulp release` when a new version is ready to be published. Be sure to set the appropriate semver type (patch, minor, major) in the `npm version` command in the gulpfile beforehand. Don't forget to then deploy the doc site.

### How to deploy the doc site
1. Zip the contents of `docs` excluding `node_modules`.
1. Go to AWS > us-east-2 > Elastic Beanstalk > Environments
1. Click 'Upload and deploy' button
1. Pick the .zip file from step one, accept the default version label, and click 'Deploy'
1. Monitor the deploy. The site goes down for a minute and should automatically come back up with the new version.
 
## Other stuff
Some IDEs complain about unknown HTML tags. If that's the case, add this list to make it happy:
```
m-accordion, m-alert, m-autocomplete, m-badge, m-box, m-breadcrumb, m-col, m-container, m-crumb, m-dot, m-icon, m-loader, m-menu, m-row, m-tab, m-tabs, m-tag, m-vbar
```

<p align="center">
  <a href="http://m-docs.org">
    <img src="http://m-docs.org/favicon-192.png" alt="M- logo" width="192">
  </a>
</p>
<h2 align="center">M-</h3>

M- (pronounced "em dash") is a design system based 100% on web standards. This makes M- the lightest design system available at a tiny *6kb* and extremely fast!

M- can be used with any framework - client-side or server-side - or no framework at all because it's made from native HTML, [custom HTML tags](https://dev.to/jfbrennan/custom-html-tags-4788), and [Custom Elements](https://developer.mozilla.org/en-US/docs/Web/API/Window/customElements). SSR, SPA, PWA, static site, email template - whatever your use case is M- works. This is especially useful to organizations where committing to one framework or one architecture is not possible or desirable.

Try M- right now by just linking to the CDN files below and then visit the [doc site](https://m-docs.org) to learn more. If you want to use your own design language, just fork this project and customize the code (it's a really easy codebase to work in).

## Installation
### CDN
```html
<link rel="stylesheet" href="https://unpkg.com/m-@1.0.0/dist/min.css">
<script defer src="https://unpkg.com/m-@1.0.0/dist/min.js"></script>
```
### NPM
`npm install m-`

Built assets are located in `/dist`.

## Browser support
M- is tested against the lastest versions of Chrome, Chrome for Android, Safari, iOS Safari, Firefox, and Edge. Other modern browsers that support Custom Elements are likely to work, but are not tested (<a href="https://github.com/jfbrennan/m-/issues" target="_blank" rel="noopener">file
    a bug</a> if you see something). IE is not supported and unlikely to work even if you polyfill.

## Working with this project
_Pre-reqs:_ [Node](https://nodejs.org) and [Gulp CLI](https://gulpjs.com/docs/en/getting-started/quick-start)

1. Clone the repo (or fork)
1. `cd m-`
1. `npm install`
1. `gulp watch`
1. `cd docs`
1. `npm install`
1. `npm start`

You now have M- built watching for changes and the doc site running at [localhost:3000](http://localhost:3000). Start coding!

### Coding notes
Custom Element constructors have strict rules about what you can safely do inside them. Please get familiar with [Requirements for custom element constructors and reactions](https://html.spec.whatwg.org/multipage/custom-elements.html#custom-element-conformance).

Some components are custom HTML tags that require no JavaScript. Other components are Custom Elements and for these the styles are also maintained in a separate CSS file.

### How to publish the npm package
Just run `gulp release` when a new version is ready to be published. Be sure to set the appropriate semver type (patch, minor, major) in the `npm version` command in the gulpfile beforehand. Don't forget to then deploy the doc site.

### How to deploy the doc site
1. Zip the contents of `docs` excluding `node_modules`.
1. Go to AWS > us-east-2 > Elastic Beanstalk > Environments > MDocSite-env
1. Click 'Upload and deploy' button
1. Pick the .zip file from step one, accept the default version label, and click 'Deploy'
1. Monitor the deploy. The site goes down for a minute and should automatically come back up with the new version.
 
## Other stuff
Some IDEs complain about unknown HTML tags. If that's the case, add this list to make it happy:
`m-accordion, m-alert, m-autocomplete, m-badge, m-box, m-col, m-container, m-details, m-dialog, m-icon, m-loader, m-menu, m-row, m-tab, m-tabs, m-tag, m-vbar`

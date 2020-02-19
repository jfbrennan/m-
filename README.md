# M-
M- (pronounced "em dash") is a design system based on web standards. It's possibly the world's smallest - 6kb min+gz - despite being full-featured, it's extremely fast, and compatible with vanilla JavaScript and [**all but one**](https://custom-elements-everywhere.com/#react) JavaScript frameworks! 

M- does not restrict you to a specific framework or library. It uses none of them, but works with all of them - old and new - since it's built with native HTML, [custom HTML tags](https://dev.to/jfbrennan/custom-html-tags-4788), and [Custom Elements](https://developer.mozilla.org/en-US/docs/Web/API/Window/customElements).

Try M- right now by just copy/pasting that CDN snippet below into your page - that's it! Then [visit the doc site](https://m-docs.org) and start using M- as-is or fork it and customize to match your design language!

## Installation
### CDN
```html
<link rel="stylesheet" href="https://unpkg.com/m-@1.0.0-beta.9/dist/min.css">
<script defer src="https://unpkg.com/m-@1.0.0-beta.9/dist/min.js"></script>
```
### NPM
`npm install m-`

Built assets are located in `/dist`.

## Browser support
M- is tested against the last 2 versions of Chrome, Chrome for Android, Safari, iOS Safari, Firefox, and Edge. Other modern browsers that support Custom Elements are likely to work, but are not tested (<a href="https://github.com/jfbrennan/m-/issues" target="_blank" rel="noopener">file
    a bug</a> if you see something). IE is not supported and unlikely to work even if you polyfill.

## Working with this project
_Pre-reqs:_ [Node](https://nodejs.org) and [Gulp CLI](https://gulpjs.com/docs/en/getting-started/quick-start)

1. Fork and clone the repo
1. `npm install`
1. `gulp build`
1. `cd docs` and `npm start`

You now have the project built and the doc site running locally. Run `gulp watch` and start coding!

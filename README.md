# M-
M- (pronounced "em dash") is a design system that is very small, extremely fast, and compatible with any JavaScript framework. 

Unlike popular design systems, M- does not restrict you to a specific framework or library. It uses none of them, but works with all of them - old and new - since it's built with HTML, [custom HTML tags](https://dev.to/jfbrennan/custom-html-tags-4788), and [Custom Elements](https://developer.mozilla.org/en-US/docs/Web/API/Window/customElements).

Try M- right now by just copy/pasting that CDN snippet below into your page and you're done. Then [visit the doc site](https://m-) to build some UI!

## Installation
### CDN
```html
<link rel="stylesheet" href="https://cdn.com/m-/{version}/min.css">
<script defer src="https://cdn.com/m-/{version}/min.js"></script>
```
### npm
`npm install m-`

Built assets are located in `/dist`
## Browser support
M- is tested against the last 2 versions of Chrome, Chrome for Android, Safari, iOS Safari, Firefox, and Edge. Other modern browsers that support Custom Elements are likely to work, but are not tested (<a href="https://github.com/jfbrennan/m-/issues" target="_blank" rel="noopener">file
    a bug</a> if you see something). IE is not supported and unlikely to work even if you polyfill.

## Working with this project
_Pre-reqs:_ [Node](https://nodejs.org) and [Gulp CLI](https://gulpjs.com/docs/en/getting-started/quick-start)

- Fork and clone the repo
- `npm install`
- `gulp build`
- `cd docs` and `npm start`

You now have the project built and the doc site running locally. Run `gulp watch` and start coding!
import fs from 'fs';
import { join } from 'path';
const __dirname = new URL('.', import.meta.url).pathname;

const htmlFiles = [
  { tag: 'e-accordion', path: '../elements/e/accordion.html' },
  { tag: 'e-autocomplete', path: '../elements/e/autocomplete.html' },
  { tag: 'e-badge', path: '../elements/e/badge.html' },
  { tag: 'e-button', path: '../elements/e/button.html' },
  { tag: 'e-blockquote', path: '../elements/e/blockquote.html' },
  { tag: 'e-box', path: '../elements/e/box.html' },
  { tag: 'e-breadcrumb', path: '../elements/e/breadcrumb.html' },
  { tag: 'e-col', path: '../elements/e/col.html' },
  { tag: 'e-container', path: '../elements/e/container.html' },
  { tag: 'e-details', path: '../elements/e/details.html' },
  { tag: 'e-dialog', path: '../elements/e/dialog.html' },
  { tag: 'e-dot', path: '../elements/e/dot.html' },
  { tag: 'e-icon', path: '../elements/e/icon.html' },
  { tag: 'e-input-group', path: '../elements/e/input-group.html' },
  { tag: 'e-link', path: '../elements/e/link.html' },
  { tag: 'e-keyboard', path: '../elements/e/keyboard.html' },
  { tag: 'e-loader', path: '../elements/e/loader.html' },
  { tag: 'e-menu', path: '../elements/e/menu.html' },
  { tag: 'e-row', path: '../elements/e/row.html' },
  { tag: 'e-switch', path: '../elements/e/switch.html' },
  { tag: 'e-table', path: '../elements/e/table.html' },
  { tag: 'e-tabs', path: '../elements/e/tabs.html' },
  { tag: 'e-tag', path: '../elements/e/tag.html' },
];

const elementWrapper = (htmlString) =>
  new Function(
    `return function ({ html, state }) { return html\`${htmlString}\`; }`,
  )();

const compileAndSaveElements = () => {
  let htmlElements = {};
  htmlFiles.forEach(({ tag, path }) => {
    const htmlString = fs.readFileSync(join(__dirname, path), { encoding: 'utf8' });
    htmlElements[tag] = elementWrapper(htmlString).toString();
  });

  const compiledFileContent = `
    const htmlElements = {
      ${Object.entries(htmlElements)
      .map(([tag, fn]) => `"${tag}": ${fn}`)
      .join(',\n')}
    };
    export default htmlElements;
  `;

  fs.writeFileSync(join(__dirname, 'compiledElements.js'), compiledFileContent, { encoding: 'utf8' });
};

compileAndSaveElements();

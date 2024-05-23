import fs from "fs";
import { join } from "path";
const __dirname = new URL(".", import.meta.url).pathname;

import eAlert from "./elements/e/alert.mjs";
import eSeperator from "./elements/e/seperator.mjs";

const mjsElements = {
  "e-alert": eAlert,
  "e-seperator": eSeperator,
};

const htmlFiles = [
  { tag: "e-accordion", path: "elements/e/accordion.html" },
  { tag: "e-autocomplete", path: "elements/e/autocomplete.html" },
  { tag: "e-badge", path: "elements/e/badge.html" },
  { tag: "e-button", path: "elements/e/button.html" },
  { tag: "e-blockquote", path: "elements/e/blockquote.html" },
  { tag: "e-box", path: "elements/e/box.html" },
  { tag: "e-breadcrumb", path: "elements/e/breadcrumb.html" },
  { tag: "e-col", path: "elements/e/col.html" },
  { tag: "e-container", path: "elements/e/container.html" },
  { tag: "e-details", path: "elements/e/details.html" },
  { tag: "e-dialog", path: "elements/e/dialog.html" },
  { tag: "e-dot", path: "elements/e/dot.html" },
  { tag: "e-icon", path: "elements/e/icon.html" },
  { tag: "e-input-group", path: "elements/e/input-group.html" },
  { tag: "e-link", path: "elements/e/link.html" },
  { tag: "e-keyboard", path: "elements/e/keyboard.html" },
  { tag: "e-loader", path: "elements/e/loader.html" },
  { tag: "e-menu", path: "elements/e/menu.html" },
  { tag: "e-row", path: "elements/e/row.html" },
  { tag: "e-switch", path: "elements/e/switch.html" },
  { tag: "e-table", path: "elements/e/table.html" },
  { tag: "e-tabs", path: "elements/e/tabs.html" },
  { tag: "e-tag", path: "elements/e/tag.html" },
  { tag: "e-list", path: "elements/e/list.html" },
  { tag: "e-code", path: "elements/e/code.html" },
];
// const elementWrapper = (htmlString) =>
//   function ({ html, state }) {
//     return html`${htmlString}`;
//   };
const elementWrapper = (htmlString) =>
  new Function(
    `return function ({ html, state }) { return html\`${htmlString}\`; }`,
  )();

let htmlElements = {};
htmlFiles.map(({ tag, path }) => {
  const htmlString = fs.readFileSync(join(__dirname, path), {
    encoding: "utf8",
  });
  htmlElements[tag] = elementWrapper(htmlString);
});

let elements = {
  ...htmlElements,
  ...mjsElements,
};

const eAccordion = htmlElements["e-accordion"];
const eAutocomplete = htmlElements["e-autocomplete"];
const eBadge = htmlElements["e-badge"];
const eButton = htmlElements["e-button"];
const eBlockquote = htmlElements["e-blockquote"];
const eBox = htmlElements["e-box"];
const eBreadcrumb = htmlElements["e-breadcrumb"];
const eCol = htmlElements["e-col"];
const eContainer = htmlElements["e-container"];
const eDetails = htmlElements["e-details"];
const eDialog = htmlElements["e-dialog"];
const eDot = htmlElements["e-dot"];
const eIcon = htmlElements["e-icon"];
const eInputGroup = htmlElements["e-input-group"];
const eLink = htmlElements["e-link"];
const eKeyboard = htmlElements["e-keyboard"];
const eLoader = htmlElements["e-loader"];
const eMenu = htmlElements["e-menu"];
const eRow = htmlElements["e-row"];
const eSwitch = htmlElements["e-switch"];
const eTable = htmlElements["e-table"];
const eTabs = htmlElements["e-tabs"];
const eTag = htmlElements["e-tag"];
const eCode = htmlElements["e-code"];
const eList = htmlElements["e-list"];

export default elements;

export {
  eAlert,
  eButton,
  eCode,
  eLink,
  eSeperator,
  eSwitch,
  eAccordion,
  eAutocomplete,
  eBadge,
  eBlockquote,
  eBox,
  eBreadcrumb,
  eCol,
  eContainer,
  eDetails,
  eDialog,
  eDot,
  eIcon,
  eInputGroup,
  eKeyboard,
  eLoader,
  eList,
  eMenu,
  eRow,
  eTable,
  eTabs,
  eTag,
};

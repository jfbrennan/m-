import fs from "fs";
import { join } from "path";
const __dirname = new URL(".", import.meta.url).pathname;

import eAlert from "./elements/e/alert.mjs";
import eCode from "./elements/e/code.mjs";
import eInputGroup from "./elements/e/input-group.mjs";
import eRule from "./elements/e/rule.mjs";
import eList from "./elements/e/list.mjs";

const mjsElements = {
  "e-alert": eAlert,
  "e-code": eCode,
  "e-input-group": eInputGroup,
  "e-rule": eRule,
  "e-list": eList,
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
  { tag: "e-link", path: "elements/e/link.html" },
  { tag: "e-kbd", path: "elements/e/kbd.html" },
  { tag: "e-loader", path: "elements/e/loader.html" },
  { tag: "e-menu", path: "elements/e/menu.html" },
  { tag: "e-row", path: "elements/e/row.html" },
  { tag: "e-switch", path: "elements/e/switch.html" },
  { tag: "e-table", path: "elements/e/table.html" },
  { tag: "e-tabs", path: "elements/e/tabs.html" },
  { tag: "e-tag", path: "elements/e/tag.html" },
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
const eLink = htmlElements["e-link"];
const eKbd = htmlElements["e-kbd"];
const eLoader = htmlElements["e-loader"];
const eMenu = htmlElements["e-menu"];
const eRow = htmlElements["e-row"];
const eSwitch = htmlElements["e-switch"];
const eTable = htmlElements["e-table"];
const eTabs = htmlElements["e-tabs"];
const eTag = htmlElements["e-tag"];

export default elements;

export {
  eAlert,
  eButton,
  eCode,
  eInputGroup,
  eLink,
  eRule,
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
  eKbd,
  eLoader,
  eList,
  eMenu,
  eRow,
  eTable,
  eTabs,
  eTag,
};

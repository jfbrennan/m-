// import IdiomorphMixin from 'enhance-idiomorph-mixin'
// import CustomElement from '@enhance/custom-element'

import BaseElement from '@enhance/base-element'
import TemplateMixin from '@enhance/template-mixin'
import CustomElementMixin from "@enhance/custom-element-mixin"
import morphdom from "morphdom"
import compiledElements from "../compiledElements.mjs"
// import {
//   eAlert,
//   eCode,
//   eSeperator,
//   eList,
//   // eButton,
//   // eLink,
//   // eSwitch,
//   // eAccordion,
//   // eAutocomplete,
//   // eBadge,
//   // eBlockquote,
//   // eBox,
//   // eBreadcrumb,
//   // eCol,
//   // eContainer,
//   // eDetails,
//   // eDialog,
//   // eDot,
//   // eIcon,
//   // eInputGroup,
//   // eKeyboard,
//   // eLoader,
//   // eMenu,
//   // eRow,
//   // eTable,
//   // eTabs,
//   // eTag,
// } from "../../../index.js"

import eAlert from "../../../elements/e/alert.mjs";
import eCode from "../../../elements/e/code.mjs";
import eSeperator from "../../../elements/e/seperator.mjs";
import eList from "../../../elements/e/list.mjs";

const MorphDomMixin = (superclass) => class extends superclass {
  constructor(args) {
    super(args)
    this.process = this.process.bind(this)
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.process()
    }
  }

  process() {
    const tmp = this.render({
      html: this.html,
      state: this.state
    })
    const updated = document.createElement('div')
    updated.innerHTML = tmp.trim()
    console.log('updated', tmp.trim(), '\n')
    const root = this.shadowRoot
      ? this.shadowRoot
      : this

    console.log('root', root.innerHTML, '\n')
    morphdom(
      root,
      updated,
      {
        childrenOnly: true
      }
    )
  }
}

class CustomElement extends CustomElementMixin(TemplateMixin(BaseElement)) { }

function registerTag(tag, rend) {

  class Tag extends MorphDomMixin(CustomElement) {
    // class Tag extends IdiomorphMixin(CustomElement) {
    constructor() {
      super()
    }

    connectedCallback() {
      console.log('tag', tag, '\n')
    }
    // static get observedAttributes() {
    // return ["heading"]
    // }

    render(args) {
      console.log('args', args, '\n')
      return rend(args)
    }
  }


  if (!customElements.get(tag)) { customElements.define(tag, Tag) }

}

function registerAll() {
  const tags = [
    { tag: "e-alert", render: eAlert },
    { tag: "e-code", render: eCode },
    { tag: "e-list", render: eList },
    { tag: "e-seperator", render: eSeperator },

    { tag: "e-button", render: compiledElements['e-button'] },
    { tag: "e-link", render: compiledElements['e-link'] },
    { tag: "e-switch", render: compiledElements['e-switch'] },
    { tag: "e-accordion", render: compiledElements['e-accordion'] },
    { tag: "e-autocomplete", render: compiledElements['e-autocomplete'] },
    { tag: "e-badge", render: compiledElements['e-badge'] },
    { tag: "e-blockquote", render: compiledElements['e-blockquote'] },
    { tag: "e-box", render: compiledElements['e-box'] },
    { tag: "e-breadcrumb", render: compiledElements['e-breadcrumb'] },
    { tag: "e-col", render: compiledElements['e-col'] },
    { tag: "e-container", render: compiledElements['e-container'] },
    { tag: "e-details", render: compiledElements['e-details'] },
    { tag: "e-dialog", render: compiledElements['e-dialog'] },
    { tag: "e-dot", render: compiledElements['e-dot'] },
    { tag: "e-icon", render: compiledElements['e-icon'] },
    { tag: "e-input-group", render: compiledElements['e-input-group'] },
    { tag: "e-keyboard", render: compiledElements['e-keyboard'] },
    { tag: "e-loader", render: compiledElements['e-loader'] },
    { tag: "e-menu", render: compiledElements['e-menu'] },
    { tag: "e-row", render: compiledElements['e-row'] },
    { tag: "e-table", render: compiledElements['e-table'] },
    { tag: "e-tabs", render: compiledElements['e-tabs'] },
    { tag: "e-tag", render: compiledElements['e-tag'] },

    // { tag: "e-button", render: eButton },
    // { tag: "e-link", render: eLink },
    // { tag: "e-switch", render: eSwitch },
    // { tag: "e-accordion", render: eAccordion },
    // { tag: "e-autocomplete", render: eAutocomplete },
    // { tag: "e-badge", render: eBadge },
    // { tag: "e-blockquote", render: eBlockquote },
    // { tag: "e-box", render: eBox },
    // { tag: "e-breadcrumb", render: eBreadcrumb },
    // { tag: "e-col", render: eCol },
    // { tag: "e-container", render: eContainer },
    // { tag: "e-details", render: eDetails },
    // { tag: "e-dialog", render: eDialog },
    // { tag: "e-dot", render: eDot },
    // { tag: "e-icon", render: eIcon },
    // { tag: "e-input-group", render: eInputGroup },
    // { tag: "e-keyboard", render: eKeyboard },
    // { tag: "e-loader", render: eLoader },
    // { tag: "e-menu", render: eMenu },
    // { tag: "e-row", render: eRow },
    // { tag: "e-table", render: eTable },
    // { tag: "e-tabs", render: eTabs },
    // { tag: "e-tag", render: eTag },
  ]

  tags.forEach(i => registerTag(i.tag, i.render))

}

// export { IdiomorphMixin, CustomElement, MorphDomMixin }
export { registerAll, CustomElement, MorphDomMixin }

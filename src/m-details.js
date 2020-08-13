/**
 * This element needs to match the HTMLDetailsElement spec (https://developer.mozilla.org/en-US/docs/Web/API/HTMLDetailsElement, except the m- prefix) so
 * it can be safely removed once browser support is good enough.
 *
 * Some notable naming choices:
 * "details" - this is what the native element is called, so we're just prefixing that
 * "summary" - this is a native element
 * "open" - this is the correct attribute name
 * "toggle" - this is the correct event name
 */
customElements.define('m-details', class extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    // One time render stuff
    const children = Array.from(this.childNodes);

    const summary = children.splice(children.findIndex(el => el.tagName === 'SUMMARY'), 1)[0] || new HTMLElement(); // Sometimes there's a text node as the first child
    summary.addEventListener('click', e => this.open = !this.open);

    const content = document.createElement('div');
    content.setAttribute('ref', 'content');
    content.append(...children);

    this.append(summary, content)
  }

  static get observedAttributes() { return ['open']; }

  attributeChangedCallback(name, oldVal, newVal) {
    if (name === 'open') {
      this.dispatchEvent(new CustomEvent('toggle'));

      if (newVal !== null) {
        const autofocus = this.querySelector('[autofocus]');
        autofocus && autofocus.focus();
      }
    }
  }

  get open() {
    return this.hasAttribute('open');
  }

  set open(isOpen) {
    isOpen ? this.setAttribute('open', '') : this.removeAttribute('open');
  }
});

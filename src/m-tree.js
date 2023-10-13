customElements.define('m-tree', class extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.setAttribute('role', 'tree') ;
  }

  static get observedAttributes() { return ['aria-expanded']; }

  attributeChangedCallback(name, oldVal, newVal) {
    this.querySelectorAll('details').forEach(d => d.open = newVal === 'true');
  }
});

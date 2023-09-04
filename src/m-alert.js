customElements.define('m-alert', class extends HTMLElement {
  #initialized = false;

  constructor() {
    super();
  }

  connectedCallback() {
    if (!this.#initialized) {
      if (this.type === 'warn' || this.type === 'error') this.setAttribute('role', 'alert');
      this.querySelector('button[slot=dismiss][type=remove]')?.addEventListener('click', () => this.dismiss());
      this.#initialized = true;
    }
  }

  get type() {
    return this.getAttribute('type');
  }

  set type(val) {
    this.setAttribute('type', val);
  }

  static get observedAttributes() { return ['autodismiss']; }

  // Called once before connectedCallback, which means children may not be present
  attributeChangedCallback(name, oldVal, newVal) {
    if (name === 'autodismiss') {
      const seconds = newVal ? parseInt(newVal) * 1000 : 4000;
      setTimeout(() => this.dismiss(), seconds);
    }
  }

  dismiss() {
    this.dispatchEvent(new CustomEvent('dismiss'));
    this.remove();
  }
});

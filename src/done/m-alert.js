customElements.define('m-alert', class extends HTMLElement {
  #initialized = false;

  constructor() {
    super();
  }

  connectedCallback() {
    if (!this.#initialized) {
      if (this.type === 'warn' || this.type === 'error') this.setAttribute('role', 'alert');

      if (this.getAttribute('dismissible') !== 'false') {
        const dismissBtn = document.createElement('button');
        dismissBtn.setAttribute('type', 'remove');
        dismissBtn.setAttribute('aria-label', 'Dismiss alert');
        dismissBtn.addEventListener('click', () => this.dismiss());
        this.append(dismissBtn);
      }

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

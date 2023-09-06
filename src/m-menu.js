customElements.define('m-menu', class extends HTMLElement {
  #initialized = false;
  #boundClose;

  constructor() {
    super();
    this.#boundClose = this.close.bind(this)
  }

  connectedCallback() {
    if (!this.#initialized) {
      // Bind click to trigger slot
      this.querySelector('[slot="trigger"]')?.addEventListener('click', e => this.open = !this.open);
      this.#initialized = true;
    }

    // Close menu if user clicks outside of a menu or navigates away
    document.body.addEventListener('click', this.#boundClose);
    window.addEventListener('popstate', this.#boundClose);
  }

  disconnectedCallback() {
    document.body.removeEventListener('click', this.#boundClose);
    window.removeEventListener('popstate', this.#boundClose);
  }

  close(e) {
    if (e && e.type === 'popstate' || !this.contains(e.target)) {
      this.open = false
    }
  }

  static get observedAttributes() { return ['open']; }

  attributeChangedCallback(name, oldVal, newVal) {
    if (name === 'open') this.dispatchEvent(new CustomEvent('toggle'));
  }

  get open() {
    return this.hasAttribute('open');
  }

  set open(isOpen) {
    isOpen ? this.setAttribute('open', '') : this.removeAttribute('open');
  }
});

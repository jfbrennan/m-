customElements.define('m-menu', class extends HTMLElement {
  constructor() {
    super();
    this._boundClose = this.close.bind(this)
  }

  connectedCallback() {
    this.trigger = this.querySelector('[slot="trigger"]') || new HTMLButtonElement();
    this.trigger.addEventListener('click', e => this.open = !this.open);

    // Close menu if user clicks outside of a menu or navigates away
    document.body.addEventListener('click', this._boundClose);
    window.addEventListener('popstate', this._boundClose); // TODO popstate is ineffective if the link was a child of the menu
  }

  disconnectedCallback() {
    document.body.removeEventListener('click', this._boundClose);
    window.removeEventListener('popstate', this._boundClose);
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

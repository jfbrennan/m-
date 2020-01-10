customElements.define('m-menu', class extends HTMLElement {
  constructor() {
    super();
    this.trigger = this.querySelector('[slot="trigger"]') || new HTMLButtonElement();
    this.trigger.addEventListener('click', e => this.open = !this.open);

    // Close menu if user clicks outside of a menu
    // TODO This adds a click handler to body for each menu instance...probably not ideal
    document.body.addEventListener('click', e => {
      if (!this.contains(e.target)) this.open = false
    });
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

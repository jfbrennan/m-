export default function Menu({ html }) {
  return html`
<style>
/* Base menu styles */
:host {
  display: inline-block;
  position: relative;
}

  /* Menu trigger */
:host > [slot="trigger"] { cursor: pointer }

  /* Menu items */
:host > [slot=items] {
  display: none;
  position: absolute;
  transform: translateY(var(--m-space-xs));
  background-color: white;
  border: 1px solid var(--m-color-gray-4);
  border-radius: var(--m-border-radius-sm);
  width: max-content;
  z-index: 3000;
}

    /* Link children */
:host > [slot=items] > a {
  display: block;
  padding: var(--m-space-xs) var(--m-space-sm);
}

  /* Open state */
:host[open] > [slot=items] { display: block }
</style>
<slot name=trigger></slot>
<slot name=items></slot>

<script type=module>
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
</script>
`
}

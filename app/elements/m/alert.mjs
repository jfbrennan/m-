export default function Blockquote({ html, state }) {
  return html`
<style>
/* Base styles */
:host {
  display: flex;
  align-items: center;
  padding: var(--m-space-md);
  background-color: var(--m-color-gray-2);
}

:host + :host { margin-top: var(--m-space-sm) }

/* Icon */
:host[icon]::before {
  content: attr(icon);
  font-family: m-icons;
  font-size: var(--m-font-size-lg);
  margin-right: var(--m-space-sm);
}

/* Dismiss button */
:host button[type=remove]:last-of-type { margin-left: auto }

/* Types */
:host[type=info] {
  background-color: var(--m-color-blue-1);
}
:host[type=info]::before { color: var(--m-color-blue-3) }

:host[type=success] {
  background-color: var(--m-color-green-1);
}
:host[type=success]::before { color: var(--m-color-green-3) }

:host[type=warn] {
    background-color: var(--m-color-orange-1);
}
:host[type=warn]::before { color: var(--m-color-orange-3) }

:host[type=error] {
  background-color: var(--m-color-red-1);
}
:host[type=error]::before { color: var(--m-color-red-3) }
</style>

<slot></slot>

<script>
class Alert extends HTMLElement {
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
        dismissBtn.setAttribute('m-is', '');
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
}
customElements.define('m-alert',Alert)
</script>
`
}

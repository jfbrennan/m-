export default function Alert({ html, state }) {
  const { attrs } = state
  const dismissible = attrs.dismissible !== 'false'
  const type = attrs?.type
  const alert = type === 'warn' || type === 'error'
  return html`
    <style scope=global>
      /* Base styles */
      m-alert {
        display: flex;
        align-items: center;
        padding: var(--m-space-md);
        background-color: var(--m-color-gray-2);

        & + & { margin-top: var(--m-space-sm) }

        /* Icon */
        &[icon]::before {
          content: attr(icon);
          font-family: m-icons;
          font-size: var(--m-font-size-lg);
          margin-right: var(--m-space-sm);
        }

        /* Dismiss button */
        & m-button[type=remove]:last-of-type { margin-left: auto }

        /* Types */
        &[type=info] {
          background-color: var(--m-color-blue-1);

          &::before { color: var(--m-color-blue-3) }
        }

        &[type=success] {
          background-color: var(--m-color-green-1);

          &::before { color: var(--m-color-green-3) }
        }

        &[type=warn] {
          background-color: var(--m-color-orange-1);

          &::before { color: var(--m-color-orange-3) }
        }

        &[type=error] {
          background-color: var(--m-color-red-1);

          &::before { color: var(--m-color-red-3) }
        }
      }
    </style>

    <slot></slot>
    ${dismissible ? '<m-button type=remove aria-label="Dismiss Alert" ></m-button>' : ''}
    <script type=module>
      class Alert extends CustomElement {
        constructor() {
          super();
        }

        connectedCallback() {
          if (this.getAttribute('dismissible') !== 'false') {
            const dismissBtn = document.querySelector('m-button[type=remove]');
            dismissBtn.addEventListener('click', () => this.dismiss());
            this.append(dismissBtn);
          }
        }

        static get observedAttributes() { return ['autodismiss']; }

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
      customElements.define('m-alert', Alert)
    </script>
  `
}



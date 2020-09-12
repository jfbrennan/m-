/**
 * This element needs to match the HTMLDialogElement spec (except the m- prefix) so
 * it can be safely removed once browser support is good enough.
 *
 * Some notable naming choices:
 * "dialog" - this is what the native element is called, so we're just prefixing that
 * "open" - this is the correct attribute name
 * "close" - this is the correct event and method names
 * "returnValue" - this is the name of a special property that's optionally set when calling close
 * "show" and "showModal" - these are the correct method names for opening the dialog
 */
customElements.define('m-dialog', class extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.returnValue = null;

    // Close on esc keyup
    document.addEventListener('keyup', e => e.key === 'Escape' ? this.close() : null);

    // One time render stuff
    const container = document.createElement('div');
    const role = this.getAttribute('role') === 'alertdialog' ? 'alertdialog' : 'dialog';
    container.setAttribute('role', role);
    container.classList.add('pos-relative', 'pad-all-lg');

    const closeBtn = document.createElement('button');
    closeBtn.setAttribute('type', 'remove');
    closeBtn.setAttribute('aria-label', 'Close dialog');
    closeBtn.classList.add('pad-all-sm', 'txt-lg', 'pos-absolute', 'pin-t', 'pin-r');
    closeBtn.addEventListener('click', () => this.close());

    const content1 = document.createElement('div'); // Yes, both are needed
    const content2 = document.createElement('div');
    content2.append(...this.childNodes); // The supplied content
    content1.append(content2);

    container.append(closeBtn, content1);
    this.append(container);
  }

  static get observedAttributes() { return ['open']; }

  attributeChangedCallback(name, oldVal, newVal) {
    switch (name) {
      case 'open':
        if (newVal === null) this.close();
        if (newVal === '') {
          // Good UX and HTMLDialogElement spec says to do it
          const firstAutofocusField = this.querySelector('[autofocus]');
          if (firstAutofocusField) { firstAutofocusField.focus() }
        }
    }
  }

  get open() {
    return this.hasAttribute('open');
  }

  set open(isOpen) {
    isOpen ? this.setAttribute('open', '') : this.removeAttribute('open');
  }

  // MDN: "Closes the dialog. An optional DOMString may be passed as an argument, updating the returnValue of the the dialog."
  close(returnValue) {
    this.returnValue = returnValue || this.returnValue;
    this.style.pointerEvents = 'auto';
    this.open = false;
    this.dispatchEvent(new CustomEvent('close')); // MDN: "Fired when the dialog is closed."
  }

  // MDN: "Displays the dialog modelessly, i.e. still allowing interaction with content outside of the dialog."
  show() {
    this.style.pointerEvents = 'none'; // To "allow interaction outside dialog"
    this.open = true;
  }

  // MDN: "Displays the dialog as a modal, over the top of any other dialogs that might be present. Interaction outside the dialog is blocked."
  showModal() {
    this.open = true;
  }
});
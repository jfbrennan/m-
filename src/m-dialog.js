// NOTE: Can't extend HTMLDialogElement because lack of browser support. Matching its interface as close as possible though.
customElements.define('m-dialog', class extends HTMLElement {
  constructor() {
    super();
    this.render = lighterhtml.render.bind(null, this, this.render.bind(this));
    this.returnValue = null;
    this.content = Array.from(this.childNodes);
    this.render();
  }

  static get observedAttributes() { return ['open']; }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'open':
        if (newValue === null) this.close();
        if (newValue === '') {
          this.querySelector('[autofocus]').focus(); // Good UX and HTMLDialogElement spec says to do it
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
    this.open = false;
    this.dispatchEvent(new CustomEvent('close')); // MDN: "Fired when the dialog is closed."
  }

  // MDN: "Displays the dialog modelessly, i.e. still allowing interaction with content outside of the dialog."
  show() {
    this.open = true;
  }

  // MDN: "Displays the dialog as a modal, over the top of any other dialogs that might be present. Interaction outside the dialog is blocked."
  showModal() {
    this.open = true;
  }

  render() {
    const role = this.getAttribute('role') === 'alertdialog' ? 'alertdialog' : 'dialog';
    return lighterhtml.html`
      <div role="${role}" class="pos-relative pad-all-md">
        <button onclick="${e => this.close()}" class="pad-all-sm txt-lg pos-absolute pin-t pin-r">&times;</button>
        <div>${this.content}</div>
      </div>
      <style>
        m-dialog {
          display: none;
          justify-content: center;
          align-items: center;
          position: fixed;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
        }
        m-dialog[open] {display: flex}
        m-dialog > div {
          background-color: #F5F3F7;
          box-shadow: 0px 16px 18px -3px #a8a8a8;
        }
        m-dialog > div > button {border: none; line-height: 0.5; background: none;}
      </style>
    `;
  }
});
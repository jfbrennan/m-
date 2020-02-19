customElements.define('m-alert', class extends HTMLElement {
  constructor() {
    super();

    // One time render stuff
    this.classList.add('pad-all-md', 'flex', 'pos-relative');
    if (this.type === 'warn' || this.type === 'error') this.setAttribute('role', 'alert');

    const icon = document.createElement('m-icon');
    icon.setAttribute('name', this.icon);
    icon.classList.add('txt-lg', 'mar-r-md');

    const dismissBtn = document.createElement('button');
    dismissBtn.textContent = '×'; // That's the &times; char
    dismissBtn.hidden = this.dismissible === 'false';
    dismissBtn.classList.add('pad-all-sm', 'txt-lg', 'pos-absolute', 'pin-t', 'pin-r');
    dismissBtn.addEventListener('click', () => this.dismiss());

    const content = document.createElement('div');
    content.append(...this.childNodes);

    this.append(icon, dismissBtn, content)
  }

  get dismissible() {
    return this.getAttribute('dismissible');
  }

  set dismissible(val) {
    this.setAttribute('dismissible', val === 'false' ? 'false' : 'true');
  }

  get type() {
    return this.getAttribute('type');
  }

  set type(val) {
    this.setAttribute('type', val);
  }

  static get observedAttributes() { return ['type', 'autodismiss', 'dismissible']; }

  attributeChangedCallback(name, oldVal, newVal) {
    switch (name) {
      case 'type':
        const icon = this.type === 'success' ? 'check' : this.type === 'warn' ? 'exclamation' : this.type === 'error' ? 'ban' : 'question';
        this.querySelector('m-icon').setAttribute('name', icon);
      case 'dismissible':
        this.querySelector('button').hidden = newVal === 'false';
      case 'autodismiss':
        const seconds = newVal ? parseInt(newVal) * 1000 : 4000;
        if (seconds > 0) setTimeout(() => this.dismiss(), seconds);
    }
  }

  dismiss() {
    this.dispatchEvent(new CustomEvent('dismiss'));
    this.remove();
  }
});
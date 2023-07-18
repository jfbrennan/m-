customElements.define('m-alert', class extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    // One time render stuff
    this.classList.add('pad-md', 'flex', 'pos-relative');
    if (this.type === 'warn' || this.type === 'error') this.setAttribute('role', 'alert');

    const icon = document.createElement('m-icon');
    icon.classList.add('txt-lg', 'mar-r-md');
    const iconName = this.type === 'success' ? 'check' : this.type === 'warn' ? 'exclamation' : this.type === 'error' ? 'ban' : 'info';
    icon.setAttribute('name', iconName);

    const dismissBtn = document.createElement('button');
    dismissBtn.setAttribute('type', 'remove');
    dismissBtn.setAttribute('aria-label', 'Dismiss alert');
    dismissBtn.hidden = this.dismissible === 'false';
    dismissBtn.classList.add('pad-sm', 'txt-lg', 'pos-absolute', 'pos-t-0', 'pos-r-0');
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

  // Called once before connectedCallback, which means children may not be present
  attributeChangedCallback(name, oldVal, newVal) {
    switch (name) {
      case 'type':
        // TODO If oldVal is null, it's likely this is the first attr change, which we want to ignore.
        //  If we don't ignore then the first icon of the given content will get overridden since connectedCallback hasn't run yet.
        if (oldVal) {
          const iconName = this.type === 'success' ? 'check' : this.type === 'warn' ? 'exclamation' : this.type === 'error' ? 'ban' : 'info';
          const icon = this.querySelector('m-icon');
          if (icon) icon.setAttribute('name', iconName);
        }
      case 'dismissible':
        const dismissBtn = this.querySelector('button');
        if (dismissBtn) dismissBtn.hidden = newVal === 'false';
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

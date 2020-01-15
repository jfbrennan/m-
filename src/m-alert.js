customElements.define('m-alert', class extends HTMLElement {
  constructor() {
    super();
    this.render = lighterhtml.render.bind(null, this, this.render.bind(this));
    if (this.type === 'warn' || this.type === 'error') this.setAttribute('role', 'alert');
    this.classList.add('pad-all-md', 'flex', 'pos-relative');
    this.content = Array.from(this.childNodes);
    this.render();
  }

  get dismissible() {
    return this.getAttribute('dismissible');
  }

  set dismissible(val) {
    this.setAttribute('dismissible', val);
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
        this.icon = this.type === 'success' ? 'check' : this.type === 'warn' ? 'exclamation' : this.type === 'error' ? 'ban' : 'question';
      case 'autodismiss':
        const seconds = newVal ? parseInt(newVal) * 1000 : 4000;
        if (seconds > 0) setTimeout(() => this.dismiss(), seconds);
    }

    this.render();
  }

  dismiss() {
    this.dispatchEvent(new CustomEvent('dismiss'));
    this.remove();
  }

  render() {
    return lighterhtml.html`
      <m-icon name=${this.icon} class="txt-lg mar-r-md"></m-icon>
      <button onclick="${e => this.dismiss()}" hidden="${this.dismissible === 'false'}" class="pad-all-sm txt-lg pos-absolute pin-t pin-r">&times;</button>
      <div>${this.content}</div>
      <style>
        m-alert + m-alert {margin-top: 12px}
        m-alert[type=info] {background-color: #f2f8fc}
        m-alert[type=success] {background-color: darkseagreen}
        m-alert[type=warn] {background-color: orange}
        m-alert[type=error] {background-color: red}
        m-alert > button {border: none; line-height: 0.5; background: none;}
      </style>
    `;
  }
});
customElements.define('m-alert', class extends HTMLElement {
  static get observedAttributes() { return ['type', 'autodismiss', 'dismissible']; }
  static get booleanAttributes() { return ['autodismiss']; }

  constructor() {
    super();
    this.render = lighterhtml.render.bind(null, this, this.render.bind(this));
    this.content = Array.from(this.childNodes);
    if (this.type === 'warn' || this.type === 'error') this.setAttribute('role', 'alert');
    this.classList.add('pad-all-md', 'flex', 'pos-relative');
    this.render();
  }

  attributeChangedCallback(name, prev, curr) {
    if (name === 'type') {
      this.icon = this.type === 'success' ? 'check' : this.type === 'warn' ? 'exclamation' : this.type === 'error' ? 'ban' : 'question';
    }

    if (name === 'autodismiss') {
      const seconds = curr ? parseInt(curr) * 1000 : 4000;
      if (seconds > 0) setTimeout(() => this.dismiss(), seconds);
    }

    this.render();
  }

  dismiss() {
    this.dispatchEvent(new CustomEvent('m-dismiss'));
    this.remove();
  }

  render() {
    return lighterhtml.html`
      <m-icon name=${this.icon} class="txt-lg mar-r-md"></m-icon>
      <button onclick="${e => this.dismiss()}" hidden=${this.dismissible === 'false'} class="pad-all-sm txt-lg pos-absolute">&times;</button>
      <div ref="content">${this.content}</div>
      <style>
        m-alert + m-alert {margin-top: 12px}
        m-alert[type=info] {background-color: lightsteelblue}
        m-alert[type=success] {background-color: darkseagreen}
        m-alert[type=warn] {background-color: orange}
        m-alert[type=error] {background-color: red}
        m-alert > button {border: none; line-height: 0.5; background: none; top: 0; right: 0}
      </style>
    `;
  }
});
customElements.define('m-details', class extends HTMLElement {
  constructor() {
    super();
    this.content = Array.from(this.childNodes);
    this.summary = this.content.splice(this.content.findIndex(el => el.tagName === 'SUMMARY'), 1)[0] || new HTMLElement(); // Sometimes there's a text node as the first child
    this.summary.addEventListener('click', e => this.open = !this.open);
    this.render = lighterhtml.render.bind(null, this, this.render.bind(this));
    this.render();
  }

  static get observedAttributes() { return ['open']; }

  attributeChangedCallback(name, oldVal, newVal) {
    switch (name) {
      case 'open':
        this.dispatchEvent(new CustomEvent('toggle'));
        if (newVal !== null) {
          const autofocus = this.querySelector('[autofocus]');
          autofocus && autofocus.focus();
        }
    }
  }

  get open() {
    return this.hasAttribute('open');
  }

  set open(isOpen) {
    isOpen ? this.setAttribute('open', '') : this.removeAttribute('open');
  }

  render() {
    return lighterhtml.html`
      ${this.summary}
      <div ref="content">${this.content}</div>
      <style>
        m-details {display: block}
        m-details > [ref=content] {display: none}
        m-details[open] > [ref=content] {display: block}
        m-details > summary {cursor: pointer}
      </style>
    `;
  }
});

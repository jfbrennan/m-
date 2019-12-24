customElements.define('m-filepicker', class extends HTMLElement {
  constructor() {
    super();
    this.state = {files: []};
    this.render = lighterhtml.render.bind(null, this, this.render.bind(this));
    this.render();
  }

  select(e) {
    this.state.files = e.currentTarget.files;
    console.log(this.state)
  }

  render() {
    return lighterhtml.html`
      <input type="file" onchange="${e => this.select(e)}" multiple="${this.hasAttribute('multiple')}">
    `;
  }
});
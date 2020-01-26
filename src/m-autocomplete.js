class MdashAutocomplete extends HTMLElement {
  constructor() {
    super();
    this.render = lighterhtml.render.bind(null, this, this.render.bind(this));

    // Closes matching results when user clicks outside of it
    document.body.addEventListener('click', e => {
      if (!this.refs.matches.contains(e.currentTarget)) {
        this.clear();
      }
    });
    this.matches = null;

    this.render();
  }

  showMatches(query) {
    if (query) {
      const source = this.getAttribute('source');
      MdashAutocomplete.prototype.sources[source](query).then(({query, matches}) => {
        if (query === this.querySelector('input').value) {
          this.matches = matches.slice(0, this.max || matches.length);
          this.render();
        }
      });
    }
    else {
      this.clear();
    }
  }

  select(e, item) {
    e.stopPropagation();
    this.refs.search.value = item;
    this.refs.search.focus();
    this.dispatchEvent(new CustomEvent('select', {detail: {source: this.source, item}}));
    this.clear();
  }

  clear() {
    this.matches = null;
    this.render();
  }

  render() {
    return lighterhtml.html`
      <input ref="search" onkeyup="${e => this.showMatches(e.currentTarget.value)}" placeholder="${this.getAttribute('placeholder')}">
      <div ref="matches" hidden="${!this.matches}">
        <ul type="none" class="pos-absolute">
          ${this.matches && this.matches.length && this.matches.map(m => `<li onclick="${e => this.select(e, m)}" class="pad-all-sm pointer">${m}</li>`)}
          ${(this.matches && !this.matches.length) && '<li class="pad-all-sm fnt-italic">No results</li>'}
        </ul>
      </div>
      <style>
        m-autocomplete {display: block}
        m-autocomplete [ref=matches] ul {background-color: white; min-width: 200px}
        m-autocomplete [ref=matches] li:hover {background-color: lightgrey}
      </style>
    `;
  }
}

MdashAutocomplete.prototype.sources = {};
customElements.define('m-autocomplete', MdashAutocomplete);


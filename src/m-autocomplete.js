class MdashAutocomplete extends HTMLElement {
  constructor() {
    super();
    this._boundClose = this.close.bind(this)
  }

  connectedCallback() {
    // Closes matching results when user clicks outside of it
    document.body.addEventListener('click', this._boundClose);

    // Close on esc keyup
    document.addEventListener('keyup', this._boundClose);

    this.results = [];

    // One time setup
    if (this.childElementCount === 0) {
      this._input = document.createElement('input');
      this._input.setAttribute('placeholder', this.getAttribute('placeholder'));
      this._input.addEventListener('keyup', e => this.search(e.currentTarget.value));
      // TODO autocomplete can experience loss of focus during normal use, which create undesired flash of no focus ring :(

      this._matchesContainer = document.createElement('div');
      this._matchesContainer.classList.add('pos-absolute', 'bg-white', 'brd-all', 'brd-radius-sm');
      this._matchesContainer.addEventListener('click', e => {
        const li = e.target.closest('li');
        this.select(e, li.dataset.value, li.dataset.id);
      });
      this._matchesContainer.hidden = true;

      this.append(this._input, this._matchesContainer);
    }
  }

  disconnectedCallback() {
    document.body.removeEventListener('click', this._boundClose);
    document.removeEventListener('keyup', this._boundClose);
  }

  close(e) {
    // Close with the Esc key
    if (e.type === 'keyup' && e.key === 'Escape') {
      this.clear();
    }
    // Close with off-target click
    else if (e.type === 'click' && !this._matchesContainer.contains(e.currentTarget)) {
      this.clear(true);
    }
  }
  
  async search(query) {
    if (query) {
      const source = this.getAttribute('source');
      const max = Number(this.getAttribute('max'));
      let results = [];

      // Try function source...
      if (MdashAutocomplete.prototype.sources[source]) {
        const {query, matches} = await MdashAutocomplete.prototype.sources[source](query, max);

        // Verify the original query is still current since these are async calls
        if (query === this._input.value) {
          results = matches.slice(0, max || matches.length);

          // Normalize string results
          if (typeof results[0] === 'string') {
            results = results.map(value => ({value}))
          }
        }
      }
      // Try <datalist> source...
      else if (document.getElementById(source)) {
        const lowerCaseQuery = query.toLowerCase();
        Array.from(document.getElementById(source).options).forEach(option => {
          // There must always be option.value and it's always set to id.
          // If there's option.textContent, textContent is value; otherwise option.value is id and value.
          const match = option.value?.toLowerCase().includes(lowerCaseQuery) || option.textContent?.toLowerCase().includes(lowerCaseQuery);
          if (match) {
            const id = option.value;
            const value = option.textContent || id;
            results.push({value, id});
          }
        });
      }

      this.results = results;
      this.render(query);
    }
    else {
      this.clear();
    }
  }

  select(e, value, id) {
    e.stopPropagation();
    const source = this.getAttribute('source');
    this._input.value = value;
    this._input.focus();
    this.dispatchEvent(new CustomEvent('select', {detail: {source, value, id}}));
    this.clear();
  }

  clear(preventFocus) {
    this.results = [];
    this.render();
    if (!preventFocus) {
      this._input.focus();
    }
  }

  render(hasQuery) {
    this._matchesContainer.hidden = !hasQuery;
    this._matchesContainer.innerHTML = this.results.length ?
      `<ul type="none">
        ${this.results.reduce((acc, result) => acc +=`<li class="pad-all-sm pointer" data-id="${result.id}" data-value="${result.value}">${result.value}</li>`, '')}
      </ul>`
      :
      `<div class="pad-all-sm fnt-italic txt-gray-5">No results</div>`;
  }
}

MdashAutocomplete.prototype.sources = {};
window.MdashAutocomplete = MdashAutocomplete;
customElements.define('m-autocomplete', MdashAutocomplete);

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

    this.matches = null;

    // One time render stuff
    const input = document.createElement('input');
    input.setAttribute('ref', 'search');
    input.setAttribute('placeholder', this.getAttribute('placeholder') || '');
    input.addEventListener('keyup', e => this.search(e.currentTarget.value));
    // TODO autocomplete can experience loss of focus during normal use, which create undesired flash of no focus ring :(

    const matches = document.createElement('div');
    matches.setAttribute('ref', 'matches');
    matches.addEventListener('click', e => {
      const li = e.target.closest('li');
      const match = li.dataset.value;
      this.select(e, match);
    });
    matches.hidden = !this.matches;

    this.append(input, matches);  
  }

  disconnectedCallback() {
    document.body.removeEventListener('click', this._boundClose);
    document.removeEventListener('keyup', this._boundClose);
  }

  close(e) {
    if (e.type === 'keyup' && e.key === 'Escape') {
      this.clear()
    }
    else if (e.type === 'click' && !this.querySelector('[ref="matches"]').contains(e.currentTarget)) {
      this.clear(true);
    }
  }
  
  search(query) {
    if (query) {
      const source = this.getAttribute('source');

      // Try function source...
      if (MdashAutocomplete.prototype.sources[source]) {
        MdashAutocomplete.prototype.sources[source](query).then(({query, matches}) => {
          // Check that original query is still the same first since these are async calls
          if (query === this.querySelector('input').value) {
            this.matches = matches.slice(0, this.max || matches.length);
            this.renderMatches();
          }
        });
      }
      // Try <datalist> source...
      else if (document.getElementById(source)) {
        this.matches = [];
        document.getElementById(source).querySelectorAll('option').forEach(opt => {
          if (opt.value.toLowerCase().includes(query)) {
            this.matches.push(opt.value);
          }
        });
        this.renderMatches();
      }
    }
    else {
      this.clear();
    }
  }

  select(e, item) {
    e.stopPropagation();
    this.querySelector('[ref="search"]').value = item;
    this.querySelector('[ref="search"]').focus();
    this.dispatchEvent(new CustomEvent('select', {detail: {source: this.source, item}}));
    this.clear();
  }

  clear(preventFocus) {
    this.matches = null;
    this.renderMatches();
    if (!preventFocus) {
      this.querySelector('input').focus();
    }
  }

  renderMatches() {
    const matches = this.querySelector('[ref="matches"]');
    matches.hidden = !this.matches;

    // TODO used to have  onclick="${e => this.select(e, m)}" on each <li>
    matches.innerHTML = `
      <ul type="none" class="pos-absolute">
        ${this.matches && this.matches.length
          ? this.matches.reduce((s, m) => s +=`<li class="pad-all-sm pointer" data-value="${m}">${m}</li>`, '')
          : this.matches && !this.matches.length 
            ? '<li class="pad-all-sm fnt-italic">No results</li>'
            : ''
        }
      </ul>
    `;
  }
}

MdashAutocomplete.prototype.sources = {};
customElements.define('m-autocomplete', MdashAutocomplete);


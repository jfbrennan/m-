
const htmlElements = {
  "e-accordion": function({ html, state }) {
    return html`<style scope="global">
    e-accordion {
        display: block;

        & e-details:last-child > details {
                border-bottom: 3px solid var(--e-color-gray-2);
            }
        & e-details > details {
            border-top: 3px solid var(--e-color-gray-2);


            &[open] > summary:after {
                transform: rotate(180deg);
                transition: transform 250ms;
            }

            & > summary {
                padding: var(--e-space-sm) var(--e-space-xl) var(--e-space-sm) 0;
                position: relative;

                &:focus-visible {
                    outline: 2px solid var(--e-color-focus);
                }

                &:after {
                    font-family: "e-icons";
                    content: "expand_more";
                    position: absolute;
                    top: var(--e-space-sm);
                    right: var(--e-space-sm);
                    transform: rotate(0deg);
                    transition: transform 250ms;
                }
            }
        }
    }
</style>
<slot></slot>
`;
  },
  "e-autocomplete": function({ html, state }) {
    return html`<style scope="global">
    /* Base styles */
    e-autocomplete {
        display: block;

        /* Matches container */
        & > div {
            z-index: 1;
            overflow: hidden;
            min-width: 200px;

            & > ul li:hover {
                background-color: var(--e-color-gray-1);
            }
        }
    }

    /* When paired with label */
    fieldset label + e-autocomplete {
        margin-top: var(--e-space-xs);
    }
</style>
<script type="module">

    class EAutocomplete extends HTMLElement {
      #initialized = false;
      #boundClose;
      #input;
      #matches;
      results = [];

      /**
       * Data source function for autocomplete.
       * @callback AutocompleteDataSource
       * @param {string} query - The current value of the autocomplete input, i.e. what the user is typing.
       * @param {number} max - The maximum number of results that will be shown.
       * @returns {Promise<{query: string, matches: []}>} - Passing back query allows autocomplete to determine if the matches are still relevant.
       */

      /**
       * Object with named autocomplete data source functions.
       * @type {Object.<string, AutocompleteDataSource>}
       */
      static sources = {};

      constructor() {
        super();
        this.#boundClose = this.close.bind(this)
      }

      connectedCallback() {
        if (!this.#initialized) {
          this.#input = document.createElement('input');
          this.#input.setAttribute('placeholder', this.getAttribute('placeholder') || '');
          this.#input.addEventListener('select', e => e.stopPropagation()); // Prevents text select event
          this.#input.addEventListener('keyup', e => this.search(e.currentTarget.value));

          this.#matches = document.createElement('div');
          this.#matches.classList.add('pos-absolute', 'bg-white', 'brd', 'brd-radius-sm');
          this.#matches.addEventListener('click', e => {
            const li = e.target.closest('li');
            this.select(e, li.dataset.value, li.dataset.id);
          });
          this.#matches.hidden = true;

          this.append(this.#input, this.#matches);
          this.#initialized = true;
        }

        // Closes matchesContainer when user clicks outside of it
        document.body.addEventListener('click', this.#boundClose);

        // Close matchesContainer on esc keyup
        document.addEventListener('keyup', this.#boundClose);
      }

      disconnectedCallback() {
        document.body.removeEventListener('click', this.#boundClose);
        document.removeEventListener('keyup', this.#boundClose);
      }

      close(e) {
        // Close with the Esc key
        if (e.type === 'keyup' && e.key === 'Escape') {
          this.clear();
        }
        // Close with off-target click
        else if (e.type === 'click' && !this.#matches.contains(e.currentTarget)) {
          this.clear(true);
        }
      }

      async search(query) {
        if (query) {
          const source = this.getAttribute('source');
          const max = Number(this.getAttribute('max'));
          let results = [];

          // Try function source...
          if (MdashAutocomplete.sources[source]) {
            const result = await MdashAutocomplete.sources[source](query, max);

            // Verify the original query matches current value since these are async calls
            if (result.query === this.#input.value) {
              results = result.matches.slice(0, max || result.matches.length);

              // Normalize string results as objects
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
        this.#input.value = value;
        this.#input.focus();
        this.dispatchEvent(new CustomEvent('select', {detail: {source, value, id}}));
        this.clear();
      }

      clear(preventFocus) {
        this.results = [];
        this.render();
        if (!preventFocus) {
          this.#input.focus();
        }
      }

      render(hasQuery) {
        this.#matches.hidden = !hasQuery;
        this.#matches.innerHTML = this.results.length
          ? \`< ul type = "none" >
        ${this.results.reduce((acc, result) => acc += `<li class="pad-sm pointer" data-id="${result.id}" data-value="${result.value}">${result.value}</li>`, '')}
            </ul > \`
          : \`< div class="pad-sm fnt-italic txt-gray-5" > No results</div > \`;
      }
    }

    customElements.define('e-autocomplete', EAutocomplete);
</script>
`;
  },
  "e-badge": function({ html, state }) {
    return html`<style scope="global">
    /* Base styles */
    e-badge {
      display: none;
      min-width: 1.25rem;
      height: 1.25rem;
      place-content: center;
      color: white;
      background-color: var(--e-color-primary-action);
      border-radius: 0.625rem;
      font-weight: 600;
      line-height: 1.25rem;

      /* Padding for text only */
      &:not([count]) { padding: 0 var(--e-space-xs) }

      /* Count */
      &[count]:before {
        content: attr(count);
        padding: 0 var(--e-space-xs);
      }

      /* Show the badge only when it has a non-zero count or is not empty */
      &:not(:empty),
      &[count]:not([count=""]):not([count="0"]) {
        display: inline-flex;
      }
    }
    }
</style>
<slot></slot>
`;
  },
  "e-button": function({ html, state }) {
    return html`    <style scope="global">
      e-button {
        display: inline-block;
        & + & {
          margin-left: var(--e-space-sm);
          margin-top: var(--e-space-sm);
        }

        :is(button, a[role="button"]) {
          /*
          Ordinal attribute
          The ord attr is short for "ordinal number word".
          Ordinal number words are the 10+ words used for describing the
          precedence or importance of an item in a group, e.g. Save and Cancel buttons.
        */
          &[ord] {
            display: inline-flex;
            place-content: center;
            border-radius: var(--e-border-radius-md);
            cursor: pointer;
            background: none;
            font-size: var(--e-font-size-default);
            height: var(--e-input-min-height);
            padding: var(--e-space-xs) var(--e-space-md);

            /* Sibling buttons */
            + & {
              margin-left: var(--e-space-sm);
            }

            /* Disabled */
            &[disabled] {
              cursor: not-allowed;
              border: 2px solid var(--e-color-disabled-bg);
              color: var(--e-color-disabled-fg);
              background-color: var(--e-color-disabled-bg);
            }
          }

          /* Primary ordinal */
          &[ord="primary"] {
            border: 2px solid var(--e-color-primary-action);
            background-color: var(--e-color-primary-action);
            color: white;
          }

          /* Secondary ordinal */
          &[ord="secondary"] {
            border: 2px solid var(--e-color-primary-action);
            color: var(--e-color-primary-action);

            &[aria-pressed="true"],
            &[aria-pressed="mixed"] {
              background-color: var(--e-color-blue-1);
            }
          }

          /* Tertiary ordinal */
          &[ord="tertiary"] {
            border: 2px solid var(--e-color-gray-7);
            color: var(--e-color-gray-7);
          }
        }

        /* Focus for all buttons */
        :is(button, a[role="button"])[ord]:focus-visible,
        button[type="remove"]:focus-visible {
          outline: 2px solid var(--e-color-focus);
          outline-offset: 0;
        }

        /* Link button overrides */
        a[role="button"][ord] {
          box-sizing: border-box;

          &:hover {
            text-decoration: none;
          }
        }

        /* Remove button (for close, dismiss, delete use cases) */
        button[type="remove"] {
          all: unset;
          display: inline-flex;
          place-content: center;
          cursor: pointer;
          width: var(--e-input-min-height);
          font-size: 24px;

          &:active {
            color: initial;
          }
          &::before {
            content: "×";
          }

          /* Disabled */
          &[disabled] {
            color: var(--e-color-disabled-fg);
            cursor: not-allowed;
          }
        }

        /* Button Group */
        [role="group"]:has(:is(button, a[role="button"])) {
          display: inline-flex;

          & button,
          & a[role="button"] {
            border-radius: 0;
            border-right-width: 1px;
            border-left-width: 1px;

            &:first-of-type {
              border-radius: var(--e-border-radius-md) 0 0
                var(--e-border-radius-md);
              border-left-width: 2px;
            }

            &:last-of-type {
              border-radius: 0 var(--e-border-radius-md)
                var(--e-border-radius-md) 0;
              border-right-width: 2px;
            }

            & + & {
              margin: 0;
            }
          }
        }

        /* Scale */
        /*:is(button, a[role=button])[scale=sm] {*/
        /*  min-height: var(--e-target-min-size);*/
        /*  font-size: var(--e-font-size-min);*/
        /*}*/

        /*:is(button, a[role=button])[scale=lg] {*/
        /*  min-height: 44px;*/
        /*  font-size: var(--e-font-size-md);*/
        /*}*/

        /*button[type=remove][scale=sm] {*/
        /*  width: var(--e-target-min-size);*/
        /*  height: var(--e-target-min-size);*/
        /*  font-size: 14px;*/
        /*}*/

        /*button[type=remove][scale=lg] {*/
        /*  width: 44px;*/
        /*  height: 44px;*/
        /*  font-size: 36px;*/
        /*}*/
      }
    </style>
    <slot></slot>
`;
  },
  "e-blockquote": function({ html, state }) {
    return html`<style>
    blockquote {
        color: var(--e-color-gray-6);
        font-style: italic;
    }
</style>
<blockquote><slot></slot></blockquote>
`;
  },
  "e-box": function({ html, state }) {
    return html`<style scope="global">
    e-box {
        display: block;
        border-radius: var(--e-border-radius-md);
        padding: var(--e-space-md);
        background-color: white;
        border: 1px solid var(--e-color-border);

        /*
    The ord attr is short for "ordinal" as in "ordinal number word".
    Ordinal number words are the 10+ words used for describing the
    precedence or importance of an item in an ordered list.
  */
        &[ord="secondary"] {
            border: none;
            background-color: var(--e-color-gray-1);
            box-shadow: 0px 1px 2px var(--e-color-gray-3) inset;
        }

        & > header {
            border-top-left-radius: var(--e-border-radius-md);
            border-top-right-radius: var(--e-border-radius-md);
        }

        & + & {
            margin-top: var(--e-space-md);
        }
    }

    @media only screen and (max-width: 600px) {
        e-box {
            padding: var(--e-space-sm);
        }
    }
</style>

<slot></slot>
`;
  },
  "e-breadcrumb": function({ html, state }) {
    return html`<style scope="global">
    e-breadcrumb {
        display: block;
    }
    e-breadcrumb,
    e-breadcrumb > nav {
        display: flex;
    }

    e-breadcrumb
        > nav
        > :is(e-link, a, e-crumb, span):not(:first-child)::before {
        content: "/";
        display: inline-block; /* Needed to prevent this element from getting underlined */
        margin: 0 var(--e-space-sm);
        color: var(--e-color-gray-4);
    }
</style>
<slot></slot>
`;
  },
  "e-col": function({ html, state }) {
    return html`<style scope="global">
    e-col,
    e-col[indent] {
        box-sizing: border-box;
        flex: 0 0 auto;
    }

    e-col {
        flex-grow: 1;
        flex-basis: 0;
        max-width: 100%;

        /* span sets the width of the column */
        &[span~="1"] {
            max-width: 8.33333333%;
        }

        &[span~="2"] {
            max-width: 16.66666667%;
        }

        &[span~="3"] {
            max-width: 25%;
        }

        &[span~="4"] {
            max-width: 33.33333333%;
        }

        &[span~="5"] {
            max-width: 41.66666667%;
        }

        &[span~="6"] {
            max-width: 50%;
        }

        &[span~="7"] {
            max-width: 58.33333333%;
        }

        &[span~="8"] {
            max-width: 66.66666667%;
        }

        &[span~="9"] {
            max-width: 75%;
        }

        &[span~="10"] {
            max-width: 83.33333333%;
        }

        &[span~="11"] {
            max-width: 91.66666667%;
        }

        &[span~="12"] {
            max-width: 100%;
        }

        /* indent is used to push columns inward */
        &[indent="1"] {
            margin-left: 8.33333333%;
        }

        &[indent="2"] {
            margin-left: 16.66666667%;
        }

        &[indent="3"] {
            margin-left: 25%;
        }

        &[indent="4"] {
            margin-left: 33.33333333%;
        }

        &[indent="5"] {
            margin-left: 41.66666667%;
        }

        &[indent="6"] {
            margin-left: 50%;
        }

        &[indent="7"] {
            margin-left: 58.33333333%;
        }

        &[indent="8"] {
            margin-left: 66.66666667%;
        }

        &[indent="9"] {
            margin-left: 75%;
        }

        &[indent="10"] {
            margin-left: 83.33333333%;
        }

        &[indent="11"] {
            margin-left: 91.66666667%;
        }

        &[indent="12"] {
            margin-left: 100%;
        }
    }

    /* Order is used to reorder columns at specific breakpoints */
    @media only screen and (max-width: 768px) {
        e-col[span~="md-1"] {
            max-width: 8.33333333%;
        }

        e-col[span~="md-2"] {
            max-width: 16.66666667%;
        }

        e-col[span~="md-3"] {
            max-width: 25%;
        }

        e-col[span~="md-4"] {
            max-width: 33.33333333%;
        }

        e-col[span~="md-5"] {
            max-width: 41.66666667%;
        }

        e-col[span~="md-6"] {
            max-width: 50%;
        }

        e-col[span~="md-7"] {
            max-width: 58.33333333%;
        }

        e-col[span~="md-8"] {
            max-width: 66.66666667%;
        }

        e-col[span~="md-9"] {
            max-width: 75%;
        }

        e-col[span~="md-10"] {
            max-width: 83.33333333%;
        }

        e-col[span~="md-11"] {
            max-width: 91.66666667%;
        }

        e-col[span~="md-12"] {
            max-width: 100%;
        }
    }

    /* Must come after medium because cascading is used here */
    @media only screen and (max-width: 576px) {
        e-col[span~="sm-1"] {
            max-width: 8.33333333%;
        }

        e-col[span~="sm-2"] {
            max-width: 16.66666667%;
        }

        e-col[span~="sm-3"] {
            max-width: 25%;
        }

        e-col[span~="sm-4"] {
            max-width: 33.33333333%;
        }

        e-col[span~="sm-5"] {
            max-width: 41.66666667%;
        }

        e-col[span~="sm-6"] {
            max-width: 50%;
        }

        e-col[span~="sm-7"] {
            max-width: 58.33333333%;
        }

        e-col[span~="sm-8"] {
            max-width: 66.66666667%;
        }

        e-col[span~="sm-9"] {
            max-width: 75%;
        }

        e-col[span~="sm-10"] {
            max-width: 83.33333333%;
        }

        e-col[span~="sm-11"] {
            max-width: 91.66666667%;
        }

        e-col[span~="sm-12"] {
            max-width: 100%;
        }
    }
</style>
<slot></slot>
`;
  },
  "e-container": function({ html, state }) {
    return html`<style scope="global">
    /* Base container styles */
    e-container {
        display: block;
        max-width: var(--e-max-content-width);
        margin: auto;
        padding: var(--e-space-md) var(--e-space-lg);

        /* Sizes */
        &[maxwidth="md"] {
            max-width: 924px;
        } /* Plus its margin = 960 which is a very comfortable and common size */
        &[maxwidth="sm"] {
            max-width: 375px;
        }
        &[maxwidth="none"] {
            max-width: none;
        }
    }

    @media only screen and (max-width: 600px) {
        e-container {
            padding: var(--e-space-sm);
        }
    }
</style>
<slot></slot>
`;
  },
  "e-details": function({ html, state }) {
    return html`<style scope="global">
    e-details {
        & details {
            > summary {
                cursor: pointer;
                list-style: none; /* Hides caret in Firefox */

                &:focus {
                    outline: none;
                }

                /* Hides caret in Chrome, Safari, etc. */
                &::-webkit-details-marker {
                    display: none;
                }
            }
        }
    }
</style>
<details>
    <slot></slot>
</details>
`;
  },
  "e-dialog": function({ html, state }) {
    return html`<style scope="global">
    e-dialog {
        /* Base dialog styles */
        & dialog {
            border: none;
            padding: var(--e-space-lg);
            background-color: #f5f3f7;
            box-shadow: 0 16px 18px -3px #858585;

            /* Close button */
            & button[slot="close"][type="remove"] {
                position: absolute;
                top: 0;
                right: 0;
            }
        }
    }
</style>
<dialog><slot></slot></dialog>
`;
  },
  "e-dot": function({ html, state }) {
    return html`<style scope="global">
    /* Base styles */
    e-dot {
        display: inline-flex;
        align-items: center;

        &::before {
            content: "";
            width: 8px;
            height: 8px;
            margin: var(--e-space-xs);
            border-radius: var(--e-border-radius-full);
            background-color: var(--e-color-gray-4);
        }

        /* Alert type */
        &[type="info"]::before {
            background-color: var(--e-color-blue-2);
        }
        &[type="success"]::before {
            background-color: var(--e-color-green-2);
        }
        &[type="warn"]::before {
            background-color: var(--e-color-orange-2);
        }
        &[type="error"]::before {
            background-color: var(--e-color-red-2);
        }
    }
</style>
<slot></slot>
`;
  },
  "e-icon": function({ html, state }) {
    return html`<style scope="global">
    /* Icon font */
    @font-face {
        font-family: "e-icons";
        font-style: normal;
        font-weight: 400;
        /*
    This Google Fonts API request:
    https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:FILL@0..1
    Returned this font URL:
    https://fonts.gstatic.com/s/materialsymbolsoutlined/v134/kJF4BvYX7BgnkSrUwT8OhrdQw4oELdPIeeII9v6oDMzBwG-RpA6RzaxHMPdY40KH8nGzv3fzfVJU22ZZLsYEpzC_1ver5Y0J1Llf.woff2
    That font file was downloaded and added to Mdash as src/e-icons.woff2, which gets published to npm/unpkg.
  */
        src: url(/_public/e-.woff2) format("woff2");
    }

    /* Icon base styles */
    e-icon {
        display: inline-flex;

        &::before {
            font-family: "e-icons";
            content: attr(name);
            -webkit-font-smoothing: antialiased;
        }

        /* Filled option */
        &[fill]::before {
            font-variation-settings: "FILL" 1;
        }
    }
</style>
`;
  },
  "e-input-group": function({ html, state }) {
    return html`<style scope=global>
  e-input-group { 
    display: block;

    & + & {
      margin-top: var(--e-space-xs);
    }

    & + :is(&, e-button, button[ord], a[role=button]) { margin-top: var(--e-space-md) }

    fieldset {
      margin: 0;
      padding: 0;
      border: none;
      position: relative;

      & + :is(&, button[ord], a[role=button]) { margin-top: var(--e-space-md) }

      & input:not([type=radio]):not([type=checkbox]),
      & :is(label, select) {
        display: block;
      }

      & input + label { display: inline }

      & :is(label, legend) { font-weight: 500 }

      & :is(input[type=radio], input[type=checkbox]) + label {
        font-weight: normal;
      }

      & :is(input, textarea) { box-sizing: border-box }

      & input:not([type=radio], [type=checkbox], [type=range]),
      & :is(select, textarea) {
        width: 100%;
        min-height: var(--e-input-min-height);
        font-size: 16px;
        padding: 6px;
        border-radius: 0px;
        background-color: white;
        color: var(--e-color-gray-8);
      }

      & :is(input:not([is=switch]), select, textarea) {
        border: 1px solid var(--e-color-gray-3);
      }

      & select:not([multiple]) {
        appearance: none;
        background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' version='1.1' height='10px' width='22px'%3E%3Ctext x='0' y='10' fill='gray'%3E%E2%96%BE%3C/text%3E%3C/svg%3E");
        background-repeat: no-repeat;
        background-position: right center;
        padding-right: var(--e-space-lg);
      }

      & textarea {
        resize: vertical;
        font-family: inherit;
      }

      & input[type=range] {
        appearance: none;
        outline: 0;
        width: 100%;
        margin: var(--e-space-sm) 0;
        height: var(--e-space-xs);
        background-color: var(--e-color-gray-3);
        border-radius: var(--e-border-radius-full);

        &::-webkit-slider-thumb {
           appearance: none;
           width: var(--e-space-md);
           height: var(--e-space-md);
           border: 1px solid var(--e-color-gray-4);
           background-color: white;
           border-radius: var(--e-border-radius-full);

          &:focus-visible {
             outline: 2px solid var(--e-color-focus);
          }
        }

        /*&[orient=vertical] {*/
        /*  transform: rotate(-90deg);*/
        /*  position: absolute;*/
        /*  top: 48%;*/
        /*  left: -78%;*/
        /*  margin: 0;*/
        /*}*/
      }

      & :is(label, input, select, textarea, small) {
        & + & {
          margin-top: var(--e-space-xs);
        }
      }

      & input:not([type=range]):not([is=switch]),
      & :is(select, textarea) {
        &:focus {
          outline: 2px solid var(--e-color-focus);
          outline-offset: 0;
          border: 1px solid var(--e-color-primary-action);
        }
      }

      & :is(input, select, textarea) {
        &:invalid,
        &[invalid] {
          border-color: var(--e-color-red-3);

          & ~ small {
            color: var(--e-color-red-3);
          }
        }

        & ~ small {
          color: var(--e-color-gray-6);
        }
      }

    }
  }
</style>
<fieldset>
  <slot></slot>
</fieldset>
`;
  },
  "e-link": function({ html, state }) {
    return html`<style scope=global>
  e-link {
    /* Base link styles */
    a, *[role=link] {
      text-decoration: none;
      color: var(--e-color-primary-action);
      cursor: pointer;

      /*:is(a, span[role=link]):visited { color: var(--e-color-primary-action) }*/
      &:hover,
      &:focus-visible {
        text-decoration: underline;
        outline: 0;
      }

      /* Disabled state */
      &[disabled] {
        color: var(--e-color-disabled-fg);
        pointer-events: none;
      }
    }
  }
</style>
<slot></slot>

`;
  },
  "e-keyboard": function({ html, state }) {
    return html`<style scope="global">
    e-keyboard {
        kbd {
            font-family: system-ui;

            &:not(:has(kbd)),
            & kbd {
                border-radius: 3px;
                box-shadow: 0 1px 2px 0 var(--e-color-gray-5);
                padding: 0 4px;
                background: white;
            }
        }
    }
</style>
<kbd><slot></slot></kbd>
`;
  },
  "e-loader": function({ html, state }) {
    return html`<style scope="global">
    e-loader {
        display: inline-flex;

        &::before {
            font-family: "e-icons";
            content: "autorenew";
            -webkit-font-smoothing: antialiased;
        }

        &[loading]:before {
            animation: 1.2s linear infinite e-loader;
        }
    }

    @keyframes e-loader {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
</style>
<slot></slot>
`;
  },
  "e-menu": function({ html, state }) {
    return html`<style scope="global">
    /* Base menu styles */
    e-menu {
        display: inline-block;
        position: relative;

        /* Menu trigger */
        & > [slot="trigger"] {
            cursor: pointer;
        }

        /* Menu items */
        & > [slot="items"] {
            display: none;
            position: absolute;
            transform: translateY(var(--e-space-xs));
            background-color: white;
            border: 1px solid var(--e-color-gray-4);
            border-radius: var(--e-border-radius-sm);
            width: max-content;
            z-index: 3000;

            /* Link children */
            & > a,
            & > e-link {
                display: block;
                padding: var(--e-space-xs) var(--e-space-sm);
            }
        }

        /* Open state */
        &[open] > [slot="items"] {
            display: block;
        }
    }
</style>
<slot name="trigger"></slot>
<slot name="items"></slot>

<script type="module">
    customElements.define(
        "e-menu",
        class extends HTMLElement {
            #initialized = false;
            #boundClose;

            constructor() {
                super();
                this.#boundClose = this.close.bind(this);
            }

            connectedCallback() {
                if (!this.#initialized) {
                    // Bind click to trigger slot
                    this.querySelector('[slot="trigger"]')?.addEventListener(
                        "click",
                        (e) => (this.open = !this.open),
                    );
                    this.#initialized = true;
                }

                // Close menu if user clicks outside of a menu or navigates away
                document.body.addEventListener("click", this.#boundClose);
                window.addEventListener("popstate", this.#boundClose);
            }

            disconnectedCallback() {
                document.body.removeEventListener("click", this.#boundClose);
                window.removeEventListener("popstate", this.#boundClose);
            }

            close(e) {
                if ((e && e.type === "popstate") || !this.contains(e.target)) {
                    this.open = false;
                }
            }

            static get observedAttributes() {
                return ["open"];
            }

            attributeChangedCallback(name, oldVal, newVal) {
                if (name === "open")
                    this.dispatchEvent(new CustomEvent("toggle"));
            }

            get open() {
                return this.hasAttribute("open");
            }

            set open(isOpen) {
                isOpen
                    ? this.setAttribute("open", "")
                    : this.removeAttribute("open");
            }
        },
    );
</script>
`;
  },
  "e-row": function({ html, state }) {
    return html`<style scope="global">
    /* Inspired by Flexbox Grid https://github.com/kristoferjoseph/flexboxgrid */
    e-row {
        box-sizing: border-box;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: var(--e-space-md);

        & + & {
            margin-top: var(--e-space-md);
        }

        /* Centers columns inside the row */
        &[center] {
            justify-content: center;

            & e-col:not([span]) {
                flex-grow: inherit;
                flex-basis: inherit;
            }
        }
    }
</style>
<slot></slot>
`;
  },
  "e-switch": function({ html, state }) {
    return html`  <style scope=global>
    e-switch {
      /* Base switch styles */
      input[is=switch] {
        position: relative;
        width: 40px;
        height: 22px;
        appearance: none;
        margin: 0;
        border-radius: var(--e-border-radius-full);
        cursor: pointer;
        background-color: var(--e-color-gray-3);
        transition: background-color ease-in 0.12s;

        &::before {
          content: '';
          position: absolute;
          width: 16px;
          height: 16px;
          top: 3px;
          left: 3px;
          border-radius: var(--e-border-radius-full);
          background-color: white;
          transition: all ease-in 0.12s;
        }

        &:focus-visible {
          outline: 2px solid var(--e-color-focus);
          outline-offset: 0;
        }

        /* Checked state */
        &:checked { background-color: var(--e-color-primary-action) }
        &:checked:before { left: 20px }

        /* Disabled state */
        &:disabled {
          cursor: not-allowed;
          background-color: var(--e-color-disabled-bg);
        }
      }
    }
  </style>
  <slot><input is=switch type=checkbox /></slot>
`;
  },
  "e-table": function({ html, state }) {
    return html`<style scope="global">
    e-table {
        /* Base table styles */
        table {
            width: 100%;
            border-collapse: collapse;

            /* Table header */
            & thead {
                text-align: left;

                & > tr {
                    border-top: 2px solid var(--e-color-gray-3);
                }

                & th {
                    padding: var(--e-space-xs) var(--e-space-md);

                    /* Sortable columns */
                    &[aria-sort] button {
                        all: unset;
                        display: inline-flex;
                        cursor: pointer;

                        &::after {
                            font-size: 0.8em;
                            padding-left: var(--e-space-xs);
                        }
                    }

                    &[aria-sort="ascending"] button:after {
                        content: "↑";
                    }
                    &[aria-sort="descending"] button:after {
                        content: "↓";
                    }
                }
            }

            & th,
            & td {
                padding: var(--e-space-xs);
            }

            & td {
                vertical-align: top;
                padding: var(--e-space-sm) var(--e-space-md);
            }

            & tbody > tr {
                border-bottom: 1px solid var(--e-color-gray-3);

                &:first-of-type {
                    border-top: 1px solid var(--e-color-gray-3);
                }
            }

            /* Table layout */
            &[layout="fixed"] {
                table-layout: fixed;
            }

            /* Striped rows */
            &[striped] > tbody tr:nth-of-type(odd) {
                background-color: var(--e-color-gray-2);
            }
        }
    }
</style>
<slot></slot>
`;
  },
  "e-tabs": function({ html, state }) {
    return html`<style scope="global">
    /* Base tabs styles */
    e-tabs {
        display: flex;
        align-items: flex-start;

        /* Scrolling tabs */
        &[scrollable] {
            overflow-x: scroll;
            scrollbar-width: none;

            &::-webkit-scrollbar {
                display: none;
            }
        }

        /* Base tab styles */
        & :is(a, button, e-link, e-button) {
            all: unset;
            display: inline-flex;
        }
        & :is(a, button) {
            all: unset;
            display: inline-flex;
            color: var(--e-color-gray-7);
            font-weight: bold;
            text-align: center;
            white-space: nowrap;
            padding: var(--e-space-xs) var(--e-space-lg);
            cursor: pointer;

            &:focus-visible {
                outline: 2px solid var(--e-color-focus);
            }

            /* Hover state */
            &:not([disabled]):not([aria-selected="true"]):hover {
                border-bottom: 2px solid var(--e-color-gray-3);
                text-decoration: none;
            }

            /* Selected state */
            &[aria-selected="true"] {
                border-bottom: 2px solid var(--e-color-primary-action);
            }

            /* Disabled state */
            &[disabled] {
                color: var(--e-color-disabled-fg);
                cursor: default;
            }
        }
    }
</style>
<slot></slot>
`;
  },
  "e-tag": function({ html, state }) {
    return html`<style scope="global">
    /* Base tag styles */
    e-tag {
        display: inline-flex;
        align-items: center;
        color: var(--color, currentColor);
        border: 1px solid var(--color, currentColor);
        background-color: var(--color, lightgrey);
        padding: 3px var(--e-space-xs);
        font-size: var(--e-font-size-min);

        & + & {
            margin-left: 3px;
        }

        /* Removable tag */
      & :is(e-button:has(button[type="remove"]), button[type=remove]) {
            padding-left: var(--e-space-xs);
            font-size: var(--e-font-size-default);
            width: auto;
        }
    }
</style>
<slot></slot>
<script type="module">
  import { CustomElement, MorphDomMixin } from "/_public/browser/client.mjs"

  class ETag extends MorphDomMixin(CustomElement) {
    constructor() {
      super()
    }

    // static get observedAttributes() {
      // return ["heading"]
    // }

    render({ html, state }) {
      return html\`
        <style scope="global">
            /* Base tag styles */
            e-tag {
                display: inline-flex;
                align-items: center;
                color: var(--color, currentColor);
                border: 1px solid var(--color, currentColor);
                background-color: var(--color, lightgrey);
                padding: 3px var(--e-space-xs);
                font-size: var(--e-font-size-min);

                & + & {
                    margin-left: 3px;
                }

                /* Removable tag */
              & :is(e-button:has(button[type="remove"]), button[type=remove]) {
                    padding-left: var(--e-space-xs);
                    font-size: var(--e-font-size-default);
                    width: auto;
                }
            }
        </style>
        <slot></slot>
      \`
    }
  }

  if(!customElements.get("e-tag")) { customElements.define( "e-tag", ETag)}

</script>
`;
  }
};
export default htmlElements;


export default function Details({ html, state }) {
  return html`
    <style>
      details > summary {
          cursor: pointer;
          list-style: none; /* Hides caret in Firefox */
      }
      details > summary:focus { outline: none }
          /* Hides caret in Chrome, Safari, etc. */
      details > summary::-webkit-details-marker { display: none }
    </style>
    <details>
      <slot></slot>
    </details>
  `
}

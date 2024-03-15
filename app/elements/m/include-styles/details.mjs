export default function IsDashM({ html, state }) {
  return html`
    <style scope=global>
      [m-details]{
        details& {
          > summary {
            cursor: pointer;
            list-style: none; /* Hides caret in Firefox */

            &:focus { outline: none }

            /* Hides caret in Chrome, Safari, etc. */
            &::-webkit-details-marker { display: none }
          }
        }
      }
    </style>
  `
}
